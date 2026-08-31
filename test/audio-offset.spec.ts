import { describe, it, expect } from 'vitest'
import { formatAudioOffset } from 'src/utils/utils'

describe('the audio/visual offset label', () => {
  it('says nothing musical when there is no offset', () => {
    expect(formatAudioOffset(0, 120)).toBe('0 ms')
  })

  it('reports what the offset amounts to at the tempo in play', () => {
    // A quarter note at 120 BPM is 500ms, so 250ms is half of one.
    expect(formatAudioOffset(250, 120)).toBe('250 ms · 0.5 ♩')
    // The same 250ms is most of a beat once the compás moves.
    expect(formatAudioOffset(250, 190)).toBe('250 ms · 0.8 ♩')
  })

  it('shows a plausible device latency as the small fraction it is', () => {
    expect(formatAudioOffset(20, 120)).toBe('20 ms · 0.0 ♩')
  })

  it('keeps the milliseconds, which are what is actually stored', () => {
    expect(formatAudioOffset(40, 100)).toContain('40 ms')
  })

  it('falls back to milliseconds when there is no tempo yet', () => {
    expect(formatAudioOffset(120, 0)).toBe('120 ms')
  })
})
