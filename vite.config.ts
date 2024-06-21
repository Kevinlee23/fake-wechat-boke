import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import path from 'node:path'
import AutoImport from "unplugin-auto-import/vite";
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const rootPath = path.resolve(__dirname, 'src')
const viewsPath = path.resolve(__dirname, "src/views")
const typesPath = path.resolve(__dirname, 'src/types')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    AutoImport({
      imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
      resolvers: [
        ElementPlusResolver(),
      ]
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://47.98.246.12:9090",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
    cors: true
  },
  resolve: {
    alias: {
      '@': rootPath,
      "views": viewsPath,
      "types": typesPath
    },
  },
})
