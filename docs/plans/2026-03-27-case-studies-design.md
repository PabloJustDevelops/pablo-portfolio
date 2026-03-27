# Case Studies Design

## Overview
Replicar la sección "Curated work" de la web de Aayush Bharti usando un diseño de lista vertical en lugar de la actual BentoGrid, manteniendo una jerarquía visual idéntica y animaciones de scroll suaves con `framer-motion`.

## Estructura de Datos (`src/data/projects.ts`)
Se actualizará el modelo de datos de los proyectos para soportar los nuevos campos visuales:
- `category` (ej. "WEB APP", "MOBILE APP")
- `period` (ej. "Q4 2024")
- `accentColor` (clase CSS o hex para el fondo de la tarjeta)
- Soporte para iconos en los tags (opcional/mapeado).

## Componentes Nuevos
1. **`CaseStudiesSection`**: Contenedor principal que reemplaza el bloque `#work` actual en `page.tsx`. Incluirá el header de la sección.
2. **`CaseStudyItem`**: Componente individual para cada proyecto que renderizará:
   - Fila superior: Índice (01) + Línea separadora + Categoría (WEB APP) alineado a la izquierda, y Periodo (Q4 2024) a la derecha.
   - Título principal en tipografía Serif.
   - Tarjeta principal con color de acento, texto descriptivo, flecha indicadora y la imagen del proyecto.
   - Lista de tags interactivos en la parte inferior.

## Animaciones (`framer-motion`)
- **Scroll Reveal**: Uso de `whileInView` para animar la opacidad y posición Y de cada `CaseStudyItem` al entrar en pantalla.
- **Hover States**: 
  - Ligero escalado de la imagen interna de la tarjeta.
  - Movimiento horizontal/opacidad de la flecha indicadora.
- **Accesibilidad**: Uso de `useReducedMotion` para desactivar animaciones si el usuario lo prefiere.

## Integración
- Modificar `src/app/page.tsx` para importar y usar `<CaseStudiesSection />` en lugar de `<BentoGrid>`.
- Eliminar o depreciar `ProjectCard` y `BentoGrid` si no se usan en otras partes de la app.