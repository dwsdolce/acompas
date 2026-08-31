import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('animejs', () => ({ default: Object.assign(() => ({}), { remove: () => {} }) }))
vi.mock('src/composables/metronome', async () => (await import('./helpers/app-mocks')).metronomeMock())
vi.mock('src/composables/keep-awake', async () => (await import('./helpers/app-mocks')).keepAwakeMock())
vi.mock('src/composables/matomo', async () => (await import('./helpers/app-mocks')).matomoMock())
vi.mock('vue-router', async () => (await import('./helpers/app-mocks')).routerMock())
vi.mock('src/boot/i18n', async () => (await import('./helpers/app-mocks')).i18nMock())
vi.mock('quasar', async (importOriginal) => (await import('./helpers/app-mocks')).quasarMock(importOriginal as never))

const { usePatternStore } = await import('src/stores/patterns')
const DrawDots = (await import('src/components/DrawDots.vue')).default

/** Siguiriya is the pattern the tiering exists for: 12 pulses counted as 5 uneven beats. */
const PATTERN = 'siguiriya'

describe('DrawDots', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    window.localStorage?.clear()
  })

  const mountForPattern = async () => {
    const store = usePatternStore()
    await store.initAll('flamenco', PATTERN)
    const wrapper = mount(DrawDots)
    await wrapper.vm.$nextTick()
    return { store, wrapper }
  }

  it('draws one dot per slot in the pattern', async () => {
    const { store, wrapper } = await mountForPattern()
    const dots = wrapper.findAll('span[class*="dot-"]')
    expect(dots.length).toBe(store.beatLabels.length)
    expect(dots.length).toBeGreaterThan(0)
  })

  it('marks exactly the pattern accents with the context colour', async () => {
    const { store, wrapper } = await mountForPattern()
    const accents = store.selectedData.accents

    const accented: number[] = []
    wrapper.findAll('span[class*="dot-"]').forEach((dot, i) => {
      const style = dot.attributes('style') ?? ''
      if (style.includes('--q-primary')) accented.push(i)
    })

    expect(accented).toEqual([...accents])
  })

  it('draws every accent larger than every other slot', async () => {
    const { wrapper } = await mountForPattern()
    const store = usePatternStore()
    const dots = wrapper.findAll('span[class*="dot-"]')

    const widthOf = (i: number) =>
      parseFloat((dots[i]!.attributes('style') ?? '').match(/width:\s*([\d.]+)px/)?.[1] ?? '0')

    const accents = store.selectedData.accents
    // In siguiriya every labelled beat is also an accent, so the comparison is
    // against the unlabelled pulses and the off-beat subdivisions.
    const others = dots.map((_, i) => i).filter(i => !accents.includes(i))
    expect(others.length).toBeGreaterThan(0)

    const smallestAccent = Math.min(...accents.map(widthOf))
    const largestOther = Math.max(...others.map(widthOf))
    expect(smallestAccent).toBeGreaterThan(largestOther)
  })
})
