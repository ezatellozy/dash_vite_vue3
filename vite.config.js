import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    host: '0.0.0.0',
    hmr: {
      clientPort: 8080,
    },
  },

  build: {
    // chunkSizeWarningLimit: 8080,
    assetsDir: 'platform/assets',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/abstracts/variables.scss";@import "./src/assets/scss/abstracts/mixins.scss";`,
      },
    },
  },
})
