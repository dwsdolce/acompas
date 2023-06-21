import * as Tone from 'tone'
import { computed, ComputedRef, Ref, ref, watch, onMounted, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
import { Loading, Notify, Dialog } from 'quasar'
import { storeToRefs } from 'pinia'
import soundsData from 'src/data/soundsData'
import { usePatternStore } from 'src/stores/patterns'
import { forEachValue } from 'src/utils/utils'
import type {
  VolumeOpts,
  DecayOpts,
  numOpts,
  SoundsDataKey,
  SoundsData,
  Sounds,
  Sound,
  Seqs,
  Seq,
  SeqSubdiv,
  PatternState,
  instruOpts,
  Players,
  ExtendedPlayer,
  InstruSeqs
} from 'src/utils/types'

const sounds: Sounds = {} as Sounds
const sequences: Seqs = {} as Seqs
const quarterChannel = new Tone.Channel(0, 0).toDestination()
const eighthChannel = new Tone.Channel(-4, -0.5).toDestination()

export const useMetronome = () => {
  const store = usePatternStore()

  const audioFormat = ref<string>('')
  const reverbDecay = ref<number>(0.3)
  const reverb = new Tone.Reverb({
    decay: 0.3,
    preDelay: 0,
    wet: reverbDecay.value
  }).toDestination()

  const soundsIsLoaded = ref<boolean>(false)
  const metronomeEvent = ref<number | null>(null)

  /**
   * Loads all sounds.
   * @returns {void}
   */
  const loadSounds = async () => {
    const path = 'audio/'
    const audio = new Audio()

    if (audio.canPlayType('audio/flac')) {
      audioFormat.value = 'flac'
    } else if (audio.canPlayType('audio/mpeg')) {
      audioFormat.value = 'mp3'
    } else if (audio.canPlayType('audio/mp4')) {
      audioFormat.value = 'mp4'
    } else if (audio.canPlayType('audio/wav')) {
      audioFormat.value = 'wav'
    } else if (audio.canPlayType('audio/ogg')) {
      audioFormat.value = 'ogg'
    } else {
      throw new Error('None of the available audio formats can be played')
    }

    soundsData.forEach(({ name, medias }) => {
      const s = () => {
        const sound: Sound = {} as Sound
        for (let i = 0; i < medias.length; i++) {
          const url = path + medias[i].src + '.' + audioFormat.value
          sound[i] = {
            quarter: new Tone.Player({
              url: url,
              volume: medias[i].volume,
              fadeOut: 1
            }) as ExtendedPlayer,
            eighth: new Tone.Player({
              url: url,
              volume: medias[i].volume,
              fadeOut: 1
            }) as ExtendedPlayer
          }

          sound[i].quarter.defaultVolume = medias[i].volume
          sound[i].eighth.defaultVolume = medias[i].volume

          sound[i].quarter.connect(quarterChannel)
          quarterChannel.connect(reverb)

          sound[i].eighth.connect(eighthChannel)
          eighthChannel.connect(reverb)
        }
        return sound
      }
      sounds[name as keyof Sounds] = s()
    })
  }

  const triggerEvent = (payload: number | null) => {
    metronomeEvent.value = payload
  }

  /**
   * Improvises a sound on a given note.
   * @param {string} type - The type of audio to be triggered.
   * @param {number} time - The time at which the audio should be triggered.
   * @param {Tone.Player} sound - The sound to be triggered.
   * @param {number} note - The note associated with the audio.
   * @param {number} key - The key associated with the audio.
   * @param {boolean} eighthNotes - Specifies whether the audio is triggered on eighth notes.
   * @returns {void}
   */
  const improvise = (
    type: string,
    time: number,
    sound: Tone.Player,
    note: number,
    key: number,
    eighthNotes: boolean
  ) => {
    // For the "click" sounds, follow the sequence and never improvise
    if (type == 'click') {
      sound?.start(time)
      return
    }

    // Don't mess with accents
    if (store.selectedPattern?.accents.includes((key / 2) as never)) {
      sound?.start(time)
      return
    }

    // Pick a probability that the sound occurence is following the pattern
    const improvisationProbability = Math.random()
    const improvisationThreshold = 0.7 // 70% chances that we don't follow the pattern

    if (improvisationProbability > improvisationThreshold) {
      // Follow the pattern ?
      if (note == key && eighthNotes && key % 2 !== 0) {
        sound?.start(time)
      }
      if (note == key && !eighthNotes && key % 2 === 0) {
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

  /**
   * Improvises a jaleo sound on a given note.
   * @param {number} note - The note associated with the audio.
   * @param {number} time - The time at which the audio should be triggered.
   * @param {boolean} eighthNotes - Specifies whether the audio is triggered on eighth notes.
   */
  const improviseJaleo = (
    note: number,
    time: number,
    eighthNotes: boolean
  ) => {
    if (!eighthNotes && note % 2 !== 0) {
      return
    }
    let playThreshold = 0.98 // 98% chances that the the sound is not played
    // Check if time is a strong beat
    if (store.selectedPattern?.accents.includes((note / 2) as never)) {
      // if the event is a strong beat, sound occurence will be more probable
      playThreshold = 0.94 // 94% chances that the sound is not played
    }
    const playProbability = Math.random()
    if (playProbability > playThreshold) {
      // Pick a random index in the available jaleo sounds
      const jaleoSoundsCount = Object.keys(sounds.jaleo).length
      const randomIndex = Math.round(Math.random() * (jaleoSoundsCount - 1))
      sounds.jaleo[randomIndex][eighthNotes ? 'eighth' : 'quarter'].start(time)
    }
  }

  /**
   * Triggers a click sound on prestart beats.
   * @param {number} time - The time at which the audio should be triggered.
   * @param {number} note - The note associated with the audio.
   * @returns
   */
  const triggerPrestartBeatClick = (
    time: number,
    note: number
  ) => {
    if (
      store.selectedPattern?.accents &&
      store.selectedPattern?.selectedPrestartBeat?.value &&
      store.selectedPattern?.selectedPrestartBeat?.value > 0 &&
      note % 2 == 0
    ) {
      if (store.selectedPattern?.accents.includes((note / 2) as never)) {
        sounds.click[0].quarter.start(time)
      } else {
        sounds.click[1].quarter.start(time)
      }
    }
  }

  /**
   * Triggers audio based on the specified parameters.
   *
   * @param {boolean} eighthNotes - Specifies whether the audio is triggered on eighth notes.
   * @param {string} type - The type of audio to be triggered.
   * @param {boolean} isLoop - Specifies whether the audio is looped.
   * @param {number} time - The time at which the audio should be triggered.
   * @param {number} note - The note associated with the audio.
   * @returns {void}
   */
  const triggerAudioOnEvent = (
    eighthNotes: boolean,
    type: string,
    isLoop: boolean,
    time: number,
    note: number
  ) => {
    // Prepend prestart beats if required
    if (store.selectedPattern?.selectedPrestartBeat && type == 'prestartBeat') {
      triggerPrestartBeatClick(time, note)
    } else {
      // Don't play non-prestart sequences if note is during prestart
      if (
        store.selectedPattern?.selectedPrestartBeat?.value &&
        note < store.selectedPattern?.selectedPrestartBeat?.value * 2 &&
        !isLoop
      ) {
        return
      }

      if (type == 'jaleo') {
        const jaleo = store.instrument('jaleo')
        if (jaleo?.enabled) improviseJaleo(note, time, eighthNotes)
        return
      }

      const instru = store.instrument((type as string))

      // index is a pulsation number, value is the sound number
      if (instru?.enabled && store.selectedPattern && type) {
        (store.selectedPattern.sequences[type as keyof InstruSeqs] as (number | null)[]).forEach(
          (value: number | null, index: number) => {
            if (!value) return
            const sound: Players = sounds[type as keyof Sounds][value - 1] as Players

            if (
              eighthNotes &&
              instru?.eighthNotes &&
              (index as number) % 2 != 0 &&
              note == index
            ) {
              store.selectedPattern?.improvisation
                ? improvise(type, time, sound[eighthNotes ? 'eighth' : 'quarter'], note, index, eighthNotes)
                : sound[eighthNotes ? 'eighth' : 'quarter'].start(time)
            } else if (!eighthNotes && (index as number) % 2 == 0 && note == index) {
              store.selectedPattern?.improvisation
                ? improvise(type, time, sound[eighthNotes ? 'eighth' : 'quarter'], note, index, eighthNotes)
                : sound[eighthNotes ? 'eighth' : 'quarter'].start(time)
            }
          }
        )
      }
    }
  }

  /**
   * Builds a compas sequence from a pattern, an "is eighthNote ?" boolean and a sound
   * @param {string} name - The name of the pattern
   * @param {boolean} eighthNotes - Specifies whether the sequence is on eighth notes.
   * @param {string} type - The type of audio to be triggered.
   * @param {number[]} sequence - The sequence of notes to be played.
   * @param {boolean} isLoop - Specifies whether the sequence is looped.
   * @returns {Tone.Sequence} - The built sequence.
   */
  const buildSequence = (
    name: string,
    eighthNotes: boolean,
    type: string,
    sequence: number[],
    isLoop: boolean
  ) => {
    // 'note' is an occurence of an element inside the sequence variable (integer)
    const seq = new Tone.Sequence((time, note) => {
      // Type is not an event, it is a prestartBeat or a selected instrument
      console.log('note', note)
      if (type !== ('event')) {
        triggerAudioOnEvent(eighthNotes, type, isLoop, time, note)
      }

      // Call animation on event time.
      // The 'event' sequence is used to trigger events which will trigger UI modifications
      if (type === ('event') && !eighthNotes && note % 2 === 0) {
        Tone.Draw.schedule(() => {
          // Animation triggered from store mutation, invoked close to AudioContext time
          if (name === 'simple-click') {
            triggerEvent(metronomeEvent.value === 0 ? 2 : 0)
          } else {
            console.log('index', note)
            if (note !== null) triggerEvent(note as number | null)
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

  /**
   * Initializes all sequences for a given pattern.
   * @returns {void}
   */
  const initSequences = () => {
    const introSeq = []
    const loopSeq: number[] = []

    if (store.selectedPattern?.nbBeatsInPattern) {
      if (
        store.selectedPattern?.selectedPrestartBeat
      ) {
        // Add prestart beats to intro sequence
        const prestartBeat = store.selectedPattern?.nbBeatsInPattern - store.selectedPattern?.selectedPrestartBeat.value * 2
        for (let i = prestartBeat; i < store.selectedPattern?.nbBeatsInPattern; i++) {
          introSeq.push(i)
        }
      }
      // Add pattern beats to loopable sequence
      for (let i = 0; i < store.selectedPattern?.nbBeatsInPattern; i++) {
        loopSeq.push(i)
      }
    }

    console.log('introSeq', introSeq)
    console.log('loopSeq', loopSeq)

    const instruKeys = soundsData.map((instru: SoundsData) => instru.name)
    instruKeys.push('event')

    // Build all sequences
    sequences.quarterNotes = {
      introduction: {
        prestartBeat: buildSequence(store.selectedPattern?.name, false, ('prestartBeat' as keyof InstruSeqs), introSeq, false),
        event: buildSequence(store.selectedPattern?.name, false, ('event' as keyof InstruSeqs), introSeq, false),
      },
      loop: instruKeys.reduce((acc: Seq, instru: string) => {
        acc[instru as keyof Seq] = buildSequence(store.selectedPattern?.name, false, (instru as keyof InstruSeqs), loopSeq, true)
        return acc
      }, {})
    }

    sequences.eighthNotes = {
      loop: instruKeys.reduce((acc: Seq, instru: string) => {
        if (instru === 'event') return acc
        acc[instru as keyof Seq] = buildSequence(store.selectedPattern?.name, true, (instru as keyof InstruSeqs), loopSeq, true)
        return acc
      }, {})
    }
  }

  const getContext = () => Tone.context

  const isSupported = Tone.supported

  const reinitialize = () => {
    if (store.selectedPattern) {
      initSequences()
      changeTempo(store.selectedPattern.tempo)
      changeSwing(store.selectedPattern.swing)
      forEachValue(sounds as Sounds, (sound, key) => {
        changeVolume({ instrument: key, volume: store.selectedPattern.instruments?.find((i => i.value == key))?.volume ?? 0 })
        changeDecay(store.selectedPattern.globalDecay)
      })
    }
  }

  /**
   * Initializes the metronome.
   * @returns {boolean} - Whether the initialization was successful.
   */
  const initMetronome = async () => {
    Loading.show({
      delay: 0,
      message: 'Loading audio samples',
    })
    return await Tone.loaded()
      .then(() => {
        loadSounds()
        reinitialize()
        Loading.hide()
        return true
      })
      .catch((error) => {
        console.error(error)
        Loading.hide()
        Notify.create({
          message: 'Failed to load the audio samples !',
          color: 'secondary',
          icon: 'error',
        })
        return false
      })
  }


  // =====================
  // Metronome user inputs
  // =====================

  /**
   * Starts all sequences.
   * @returns {void}
   */
  const startSequences = async () => {
    Loading.show({
      delay: 50,
      message: 'Loading…',
    })
    await Tone.start()
    reinitialize()

    const offset = sequences.quarterNotes.introduction?.event?.length || 0
    const loopStart = `0:${offset / 2}`

    console.log('loopStart', loopStart)
    console.log('offset', offset)

    await Tone.Transport.start()
    Loading.hide()

    if (sequences.quarterNotes && sequences.eighthNotes) {
      if (sequences.quarterNotes.introduction?.event?.length !== 0) {
        sequences.quarterNotes.introduction?.event?.start(0).stop(offset)
        sequences.quarterNotes.introduction?.prestartBeat?.start(0).stop(offset)
        forEachValue(sequences.quarterNotes.loop as Seqs, (seq: Tone.Sequence) => {
          seq.start(loopStart)
        })
        forEachValue(sequences.eighthNotes.loop as Seqs, (seq: Tone.Sequence) => {
          seq.start(loopStart)
        })
      } else {
        forEachValue(sequences.quarterNotes.loop as Seqs, (seq: Tone.Sequence) => {
          seq.start(0)
        })
        forEachValue(sequences.eighthNotes.loop as Seqs, (seq: Tone.Sequence) => {
          seq.start(0)
        })
      }
    }

  }

  /**
   * Stops all sequences.
   * @returns {void}
   */
  const stopAllSequences = () => {
    forEachValue(sequences as Seqs, (seq: SeqSubdiv) => {
      forEachValue(seq, (instrus: Seq) => {
        forEachValue(instrus, (s: Tone.Sequence) => {
          if (s !== null && s.state == 'started') s.stop()
          if (s !== null) s.dispose()
        })
      })
    })
    Tone.Transport.stop()
    triggerEvent(null)
    // reinitialize()
  }

  /**
   * Changes the tempo of the metronome.
   * @param {number} tempo - The new tempo.
   * @returns {void}
   */
  const changeTempo = (tempo: number) => {
    Tone.Transport.bpm.value = tempo
  }

  /**
   * Changes the swing of the metronome.
   * @param {number} swing - The new swing.
   * @returns {void}
   */
  const changeSwing = (swing: number) => {
    Tone.Transport.swing = swing
  }

  /**
   * Changes the humanization of the metronome.
   * @param {boolean} humanization - The new humanization.
   * @returns {void}
   */
  const humanize = (humanization: boolean) => {
    // Do nothing if sequences have not been initialized
    if (typeof sequences.quarterNotes === 'undefined') return

    forEachValue(sequences.quarterNotes.loop as Seqs, (seq: Tone.Sequence, type: string) => {
      if (type === 'event' || type === 'prestartBeat' || type === 'click') {
        seq.humanize = false
      } else {
        seq.humanize = humanization
      }
    })
    forEachValue(sequences.eighthNotes as SeqSubdiv, (seq: SeqSubdiv) => {
      forEachValue(seq, (s: Tone.Sequence) => {
        s.humanize = humanization
      })
    })
  }

  /**
   * Changes the volume of the metronome.
   * @param {VolumeOpts} payload - The new volume.
   * @returns {void}
   */
  const changeVolume = async (payload: VolumeOpts) => {
    // increase volume of every player from the sounds instrument by the payload volume
    const sound = sounds[payload.instrument as keyof Sounds]
    forEachValue(sound as Sound, (player: Players) => {
      player.quarter.volume.value = player.quarter.defaultVolume + payload.volume
      player.eighth.volume.value = player.eighth.defaultVolume + payload.volume
    })
  }

  /**
   * Changes the decay of the metronome.
   * @param {DecayOpts} payload - The new decay.
   * @returns {void}
   */
  const changeDecay = async (decay: number) => {
    reverb.decay = decay
  }

  onMounted(() => {
    isSupported().catch(() => {
      Dialog.create({
        title: 'Update your browser!',
        message:
          "Your browser doesn't support one or more technologies used by this app. Please come back with another one or another version of this one.",
        persistent: true
      })
    })
  })

  return {
    audioFormat,
    reverbDecay,
    reverb,
    soundsIsLoaded,
    metronomeEvent,
    loadSounds,
    triggerEvent,
    improvise,
    improviseJaleo,
    triggerPrestartBeatClick,
    triggerAudioOnEvent,
    buildSequence,
    getContext,
    isSupported,
    initSequences,
    initMetronome,
    reinitialize,
    startSequences,
    stopAllSequences,
    changeTempo,
    changeSwing,
    humanize,
    changeVolume,
    changeDecay
  }
}
