# Diseño de Portafolio "Bento Grid" Minimalista

**Fecha:** 2026-03-12
**Estado:** Aprobado

## 1. Visión General
Portafolio personal para desarrollador de software con diseño estilo "Bento Grid" (rejilla modular), inspirado en `aayushbharti.in` pero simplificado.
**Objetivo:** Mostrar perfil, stack tecnológico y proyectos de forma directa y visualmente atractiva, sin blog ni páginas de detalle complejas.

## 2. Stack Tecnológico
- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes:** Shadcn UI + Lucide React
- **Animaciones:** Framer Motion
- **Deployment:** Vercel (preparado para)

## 3. Estructura de Contenido (Single Page)

### 3.1. Hero Section (Tarjeta Principal)
- Avatar circular.
- Nombre y Rol (ej. "Pablo - Full Stack Developer").
- Indicador de estado ("Open to Work" / "Building X").
- Breve biografía (2-3 líneas).
- Redes sociales (GitHub, LinkedIn, Email).

### 3.2. Tech Stack (Ticker/Grid)
- Carrusel infinito o grid compacta con iconos de tecnologías.
- Categorías implícitas: Frontend, Backend, Herramientas.

### 3.3. Proyectos Destacados (Bento Cards)
- Grid de tarjetas de diferentes tamaños para dinamismo.
- Cada tarjeta incluye:
    - Imagen de portada / Preview.
    - Título del proyecto.
    - Descripción corta.
    - Badges de tecnologías usadas.
    - **Acción:** Clic en la tarjeta lleva al enlace externo (Demo o Repo).

### 3.4. Experiencia (Timeline Simple)
- Lista vertical minimalista.
- Rol, Empresa, Fechas.

## 4. Diseño Visual & UI
- **Tema:** Dark mode por defecto (típico en dev portfolios), con acentos sutiles.
- **Tipografía:** Sans-serif limpia (Inter o Geist Sans).
- **Layout:** Responsive, mobile-first. Bento grid se adapta a columna única en móvil.

## 5. Gestión de Datos
- **Sin CMS:** Todos los datos (proyectos, experiencia, perfil) estarán en archivos de configuración (ej: `src/config/data.ts`) para fácil edición por parte del desarrollador.

---

# Plan de Implementación

**Goal:** Construir y desplegar la versión 1.0 del portafolio.

## Fase 1: Setup del Proyecto
1.  Inicializar proyecto Next.js 15 + TypeScript + Tailwind.
2.  Configurar estructura de carpetas (`src/components`, `src/app`, `src/lib`, `src/data`).
3.  Instalar dependencias clave: `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`.
4.  Configurar Shadcn UI (init).

## Fase 2: Componentes Base & UI Kit
1.  Crear componentes atómicos: `Button`, `Badge`, `Card` (base para Bento).
2.  Configurar tipografía y colores globales.
3.  Crear componente `BentoGrid` y `BentoItem` para el layout modular.

## Fase 3: Estructura de Datos
1.  Crear `src/data/profile.ts`: Información personal.
2.  Crear `src/data/projects.ts`: Array de objetos con info de proyectos.
3.  Crear `src/data/experience.ts`: Array de experiencia laboral.
4.  Crear `src/data/stack.ts`: Lista de tecnologías e iconos.

## Fase 4: Desarrollo de Secciones
1.  **Hero:** Implementar tarjeta de presentación con foto y redes.
2.  **Stack:** Implementar carrusel/grid de iconos.
3.  **Proyectos:** Implementar grid de proyectos consumiendo `projects.ts`.
    - Lógica de enlace externo al hacer clic.
4.  **Experiencia:** Implementar lista vertical simple.
5.  **Footer:** Copyright simple y créditos.

## Fase 5: Refinamiento & Animaciones
1.  Añadir transiciones de entrada (Framer Motion) a los elementos del grid.
2.  Añadir efectos hover sutiles en las tarjetas.
3.  Verificar responsive en móvil y desktop.

## Fase 6: Preparación para Deploy
1.  Optimización de metadatos (SEO básico).
2.  Linting y revisión final.
