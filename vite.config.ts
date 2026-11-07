import { defineConfig, loadEnv } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const isDevEnvironment = command === 'serve'

  return {
    resolve: { tsconfigPaths: true },
    plugins: [
      devtools(),
      tailwindcss(),
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      viteReact(),
    ],
    server: isDevEnvironment
      ? {
          proxy: {
            '/api': {
              target: env.VITE_API_URL,
              changeOrigin: true,
            },
          },
        }
      : undefined,
  }
})

export default config
