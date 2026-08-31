import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    // The same aliases quasar.config.js restores for the app build. Without
    // them every `src/...` import in the code under test fails to resolve.
    alias: {
      src: path.resolve(__dirname, './src'),
      layouts: path.resolve(__dirname, './src/layouts'),
      pages: path.resolve(__dirname, './src/pages')
    }
  },
  define: {
    // quasar.config.js injects this; the header reads it.
    'process.env.APP_VERSION': JSON.stringify('0.0.0-test')
  },
  test: {
    environment: 'happy-dom',
    include: ['test/**/*.spec.ts'],
    setupFiles: ['test/setup.ts'],
    // Tone builds its audio graph at module scope, so the mocks in setup.ts
    // have to be in place before any module under test is imported.
    restoreMocks: true
  }
})
