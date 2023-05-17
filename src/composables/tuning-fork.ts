import * as Tone from 'tone'
import { ref } from 'vue'
import { useTuningForkStore } from 'src/stores/tuning-fork'
import type { Synth, Reverb, Volume, Sequence } from 'tone'

// interface Data {
//   reverb: any
//   synth: any
//   sequence: any
// }

let reverb: Reverb = {} as Reverb
let synth: Synth = {} as Synth
let sequence: Sequence = {} as Sequence

export const useTuningFork = () => {
  const store = useTuningForkStore()

  const initReverb = () => {
    return new Tone.Reverb({
      wet: 1,
      decay: 1.5,
      preDelay: 0.01
    }).toDestination()
  }

  const initSynth = () => {
    return new Tone.Synth().connect(reverb).set({
      envelope: {
        attack: 0.01,
        decay: 1,
        sustain: 1,
        release: 10
      },
      volume: 5
    })
  }

  const initSequence = () => {
    const seq = new Tone.Sequence((time, note) => {
      synth.triggerAttackRelease(note, 1, time)
      Tone.Draw.schedule(() => {
        // trigger animation eventually by store
        store.changeNote(note)
      }, time)
    }, store.notes)
    seq.loop = true

    return seq
  }

  const initTuningFork = () => {
    reverb = initReverb()
    synth = initSynth()
    sequence = initSequence()
  }

  const playNote = async (note: string) => {
    await Tone.start()
    synth.triggerAttackRelease(note, 1)
  }

  const startSequence = async () => {
    initTuningFork()
    await Tone.start()
    Tone.Transport.bpm.value = 20
    await Tone.Transport.start('+0.1')
    sequence.start()
  }

  const stopSequence = async () => {
    sequence.stop()
    Tone.Transport.stop()
    store.changeNote(null)
  }
  return {
    initTuningFork,
    playNote,
    startSequence,
    stopSequence
  }
}




