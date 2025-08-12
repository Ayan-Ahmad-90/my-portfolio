// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/my-portfolio/',  // यहाँ अपना repository नाम डालें
  plugins: [react()]
})
