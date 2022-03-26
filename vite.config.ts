import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  server: {
    // proxy local netlify functions to work like prod
    proxy: {
      '/.netlify/functions/': {
        target: 'http://localhost:9999/',
        rewrite: path => path.replace('^/\\.netlify/functions', '')
      }
    }
  }
})
