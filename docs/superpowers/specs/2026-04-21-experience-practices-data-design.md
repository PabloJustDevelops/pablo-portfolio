# Diseño: Datos reales de prácticas en /experience (2024–2026)

## Objetivo

Reemplazar el contenido placeholder de `src/data/experience.ts` por 3 entradas reales correspondientes a prácticas en 2024, 2025 y 2026, manteniendo el diseño Index+Detail de `/experience`.

## Alcance

- Actualizar únicamente el array `experience` y normalizar el campo `period`.
- No añadir links externos.
- No cambiar UI ni estilos.

## Formato de datos

Se mantiene el tipo existente:

- `id` (string único)
- `role`, `company`, `period`
- `location`, `scope`, `summary`
- `impact` (KPIs cualitativos, sin números inventados)
- `highlights` (3–6 bullets)
- `stack` (tecnologías)
- `links` (no se usa en estas entradas)

### Formato `period` elegido

`Mar 2026 — Jun 2026` (mes + año, estilo CV).

## Contenido a cargar

### 2026 — Agrisat S.L

- Rol: Full Stack Developer
- Contexto: GIS con Angular + TypeScript + OpenLayers
- Impacto: menor carga inicial del visor, activación de capas más rápida, menos bugs

### 2025 — Construcción y Reformas HG

- Rol: Web Developer
- Contexto: web corporativa end-to-end con React/Next.js, SEO, performance, hosting en Vercel
- Formulario: solo contacto

### 2024 — Casa de la Cultura José Saramago

- Rol: Técnico Informático
- Contexto: soporte IT + administración básica (Windows Server y Linux), VNC, Kaspersky centralizado

## Criterios de aceptación

- `/experience` muestra 3 entradas reales.
- `period` usa mes+año (sin días).
- No hay URLs externas en `links`.
- `npm run build` finaliza correctamente.

