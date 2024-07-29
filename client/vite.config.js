import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:"http://localhost:3030",
        secure:false,
        changeOrigin: true,
        timeout: 30000 // 30 seconds
      }
    }
  },
  plugins: [react()],
})