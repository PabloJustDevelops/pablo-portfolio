# Diseño: Header de proyectos apilado (Case Studies)

## Contexto

La sección de proyectos (Case Studies) usa un layout tipo “sticky stack” en desktop (`lg:sticky`, `lg:h-screen`, z-index incremental) y una animación con GSAP/ScrollTrigger que modifica `scale` y `opacity` al hacer scroll.

El bloque superior con metadatos por proyecto (número + categoría + periodo) debe quedar fuera de la tarjeta, pero cuando las tarjetas se apilan/encogen debe quedar visualmente asociado a su tarjeta correspondiente (sin sobresalir ni mezclarse con otros headers).

Archivo principal:
- `src/components/case-studies.tsx`

## Objetivo

Cuando un proyecto “se cierra” (se apila/encoge por efecto de scroll):
- El header `03 — BACKEND | Q2 2025` debe quedar justo encima de su propia tarjeta.
- Debe escalar junto con su tarjeta (opción A).
- Debe mantenerse legible (no perder contraste por la animación de opacidad).

## Estado actual (problema)

- El header puede quedar visualmente fuera de su tarjeta al apilarse, porque el elemento que escala y el elemento que contiene el header no están en el mismo árbol transformado.
- La animación de opacidad puede afectar a elementos que deberían mantenerse legibles, dependiendo de dónde esté aplicado el `ref` animado.

## Enfoque recomendado

### Estructura de DOM

Crear un contenedor común para “header + card”:
- `stackRef` (contenedor animado con `scale`)
  - `metaHeader` (fuera de la tarjeta; se ve por encima)
  - `cardLink` / `card` (la tarjeta actual)
    - `cardBodyRef` (solo contenido que baja a `opacity: 0.3`)

Esto garantiza que:
- El header está fuera de la tarjeta (cumple requisito).
- El header escala junto con la tarjeta, porque ambos cuelgan del mismo contenedor con `transform`.
- La opacidad baja solo en el contenido de la tarjeta, manteniendo el header legible.

### Animación (GSAP)

- `scale` sobre `stackRef` (incluye header + tarjeta).
- `opacity` sobre `cardBodyRef` únicamente.

## Criterios de aceptación

- En desktop (`lg:`), cuando se hace scroll y los proyectos se apilan:
  - El header de cada proyecto queda justo encima de su tarjeta correspondiente.
  - El header no se queda “flotando” en la parte superior del stack ni se mezcla con los demás.
  - El header escala con el mismo factor que su tarjeta.
  - El header mantiene legibilidad (sin caer a `opacity: 0.3`).
- En mobile, no se rompe el layout: se mantiene el header inline existente o equivalente.

## Riesgos y mitigaciones

- Solapes visuales entre headers si el margen superior (`marginTop: index * 30px`) no alcanza.
  - Mitigar con spacing consistente (p. ej., `gap` o `mt` del header) y/o ajustar el offset existente.
- `transform` en contenedor puede afectar a `position: sticky` o stacking context.
  - Mitigar manteniendo `transform` solo en el subárbol del card (no en el wrapper sticky del item).

## Verificación

- Validación manual en `#work`:
  - Scroll lento observando el estado “cerrado/apilado” en 2º y 3º proyecto.
  - Comprobar que el header `03 — BACKEND | Q2 2025` queda justo encima de la tarjeta verde y escala con ella.

