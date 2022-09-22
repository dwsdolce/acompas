import * as Tone from 'tone'
import { Loading, Notify } from 'quasar'
import { useRoute } from 'vue-router'
import palosData from 'src/data/palosData'
import audioSettings from 'src/data/audioData'
import { useCoreStore } from 'src/stores/core'
import { usePaloStore } from 'src/stores/palo'
import { forEachValue } from 'src/composables/utils'
import type {
  Volume,
  Palo
} from 'src/composables/models'

const sounds: any = {}
const sequences: any = {}
let audioFormat: string | null = null

export const useMetronome = () => {
  const route = useRoute()

  const paloData = palosData.find((palo) => palo.value === route.name)
  const coreStore = useCoreStore()
  const paloStore = usePaloStore(route.name as string)()

  const initSounds = async () => {
    const audio = new Audio()
    if (audio.canPlayType('audio/flac')) {
      audioFormat = 'flac'
    } else if (audio.canPlayType('audio/mpeg')) {
      audioFormat = 'mp3'
    } else if (audio.canPlayType('audio/mp4')) {
      audioFormat = 'mp4'
    } else if (audio.canPlayType('audio/wav')) {
      audioFormat = 'wav'
    } else if (audio.canPlayType('audio/ogg')) {
      audioFormat = 'ogg'
    } else {
      throw new Error('None of the available audio formats can be played')
    }

    const path = 'audio/'

    forEachValue(audioSettings, (value: any, key: string | number) => {
      sounds[key] = {}
      sounds[key].volume = new Tone.Volume(0)
      sounds[key].reverb = new Tone.Reverb({
        decay: 0.5,
        preDelay: 0,
        wet: 1,
      })

      for (let i = 0 i < value.length i++) {
        const url = path + value[i].src + '.' + audioFormat
        sounds[key][i] = new Tone.Player({
          url: url,
          volume: value[i].volume,
          fadeOut: 1,
        })
        sounds[key][i].chain(
          sounds[key].reverb,
          sounds[key].volume,
          Tone.Destination
        )
      }
    })
  }

  // ========================
  // Metronome palos settings
  // ========================

  const noteIndexInPattern = (i: number) => {
    if (
      paloStore.palo.selectedPreCount &&
      paloStore.palo.selectedStartBeat &&
      paloData?.nbBeatsInPattern
    ) {
      let index =
        i -
        paloStore.palo.selectedPreCount.value * 2 +
        paloStore.palo.selectedStartBeat.value
      while (index < 0) {
        index += paloData?.nbBeatsInPattern
      }
      return index % paloData?.nbBeatsInPattern
    }
  }

  const improvise = (
    type: string,
    time: number,
    sound: any,
    note: any,
    key: number,
    eighthNotes: boolean
  ) => {
    // For the "click" sounds, follow the sequence and never improvise
    if (type == 'click') {
      sound?.start(time)
      return
    }

    // Don't mess with accents
    if (paloData?.accents.includes((key / 2) as never)) {
      sound?.start(time)
      return
    }

    // Pick a probability that the sound occurence is following the pattern
    const improvisationProbability = Math.random()
    const improvisationThreshold = 0.7 // 70% chances that we don't follow the pattern
    const index = noteIndexInPattern(note)

    if (improvisationProbability > improvisationThreshold) {
      // Follow the pattern ?
      if (index == key && eighthNotes && key % 2 !== 0) {
        sound?.start(time)
      }
      if (index == key && !eighthNotes && key % 2 === 0) {
        sound?.start(time)
      }
    } else {
      // Pick a probability that the sound is played
      const playProbability = Math.random()
      const playThreshold = 0.7 // 70% chances that the sound is not played
      if (playProbability > playThreshold) {
        sound?.start(time)
      }
    }
  }

  const improviseJaleo = (note: any, time: number, eighthNotes: boolean) => {
    if (!eighthNotes && note % 2 !== 0) {
      return
    }
    let playThreshold = 0.98 // 98% chances that the the sound is not played
    // Check if time is a strong beat
    if (paloData?.accents.includes(noteIndexInPattern(note) as never)) {
      // if the event is a strong beat, sound occurence will be more probable
      playThreshold = 0.94 // 94% chances that the sound is not played
    }
    const playProbability = Math.random()
    if (playProbability > playThreshold) {
      // Pick a random index in the available jaleo sounds
      const jaleoSoundsCount = Object.keys(sounds.jaleo).length
      const randomIndex = Math.round(Math.random() * (jaleoSoundsCount - 1))
      sounds.jaleo[randomIndex].start(time)
    }
  }

  const triggerPreCountClick = (time: number, note: any) => {
    if (paloStore.palo.selectedPreCount?.value && paloData?.accents) {
      if (
        paloStore.palo.selectedPreCount?.value > 0 &&
        note < paloStore.palo.selectedPreCount?.value * 2 &&
        note % 2 === 0
      ) {
        const index = noteIndexInPattern(note)
        if (!index) return
        if (paloData?.accents.includes((index / 2) as never)) {
          sounds.click[0].start(time)
        } else {
          sounds.click[1].start(time)
        }
      }
    }
  }

  const triggerAudioOnEvent = (
    eighthNotes: boolean,
    type: string,
    isLoop: boolean,
    time: number,
    note: any
  ) => {
    // Prepend pre-count beats if required
    if (type === 'preCount') {
      triggerPreCountClick(time, note)
    } else {
      // Don't play non-preCount sequences if note is during pre-count
      if (
        paloStore.palo.selectedPreCount?.value &&
        note < paloStore.palo.selectedPreCount?.value * 2 &&
        !isLoop
      ) {
        return
      }

      if (type === 'jaleo') {
        const jaleo = paloStore.instrument('jaleo')
        if (jaleo?.enabled) improviseJaleo(note, time, eighthNotes)
        return
      }

      const instru = paloStore.instrument(type)

      // index is a pulsation number, value is the sound number
      if (instru?.enabled && paloData && type)
        paloData[type as keyof Palo].forEach(
          (value: number | null, index: number) => {
            if (!value) return
            const sound = sounds[type][value - 1]
            const key = noteIndexInPattern(note)

            if (
              eighthNotes &&
              instru?.eighthNotes &&
              (index as number) % 2 != 0 &&
              key == index
            ) {
              paloStore.palo.improvisation
                ? improvise(type, time, sound, note, index, eighthNotes)
                : sound.start(time)
            }
            if (!eighthNotes && (index as number) % 2 == 0 && key == index) {
              paloStore.palo.improvisation
                ? improvise(type, time, sound, note, index, eighthNotes)
                : sound.start(time)
            }
          }
        )
    }
  }

  /**
   * Builds a compas sequence from a palo, an "is eighthNote ?" boolean and a sound
   */
  const buildSequence = (
    eighthNotes: boolean,
    type: string,
    sequence: any,
    isLoop: boolean
  ) => {
    // 'note' is an occurence of an element inside the sequence variable (integer)
    const seq = new Tone.Sequence((time, note) => {
      note = parseInt(note)

      // Type is not an event, it is a preCount or a selected instrument
      if (type !== 'event') {
        triggerAudioOnEvent(eighthNotes, type, isLoop, time, note)
      }

      // Call animation on event time.
      // The 'event' sequence is used to trigger events which will trigger UI modifications
      if (type === 'event' && !eighthNotes && note % 2 === 0) {
        Tone.Draw.schedule(() => {
          // Animation triggered from store mutation, invoked close to AudioContext time
          if (paloStore.palo.name === 'no-compas') {
            coreStore.triggerEvent(coreStore.metronomeEvent === 0 ? 2 : 0)
          } else {
            coreStore.triggerEvent(note)
          }
        }, time) // Use AudioContext time of the event
      }
    }, sequence)
    // Set/unset sequence looping
    seq.loop = isLoop
    return seq
  }

  // ========================
  // Metronome init functions
  // ========================

  const initSequences = () => {
    const introSeq = []
    const loopSeq = []

    if (paloData?.nbBeatsInPattern) {
      if (
        paloStore.palo.selectedPreCount?.value &&
        paloStore.palo.selectedStartBeat?.value
      ) {
        // Add pre-count to introduction sequence
        for (let i = 0 i < paloStore.palo.selectedPreCount?.value i++) {
          introSeq.push(i * 2)
          introSeq.push(i * 2 + 1)
        }

        // Add beats to introduction sequence until loop begins
        if (
          paloStore.palo.selectedPreCount?.value !== 0 ||
          paloStore.palo.selectedStartBeat?.value !== 0
        ) {
          let i = introSeq.length
          // Add items to introSeq until we find a beat with index 0 in the pattern
          while (
            (paloStore.palo.selectedStartBeat?.value -
              paloStore.palo.selectedPreCount?.value * 2 +
              i) %
              paloData?.nbBeatsInPattern !==
            0
          ) {
            introSeq.push(i)
            i++
          }
        }
      }
      // Add pattern beats to loopable sequence
      for (let i = 0 i < paloData?.nbBeatsInPattern i++) {
        loopSeq.push(i)
      }
    }

    // Build all sequences
    sequences.quarterNotes = {
      introduction: {
        event: buildSequence(false, 'event', introSeq, false),
        preCount: buildSequence(false, 'preCount', introSeq, false),
        clara: buildSequence(false, 'clara', introSeq, false),
        sorda: buildSequence(false, 'sorda', introSeq, false),
        cajon: buildSequence(false, 'cajon', introSeq, false),
        nudillo: buildSequence(false, 'nudillo', introSeq, false),
        udu: buildSequence(false, 'udu', introSeq, false),
        jaleo: buildSequence(false, 'jaleo', introSeq, false),
        click: buildSequence(false, 'click', introSeq, false),
      },
      loop: {
        event: buildSequence(false, 'event', loopSeq, true),
        clara: buildSequence(false, 'clara', loopSeq, true),
        sorda: buildSequence(false, 'sorda', loopSeq, true),
        cajon: buildSequence(false, 'cajon', loopSeq, true),
        nudillo: buildSequence(false, 'nudillo', loopSeq, true),
        udu: buildSequence(false, 'udu', loopSeq, true),
        jaleo: buildSequence(false, 'jaleo', loopSeq, true),
        click: buildSequence(false, 'click', loopSeq, true),
      },
    }

    sequences.eighthNotes = {
      introduction: {
        clara: buildSequence(true, 'clara', introSeq, false),
        sorda: buildSequence(true, 'sorda', introSeq, false),
        cajon: buildSequence(true, 'cajon', introSeq, false),
        nudillo: buildSequence(true, 'nudillo', introSeq, false),
        udu: buildSequence(true, 'udu', introSeq, false),
        jaleo: buildSequence(true, 'jaleo', introSeq, false),
        click: buildSequence(true, 'click', introSeq, false),
      },
      loop: {
        clara: buildSequence(true, 'clara', loopSeq, true),
        sorda: buildSequence(true, 'sorda', loopSeq, true),
        cajon: buildSequence(true, 'cajon', loopSeq, true),
        nudillo: buildSequence(true, 'nudillo', loopSeq, true),
        udu: buildSequence(true, 'udu', loopSeq, true),
        jaleo: buildSequence(true, 'jaleo', loopSeq, true),
        click: buildSequence(true, 'click', loopSeq, true),
      },
    }
  }

  const getContext = Tone.context

  const isSupported = Tone.supported

  const initMetronome = async () => {
    Loading.show({
      delay: 100,
      message: 'Loading audio samples',
    })
    // await restoreLocalStorage(store)
    Tone.loaded()
      .then(async () => {
        await initSounds()
        await initSequences()
        Loading.hide()
      })
      .catch(() => {
        Loading.hide()
        Notify.create({
          message: 'Failed to load the audio samples !',
          color: 'secondary',
          icon: 'error',
        })
      })
  }

  // =====================
  // Metronome user inputs
  // =====================

  const startSequences = async () => {
    await Tone.start()

    const offset = sequences.quarterNotes?.introduction.event.length
    const loopStart = '0:' + offset / 2

    Tone.Transport.start()

    if (sequences.quarterNotes && sequences.eighthNotes) {
      if (sequences.quarterNotes.introduction.event.length !== 0) {
        forEachValue(
          sequences.quarterNotes.introduction,
          (seq: Tone.Sequence) => {
            seq.start()
            seq.stop(loopStart)
          }
        )
        forEachValue(
          sequences.eighthNotes.introduction,
          (seq: Tone.Sequence) => {
            seq.start(0)
            seq.stop(loopStart)
          }
        )
        forEachValue(sequences.quarterNotes.loop, (seq: Tone.Sequence) => {
          seq.start(loopStart, offset)
        })
        forEachValue(sequences.eighthNotes.loop, (seq: Tone.Sequence) => {
          seq.start(loopStart, offset)
        })
      } else {
        forEachValue(
          sequences.quarterNotes.loop,
          (seq: Tone.Sequence, key: string) => {
            seq.start(0)
          }
        )
        forEachValue(
          sequences.eighthNotes.loop,
          (seq: Tone.Sequence, key: string) => {
            seq.start(0)
          }
        )
      }
    }
  }

  const stopAllSequences = () => {
    forEachValue(sequences, (seq: any) => {
      forEachValue(seq, (notes: any) => {
        forEachValue(notes, (s: any) => {
          if (s !== null && s.state === 'started') s.stop()
          if (s !== null) s.dispose()
        })
      })
    })
    Tone.Transport.stop()
  }

  const changeTempo = (tempo: number) => {
    Tone.Transport.bpm.value = tempo
  }

  const changeSwing = (swing: number) => {
    Tone.Transport.swing = swing
  }

  const humanize = () => {
    // Do nothing if sequences have not been initialized
    if (typeof sequences.quarterNotes === 'undefined') return

    forEachValue(
      sequences.quarterNotes.introduction,
      (seq: any, type: string) => {
        if (type === 'event' || type === 'preCount' || type === 'click') {
          seq.humanize = false
        } else {
          seq.humanize = paloStore.palo.humanization
        }
      }
    )
    forEachValue(sequences.quarterNotes.loop, (seq: any, type: string) => {
      if (type === 'event' || type === 'preCount' || type === 'click') {
        seq.humanize = false
      } else {
        seq.humanize = paloStore.palo.humanization
      }
    })
    forEachValue(sequences.eighthNotes, (seq: any) => {
      forEachValue(seq, (s: any) => {
        s.humanize = paloStore.palo.humanization
      })
    })
  }

  const changeVolume = async (payload: Volume) => {
    sounds[payload.instrument].volume.volume.value = payload.volume
  }

  return {
    sounds,
    sequences,
    getContext,
    initMetronome,
    isSupported,
    initSequences,
    startSequences,
    stopAllSequences,
    changeVolume,
    humanize,
    changeSwing,
    changeTempo,
    triggerAudioOnEvent,
    triggerPreCountClick,
    improviseJaleo,
    improvise,
    noteIndexInPattern,
  }
}
