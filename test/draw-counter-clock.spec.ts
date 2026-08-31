import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('animejs', () => ({ default: Object.assign(() => ({ finished: Promise.resolve(), pause: () => {} }), { remove: () => {} }) }))
vi.mock('src/composables/metronome', async () => (await import('./helpers/app-mocks')).metronomeMock())
vi.mock('src/composables/keep-awake', async () => (await import('./helpers/app-mocks')).keepAwakeMock())
vi.mock('src/composables/matomo', async () => (await import('./helpers/app-mocks')).matomoMock())
vi.mock('vue-router', async () => (await import('./helpers/app-mocks')).routerMock())
vi.mock('src/boot/i18n', async () => (await import('./helpers/app-mocks')).i18nMock())
vi.mock('quasar', async (importOriginal) => (await import('./helpers/app-mocks')).quasarMock(importOriginal as never))

const { usePatternStore } = await import('src/stores/patterns')
const { useSessionStore } = await import('src/stores/session')
const DrawCounter = (await import('src/components/DrawCounter.vue')).default
const DrawClock = (await import('src/components/DrawClock.vue')).default

// The dial is $blue-grey-1 in both themes. Anything drawn on it has to be
// chosen against a light surface, or the marks vanish when the app is dark.
const DIAL = '#eceff1'
const near = (hex: string, other: string) => {
  const v = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16))
  const [a, b] = [v(hex), v(other)]
  return Math.abs(a[0]! - b[0]!) + Math.abs(a[1]! - b[1]!) + Math.abs(a[2]! - b[2]!) < 120
}
const rgbToHex = (rgb: string) => {
  const m = rgb.match(/(\d+),\s*(\d+),\s*(\d+)/)
  return m ? '#' + [1, 2, 3].map(i => Number(m[i]).toString(16).padStart(2, '0')).join('') : rgb
}

describe('DrawCounter', () => {
  beforeEach(() => { setActivePinia(createPinia()); window.localStorage?.clear() })

  it('marks the palmas under the count, weighted by the strike', async () => {
    const store = usePatternStore()
    await store.initAll('flamenco', 'abandolaos')

    const wrapper = mount(DrawCounter)
    // Slot 2 is a counted beat where the palmas claras strike hardest.
    store.metronomeEvent = 2
    await wrapper.vm.$nextTick()

    const bar = wrapper.find('.palmas-bar')
    expect(bar.exists(), 'no palmas bar rendered').toBe(true)
    const style = bar.attributes('style') ?? ''
    expect(style, 'the bar is not visible').not.toContain('transparent')

    const heightAt = (slot: number) => {
      store.metronomeEvent = slot
      return wrapper.vm.$nextTick().then(() =>
        parseFloat((wrapper.find('.palmas-bar').attributes('style') ?? '').match(/height:\s*([\d.]+)px/)?.[1] ?? '0'))
    }
    // Slot 2 plays sample 1, slot 0 plays sample 3: harder strike, thicker bar.
    expect(await heightAt(2)).toBeGreaterThan(await heightAt(0))
  })

  it('shows the compás colour on an accent', async () => {
    const store = usePatternStore()
    await store.initAll('flamenco', 'abandolaos')
    const wrapper = mount(DrawCounter)

    // Start from nothing, so moving onto slot 0 is a change the watcher sees.
    store.metronomeEvent = null
    await wrapper.vm.$nextTick()
    store.metronomeEvent = store.selectedData.accents[0]!
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#Counter').attributes('style')).toContain('--q-primary')
  })
  it('counts the off-beats when the drawn instrument plays them', async () => {
    const store = usePatternStore()
    await store.initAll('flamenco', 'abandolaos')
    const drawn = store.visualizedInstrument!.value
    store.toggleEighthNotes(drawn)
    expect(store.visualizedHasEighthNotes).toBe(true)

    const wrapper = mount(DrawCounter)
    store.metronomeEvent = null
    await wrapper.vm.$nextTick()
    store.metronomeSubEvent = 3
    await wrapper.vm.$nextTick()

    // Slot 3 carries no label: it reads as a dot, not as a count.
    expect(wrapper.text()).toContain('·')
  })

  it('ignores off-beats the drawn instrument is not playing', async () => {
    const store = usePatternStore()
    await store.initAll('flamenco', 'abandolaos')
    expect(store.visualizedHasEighthNotes).toBe(false)

    const wrapper = mount(DrawCounter)
    store.metronomeEvent = 2
    await wrapper.vm.$nextTick()
    const before = wrapper.text()

    store.metronomeSubEvent = 3
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toBe(before)
  })

})

describe('DrawClock', () => {
  beforeEach(() => { setActivePinia(createPinia()); window.localStorage?.clear() })

  it('ticks exactly the slots the drawn instrument strikes', async () => {
    const store = usePatternStore()
    await store.initAll('flamenco', 'abandolaos')
    const wrapper = mount(DrawClock)
    await wrapper.vm.$nextTick()

    const ticked = wrapper.findAll('.tick')
      .map((tick, i) => (!(tick.attributes('style') ?? '').includes('display: none') ? i : null))
      .filter((i): i is number => i !== null)

    const played = store.visualizedSequence
      .map((sample, i) => (sample ? i : null))
      .filter((i): i is number => i !== null)

    expect(played.length).toBeGreaterThan(0)
    expect(ticked).toEqual(played)
  })

  it('draws marks that can be seen on the light dial, in either theme', async () => {
    const session = useSessionStore()
    const store = usePatternStore()
    await store.initAll('flamenco', 'abandolaos')

    for (const dark of [false, true]) {
      session.isDarkMode = dark
      const wrapper = mount(DrawClock)
      await wrapper.vm.$nextTick()

      const tick = wrapper.findAll('.tick')
        .find(t => !(t.attributes('style') ?? '').includes('display: none'))
      expect(tick, `no tick with isDarkMode=${dark}`).toBeDefined()

      const colour = (tick!.attributes('style') ?? '').match(/background-color:\s*([^;]+)/)?.[1] ?? ''
      expect(near(rgbToHex(colour.trim()), DIAL), `tick invisible on the dial with isDarkMode=${dark}`).toBe(false)
    }
  })
})
