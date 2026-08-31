import { vi } from 'vitest'
import { ref } from 'vue'

/**
 * Stand-ins for the things a Pinia store drags in on setup: the audio graph,
 * the router and analytics. Each mirrors the real module's exported shape - if
 * a composable grows a member the store destructures, add it here rather than
 * in one spec, so the specs cannot drift apart.
 */

export const metronomeMock = () => ({
  useMetronome: () => ({
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
  })
})

export const matomoMock = () => ({
  useMatomo: () => ({
    initMatomo: vi.fn(),
    matomoExists: () => false,
    deleteMatomo: vi.fn(),
    trackPlay: vi.fn(),
    trackStop: vi.fn()
  })
})

export const keepAwakeMock = () => ({
  useKeepAwake: () => ({
    isSupported: ref(false),
    keepAwake: vi.fn(),
    allowSleep: vi.fn()
  })
})

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
