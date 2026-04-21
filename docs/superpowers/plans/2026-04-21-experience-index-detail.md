# /experience Index + Detail (Sticky) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mejorar `/experience` para que deje de verse plano con un layout “Index + Detail”: index sticky en desktop, cards de detalle con jerarquía clara e “impact” (KPIs) opcionales.

**Architecture:** Mantener `src/app/experience/page.tsx` como contenedor y refactorizar `ExperienceTimeline` para renderizar: (1) un índice de experiencias (nav) que controla scroll, (2) una lista de cards (detalle) que actualiza el estado activo con `IntersectionObserver`. En mobile, usar un índice horizontal (pills) que también hace scroll al detalle.

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui (`Card`, `Badge`, `Button`)

---

## Cambios previstos (mapa de archivos)

- Modify: `src/data/experience.ts`
- Modify: `src/components/experience-timeline.tsx`
- Modify: `src/components/experience.tsx`
- Modify: `src/app/experience/page.tsx`

---

### Task 1: Ampliar el modelo de datos para soportar “impact” (KPIs) y un `id` estable

**Files:**
- Modify: `src/data/experience.ts`

- [ ] **Step 1: Actualizar `ExperienceItem`**

Reemplazar el tipo por:

```ts
export type ExperienceImpact = {
  label: string;
  value: string;
};

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  scope?: string;
  summary?: string;
  impact?: ExperienceImpact[];
  highlights: string[];
  stack?: string[];
  links?: Array<{ label: string; href: string }>;
};
```

- [ ] **Step 2: Actualizar `experience` con `id` y `impact` opcional**

Ejemplo de estructura mínima:

```ts
export const experience: ExperienceItem[] = [
  {
    id: "tech-solutions-senior-frontend",
    role: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    period: "2023 — Presente",
    location: "Remoto",
    scope: "Equipo 4 · B2B SaaS",
    summary: "Construcción de una plataforma de clientes con foco en rendimiento y DX.",
    impact: [
      { label: "Performance", value: "+40%" },
      { label: "Migración", value: "Next.js" },
      { label: "DX", value: "Mejorada" },
    ],
    highlights: [
      "Lideré la migración a Next.js y reduje el tiempo de carga en un 40%.",
      "Diseñé un sistema de componentes reutilizable para acelerar entregas.",
      "Mejoré la observabilidad y el debugging con trazas y métricas.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "GSAP"],
    links: [{ label: "Sitio", href: "https://example.com" }],
  },
];
```

- [ ] **Step 3: Verificación rápida de datos**

Revisar que:
- `id` sea único por entrada.
- `impact` (si existe) tenga 2–4 items cortos.
- `highlights` siga teniendo 3–6 bullets orientados a resultados.

---

### Task 2: Refactorizar `ExperienceTimeline` al layout “Index + Detail”

**Files:**
- Modify: `src/components/experience-timeline.tsx`

- [ ] **Step 1: Simplificar imports y preparar refs/estado**

Reemplazar los imports y estado por:

```tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ExperienceItem } from "@/data/experience";
```

Crear refs:

```tsx
const detailRefs = useRef<Array<HTMLElement | null>>([]);
const [activeIndex, setActiveIndex] = useState(0);
```

Y conservar `prefersReducedMotion`:

```tsx
const prefersReducedMotion = useMemo(() => {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}, []);
```

- [ ] **Step 2: Implementar scroll-to-detail en click**

Añadir helper:

```tsx
const scrollToIndex = (idx: number) => {
  const el = detailRefs.current[idx];
  if (!el) return;
  el.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
};
```

- [ ] **Step 3: Implementar scrollspy con `IntersectionObserver`**

En `useEffect`, observar cada card de detalle:

```tsx
useEffect(() => {
  const els = detailRefs.current.filter(Boolean) as HTMLElement[];
  if (els.length === 0) return;

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

      if (!visible?.target) return;
      const idx = els.indexOf(visible.target as HTMLElement);
      if (idx >= 0) setActiveIndex(idx);
    },
    {
      root: null,
      threshold: [0.25, 0.4, 0.55],
      rootMargin: "-20% 0px -60% 0px",
    }
  );

  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}, [items]);
```

- [ ] **Step 4: Render desktop (index sticky + detail cards)**

Implementar un wrapper `md:grid md:grid-cols-[320px_1fr]`:

```tsx
return (
  <div className="relative">
    <div className="md:grid md:grid-cols-[320px_1fr] md:gap-10">
      <aside className="hidden md:block md:sticky md:top-28 self-start">
        <nav className="flex flex-col gap-2 pr-2">
          {items.map((exp, idx) => (
            <button
              key={exp.id}
              type="button"
              onClick={() => scrollToIndex(idx)}
              className={[
                "text-left rounded-xl border px-4 py-3 transition-colors",
                idx === activeIndex
                  ? "bg-black/[0.03] dark:bg-white/[0.06] border-black/10 dark:border-white/15"
                  : "bg-transparent border-black/5 dark:border-white/10 hover:bg-black/[0.02] dark:hover:bg-white/[0.04]",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    {exp.period}
                  </div>
                  <div className="truncate text-sm font-semibold text-black dark:text-white">
                    {exp.company}
                  </div>
                </div>
                <div className="shrink-0 text-xs text-neutral-500 dark:text-neutral-400">
                  {idx + 1}/{items.length}
                </div>
              </div>
              <div className="mt-1 truncate text-xs text-neutral-500 dark:text-neutral-400">
                {exp.role}
              </div>
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex flex-col gap-6">
        {items.map((exp, idx) => (
          <article
            key={exp.id}
            ref={(el) => {
              detailRefs.current[idx] = el;
            }}
            className="scroll-mt-28"
          >
            <Card
              className={[
                "bg-neutral-50/60 dark:bg-white/5 border border-black/5 dark:border-white/10",
                idx === activeIndex ? "ring-1 ring-cyan-400/30" : "",
              ].join(" ")}
            >
              <CardHeader className="border-b border-black/5 dark:border-white/10">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle className="text-xl md:text-2xl font-serif">
                      {exp.role}
                    </CardTitle>
                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                      {exp.period}
                    </div>
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-300">
                    {exp.company}
                    {(exp.location || exp.scope) && (
                      <span className="text-neutral-500 dark:text-neutral-400">
                        {" "}
                        · {[exp.location, exp.scope].filter(Boolean).join(" · ")}
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col gap-6">
                {exp.impact && exp.impact.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {exp.impact.map((kpi) => (
                      <div
                        key={`${exp.id}-${kpi.label}`}
                        className="rounded-lg border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-2"
                      >
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          {kpi.label}
                        </div>
                        <div className="text-sm font-semibold text-black dark:text-white">
                          {kpi.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {exp.summary && (
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {exp.summary}
                  </p>
                )}

                <ul className="space-y-3">
                  {exp.highlights.map((item, i) => (
                    <li
                      key={`${exp.id}-h-${i}`}
                      className="flex gap-3 text-neutral-600 dark:text-neutral-400 leading-relaxed"
                    >
                      <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-neutral-400/60 dark:bg-neutral-500/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {exp.stack && exp.stack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((tag) => (
                      <Badge
                        key={`${exp.id}-${tag}`}
                        variant="secondary"
                        className="bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {exp.links && exp.links.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {exp.links.map((l) => (
                      <Button
                        key={`${exp.id}-${l.href}`}
                        variant="outline"
                        size="sm"
                        render={(props) => (
                          <Link
                            {...props}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {l.label}
                          </Link>
                        )}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </article>
        ))}
      </div>
    </div>
  </div>
);
```

- [ ] **Step 5: Render mobile (índice horizontal)**

Añadir antes del grid desktop un `nav` solo en mobile:

```tsx
<nav className="md:hidden flex gap-2 overflow-x-auto pb-4 -mx-6 px-6">
  {items.map((exp, idx) => (
    <button
      key={exp.id}
      type="button"
      onClick={() => scrollToIndex(idx)}
      className={[
        "shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors",
        idx === activeIndex
          ? "bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/15 text-black dark:text-white"
          : "bg-transparent border-black/5 dark:border-white/10 text-neutral-600 dark:text-neutral-400",
      ].join(" ")}
    >
      {exp.company}
    </button>
  ))}
</nav>
```

Y aplicar al contenedor principal `px-6 md:px-0` si hace falta para alinear con el resto de la página.

---

### Task 3: Ajustar el componente “Experience” (mini timeline) para el nuevo `id`

**Files:**
- Modify: `src/components/experience.tsx`

- [ ] **Step 1: Cambiar `key` a `exp.id`**

Actualizar:

```tsx
{experience.map((exp) => (
  <div key={exp.id} className="relative pl-6">
    ...
  </div>
))}
```

- [ ] **Step 2: Verificar que no depende de campos renombrados**

Confirmar que el componente sigue mostrando `role`, `company`, `period` y `summary` como antes.

---

### Task 4: Ajustar `page.tsx` para el nuevo layout (padding y contenedor)

**Files:**
- Modify: `src/app/experience/page.tsx`

- [ ] **Step 1: Ajustar el wrapper del timeline para dar aire**

Modificar:

```tsx
<div className="flex flex-col relative z-10">
  <div className="px-6 md:px-10 py-10 md:py-16">
    <ExperienceTimeline items={experience} />
  </div>
</div>
```

- [ ] **Step 2: Mantener `ContactSection` separado por borde**

Conservar:

```tsx
<div className="border-t border-black/5 dark:border-white/5">
  <ContactSection />
</div>
```

---

### Task 5: Verificación

- [ ] **Step 1: Lint**

Run:

```bash
npm run lint
```

Expected: sin errores en los archivos tocados.

- [ ] **Step 2: Build**

Run:

```bash
npm run build
```

Expected: build exitoso.

- [ ] **Step 3: Smoke manual**

Checklist:
- Desktop: index sticky visible, click en un item hace scroll suave al card correspondiente, y el estado activo cambia mientras scrolleas.
- Mobile: nav horizontal funciona y no hay overflow raro.
- `prefers-reduced-motion`: el scroll por click cae en `auto` (sin smooth).

