import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'docs',  // 使用默认的 'dist' 目录
  },
  base: '/',  // 设置根路径
  server: {
    fs: {
      allow: ['../sdk', './'],
    },
  },
})