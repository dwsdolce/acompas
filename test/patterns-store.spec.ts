import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

// The store reaches for the audio graph, the router and analytics on setup.
// None of that is under test here, so each is replaced with the smallest thing
// that satisfies the destructuring in the store's own setup function.
vi.mock('src/composables/metronome', async () => (await import('./helpers/app-mocks')).metronomeMock())
vi.mock('src/composables/keep-awake', async () => (await import('./helpers/app-mocks')).keepAwakeMock())
vi.mock('src/composables/matomo', async () => (await import('./helpers/app-mocks')).matomoMock())
vi.mock('vue-router', async () => (await import('./helpers/app-mocks')).routerMock())
vi.mock('src/boot/i18n', async () => (await import('./helpers/app-mocks')).i18nMock())
vi.mock('quasar', async (importOriginal) => (await import('./helpers/app-mocks')).quasarMock(importOriginal as never))

const { usePatternStore } = await import('src/stores/patterns')

describe('patterns store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    window.localStorage?.clear()
  })

  it('exposes every pattern, each tagged with its context', async () => {
    const store = usePatternStore()
    await store.initStore()

    expect(store.data.length).toBeGreaterThan(0)
    for (const pattern of store.data) {
      expect(pattern.context, `${pattern.name} has no context`).toBeTruthy()
      expect(pattern.name).toBeTypeOf('string')
    }
  })

  it('finds an instrument by its value and nothing by a bogus one', async () => {
    const store = usePatternStore()
    await store.initAll('flamenco', 'siguiriya')

    const known = store.instruments[0]
    expect(known).toBeDefined()
    expect(store.instrument(known!.value)).toEqual(known)
    expect(store.instrument('not-an-instrument')).toBeUndefined()
  })

  it('selects a pattern and builds its playable instrument list', async () => {
    const store = usePatternStore()
    await store.initAll('flamenco', 'siguiriya')

    expect(store.selectedData.name).toBe('siguiriya')
    expect(store.selectedPattern.tempo).toBe(store.selectedData.defaultTempo)
    // beatLabels is the counted-beat label row, never a playable instrument.
    expect(store.instruments.map(i => i.value)).not.toContain('beatLabels')
    // Something has to be audible when a pattern is first loaded.
    expect(store.instruments.filter(i => i.enabled).length).toBeGreaterThan(0)
  })

  describe('the visualized instrument', () => {
    it('is always one you can hear', async () => {
      const store = usePatternStore()
      await store.initAll('flamenco', 'siguiriya')

      expect(store.visualizedInstrument).toBeDefined()
      expect(store.selectedInstruments.map(i => i.value))
        .toContain(store.visualizedInstrument!.value)
    })

    it('answers with the only enabled instrument without being told', async () => {
      const store = usePatternStore()
      await store.initAll('flamenco', 'abandolaos')

      expect(store.selectedInstruments.length).toBe(1)
      expect(store.visualizedInstrument!.value).toBe(store.selectedInstruments[0]!.value)
    })

    it('honours a deliberate choice', async () => {
      const store = usePatternStore()
      await store.initAll('flamenco', 'abandolaos')
      store.selectInstruments('click', true)

      store.visualizeInstrument('click')

      expect(store.visualizedInstrument!.value).toBe('click')
      expect(store.visualizedSequence).toEqual(store.selectedData.sequences.click)
    })

    it('ignores a choice you cannot hear', async () => {
      const store = usePatternStore()
      await store.initAll('flamenco', 'abandolaos')
      const enabled = store.selectedInstruments[0]!.value

      store.visualizeInstrument('cajon')

      expect(store.selectedInstruments.map(i => i.value)).not.toContain('cajon')
      expect(store.visualizedInstrument!.value).toBe(enabled)
    })

    it('falls back when the chosen instrument is switched off', async () => {
      const store = usePatternStore()
      await store.initAll('flamenco', 'abandolaos')
      store.selectInstruments('click', true)
      store.visualizeInstrument('click')
      expect(store.visualizedInstrument!.value).toBe('click')

      store.selectInstruments('click', false)

      expect(store.visualizedInstrument!.value).not.toBe('click')
      expect(store.selectedInstruments.map(i => i.value))
        .toContain(store.visualizedInstrument!.value)
    })

    it('reports eighth notes for the drawn instrument, not the mixer at large', async () => {
      const store = usePatternStore()
      await store.initAll('flamenco', 'abandolaos')
      store.selectInstruments('cajon', true)
      store.visualizeInstrument('cajon')
      store.toggleEighthNotes('cajon')

      expect(store.visualizedHasEighthNotes).toBe(true)

      store.visualizeInstrument(store.selectedInstruments.find(i => i.value !== 'cajon')!.value)
      expect(store.visualizedHasEighthNotes).toBe(false)
      // The mixer as a whole still has eighths on, which is the distinction.
      expect(store.hasEighthNotes).toBe(true)
    })
  })
})
