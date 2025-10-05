import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// PWA staat tijdelijk uit voor een schone herdeploy zonder cache-issues.
// We zetten 'm later weer aan als alles werkt.
export default defineConfig({
  plugins: [react()],
})
