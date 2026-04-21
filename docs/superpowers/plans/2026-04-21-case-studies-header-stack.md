# Case Studies Header Stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hacer que el header (número + categoría + periodo) quede fuera de la tarjeta pero se apile y escale junto a su tarjeta en el “sticky stack” de Case Studies.

**Architecture:** Mover el header desktop fuera del card y agruparlo con la tarjeta dentro de un contenedor común que recibe el `scale` de GSAP. Aplicar `opacity` solo al cuerpo del card.

**Tech Stack:** Next.js (React), Tailwind CSS, GSAP + ScrollTrigger

---

## Cambios previstos (mapa de archivos)

- Modificar: `src/components/case-studies.tsx`
- Verificación manual: sección `#work` en desktop (scroll / estado apilado)

### Task 1: Reestructurar DOM para que el header sea “hermano” del card y escale junto a él

**Files:**
- Modify: `src/components/case-studies.tsx`

- [ ] **Step 1: Actualizar refs (renombrar el contenedor escalado)**

En `CaseStudyItem`, cambiar los refs para tener:
- `stackRef`: contenedor que incluye header + card y recibe el `scale`
- `cardBodyRef`: contenedor interno del card que recibe `opacity`

Código:

```tsx
const containerRef = useRef<HTMLDivElement>(null);
const stackRef = useRef<HTMLDivElement>(null);
const cardBodyRef = useRef<HTMLDivElement>(null);
```

- [ ] **Step 2: Volver a colocar el header de desktop fuera de la tarjeta**

Dentro del “Left Side”, envolver `header + Link(card)` en `stackRef` y colocar el header antes del Link:

```tsx
<div ref={stackRef}>
  <div className="hidden lg:flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-500 mb-4 px-2">
    <div className="flex items-center gap-4">
      <span>{(index + 1).toString().padStart(2, "0")}</span>
      <div className="h-px w-12 bg-neutral-800" />
      <span className="uppercase tracking-widest">{project.category}</span>
    </div>
    <span className="rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1 bg-neutral-900/50">
      {project.period}
    </span>
  </div>

  <Link
    href={project.link}
    target="_blank"
    className="group block w-full shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-[2rem]"
  >
    <div className={`relative overflow-hidden rounded-[2rem] pt-8 px-8 md:pt-12 md:px-12 ${project.accentColor} transition-transform duration-300 ring-1 ring-black/10 dark:ring-white/10 h-[45vh] lg:h-[60vh] flex flex-col`}>
      <div ref={cardBodyRef} className="flex flex-col flex-1">
        {/* contenido actual del card (texto + flecha + imagen) */}
      </div>
    </div>
  </Link>
</div>
```

Nota: mantener el header mobile (`lg:hidden`) en el panel derecho tal cual.

- [ ] **Step 3: Reubicar el contenido actual dentro de `cardBodyRef`**

Mover el bloque actual:
- texto (`project.cardText`) + `ArrowRight`
- preview / imagen (`project.image`)

para que queden dentro de:

```tsx
<div ref={cardBodyRef} className="flex flex-col flex-1">
  {/* ... */}
</div>
```

### Task 2: Ajustar la animación GSAP para escalar el conjunto (header + card) y bajar opacidad solo del cuerpo del card

**Files:**
- Modify: `src/components/case-studies.tsx`

- [ ] **Step 1: Cambiar el target de `scale` a `stackRef`**

Actualizar el `useGSAP` para usar `stackRef` como elemento escalado:

```tsx
if (!prefersReducedMotion && stackRef.current && cardBodyRef.current && containerRef.current) {
  const targetScale = 1 - (totalProjects - index) * 0.05;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    defaults: { ease: "none" },
  });

  tl.to(stackRef.current, { scale: targetScale, transformOrigin: "top center" }, 0);
  tl.to(cardBodyRef.current, { opacity: 0.3 }, 0);
}
```

- [ ] **Step 2: Eliminar referencias antiguas (`cardRef`) si ya no se usan**

Si existe `cardRef` en el componente, eliminarlo para evitar refs/variables muertas.

### Task 3: Verificación manual de apilado (desktop)

- [ ] **Step 1: Ejecutar lint**

Run:

```bash
npm run lint
```

Expected: sin errores (warnings existentes pueden permanecer).

- [ ] **Step 2: Ejecutar dev server**

Run:

```bash
npm run dev -- --port 3000
```

- [ ] **Step 3: Validar comportamiento en `#work`**

Checklist visual:
- Al hacer scroll y entrar en el estado “cerrado/apilado”, el header `03 — BACKEND | Q2 2025` queda justo encima de la tarjeta correspondiente (verde) y no sobresale “suelto”.
- El header escala junto con la tarjeta.
- El cuerpo del card pierde opacidad, pero el header mantiene legibilidad.

