// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/my-portfolio/', // Corrected base path for GitHub Pages deployment
  build: {
    outDir: 'dist', // Change output directory back to 'dist'
  },
})

