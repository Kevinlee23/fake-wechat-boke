import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import AutoImport from "unplugin-auto-import/vite";
import { resolve } from "path";

const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir)
}

const alias: Record<string, string> = {
  '@': pathResolve("src")
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({ imports: ["vue", "vue-router", "pinia", "@vueuse/core"] })],
  resolve: {alias},
})
