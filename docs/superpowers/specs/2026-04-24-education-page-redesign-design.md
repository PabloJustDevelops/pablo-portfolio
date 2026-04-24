# Diseño: Rediseño de la página /education (Bento + Timeline)

## Contexto

La página actual `/education` mezcla un layout “bento” con contenido hardcodeado y textos placeholder (incluye un “Dev Note”). Además, su estructura visual no está alineada con el patrón editorial del sitio (contenedor con `border-x`, header consistente, secciones reutilizables) que sí aparece en páginas como `/experience`.

Archivos relevantes:
- `src/app/education/page.tsx` (página actual)
- `src/app/experience/page.tsx` (referencia de estilo/layout)
- `src/data/*` (datos del sitio; se añadirá `education.ts`)

## Objetivo

Rediseñar `/education` con estructura híbrida (impacto visual + lectura rápida + profundidad):
- Header en español, consistente con el resto del sitio.
- Bloque superior “bento” con 3 destacados:
  - Formación principal (DAM).
  - Proyecto destacado del ciclo (TravelPal).
  - Actualmente aprendiendo (editable).
- Timeline inferior con la formación completa (DAM + SMR).
- Datos reales del usuario, sin plantilla ni textos genéricos.
- Preparar el terreno para añadir certificaciones en el futuro (sin mostrar secciones vacías hoy).

## No objetivos

- No añadir CMS.
- No añadir mapas o integraciones de terceros para TravelPal.
- No introducir nuevas dependencias.

## Modelo de datos

Crear `src/data/education.ts` con un modelo estable y escalable:

```ts
export type EducationTag = string;

export type EducationLink = {
  label: string;
  href: string;
};

export type EducationItem = {
  id: string;
  title: string;
  center: string;
  location: string;
  period: string; // "2024 — 2026"
  summary?: string;
  highlights?: string[];
  tags?: EducationTag[];
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

Notas:
- `certifications` existe pero se renderiza solo si contiene elementos.
- `timeline` incluye DAM y SMR (y se podrá ampliar sin duplicar JSX).

## Contenido real (inicial)

Formación:
- DAM: “Grado Superior — Desarrollo de Aplicaciones Multiplataforma (DAM)”, IES Leonardo Da Vinci, Albacete (España), “2024 — 2026”.
- SMR: “FP Grado Medio — Sistemas Microinformáticos y Redes (SMR)”, IES Leonardo Da Vinci, Albacete (España), “2022 — 2024”.

Proyecto:
- TravelPal: app web para organizar viajes con itinerario, notas, checklist/tareas, presupuesto/gastos y adjuntos; Supabase (auth + BDD) y despliegue en Vercel; sin mapa por limitación de API.

Actualmente aprendiendo (placeholders editables):
- Arquitectura, Testing, OpenLayers/GIS, React Native, CI/CD, Seguridad, Backend con Node.

## Estructura de UI

### Layout general

- Mantener coherencia con el site:
  - `main` con fondo neutral y selección consistente.
  - Contenedor `max-w-6xl mx-auto border-x ...` como en `/experience`.
  - Separadores con `border-black/5 dark:border-white/5`.

### Header

- Eyebrow pequeño en mayúsculas (ej. “Educación”).
- Título H1: “Education” o “Educación” (se recomienda “Educación” para consistencia con el contenido).
- Subtítulo 1 línea: enfoque a formación y aprendizaje continuo.

### Bloque superior (bento)

Grid responsive (1 columna en mobile, 12 columnas en desktop):
- Card 1 (principal): DAM (periodo, título, centro, resumen corto, tags).
- Card 2: TravelPal (descripción + stack + 2–4 notas en bullets).
- Card 3: Actualmente aprendiendo (lista corta de topics con chips).

Reglas:
- No mostrar “Dev Note”.
- Evitar iconografía decorativa gigante; si se usan iconos, que sean pequeños y funcionales.
- Hover sutil (border/opacity), sin animaciones agresivas.

### Timeline inferior

Lista vertical en secciones (estilo editorial), similar a `/experience`:
- Desktop: dos columnas (meta a la izquierda: periodo/centro; contenido a la derecha: título/resumen/highlights/tags).
- Mobile: una columna (título arriba, meta debajo, luego highlights/tags).

Items iniciales:
- DAM (con enfoque amplio: backend/datos, UI, Android, calidad, Agile).
- SMR (redes + sistemas + soporte + seguridad + antivirus).

### Certificaciones (futuro)

Si `certifications.length > 0`, renderizar bloque simple (lista compacta con nombre, emisor, fecha, link). Si está vacío/undefined, no renderizar.

## Accesibilidad y semántica

- `main`, `header`, `section`, `h1/h2/h3` con jerarquía correcta.
- Bullets en `ul/li`.
- Links externos con `rel="noopener noreferrer"` y `target="_blank"` solo cuando aplique.

## Criterios de aceptación

- `/education` deja de tener contenido hardcodeado/placeholder y renderiza desde `src/data/education.ts`.
- Layout coherente con `/experience` (contenedor con `border-x`, header consistente y espaciado editorial).
- Bloque superior incluye DAM + TravelPal + Actualmente aprendiendo.
- Timeline inferior muestra DAM y SMR con jerarquía clara.
- La sección de certificaciones no aparece si no hay datos.

## Verificación

- Ejecutar `npm run lint` (sin errores nuevos introducidos).
- Validación manual:
  - Revisar `/education` en mobile y desktop.
  - Confirmar que no queda ningún “Dev Note” o texto placeholder.
  - Confirmar contraste y legibilidad en dark/light.

