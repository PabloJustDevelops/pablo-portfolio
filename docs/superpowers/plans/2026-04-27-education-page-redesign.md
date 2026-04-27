# Education Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar `/education` para que deje de ser plantilla y muestre educación real con un layout híbrido (bento superior + timeline inferior) consistente con el estilo del portfolio.

**Architecture:** La página `/education` renderiza su contenido desde un nuevo módulo de datos `src/data/education.ts`. La UI se descompone en 2 componentes presentacionales (`EducationFeatured`, `EducationTimeline`) usados por `src/app/education/page.tsx`.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, componentes UI existentes (`Badge`, `Card`).

---

## File Structure

- Create: `src/data/education.ts`
- Create: `src/components/education-featured.tsx`
- Create: `src/components/education-timeline.tsx`
- Modify: `src/app/education/page.tsx`

---

### Task 1: Crear datos reales de educación

**Files:**
- Create: `src/data/education.ts`

- [ ] **Step 1: Crear tipos y datos `educationPageData`**

```ts
export type EducationLink = { label: string; href: string };

export type EducationItem = {
  id: string;
  title: string;
  center: string;
  location: string;
  period: string;
  summary?: string;
  highlights?: string[];
  tags?: string[];
  links?: EducationLink[];
};

export type FeaturedProject = {
  name: string;
  description: string;
  stack: string[];
  notes?: string[];
  links?: EducationLink[];
};

export type EducationPageData = {
  featured: {
    main: EducationItem;
    project: FeaturedProject;
    learningNow: string[];
  };
  timeline: EducationItem[];
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }>;
};
```

- [ ] **Step 2: Rellenar contenido inicial real**

```ts
export const educationPageData: EducationPageData = {
  featured: {
    main: {
      id: "dam-2024-2026",
      title: "Grado Superior — Desarrollo de Aplicaciones Multiplataforma (DAM)",
      center: "IES Leonardo Da Vinci",
      location: "Albacete, España",
      period: "2024 — 2026",
      summary:
        "Formación orientada al desarrollo de software multiplataforma: backend, datos, UI, Android y buenas prácticas de entrega.",
      highlights: [
        "POO con Java, estructuras de datos y fundamentos de algoritmia.",
        "Modelado y diseño de bases de datos relacionales (SQL) y acceso a datos (JDBC/JPA/Hibernate).",
        "Desarrollo de APIs REST y consumo de servicios HTTP/JSON desde cliente.",
        "Desarrollo Android (Kotlin/Java) y aplicaciones de escritorio (JavaFX/Swing).",
        "Flujos con Git, testing, despliegue básico con Docker y metodologías ágiles (Scrum/Kanban).",
      ],
      tags: [
        "Java",
        "SQL",
        "APIs REST",
        "Android",
        "Git",
        "Testing",
        "Docker",
        "Agile",
      ],
    },
    project: {
      name: "TravelPal",
      description:
        "Aplicación web para centralizar la planificación de viajes y mantener toda la información organizada en un solo lugar.",
      stack: ["Next.js", "React", "Tailwind CSS", "Supabase", "Vercel"],
      notes: [
        "Itinerario por días, notas, checklist/tareas y adjuntos (reservas, PDFs, enlaces).",
        "Presupuesto/gastos para controlar el viaje de principio a fin.",
        "Autenticación y base de datos con Supabase.",
        "Sin mapas por limitación de API de pago.",
      ],
    },
    learningNow: [
      "Arquitectura",
      "Testing",
      "OpenLayers/GIS",
      "React Native",
      "CI/CD",
      "Seguridad",
      "Backend con Node",
    ],
  },
  timeline: [
    {
      id: "dam-2024-2026",
      title: "Grado Superior — Desarrollo de Aplicaciones Multiplataforma (DAM)",
      center: "IES Leonardo Da Vinci",
      location: "Albacete, España",
      period: "2024 — 2026",
      summary:
        "Base sólida de desarrollo full-stack y multiplataforma, con foco en prácticas de calidad y entrega.",
      highlights: [
        "POO con Java y fundamentos de estructuras de datos.",
        "BBDD relacional, SQL y acceso a datos (JDBC/JPA/Hibernate).",
        "APIs REST y consumo de servicios.",
        "Android (Kotlin/Java) y UI responsive.",
        "Git, testing, Docker y Agile.",
      ],
      tags: ["Java", "SQL", "REST", "Android", "Git", "Testing"],
    },
    {
      id: "smr-2022-2024",
      title: "FP Grado Medio — Sistemas Microinformáticos y Redes (SMR)",
      center: "IES Leonardo Da Vinci",
      location: "Albacete, España",
      period: "2022 — 2024",
      summary:
        "Formación práctica orientada a sistemas, redes, soporte IT y seguridad básica en entornos reales.",
      highlights: [
        "Montaje y mantenimiento de equipos (diagnóstico, upgrades, imágenes del sistema).",
        "Configuración de redes LAN/WiFi y resolución de incidencias.",
        "Administración básica Windows Server/Linux (usuarios, permisos, servicios).",
        "Copias de seguridad y medidas de seguridad básicas.",
        "Instalación y gestión de antivirus.",
      ],
      tags: ["Redes", "Windows", "Linux", "Soporte IT", "Seguridad"],
    },
  ],
};
```

- [ ] **Step 3: Asegurar que `certifications` no se renderiza por defecto**

```ts
certifications: [],
```

o simplemente omitirla en `educationPageData` y controlar el renderizado en UI.

---

### Task 2: Crear UI de destacados (bento superior)

**Files:**
- Create: `src/components/education-featured.tsx`

- [ ] **Step 1: Implementar `EducationFeatured`**

```tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { EducationPageData } from "@/data/education";

export function EducationFeatured({ featured }: { featured: EducationPageData["featured"] }) {
  return (
    <section className="px-6 md:px-10 py-10 md:py-14 border-b border-black/5 dark:border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <Card className="md:col-span-8 bg-white/60 dark:bg-white/[0.02] ring-1 ring-black/5 dark:ring-white/10">
          <CardHeader className="border-b border-black/5 dark:border-white/5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{featured.main.period}</Badge>
              <Badge variant="outline" className="text-neutral-600 dark:text-neutral-300">
                {featured.main.location}
              </Badge>
            </div>
            <div className="mt-3 space-y-1">
              <div className="text-2xl md:text-3xl font-serif text-black dark:text-white">
                {featured.main.title}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">{featured.main.center}</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {featured.main.summary && (
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {featured.main.summary}
              </p>
            )}
            {featured.main.tags && featured.main.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {featured.main.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 ring-1 ring-black/5 dark:ring-white/10">
          <CardHeader className="border-b border-black/5 dark:border-white/5">
            <div className="text-xl font-serif text-black dark:text-white">{featured.project.name}</div>
            <div className="text-neutral-600 dark:text-neutral-400">{featured.project.description}</div>
          </CardHeader>
          <CardContent className="space-y-5">
            {featured.project.notes && featured.project.notes.length > 0 && (
              <ul className="space-y-2">
                {featured.project.notes.map((n, i) => (
                  <li
                    key={`${featured.project.name}-note-${i}`}
                    className="flex gap-3 text-neutral-700 dark:text-neutral-300 leading-relaxed"
                  >
                    <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-neutral-400/60 dark:bg-neutral-500/60" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-2">
              {featured.project.stack.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-12 bg-white/60 dark:bg-white/[0.02] ring-1 ring-black/5 dark:ring-white/10">
          <CardHeader className="border-b border-black/5 dark:border-white/5">
            <div className="text-xl font-serif text-black dark:text-white">Actualmente aprendiendo</div>
            <div className="text-neutral-600 dark:text-neutral-400">
              Temas en los que estoy profundizando últimamente.
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {featured.learningNow.map((topic) => (
                <Badge key={topic}>{topic}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Confirmar que no se usan dependencias nuevas**

No añadir librerías; solo `Badge`/`Card` existentes.

---

### Task 3: Crear UI de timeline inferior

**Files:**
- Create: `src/components/education-timeline.tsx`

- [ ] **Step 1: Implementar `EducationTimeline`**

```tsx
import { Badge } from "@/components/ui/badge";
import type { EducationItem } from "@/data/education";

export function EducationTimeline({ items }: { items: EducationItem[] }) {
  return (
    <section className="px-6 md:px-10 py-12 md:py-16">
      <div className="flex flex-col">
        {items.map((item) => (
          <section key={item.id} className="border-b border-black/5 dark:border-white/5 py-10 md:py-12">
            <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{item.period}</Badge>
                  <Badge variant="outline" className="text-neutral-600 dark:text-neutral-300">
                    {item.location}
                  </Badge>
                </div>
                <div className="text-lg font-serif text-black dark:text-white">{item.center}</div>
              </div>

              <div className="mt-6 md:mt-0 space-y-6">
                <h2 className="text-2xl md:text-3xl font-serif text-black dark:text-white">
                  {item.title}
                </h2>
                {item.summary && (
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{item.summary}</p>
                )}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="space-y-3">
                    {item.highlights.map((h, i) => (
                      <li key={`${item.id}-h-${i}`} className="flex gap-3 text-neutral-700 dark:text-neutral-300">
                        <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-neutral-400/60 dark:bg-neutral-500/60" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={`${item.id}-${tag}`}>{tag}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
```

---

### Task 4: Integrar datos + UI en `/education` y alinear estilo

**Files:**
- Modify: `src/app/education/page.tsx`

- [ ] **Step 1: Actualizar metadata a español y descripción real**

```ts
export const metadata: Metadata = {
  title: `Educación | ${profile.name}`,
  description: `Formación, proyectos y aprendizaje continuo de ${profile.name}`,
};
```

- [ ] **Step 2: Reemplazar layout actual por contenedor consistente**

Estructura objetivo:
- `main` con `bg-neutral-50 dark:bg-[#0a0a0a]` similar a `/experience`.
- Fondo con “ambient effects” suave (opcional, pero consistente).
- Contenedor `max-w-6xl mx-auto border-x ...`.
- Header con eyebrow + H1 + subtítulo.
- `EducationFeatured` + `EducationTimeline`.

- [ ] **Step 3: Añadir sección de certificaciones (condicional)**

```tsx
{educationPageData.certifications && educationPageData.certifications.length > 0 && (
  <section className="px-6 md:px-10 py-12 md:py-16 border-t border-black/5 dark:border-white/5">
    <h2 className="text-2xl md:text-3xl font-serif text-black dark:text-white mb-6">
      Certificaciones
    </h2>
    <ul className="space-y-4">
      {educationPageData.certifications.map((c) => (
        <li
          key={`${c.name}-${c.issuer}-${c.date}`}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] px-4 py-3"
        >
          <div className="space-y-0.5">
            <div className="text-sm font-medium text-black dark:text-white">{c.name}</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">{c.issuer}</div>
          </div>
          <div className="text-xs font-mono text-neutral-500 dark:text-neutral-500">{c.date}</div>
        </li>
      ))}
    </ul>
  </section>
)}
```

---

### Task 5: Verificación

**Files:**
- N/A

- [ ] **Step 1: Ejecutar lint**

Run:

```bash
npm run lint
```

Expected: exit code 0.

- [ ] **Step 2: Ejecutar build**

Run:

```bash
npm run build
```

Expected: build OK.

- [ ] **Step 3: Validación manual**

- Abrir `/education` y comprobar:
  - Header en español.
  - Bento con 3 cards (DAM, TravelPal, Actualmente aprendiendo).
  - Timeline con DAM y SMR.
  - No hay “Dev Note” ni textos placeholder.
  - Dark/light legible y consistente con `/experience`.

---

## Self-Review (plan)

- Cobertura del spec: el plan crea `education.ts`, reemplaza `/education` por layout híbrido, elimina placeholders y prepara certificaciones de forma condicional.
- Sin placeholders: los pasos incluyen código concreto, rutas exactas y comandos de verificación.
- Consistencia de tipos: `EducationPageData` y sus campos coinciden entre datos y UI.

