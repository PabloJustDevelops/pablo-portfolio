# Education Timeline Experience-Style Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hacer que el timeline de `/education` use el mismo patrón de UI/UX que `/experience` (índice sticky + navegación por scroll), y ordenar el timeline de antiguo → moderno.

**Architecture:** Reutilizar la lógica de `ExperienceTimeline` (IntersectionObserver + índice sticky responsive) en un nuevo componente `EducationTimelineExperienceStyle`. El componente recibirá `EducationItem[]`, generará ids estables y renderizará cada ítem en una `Card` consistente con `ExperienceTimeline`. La página `/education` usará el nuevo componente en lugar del timeline simple.

**Tech Stack:** Next.js App Router, React (Client Component), TypeScript, Tailwind CSS, componentes UI existentes (`Badge`, `Card`, `buttonVariants`).

---

## File Structure

- Create: `src/components/education-timeline-experience-style.tsx`
- Modify: `src/data/education.ts`
- Modify: `src/app/education/page.tsx`

---

### Task 1: Ordenar timeline de educación (antiguo → moderno)

**Files:**
- Modify: `src/data/education.ts`

- [ ] **Step 1: Reordenar `educationPageData.timeline`**

Cambiar el array para que quede:

```ts
timeline: [
  { id: "smr-2022-2024", ... },
  { id: "dam-2024-2026", ... },
],
```

- [ ] **Step 2: Verificar que los `id` siguen siendo únicos**

No debe haber `id` duplicados en `timeline`.

---

### Task 2: Crear timeline con estilo `/experience`

**Files:**
- Create: `src/components/education-timeline-experience-style.tsx`

- [ ] **Step 1: Copiar patrón base de `ExperienceTimeline`**

Crear un Client Component con:
- `detailSectionsRef`
- `activeIndex`
- `detailIds` derivados de `items`
- `IntersectionObserver` con el mismo `rootMargin` y `threshold`
- navegación `scrollTo(idx)`
- layout responsive:
  - `md:hidden` sticky nav superior (chips)
  - `md:grid` con `aside` sticky y `section` de detalle

- [ ] **Step 2: Adaptar a `EducationItem`**

Para cada ítem renderizar:
- `period` como `Badge`
- `location` como `Badge variant="outline"`
- `center` como descripción
- `title` como `CardTitle` serif
- `summary` como párrafo
- `highlights` como lista con bullets
- `tags` como `Badge` chips

Código base (ajustar imports y types):

```tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { EducationItem } from "@/data/education";

export function EducationTimelineExperienceStyle({ items }: { items: EducationItem[] }) {
  const detailSectionsRef = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const detailIds = useMemo(() => items.map((item) => `education-${item.id}`), [items]);
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const entries = detailSectionsRef.current
      .map((el, idx) => ({ el, idx }))
      .filter((item): item is { el: HTMLElement; idx: number } => item.el !== null);

    if (entries.length === 0) return;

    const observer = new IntersectionObserver(
      (observerEntries) => {
        const candidates = observerEntries
          .filter((e) => e.isIntersecting)
          .map((e) => {
            const idx = Number((e.target as HTMLElement).dataset.index ?? "-1");
            return { idx, ratio: e.intersectionRatio, top: e.boundingClientRect.top };
          })
          .filter((c) => Number.isFinite(c.idx) && c.idx >= 0);

        if (candidates.length === 0) return;

        candidates.sort((a, b) => b.ratio - a.ratio || Math.abs(a.top) - Math.abs(b.top));
        const nextIndex = candidates[0]?.idx;
        if (nextIndex === undefined) return;
        setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] }
    );

    entries.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, [detailIds]);

  const scrollTo = (idx: number) => {
    if (typeof window === "undefined") return;
    const id = detailIds[idx];
    const target = id ? document.getElementById(id) : null;
    target?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    setActiveIndex(idx);
  };

  return (
    <div className="relative border-t border-black/5 dark:border-white/5">
      <div className="md:hidden sticky top-20 z-20 bg-neutral-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-black/5 dark:border-white/5">
        <nav
          aria-label="Índice de educación"
          className={cn(
            "px-4 py-3 flex gap-2 overflow-x-auto",
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          )}
        >
          {items.map((edu, idx) => (
            <button
              key={edu.id}
              type="button"
              onClick={() => scrollTo(idx)}
              aria-current={idx === activeIndex ? "true" : undefined}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "shrink-0 h-8 px-3 rounded-full border border-black/10 dark:border-white/10",
                idx === activeIndex
                  ? "bg-black/10 dark:bg-white/10 text-black dark:text-white"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              )}
            >
              <span className="font-medium">{edu.title.includes(\"SMR\") ? \"SMR\" : \"DAM\"}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <aside className="hidden md:block border-r border-black/5 dark:border-white/5">
          <div className="sticky top-24 px-6 py-12">
            <div className="flex items-center justify-between mb-6">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
                Índice
              </div>
              <div className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                {(activeIndex + 1).toString().padStart(2, \"0\")} / {items.length.toString().padStart(2, \"0\")}
              </div>
            </div>

            <nav aria-label="Índice de educación" className="flex flex-col gap-1">
              {items.map((edu, idx) => (
                <button
                  key={edu.id}
                  type="button"
                  onClick={() => scrollTo(idx)}
                  aria-current={idx === activeIndex ? "true" : undefined}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "h-auto items-start justify-start gap-2 px-3 py-2 rounded-xl border border-transparent text-left",
                    idx === activeIndex
                      ? "bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/10 text-black dark:text-white"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                  )}
                >
                  <span className="flex flex-col">
                    <span className="text-sm font-medium leading-tight">{edu.title}</span>
                    <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-500 leading-tight">
                      {edu.period}
                    </span>
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <div className="flex flex-col">
          {items.map((edu, idx) => (
            <section
              key={edu.id}
              id={detailIds[idx]}
              data-index={idx}
              ref={(el) => {
                detailSectionsRef.current[idx] = el;
              }}
              className="scroll-mt-28 border-b border-black/5 dark:border-white/5 px-4 md:px-8 py-12 md:py-16"
            >
              <Card
                className={cn(
                  "bg-white/60 dark:bg-white/[0.02] ring-1 ring-black/5 dark:ring-white/10",
                  idx === activeIndex && "ring-black/15 dark:ring-white/20"
                )}
              >
                <CardHeader className="border-b border-black/5 dark:border-white/5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{edu.period}</Badge>
                    <Badge variant="outline" className="text-neutral-600 dark:text-neutral-300">
                      {edu.location}
                    </Badge>
                  </div>

                  <div className="mt-3 space-y-1">
                    <CardTitle className="text-2xl md:text-3xl font-serif text-black dark:text-white">
                      {edu.title}
                    </CardTitle>
                    <CardDescription className="text-neutral-600 dark:text-neutral-400">
                      {edu.center}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-8">
                  {edu.summary && (
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{edu.summary}</p>
                  )}

                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="space-y-3">
                      {edu.highlights.map((item, i) => (
                        <li
                          key={`${edu.id}-highlight-${i}`}
                          className="flex gap-3 text-neutral-700 dark:text-neutral-300 leading-relaxed"
                        >
                          <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-neutral-400/60 dark:bg-neutral-500/60" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {edu.tags && edu.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {edu.tags.map((tag) => (
                        <Badge key={`${edu.id}-${tag}`}>{tag}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Mantener el estilo idéntico al de `/experience`**

Reusar:
- `buttonVariants`
- `cn`
- `Card` y `Badge` (mismos fondos/rings/borders)
- `scroll-mt-28`, `sticky top-20`/`top-24`, mismas clases de aside.

---

### Task 3: Integrar el nuevo timeline en `/education`

**Files:**
- Modify: `src/app/education/page.tsx`

- [ ] **Step 1: Reemplazar el import del timeline actual**

Cambiar:

```tsx
import { EducationTimeline } from "@/components/education-timeline";
```

por:

```tsx
import { EducationTimelineExperienceStyle } from "@/components/education-timeline-experience-style";
```

- [ ] **Step 2: Reemplazar el uso**

Cambiar:

```tsx
<EducationTimeline items={educationPageData.timeline} />
```

por:

```tsx
<EducationTimelineExperienceStyle items={educationPageData.timeline} />
```

---

### Task 4: Verificación

**Files:**
- N/A

- [ ] **Step 1: Lint**

Run:

```bash
npm run lint
```

Expected: exit code 0 (warnings existentes pueden mantenerse).

- [ ] **Step 2: Typecheck**

Run:

```bash
npx tsc -p tsconfig.json --noEmit
```

Expected: exit code 0.

- [ ] **Step 3: Verificación manual**

- Abrir `/education`:
  - El índice sticky funciona (mobile y desktop).
  - El item activo cambia al hacer scroll.
  - El orden es SMR → DAM.
  - El estilo de cards/badges coincide con `/experience`.

---

## Self-Review (plan)

- Cubre requisitos: orden antiguo→moderno y timeline con comportamiento/estilo de `/experience`.
- Sin placeholders: incluye rutas exactas y un esqueleto completo del componente.
- Consistencia: `EducationItem` se usa en todo el flujo, ids estables.

