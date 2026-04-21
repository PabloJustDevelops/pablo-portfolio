# Diseño: Remodelación de la página /experience (Timeline editorial limpia)

## Contexto

La página actual `/experience` está implementada como una plantilla con secciones estáticas, iconos decorativos grandes y contenido “placeholder”. El objetivo es reemplazarla por un diseño más editorial, premium y fácil de escanear, manteniendo compatibilidad con móvil.

Archivos relevantes:
- `src/app/experience/page.tsx` (página actual)
- `src/data/experience.ts` (datos actuales, muy mínimos)

## Objetivo

Rediseñar `/experience` con un layout “timeline editorial limpia”:
- En desktop (`md+`): **dos columnas** (meta a la izquierda, contenido a la derecha).
- En mobile: **una columna** (contenido apilado), sin perder jerarquía.
- Cada experiencia debe tener jerarquía clara: rol → empresa/ubicación → periodo → logros → stack.
- Eliminar elementos claramente “template” (iconos gigantes decorativos, secciones hardcodeadas repetitivas y el “Dev Note” placeholder).
- Renderizar desde datos (`src/data/experience.ts`) con estructura escalable (n entradas sin duplicar JSX).

## No objetivos

- No añadir CMS.
- No añadir filtros/búsqueda (se puede considerar después).
- No introducir nuevas dependencias.

## Modelo de datos

Actualizar `src/data/experience.ts` para soportar un formato consistente:

```ts
export type ExperienceItem = {
  role: string;
  company: string;
  period: string; // "2023 — Presente"
  location?: string; // "Remoto · Valencia"
  scope?: string; // "Equipo 4 · B2B SaaS"
  summary?: string; // 1-2 líneas opcionales
  highlights: string[]; // 3-6 bullets orientados a impacto
  stack?: string[]; // 0-8 tags
  links?: Array<{ label: string; href: string }>; // opcional (website, repo, etc.)
};
```

Notas:
- `highlights` es obligatorio (para evitar “párrafos genéricos”).
- `period` se muestra como mono badge/pill.

## Estructura de UI

### Header

- Eyebrow pequeño (ej. “The Journey” o “Experiencia”).
- Título H1: “Work Experience” / “Experiencia Profesional” (mantener consistencia de idioma con el sitio).
- Subtítulo 1 línea máx (enfocado a impacto).
- CTA opcional: “Contactar” o “Descargar CV” si hay link (si no existe, omitir).

### Timeline (lista)

Cada item se renderiza como `section` con `border-b` sutil:

**Desktop (`md:flex-row`)**
- Columna izquierda (`md:w-1/3`):
  - `period` (mono, pequeño)
  - `company` (h2/h3)
  - `location` y `scope` (pequeño, neutral)
- Columna derecha (`md:w-2/3`):
  - `role` (título principal del item)
  - `summary` (si existe)
  - `highlights` como lista de bullets
  - `stack` como chips (reutilizar `Badge` si encaja con el estilo)
  - `links` (si existen) como inline links discretos

**Mobile (columna única)**
- Un bloque único con:
  - `role`
  - `company · period`
  - `location/scope`
  - `highlights` + `stack`

### Timeline visual

Añadir una línea vertical sutil en desktop a nivel de contenedor (no por item) y un marcador por item:
- Línea: `w-px` con `bg-black/5 dark:bg-white/5`
- Marker: círculo pequeño con borde, colocado en el gutter de la izquierda para reforzar “timeline” sin llamar demasiado la atención.

## Estilo y jerarquía

- Evitar “cards” grandes repetitivas: usar fondos planos y bordes sutiles; reservar “elevación” para hover muy ligero (si se mantiene).
- Tipografía:
  - `role`: serif (como el resto del sitio) con tamaño dominante.
  - `company`: serif/sans pero un escalón por debajo.
  - `period`: mono, pequeño, en pill.
- Espaciado vertical generoso, evitando ruido visual.
- Sin iconos decorativos gigantes.

## Accesibilidad y semántica

- Usar `main`, `header`, `section`, `h1/h2/h3` con jerarquía correcta.
- Bullets en `ul/li`.
- Contraste: mantener texto secundario en neutral-500/400 según tema.
- Links con `target="_blank"` solo si salen fuera del sitio; si se usa, añadir `rel="noopener noreferrer"`.

## Criterios de aceptación

- `/experience` renderiza todas las experiencias a partir de `src/data/experience.ts` sin JSX duplicado por rol.
- Desktop: se ve claramente el layout 2 columnas (meta izq, contenido der).
- Mobile: se ve una columna sin roturas y con jerarquía legible.
- No hay secciones hardcodeadas “Role 1/Role 2/Open Source” ni “Dev Note”.
- La página mantiene coherencia visual con el resto del portfolio (fondos, bordes, tipografías, gradientes sutiles si se usan).

## Verificación

- Ejecutar `npm run lint` (sin errores; warnings existentes fuera de esta página pueden permanecer).
- Validación manual:
  - Revisar `/experience` en mobile y desktop (responsive).
  - Confirmar jerarquía (role/empresa/periodo) y lectura rápida (bullets).

