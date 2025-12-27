import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // NUQTA OLIB TASHLANDI: Bu barcha fayllarni asosiy rootdan qidirishni ta'minlaydi
  base: '/', 
})
