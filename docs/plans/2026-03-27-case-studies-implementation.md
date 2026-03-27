# Case Studies Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replicar el layout de lista vertical de "Curated work" con la misma jerarquía visual que la web de Aayush Bharti, usando `framer-motion` para las animaciones.

**Architecture:** Se reemplazarán los componentes `BentoGrid` actuales en la Home por una nueva sección `CaseStudiesSection` con elementos iterativos `CaseStudyItem`. El modelo de datos en `projects.ts` será extendido.

**Tech Stack:** Next.js, Tailwind CSS, Framer Motion, TypeScript, Lucide React.

---

### Task 1: Actualizar el modelo de datos de proyectos

**Files:**
- Modify: `src/data/projects.ts`

**Step 1: Agregar los nuevos campos al array de proyectos**

Actualiza cada proyecto en `projects.ts` para que incluya los campos `category`, `period`, y `accentColor` (que usaremos como clases de tailwind para el fondo de la tarjeta).

```typescript
export const projects = [
  {
    title: "E-commerce Dashboard",
    description: "Panel de administración completo para gestión de productos y pedidos.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
    link: "https://github.com",
    image: "https://placehold.co/600x400?text=Dashboard",
    featured: true,
    category: "WEB APP",
    period: "Q4 2024",
    accentColor: "bg-blue-600",
  },
  {
    title: "SaaS Landing Page",
    description: "Landing page optimizada para conversión con animaciones suaves.",
    tags: ["React", "Framer Motion", "Stripe"],
    link: "https://github.com",
    image: "https://placehold.co/600x400?text=Landing+Page",
    featured: true,
    category: "LANDING PAGE",
    period: "Q1 2025",
    accentColor: "bg-purple-600",
  },
  {
    title: "Task Manager API",
    description: "API RESTful robusta con autenticación y documentación Swagger.",
    tags: ["Node.js", "Express", "PostgreSQL", "Docker"],
    link: "https://github.com",
    image: "https://placehold.co/600x400?text=API",
    featured: false,
    category: "BACKEND",
    period: "Q2 2025",
    accentColor: "bg-emerald-600",
  },
];
```

**Step 2: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat(data): add case studies metadata to projects"
```

---

### Task 2: Crear los componentes de la lista vertical

**Files:**
- Create: `src/components/case-studies.tsx`

**Step 1: Crear el componente con framer-motion**

```tsx
"use client";

import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function CaseStudiesSection() {
  return (
    <section id="work" className="w-full">
      <div className="flex flex-col items-center text-center mb-20">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">Case Studies</span>
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
          Curated <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">work</span>
        </h2>
      </div>
      
      <div className="flex flex-col gap-32">
        {projects.map((project, i) => (
          <CaseStudyItem key={i} project={project} index={i + 1} />
        ))}
      </div>
    </section>
  );
}

function CaseStudyItem({ project, index }: { project: typeof projects[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col gap-6 w-full"
    >
      <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
        <div className="flex items-center gap-4">
          <span>{index.toString().padStart(2, '0')}</span>
          <div className="h-px w-12 bg-neutral-800" />
          <span className="uppercase tracking-widest">{project.category}</span>
        </div>
        <span className="rounded-full border border-neutral-800 px-3 py-1 bg-neutral-900/50">
          {project.period}
        </span>
      </div>

      <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight mb-2">{project.title}</h3>

      <Link href={project.link} target="_blank" className="group block w-full">
        <div className={`relative overflow-hidden rounded-[2rem] pt-8 px-8 md:pt-12 md:px-12 ${project.accentColor} transition-transform duration-300 ring-1 ring-white/10`}>
          <div className="flex justify-between items-start mb-12">
            <p className="text-lg md:text-2xl font-medium text-white max-w-xl leading-relaxed drop-shadow-sm">
              {project.description}
            </p>
            <ArrowRight className="text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 w-6 h-6 md:w-8 md:h-8 flex-shrink-0 ml-4" />
          </div>
          
          <div className="relative mt-auto w-full aspect-[16/10] md:aspect-[16/9] rounded-t-xl overflow-hidden shadow-2xl transform translate-y-6 group-hover:translate-y-2 transition-transform duration-500 bg-neutral-900">
             {project.image ? (
                <Image src={project.image} alt={project.title} fill className="object-cover object-top" />
             ) : (
                <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
                    {project.title} Preview
                </div>
             )}
          </div>
        </div>
      </Link>

      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-mono text-[10px] uppercase tracking-wider py-1.5 px-3 transition-colors">
            {tag}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}
```

**Step 2: Verificar la compilación localmente**

No corremos tests aquí ya que es puramente visual, pero el TS compiler debería validar los tipos.

**Step 3: Commit**

```bash
git add src/components/case-studies.tsx
git commit -m "feat(ui): create vertical case studies list component"
```

---

### Task 3: Reemplazar el BentoGrid en la Home

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Importar y renderizar CaseStudiesSection**

```tsx
// Reemplazar los imports en page.tsx
// Eliminar: import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
// Eliminar: import { ProjectCard } from "@/components/project-card";
// Eliminar: import { projects } from "@/data/projects";
// Agregar:
import { CaseStudiesSection } from "@/components/case-studies";

// En el return de Home(), reemplazar todo el bloque <section id="work"> ... </section> con:
<CaseStudiesSection />
```

**Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "refactor(home): replace bento grid with vertical case studies layout"
```

---

### Task 4: Limpieza de componentes sin uso (Opcional)

**Files:**
- Delete: `src/components/bento-grid.tsx`
- Delete: `src/components/project-card.tsx`

**Step 1: Eliminar archivos**

Usa comandos de eliminación o herramientas del sistema para borrar los archivos.

**Step 2: Commit**

```bash
git rm src/components/bento-grid.tsx src/components/project-card.tsx
git commit -m "chore: remove unused bento grid and project card components"
```
