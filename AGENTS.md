# AGENTS.md — Pablo Portfolio

Guía de referencia para agentes de IA que trabajan en este proyecto.

## Proyecto

Portfolio personal de **Pablo Rodríguez Garijo** — Full Stack Developer.
Desplegado en Vercel: `https://pablo-portfolio.vercel.app`
Repositorio: `https://github.com/PabloJustDevelops/pablo-portfolio`

## Stack Técnico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router, Turbopack, React Compiler) |
| Lenguaje | TypeScript (strict mode) |
| UI | React 19, Tailwind CSS v4, shadcn/ui (base-nova) |
| Animaciones | GSAP, canvas-confetti, tw-animate-css |
| 3D | Three.js + @react-three/fiber + @react-three/drei + cobe (globo) |
| Formularios | react-hook-form + zod + @hookform/resolvers |
| Email | Resend (server actions) |
| Iconos | lucide-react, react-icons, country-flag-icons |
| Tema | next-themes (dark por defecto) |
| SEO | next-sitemap (postbuild) |
| Analytics | @vercel/analytics |
| Deploy | Vercel |

## Comandos

```bash
npm run dev       # Servidor de desarrollo (Turbopack)
npm run build     # Build de producción + sitemap
npm run lint      # ESLint (core-web-vitals + typescript)
npm run start     # Servidor de producción local
```

## Estructura de Directorios

```
src/
├── app/
│   ├── actions/          # Server Actions (send-email)
│   ├── api/              # API Routes (now-playing → Last.fm)
│   ├── education/        # Página /education
│   ├── experience/       # Página /experience
│   ├── uses/             # Página /uses
│   ├── globals.css       # Estilos globales + Tailwind
│   ├── layout.tsx        # Layout raíz (fuentes, ThemeProvider, Navbar, Toaster)
│   └── page.tsx          # Home (Hero → Bento → CaseStudies → AboutMe → Contact)
├── components/
│   ├── ui/               # Componentes shadcn/ui (badge, button, card, form, input…)
│   ├── about-me.tsx
│   ├── bento-section.tsx
│   ├── case-studies.tsx
│   ├── contact-form.tsx
│   ├── contact-modal.tsx
│   ├── contact-section.tsx
│   ├── custom-cursor.tsx
│   ├── education-timeline.tsx
│   ├── experience-timeline.tsx
│   ├── experience.tsx
│   ├── globe.tsx
│   ├── hero.tsx
│   ├── logo.tsx
│   ├── navbar.tsx
│   ├── status-bento.tsx
│   ├── tech-stack.tsx
│   └── theme-provider.tsx
├── data/
│   ├── education.ts      # Datos de formación (EducationItem[])
│   ├── experience.ts     # Datos de experiencia laboral (ExperienceItem[])
│   ├── profile.ts        # Datos personales (nombre, rol, bio, social, status)
│   ├── projects.ts       # Datos de proyectos/case studies
│   └── stack.ts          # Datos del tech stack
└── lib/
    ├── schemas.ts        # Esquemas Zod (contactFormSchema)
    └── utils.ts          # Utilidad cn() (clsx + tailwind-merge)
```

## Convenciones

### Idioma
- **Código**: variables y funciones en inglés (siguiendo el código base existente).
- **Comentarios y documentación**: en español.
- **Logs y mensajes de usuario**: en español.
- **Contenido visible** (textos de la web): en español o bilingüe según el contexto.

### Estilo de código
- Path alias `@/` → `./src/`.
- Componentes cliente: marcar con `"use client"` al inicio.
- Server Actions: marcar con `"use server"`.
- Utilizar `cn()` de `@/lib/utils` para composición de clases.
- Componentes UI base en `src/components/ui/` (shadcn/ui) — no modificar directamente, usar `npx shadcn@latest add` para añadir nuevos.
- Tipos de datos en el mismo archivo que los datos (ej: `ExperienceItem` en `data/experience.ts`).

### Patrones de diseño
- **Páginas de detalle** (experience, education): layout con header centrado, grid con bordes laterales (`border-x`), índice sticky lateral en desktop, nav horizontal en mobile, `ContactSection` al final.
- **Timeline**: componente cliente con `IntersectionObserver` para resaltar la sección activa, cards con badges, impact metrics, highlights y stack.
- **Home**: secciones apiladas verticalmente dentro de un contenedor `max-w-6xl` con bordes laterales.
- **Fondos**: efectos ambient con divs blur (`blur-[120px]`) + noise overlay.
- **Colores por sección**: Experience → blue/cyan/teal, Education → indigo/purple/fuchsia, Home → neutros.

### Datos
- Toda la información personal y profesional está en `src/data/`.
- Para añadir nuevas entradas: crear el tipo en el archivo de datos y seguir la estructura existente.
- `profile.ts` contiene nombre, rol, bio, redes y estado.

## Variables de Entorno

Definidas en `.env.example`:
- `SITE_URL` — URL del sitio para sitemap
- `LASTFM_API_KEY` / `LASTFM_USERNAME` — API de Last.fm (now-playing)
- `RESEND_API_KEY` — API key de Resend para envío de emails
- `CONTACT_TO_EMAIL` — Email de destino del formulario de contacto
- `CONTACT_FROM_EMAIL` — Email remitente (dominio verificado en Resend)

**Nunca** commitar `.env` ni secrets. Usar Vercel Env Variables para producción.

## API Routes

### `GET /api/now-playing`
Devuelve la canción actual de Last.fm. Requiere `LASTFM_API_KEY` y `LASTFM_USERNAME`.
Respuesta: `{ title, artist, album, url, image, isPlaying }`.

## Server Actions

### `sendEmail(data: ContactFormValues)`
Envía un email vía Resend. Valida con `contactFormSchema` (zod).
En desarrollo sin API key, simula el envío.

## Deploy (Vercel)

- Framework preset: Next.js
- Build command: `next build` (postbuild genera sitemap)
- React Compiler habilitado (`reactCompiler: true` en next.config.ts)
- Imágenes: SVG permitido, remote patterns configurados en `next.config.ts`

## Notas Importantes

- El tema por defecto es **dark**. Los estilos deben probarse siempre en dark mode.
- `suppressHydrationWarning` en `<html>` es necesario por next-themes.
- El componente `StatusBento` usa `Math.random()` para actividad — genera hydration warnings esperados.
- El globo 3D usa `cobe` (canvas) y `react-globe.gl` (WebGL) — pueden requerir `"use client"` y lazy loading.
- `next-sitemap` se ejecuta en postbuild — los archivos `robots.txt` y `sitemap*.xml` se generan en `/public` y están en `.gitignore`.
