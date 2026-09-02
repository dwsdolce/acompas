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
  // Keep Vite's transform cache inside the project instead of the system temp
  // directory. On Windows the default location is shared and the optimizer
  // renames files into place; the first run after any edit had two workers
  // racing there and failing with "EPERM: operation not permitted, rename",
  // which reads like a broken test rather than a cold cache.
  cacheDir: path.resolve(__dirname, 'node_modules/.vite-test'),

  test: {
    environment: 'happy-dom',
    include: ['test/**/*.spec.ts'],
    setupFiles: ['test/setup.ts'],
    // patterns.spec.ts and pattern-search.spec.ts each dynamically import every
    // file under src/assets/data/patterns. Running in parallel from a cold
    // cache, they ask Vite to transform the same modules at the same moment and
    // one of the two loses the rename, failing with "EPERM: operation not
    // permitted, rename" - which reads like a broken test rather than a cold
    // cache. Moving cacheDir out of the shared temp directory made it rarer but
    // not rare enough: it still lost roughly one cold run in five. Serialising
    // the files removes the race outright, and costs about four seconds.
    fileParallelism: false,
    // Tone builds its audio graph at module scope, so the mocks in setup.ts
    // have to be in place before any module under test is imported.
    restoreMocks: true
  }
})
