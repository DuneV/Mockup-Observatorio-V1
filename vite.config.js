import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Rutas relativas: así el build funciona igual en GitHub Pages
  // (usuario.github.io/repo/) que en cualquier otro subdirectorio.
  base: './',
})
