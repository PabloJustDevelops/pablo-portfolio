# Diseño: /experience con timeline central animado (A + M1)

## Contexto

Queremos que `/experience` deje de ser un listado editorial “estático” y se convierta en una experiencia más gráfica: un timeline vertical con progreso y un punto/halo que se mueve **continuo pixel a pixel** conforme haces scroll, indicando visualmente la trayectoria profesional.

Stack existente relevante:
- Next.js (App Router)
- Tailwind CSS
- GSAP + ScrollTrigger (ya usado en otras secciones)

Archivos actuales relacionados:
- `src/app/experience/page.tsx`
- `src/data/experience.ts` (ya contiene `ExperienceItem` con `highlights`, `stack`, etc.)

## Objetivo

Implementar un timeline animado estilo “capítulos”:
- Desktop (`md+`): layout 3 columnas (meta izquierda, timeline central sticky, contenido derecha).
- Mobile (M1): timeline compacto dentro de la lista (rail fino a la izquierda), manteniendo progreso/halo pero más discreto.
- Halo (punto) se mueve **continuo** (no por saltos).
- Progreso (línea rellena) crece con el scroll.
- Capítulo activo cambia jerarquía (contraste) y el contenido puede tener reveal sutil.
- Respetar `prefers-reduced-motion`.

## No objetivos

- No introducir nuevas dependencias.
- No implementar scroll-snap obligatorio.
- No añadir CMS/filtros.

## Modelo de datos (se mantiene)

Se reutiliza `ExperienceItem`:

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
```

## Estructura UI (desktop)

### Concepto de “capítulos”

Cada experiencia es un “capítulo” con altura suficiente para que se perciba el avance:
- `min-height`: ~`80vh`–`100vh` (según densidad de contenido).
- El scroll total de la sección controla el progreso global del timeline.

### Layout 3 columnas

Contenedor principal:
- `relative`
- `max-w-6xl mx-auto`
- `border-x` sutil como el resto del site.

Grid:
- `md:grid md:grid-cols-[1fr_80px_1.6fr]` (aprox.)
  - **Col 1 (meta):** fecha, empresa, ubicación, scope.
  - **Col 2 (timeline):** rail + progreso + halo.
  - **Col 3 (contenido):** rol, summary, highlights, stack, links.

### Timeline central sticky (columna 2)

Timeline en viewport:
- Wrapper: `md:sticky md:top-0 md:h-screen` (o `top` con offset si hay header fijo).
- Dentro, un rail con altura visible (ej. `h-[70vh]` centrado verticalmente).

Elementos del timeline:
- Rail (base): `w-px`, color neutro `bg-black/10 dark:bg-white/10`.
- Progreso (overlay): `w-px`, gradiente sutil (azul→cian→teal), transform `scaleY`.
- Halo:
  - Punto: círculo pequeño (`w-3 h-3`) con borde.
  - Halo: `blur`/glow suave con opacidad baja para no distraer.

## Animación (desktop)

### Progreso global continuo

Se define un `ScrollTrigger` para la sección completa (contenedor de capítulos):
- `start: "top top"`
- `end: "bottom bottom"` (o equivalente con margen para que el progreso llegue al final cuando el último capítulo está en foco).
- `scrub: true`

Con `progress` (0→1):
- `progressLine.scaleY = progress` con `transformOrigin: "top center"`.
- `halo.translateY = progress * (railHeight - haloHeight)` para movimiento pixel a pixel.

Mediciones:
- `railHeight` se obtiene con `getBoundingClientRect()` al iniciar y en `resize`.
- Recalcular en `ScrollTrigger.refresh()`.

### Capítulo activo (solo estilo)

Se calcula el índice activo:
- Por proximidad del capítulo al centro del viewport o por rangos de scroll.
- Al cambiar, se actualiza estado (React) para:
  - aumentar contraste del meta y role del capítulo activo
  - bajar ligeramente contraste de capítulos no activos

### Reveal sutil del contenido (opcional)

Para el capítulo activo:
- entrar con `opacity`/`y` suave (sin overshoot) en:
  - título rol
  - bullets
  - stack tags

Si `prefers-reduced-motion`:
- desactivar timeline (sin movimiento) y sin reveal; solo estilos estáticos.

## Mobile (M1)

En mobile se evita una columna central, pero se mantiene la narrativa:
- Lista 1 columna.
- Cada item lleva un rail fino a la izquierda (`border-l` o `w-px`), con:
  - progreso dentro del propio item (mini)
  - halo alineado al inicio del item y desplazándose proporcionalmente al scroll global (o, alternativa simplificada: progreso por item cuando el item está visible).

Recomendación de implementación (robusta y simple):
- Mantener un **progreso global** también en mobile, pero renderizado como:
  - un rail a la izquierda del contenedor total (no por item)
  - y un halo que se mueve dentro de ese rail.
- Los items simplemente tienen padding-left (gutter) para dejar espacio al rail.

Visual mobile:
- Rail: `left: 20px` fijo dentro del contenedor.
- Halo: tamaño un poco menor, glow más sutil.

## Accesibilidad y performance

- Respetar `prefers-reduced-motion`.
- Evitar animar propiedades caras:
  - usar transforms (`translateY`, `scaleY`) en lugar de `top/height`.
- Recalcular medidas en `resize` + `ScrollTrigger.refresh()`.
- Semántica:
  - `main` / `header` / `section`
  - `ul/li` para highlights

## Criterios de aceptación

- Desktop:
  - Timeline central sticky visible con rail + progreso + halo.
  - Progreso y halo se mueven **continuo** con el scroll.
  - Se distingue el capítulo activo (contraste/jerarquía) mientras haces scroll.
- Mobile (M1):
  - Timeline visible y discreto (rail + progreso + halo) sin romper layout.
  - Contenido se lee bien en 1 columna.
- Reduced motion:
  - Sin animaciones de timeline ni reveals.
- Build:
  - `npx tsc --noEmit` sin errores de tipos
  - `npm run lint` sin errores (warnings existentes fuera de scope pueden permanecer)

## Verificación manual sugerida

- Desktop: scroll lento por `/experience`, confirmar que halo recorre toda la altura del rail y el progreso rellena correctamente.
- Mobile: confirmar que el rail no se solapa con texto y que el halo no tapa el contenido.

