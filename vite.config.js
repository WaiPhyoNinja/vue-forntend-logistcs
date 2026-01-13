import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://admin.westeastfreight.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  // server: {
  //   host: '127.0.0.1',
  //   port: 5173,
  //   // allow the hostname Apache is proxying with
  //   allowedHosts: ['westeastfreight.com', 'localhost', '127.0.0.1'],
  //   proxy: {
  //     '/api': {
  //       // don't use 0.0.0.0 as a target - use an actual reachable address
  //       // target: 'http://0.0.0.0:8055',
  //       target: 'https://admin.westeastfreight.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
})
