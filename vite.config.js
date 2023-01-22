import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  ssr: true,
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

  transpileDependencies: ['vuetify'],
  plugins: [
    vue(),

    VueI18nPlugin({
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        './src/locales/**',
      ),
    }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/abstracts/variables.scss";
        @import "./src/assets/scss/abstracts/mixins.scss";`,
      },
    },
  },
})
