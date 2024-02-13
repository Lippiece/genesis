import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/genesis/",
  server: {
    proxy: {
      "/amo-crm": {
        target: "https://genesis-api-2cug.onrender.com/amo-crm",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/amo-crm/, ""),
      },
    },
  },
})
