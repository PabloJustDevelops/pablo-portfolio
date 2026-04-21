# /experience Editorial Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remodelar la página `/experience` para que sea un timeline editorial limpio, con 2 columnas en desktop y 1 columna en mobile, renderizado desde `src/data/experience.ts`.

**Architecture:** Reemplazar el JSX hardcodeado por un `map` sobre datos tipados (`ExperienceItem`). En desktop, mostrar columna meta (period/empresa/ubicación/scope) y columna contenido (rol, highlights, stack, links). Añadir línea vertical sutil y marcador por item.

**Tech Stack:** Next.js (App Router), React, Tailwind CSS, shadcn/ui `Badge`

---

## Cambios previstos (mapa de archivos)

- Modify: `src/data/experience.ts`
- Modify: `src/app/experience/page.tsx`

---

### Task 1: Actualizar el modelo de datos de experiencia

**Files:**
- Modify: `src/data/experience.ts`

- [ ] **Step 1: Reemplazar la estructura actual por `ExperienceItem[]`**

Actualizar el archivo completo para exportar un tipo y datos con `highlights`:

```ts
export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location?: string;
  scope?: string;
  summary?: string;
  highlights: string[];
  stack?: string[];
  links?: Array<{ label: string; href: string }>;
};

export const experience: ExperienceItem[] = [
  {
    role: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    period: "2023 — Presente",
    location: "Remoto",
    scope: "Equipo 4 · B2B SaaS",
    summary: "Construcción de una plataforma de clientes con foco en rendimiento y DX.",
    highlights: [
      "Lideré la migración a Next.js y reduje el tiempo de carga en un 40%.",
      "Diseñé un sistema de componentes reutilizable para acelerar entregas.",
      "Mejoré la observabilidad y el debugging con trazas y métricas.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "GSAP"],
    links: [{ label: "Sitio", href: "https://example.com" }],
  },
  {
    role: "Full Stack Developer",
    company: "Creative Agency",
    period: "2021 — 2023",
    location: "Valencia",
    scope: "Proyectos a medida",
    summary: "Webs interactivas y aplicaciones internas para clientes internacionales.",
    highlights: [
      "Entregué micrositios animados con alto rendimiento y accesibilidad.",
      "Construí dashboards internos con autenticación y control de permisos.",
      "Estandaricé un flujo de trabajo de diseño → implementación con Figma.",
    ],
    stack: ["Node.js", "React", "PostgreSQL", "Tailwind", "Figma"],
  },
];
```

- [ ] **Step 2: Asegurar consistencia de `period` y longitud**

Revisar que:
- `period` use el formato `YYYY — YYYY` o `YYYY — Presente`.
- `highlights` tenga 3–6 entradas por rol.
- `stack` tenga 0–8 tags (máximo).

---

### Task 2: Refactorizar `/experience` para renderizar desde datos y aplicar el layout editorial

**Files:**
- Modify: `src/app/experience/page.tsx`

- [ ] **Step 1: Ajustar imports**

Eliminar imports de iconos decorativos y secciones no usadas. Importar `experience`:

```ts
import { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { Badge } from "@/components/ui/badge";
import { ContactSection } from "@/components/contact-section";
```

- [ ] **Step 2: Sustituir el JSX hardcodeado por `experience.map`**

Reemplazar el contenido del `<div className="flex flex-col relative z-10">` por:

```tsx
<div className="flex flex-col relative z-10">
  {experience.map((exp, idx) => (
    <section key={`${exp.company}-${exp.period}-${idx}`} className="relative border-b border-black/5 dark:border-white/5">
      <div className="flex flex-col md:flex-row relative">
        <div className="md:w-1/3 p-8 md:p-12 shrink-0 relative">
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-black/5 dark:bg-white/5" />
          <div className="hidden md:block absolute -left-[5px] top-12 w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 border-2 border-white dark:border-neutral-900" />

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

        <div className="md:w-2/3 p-8 md:p-12 flex flex-col gap-6">
          <div className="space-y-4">
            <h3 className="text-3xl md:text-4xl font-serif text-black dark:text-white">
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
    </section>
  ))}

  <div className="border-t border-black/5 dark:border-white/5">
    <ContactSection />
  </div>
</div>
```

- [ ] **Step 3: Rehacer el header para que sea más editorial y menos “template”**

Mantener el wrapper existente (bg, bordes y blur) pero simplificar copy e incluir CTA opcional:

```tsx
<header className="text-center py-20 md:py-28 flex flex-col items-center justify-center border-b border-black/5 dark:border-white/5 relative bg-neutral-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm z-10">
  <p className="text-xs font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase mb-6">
    Experiencia
  </p>
  <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">
    Work{" "}
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 italic pr-2">
      Experience
    </span>
  </h1>
  <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl font-light px-4">
    Una línea de tiempo de roles, responsabilidades y resultados.
  </p>
  {profile.social?.linkedin && (
    <div className="mt-10">
      <Link
        href={profile.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 uppercase tracking-widest"
      >
        Contactar
      </Link>
    </div>
  )}
</header>
```

---

### Task 3: Verificación (lint + revisión visual responsive)

- [ ] **Step 1: Lint**

Run:

```bash
npm run lint
```

Expected: sin errores (warnings existentes fuera de estos archivos pueden permanecer).

- [ ] **Step 2: Dev server**

Run:

```bash
npm run dev -- --port 3000
```

- [ ] **Step 3: Checklist visual**

- Desktop:
  - Se aprecia claramente columna izquierda (period/empresa/ubicación) y derecha (rol, bullets, stack).
  - La línea vertical y el marcador se ven sutiles, sin dominar.
- Mobile:
  - El contenido se apila sin overflow y mantiene jerarquía.
- No existe “Dev Note” ni secciones hardcodeadas “Role 1/Role 2/Open Source”.

