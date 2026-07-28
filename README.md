# Alexanyer Naranjo · Portafolio

Portafolio personal de desarrollo Front-End, construido sobre un sistema de marca propio: minimalismo funcional, azul iOS `#0071E3` como único acento, chips de tecnología y cuadrícula de puntos como firmas visuales.

## Stack

- **React 19 + TypeScript** (Vite)
- **Tailwind CSS v4** — tokens de diseño derivados del manual de marca en `src/index.css`
- **Motion** (framer-motion) — animaciones de entrada, scroll reveals, filtros con layout animation y lightbox; respeta `prefers-reduced-motion`
- **react-i18next** — español (por defecto) e inglés, con detección de idioma y persistencia
- **Modo claro/oscuro** — respeta `prefers-color-scheme`, persistente, sin destello inicial (se puede forzar con `?theme=light|dark`)

## Scripts

```bash
npm install
npm run dev       # desarrollo
npm run build     # type-check + build de producción
npm run preview   # sirve el build
```

## CV (ATS-friendly)

El CV descargable vive en `public/cv-alexanyer-naranjo.pdf` y se genera desde `cv/cv-es.html`
(una columna, texto extraíble, sin tablas ni gráficos — optimizado para filtros ATS).
Para editarlo: modifica el HTML y ejecuta `node cv/generate.mjs`.

## SEO

- Metadatos completos, Open Graph y Twitter Cards en `index.html`; título/descripción se sincronizan con el idioma activo (`src/seo.ts`).
- Datos estructurados Schema.org (`ProfilePage` + `Person` + `WebSite`) en JSON-LD.
- `public/og.png` (1200×630), `robots.txt`, `sitemap.xml`, `site.webmanifest`, `apple-touch-icon.png`.
- URL oficial: `https://alexanyer-naranjo.vercel.app` (si algún día cambia el dominio, actualízalo en `index.html`, `public/robots.txt`, `public/sitemap.xml` y `cv/cv-es.html`, y regenera el CV).

## Formulario de contacto (EmailJS)

1. Crea una cuenta en [EmailJS](https://dashboard.emailjs.com) y añade un **Email Service** (Gmail, etc.).
2. Crea un **Email Template** y pega el contenido de [`emailjs-template.html`](./emailjs-template.html) en el editor de código. Asunto sugerido: `Nuevo mensaje de {{from_name}} · Portafolio`.
3. Copia `.env.example` a `.env` y completa `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` y `VITE_EMAILJS_PUBLIC_KEY`.

Sin esas variables el sitio sigue funcionando: la sección de contacto muestra el botón de correo directo en lugar del formulario.

## Estructura

```
src/
  components/    # Header, Hero, About, Experience, Projects, ProjectModal, Education, Footer, ui
  data/          # catálogo tipado de los 32 proyectos + redes
  hooks/         # useTheme (claro/oscuro persistente)
  i18n/          # diccionarios es/en y configuración
public/
  projects/      # capturas .webp por proyecto (1.webp … N.webp)
  assets/        # foto de perfil
cv/              # fuente HTML del CV + script de generación del PDF
```
