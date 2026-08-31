import { vi } from 'vitest'

// happy-dom has no Web Audio and no media element support. Nothing here
// decodes real audio: the specs assert scheduling, not sound.
class StubAudioContext {
  baseLatency = 0
  outputLatency = 0
  decodeAudioData () { return Promise.resolve({ duration: 0, sampleRate: 44100 }) }
}
vi.stubGlobal('AudioContext', StubAudioContext)

// Format detection calls canPlayType on a detached <audio>; happy-dom returns
// undefined, which would make loadSounds throw before any assertion runs.
if (typeof window !== 'undefined' && window.HTMLMediaElement) {
  window.HTMLMediaElement.prototype.canPlayType = () => 'probably'
}
