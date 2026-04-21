# /experience Animated Timeline (Central) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar un timeline central animado en `/experience` con progreso y halo continuo pixel a pixel (desktop) y variante mobile M1 (rail discreto a la izquierda).

**Architecture:** Crear un componente de timeline (`ExperienceTimeline`) que renderiza los capítulos desde `src/data/experience.ts` y usa GSAP+ScrollTrigger para: (1) controlar `progress` global, (2) traducir halo con `translateY` pixel-perfect dentro del rail, (3) actualizar `activeIndex` para estilos. Incluir fallback para `prefers-reduced-motion`.

**Tech Stack:** Next.js (React), Tailwind CSS, GSAP + ScrollTrigger, @gsap/react

---

## Cambios previstos (mapa de archivos)

- Create: `src/components/experience-timeline.tsx`
- Modify: `src/app/experience/page.tsx`

---

### Task 1: Crear `ExperienceTimeline` (estructura + refs)

**Files:**
- Create: `src/components/experience-timeline.tsx`

- [ ] **Step 1: Crear el componente y layout base**

Crear `ExperienceTimeline` que reciba `items`:

```tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { ExperienceItem } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // JSX se define en Step 2
  return null as any;
}
```

- [ ] **Step 2: Renderizar el layout (desktop 3 columnas + mobile M1)**

Reemplazar el `return null as any;` por:

```tsx
return (
  <div ref={sectionRef} className="relative">
    <div className="flex flex-col">
      {items.map((exp, idx) => (
        <section
          key={`${exp.company}-${exp.period}-${idx}`}
          ref={(el) => { chaptersRef.current[idx] = el; }}
          className="relative border-b border-black/5 dark:border-white/5"
        >
          <div className="md:grid md:grid-cols-[1fr_80px_1.6fr] md:gap-0">
            {/* Meta (izq) */}
            <div className="px-6 py-10 md:p-12">
              <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 mb-4 font-mono">
                {exp.period}
              </p>
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-black dark:text-white mb-2">
                {exp.company}
              </h2>
              {(exp.location || exp.scope) && (
                <div className="text-neutral-500 dark:text-neutral-400 text-sm space-y-1">
                  {exp.location && <div>{exp.location}</div>}
                  {exp.scope && <div>{exp.scope}</div>}
                </div>
              )}
            </div>

            {/* Timeline (centro desktop) */}
            <div className="hidden md:block relative">
              <div className="sticky top-0 h-screen flex items-center justify-center">
                <div className="relative h-[70vh] w-[80px] flex items-stretch justify-center">
                  <div ref={railRef} className="relative w-px bg-black/10 dark:bg-white/10 rounded-full">
                    <div
                      ref={progressRef}
                      className="absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-blue-600 via-cyan-500 to-teal-400 rounded-full"
                    />
                    <div
                      ref={haloRef}
                      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{ top: 0 }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 -m-3 rounded-full bg-cyan-400/20 blur-md" />
                        <div className="w-3 h-3 rounded-full bg-white dark:bg-black border border-black/20 dark:border-white/20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido (der) */}
            <div className="px-6 pb-10 md:p-12 flex flex-col gap-6">
              <div className="space-y-4">
                <h3
                  className={[
                    "text-3xl md:text-4xl font-serif",
                    idx === activeIndex ? "text-black dark:text-white" : "text-black/70 dark:text-white/70",
                  ].join(" ")}
                >
                  {exp.role}
                </h3>
                {exp.summary && (
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {exp.summary}
                  </p>
                )}
              </div>

              <ul className="space-y-3">
                {exp.highlights.map((item, i) => (
                  <li key={i} className="flex gap-3 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-neutral-400/60 dark:bg-neutral-500/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {exp.stack && exp.stack.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.stack.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {exp.links && exp.links.length > 0 && (
                <div className="flex flex-wrap gap-4 pt-2">
                  {exp.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white underline underline-offset-4"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* M1: rail discreto mobile a la izquierda del item */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10" />
        </section>
      ))}
    </div>
  </div>
);
```

- [ ] **Step 3: Hacer que los capítulos tengan “capítulo height”**

Añadir a cada `<section>` un `min-h-[80vh]` en `md+`:

```tsx
className="relative border-b border-black/5 dark:border-white/5 md:min-h-[85vh]"
```

---

### Task 2: Implementar animación GSAP (progreso + halo continuo + activeIndex)

**Files:**
- Modify: `src/components/experience-timeline.tsx`

- [ ] **Step 1: Crear helpers de medición y set de transforms**

Dentro de `useGSAP`, medir:
- `railHeight = railRef.current.getBoundingClientRect().height`
- `haloHeight = haloRef.current.getBoundingClientRect().height`
- `maxY = railHeight - haloHeight`

- [ ] **Step 2: ScrollTrigger global para progreso continuo pixel-perfect**

Añadir:

```tsx
useGSAP(() => {
  if (!sectionRef.current || !railRef.current || !progressRef.current || !haloRef.current) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const measure = () => {
    const railRect = railRef.current!.getBoundingClientRect();
    const haloRect = haloRef.current!.getBoundingClientRect();
    return { maxY: Math.max(0, railRect.height - haloRect.height) };
  };

  let { maxY } = measure();

  const st = ScrollTrigger.create({
    trigger: sectionRef.current,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;
      gsap.set(progressRef.current!, { scaleY: p, transformOrigin: "top center" });
      gsap.set(haloRef.current!, { y: p * maxY });
    },
  });

  const onRefresh = () => {
    ({ maxY } = measure());
    st.update();
  };

  ScrollTrigger.addEventListener("refresh", onRefresh);
  window.addEventListener("resize", ScrollTrigger.refresh);

  return () => {
    window.removeEventListener("resize", ScrollTrigger.refresh);
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    st.kill();
  };
}, { scope: sectionRef });
```

- [ ] **Step 3: Determinar capítulo activo**

Crear un `ScrollTrigger` por capítulo para actualizar `activeIndex` cuando el capítulo cruza el centro:

```tsx
chaptersRef.current.forEach((el, idx) => {
  if (!el) return;
  ScrollTrigger.create({
    trigger: el,
    start: "top center",
    end: "bottom center",
    onToggle: (self) => {
      if (self.isActive) setActiveIndex(idx);
    },
  });
});
```

---

### Task 3: Integrar en `/experience`

**Files:**
- Modify: `src/app/experience/page.tsx`

- [ ] **Step 1: Importar y usar `ExperienceTimeline`**

En `page.tsx`, reemplazar el `experience.map` actual por:

```tsx
import { ExperienceTimeline } from "@/components/experience-timeline";
// ...
<div className="flex flex-col relative z-10">
  <ExperienceTimeline items={experience} />
  <div className="border-t border-black/5 dark:border-white/5">
    <ContactSection />
  </div>
</div>
```

- [ ] **Step 2: Eliminar imports no usados en page.tsx**

Quitar `Badge` y `Link` si ya no se usan en el page (CTA del header sí usa `Link`).

---

### Task 4: Verificación

- [ ] **Step 1: Typecheck**

Run:

```bash
npx tsc --noEmit
```

Expected: exit 0.

- [ ] **Step 2: Lint**

Run:

```bash
npm run lint
```

Expected: sin errores (warnings existentes pueden permanecer).

- [ ] **Step 3: Dev server y smoke**

Run:

```bash
npm run dev -- --port 3000
curl -sSf http://127.0.0.1:3000/experience >/dev/null && echo OK
```

Expected: `OK`.

- [ ] **Step 4: Checklist visual**

- Desktop:
  - Timeline central sticky visible (rail + progreso gradiente + halo).
  - Halo se mueve pixel a pixel al hacer scroll por la sección.
  - `activeIndex` cambia y el capítulo activo sube contraste.
- Mobile (M1):
  - Rail fino a la izquierda visible, sin solapar el texto.
- Reduced motion:
  - Activando reduced motion, timeline queda estático (sin movimiento).

