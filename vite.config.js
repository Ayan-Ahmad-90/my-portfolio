import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/my-portfolio/', // यहाँ अपने repo का नाम डालें
  plugins: [react()],
})
