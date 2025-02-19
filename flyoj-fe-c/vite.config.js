import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // element plus中，按需导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 配置代理服务器，解决跨域问题
  server: {
    proxy: {
      "/dev-api": {
        target: "http://127.0.0.1:19090/friend",
        rewrite: (p) => p.replace(/^\/dev-api/, ""),
      }
    },
  }
})
