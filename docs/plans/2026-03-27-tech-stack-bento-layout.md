# Tech Stack Bento Layout Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fijar el mockup “mini web” al fondo de la card Tech Stack y mostrar 3 filas reales de chips con más tecnologías distintas.

**Architecture:** Mantener la card como `flex flex-col h-full` y mover el mockup al flujo del layout para que el área de chips use `flex-1` y empuje el mockup al borde inferior. Ampliar la fuente de datos `stack` y repartirla en 3 tramos para 3 marquesinas distintas.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS.

---

### Task 1: Ajustar layout de la card Tech Stack

**Files:**
- Modify: `src/components/bento-section.tsx`

**Step 1: Preparar el contenedor para distribución vertical**
- Asegurar `h-full` en la card Tech Stack (wrapper e inner).
- Convertir el mockup de `absolute bottom-0` a un bloque en flujo.
- Quitar reservas artificiales de espacio (`mb-20`) y usar `flex-1 min-h-0` en el contenedor de chips.

**Step 2: Verificar visualmente**
- Abrir la home y comprobar que el mockup queda pegado al fondo en móvil/tablet/desktop.
- Confirmar que no hay overflow horizontal.

---

### Task 2: Renderizar 3 filas de chips “reales”

**Files:**
- Modify: `src/components/bento-section.tsx`

**Step 1: Repartir `stack` en 3 tramos**
- Usar slices no solapados (ej. 0–10, 10–20, 20–30) para que cada fila muestre tecnologías distintas.
- Mantener el efecto marquee y alternar `reverse` para variedad.

**Step 2: Verificar**
- Confirmar que se ven 3 filas de chips (no repetidas) en resoluciones comunes.

---

### Task 3: Ampliar el catálogo de tecnologías

**Files:**
- Modify: `src/data/stack.ts`

**Step 1: Añadir tecnologías coherentes**
- Mantener: Git, Tailwind CSS, Next.js, Node.js, TypeScript, React.
- Añadir: tooling (ESLint, Prettier), build (Vite), test (Jest, Vitest, Playwright), deploy (Vercel, GitHub Actions), backend (PostgreSQL, Prisma, Supabase), librerías del proyecto (Zod, Resend, React Hook Form, React Query, Framer Motion, GSAP, Three.js, shadcn/ui, Radix UI, Docker).

**Step 2: Verificar tipado**
- Ejecutar `npx tsc --noEmit` y confirmar que no hay imports inválidos.

---

### Task 4: Validación final

**Files:**
- None

**Step 1: Build**
- Ejecutar `npm run build` y confirmar build exitoso.

**Step 2: Capturas**
- Capturar móvil/tablet/desktop para comprobar anclaje inferior del mockup y grid responsivo.

