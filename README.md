# Pablo Portfolio

Portfolio personal construido con Next.js (App Router).

## Desarrollo local

Instalar dependencias y levantar el entorno:

```bash
npm install
npm run dev
```

Abrir http://localhost:3000

## Variables de entorno

Copia `.env.example` a `.env.local` y completa lo necesario.

- `LASTFM_API_KEY` y `LASTFM_USERNAME`: usado por `/api/now-playing`
- `RESEND_API_KEY`: usado por el formulario de contacto (server action)
- `CONTACT_TO_EMAIL`: email destino de los mensajes del formulario
- `CONTACT_FROM_EMAIL` (opcional): remitente del email (debe estar verificado en Resend)
- `SITE_URL`: usado por `next-sitemap` para generar `robots.txt` y `sitemap.xml`

## Deploy en Vercel

1. En Vercel, pulsa “Add New…” → “Project” e importa este repositorio.
2. Framework: Next.js (auto-detectado).
3. Configura las variables de entorno del apartado anterior.
4. (Recomendado) Añade `SITE_URL` con tu dominio final.
5. Despliega.

## Build

```bash
npm run build
npm run start
```
