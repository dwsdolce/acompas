import { vi } from 'vitest'
import { ref } from 'vue'

/**
 * Stand-ins for the things a Pinia store drags in on setup: the audio graph,
 * the router and analytics. Each mirrors the real module's exported shape - if
 * a composable grows a member the store destructures, add it here rather than
 * in one spec, so the specs cannot drift apart.
 */

export const metronomeMock = () => {
  // One instance, not one per call. The real useMetronome is a singleton, and
  // the store captures its members at setup - so a mock that builds a fresh
  // object each time hands the test different functions from the ones the
  // store is holding, and mocking a return value has no effect.
  const instance = {
    metronomeEvent: ref(0),
    metronomeSubEvent: ref(0),
    getContext: vi.fn(() => ({ currentTime: 0 })),
    reinitialize: vi.fn(),
    initSequences: vi.fn(),
    initMetronome: vi.fn(),
    startSequences: vi.fn(),
    stopAllSequences: vi.fn(),
    changeTempo: vi.fn(),
    changeSwing: vi.fn(),
    humanize: vi.fn(),
    changeVolume: vi.fn(),
    changeDecay: vi.fn()
  }
  return { useMetronome: () => instance }
}

export const matomoMock = () => ({
  useMatomo: () => ({
    initMatomo: vi.fn(),
    matomoExists: () => false,
    deleteMatomo: vi.fn(),
    trackPlay: vi.fn(),
    trackStop: vi.fn()
  })
})

export const keepAwakeMock = () => {
  // isSupported is an async function in the real composable, not a ref: the
  // store calls `await isSupported()`.
  const instance = {
    isSupported: vi.fn(async () => true),
    keepAwake: vi.fn(),
    allowSleep: vi.fn()
  }
  return { useKeepAwake: () => instance }
}

export const routerMock = () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useRoute: () => ({ query: {}, params: {} })
})

export const i18nMock = () => ({ t: (key: string) => key })

/**
 * Quasar's Platform and its plugins are populated by the framework plugin,
 * which nothing installs in a bare test. Everything else is left real so
 * helpers like getCssVar still work.
 */
export const quasarMock = async (importOriginal: () => Promise<typeof import('quasar')>) => {
  const actual = await importOriginal()
  return {
    ...actual,
    Platform: { is: { electron: false, mobile: false, desktop: true } },
    Loading: { show: () => {}, hide: () => {} },
    Notify: { create: () => {} },
    Dialog: { create: () => ({ onOk: () => ({ onCancel: () => ({}) }) }) }
  }
}
