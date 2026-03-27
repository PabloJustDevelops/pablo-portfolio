# Plan de Implementación: Mejoras Portfolio Pablo

**Generado**: 13 de Marzo, 2026
**Complejidad Estimada**: Media-Alta

## Resumen

Este plan detalla las mejoras visuales y funcionales solicitadas para el portfolio, enfocándose en un diseño "Apple-like" más limpio, corrección de alineaciones en el Bento Box, y una experiencia de usuario más original en las secciones de contacto y proyectos.

## Prerrequisitos

- Acceso al repositorio actual (Next.js, Tailwind, Framer Motion).
- Nuevos assets gráficos (imagen para el Hero).
- Definición de las nuevas herramientas para el stack tecnológico.

***

## Sprint 1: Refinamiento del Bento Box y Globe

**Objetivo**: Corregir errores visuales y mejorar la estética del Bento Grid existente.

### Tarea 1.1: Alineación del Globo Terráqueo

- **Ubicación**: `src/components/bento-section.tsx`, `src/components/globe.tsx`
- **Descripción**:
  - Ajustar el posicionamiento CSS (`bottom`, `height`) del contenedor del globo en `bento-section.tsx`.
  - Revisar el componente `globe.tsx` para asegurar que el canvas de `cobe` se renderice centrado y con el tamaño correcto.
  - Asegurar que los marcadores (Madrid, Londres, Paris) coincidan visualmente con el globo rotatorio.
- **Validación**: El globo debe verse centrado y "cortado" estéticamente en la parte inferior de su tarjeta, sin espacios extraños.

### Tarea 1.2: Rediseño del Tech Stack (Visual)

- **Ubicación**: `src/components/bento-section.tsx`, `src/data/stack.ts`
- **Descripción**:
  - Mantener las herramientas actuales (Next.js, React, TS, etc.).
  - Rediseñar visualmente los badges/iconos para que sean más modernos y legibles.
  - Mejorar la animación del Marquee o cambiar la disposición a un Grid más limpio.

### Tarea 1.3: Efectos Visuales y Diseño Bento

- **Ubicación**: `src/components/bento-section.tsx`
- **Descripción**:
  - Añadir efectos de "glow" o bordes iluminados al hacer hover en las tarjetas del Bento.
  - Mejorar la tipografía y espaciado para que respire más el contenido.

***

## Sprint 2: Rediseño Hero (Estilo Apple)

**Objetivo**: Crear una primera impresión impactante con un diseño minimalista y de alta calidad.

### Tarea 2.1: Nueva Estructura Hero

- **Ubicación**: `src/components/hero.tsx`
- **Descripción**:
  - Implementar un diseño centrado con tipografía grande (San Francisco o similar sans-serif limpia).
  - Usar gradientes sutiles de texto y fondos oscuros profundos.
  - Añadir animaciones de entrada suaves y escalonadas (staggered) con `framer-motion`.

### Tarea 2.2: Nueva Imagen/Efecto Hero

- **Ubicación**: `src/components/hero.tsx`, `public/`
- **Descripción**:
  - Reemplazar `hero-horizon.png` con una imagen de mayor calidad o un efecto generado por código (ej. Three.js o gradientes complejos animados).
  - Integrar la imagen de forma orgánica con el fondo (masks, blurs).

***

## Sprint 3: Proyectos y Contacto Original

**Objetivo**: Mejorar la interactividad y originalidad de las secciones finales.

### Tarea 3.1: Rediseño Sección Proyectos

- **Ubicación**: `src/components/project-card.tsx`, `src/app/page.tsx`
- **Descripción**:
  - Rediseñar `ProjectCard` para mostrar más información al hacer hover (tecnologías, descripción corta).
  - Añadir efecto de "tilt" o paralaje en las tarjetas.
  - Mejorar la calidad de las imágenes de preview (o los placeholders).

### Tarea 3.2: Formulario de Contacto Conversacional

- **Ubicación**: `src/components/contact-form.tsx`, `src/components/contact-section.tsx`
- **Descripción**:
  - Implementar un formulario estilo chat/conversación.
  - El usuario irá respondiendo preguntas una a una (Nombre, Email, Mensaje).
  - Añadir animaciones de "escribiendo..." y transiciones suaves entre pasos.
  - Mejorar la experiencia en móvil.

***

## Estrategia de Testing

- Verificar responsividad en Móvil, Tablet y Desktop para cada cambio.
- Comprobar que las animaciones no afecten el rendimiento (Lighthouse score).
- Validar el envío del formulario de contacto.

## Riesgos Potenciales

- El rendimiento del Globo (`cobe`) puede ser pesado en móviles antiguos.
- El estilo "Apple" requiere un ajuste muy fino de tipografía y espacios; si no se hace bien, puede parecer "vacío".

<br />

Repo basad en --> <https://aayushbharti.in/>
