# Observatorio de Salud Pública — Uniandes

Sitio en React (Vite) del Observatorio de Salud Pública y Epidemiología de la
Facultad de Medicina, Universidad de los Andes. Está pensado para ir embebido,
por eso no tiene menú de navegación ni roles de usuario.

El visor de indicadores es un iframe de Power BI (`viewer.embedUrl` en
`src/data/content.js`). Todo el contenido (equipo, objetivos, boletines,
contacto) vive en `src/data/content.js`.

## Desarrollo

```bash
npm install
npm run dev
npm run build
```

Diseño según el Manual de Imagen de la Facultad (tipografía Source Sans 3,
paleta en `src/index.css`).
