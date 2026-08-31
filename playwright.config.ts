import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  // The Electron app has to boot, load its assets and decode a sample.
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: [['list']],
  // One app instance at a time: they would contend for the same user data dir.
  workers: 1,
  fullyParallel: false
})
