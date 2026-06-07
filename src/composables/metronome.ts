import * as Tone from 'tone'
import { ref } from 'vue'
import { Loading, Notify, Dialog, Platform } from 'quasar'
import soundsData from 'src/assets/data/soundsData'
import { usePatternStore } from 'src/stores/patterns'
import { forEachValue } from 'src/utils/utils'
import { AudioPoolService, MobileAudioService, PerformanceMonitor } from 'src/services'
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

// Private variables that can only be used within this file
const sounds: Sounds = {} as Sounds
const sequences: Seqs = {} as Seqs
const quarterChannel = new Tone.Channel(-4, 0).toDestination()
const eighthChannel = new Tone.Channel(0, -0.5).toDestination()

const createMetronome = () => {
  const store = usePatternStore()

  // Feature flag to enable/disable audio optimizations
  const USE_AUDIO_OPTIMIZATIONS = true

  // Audio optimization services
  const audioPoolService = new AudioPoolService()
  const mobileAudioService = new MobileAudioService()
  const performanceMonitor = new PerformanceMonitor()

  const audioFormat = ref<string>('')
  const reverbDecay = ref<number>(0.3)
  const soundsIsLoaded = ref<boolean>(false)
  const metronomeEvent = ref<number | null>(null)
  const reverb = new Tone.Reverb({
    decay: reverbDecay.value,
    preDelay: 0,
    wet: 0.3
  }).toDestination()

  /**
   * Loads all sounds with audio pooling optimization.
   * @returns {void}
   */
  const loadSounds = async (): Promise<void> => {
    try {
      console.log('Starting sound loading process...')
      const publicFolder = Platform.is.electron ? window.electronAPI.getPublicPath() : ''
      const path = `${publicFolder}/audio/`
      const audio = new Audio()

      // Detect supported audio format
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

      console.log('Detected audio format:', audioFormat.value)

      // Original sound loading system (simplified for debugging)
      console.log('Using original sound loading system...')

      soundsData.forEach(({ name, medias }) => {
        sounds[name as keyof Sounds] = {} as Sound

        medias.forEach((media, index) => {
          const url = `${path}${media.src}.${audioFormat.value}`

          const quarterPlayer = new Tone.Player(url).connect(quarterChannel)
          // Appliquer le volume par défaut immédiatement
          quarterPlayer.volume.value = media.volume

          const eighthPlayer = new Tone.Player(url).connect(eighthChannel)
          // Appliquer le volume par défaut immédiatement
          eighthPlayer.volume.value = media.volume

          // Create interface compatible with legacy system
          sounds[name as keyof Sounds][index] = {
            quarter: {
              start: (time?: number) => quarterPlayer.start(time),
              connect: (destination: Tone.Channel) => quarterPlayer.connect(destination),
              volume: quarterPlayer.volume,
              defaultVolume: media.volume
            } as ExtendedPlayer,
            eighth: {
              start: (time?: number) => eighthPlayer.start(time),
              connect: (destination: Tone.Channel) => eighthPlayer.connect(destination),
              volume: eighthPlayer.volume,
              defaultVolume: media.volume
            } as ExtendedPlayer
          } as Players
        })
      })

      // Wait for all sounds to load
      await Tone.loaded()
      quarterChannel.connect(reverb)
      eighthChannel.connect(reverb)

      console.log('Original sound system loaded successfully')
      console.log('Loaded sounds:', sounds)
    } catch (error) {
      console.error('Error in loadSounds:', error)
      throw error
    }
  }

  const triggerEvent = (payload: number | null) => {
    metronomeEvent.value = payload
  }

  /**
   * Improvises a sound on a given note.
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
    if (store.selectedData?.accents.includes((key) as never)) {
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
    if (store.selectedData?.accents.includes((note) as never)) {
      // if the event is a strong beat, sound occurence will be more probable
      playThreshold = 0.94 // 94% chances that the sound is not played
    }
    const playProbability = Math.random()
    if (playProbability > playThreshold) {
      // Pick a random index in the available jaleo sounds
      const jaleoSoundsCount = Object.keys(sounds.jaleos).length
      const randomIndex = Math.round(Math.random() * (jaleoSoundsCount - 1))
      sounds.jaleos[randomIndex][eighthNotes ? 'eighth' : 'quarter'].start(time)
    }
  }

  /**
   * Triggers a click sound on prestart beats.
   */
  const triggerPrestartBeatClick = (
    time: number,
    note: number
  ) => {
    if (
      store.selectedData?.accents &&
      store.prestartBeat &&
      store.prestartBeat > 0 &&
      note % 2 == 0
    ) {
      if (store.selectedData?.accents.includes((note) as never)) {
        sounds.click[0].quarter.start(time)
      } else {
        sounds.click[1].quarter.start(time)
      }
    }
  }

  /**
   * Triggers audio based on the specified parameters.
   */
  const triggerAudioOnEvent = (
    eighthNotes: boolean,
    type: string,
    isLoop: boolean,
    time: number,
    note: number
  ) => {
    // Prepend prestart beats if required
    if (store.selectedPattern?.prestartBeat && type == 'prestartBeat') {
      triggerPrestartBeatClick(time, note)
    } else {
      // Don't play non-prestart sequences if note is during prestart
      if (
        store.selectedPattern?.prestartBeat?.value &&
        note < store.selectedPattern?.prestartBeat?.value * 2 &&
        !isLoop
      ) {
        return
      }

      const instru = store.instrument((type as string))

      if (type == 'jaleos') {
        if (instru?.enabled) improviseJaleo(note, time, eighthNotes)
        return
      }

      // index is a pulsation number, value is the sound number
      if (instru?.enabled && store.selectedPattern && type) {
        const sequences = store.selectedData.sequences[type as keyof InstruSeqs] as (number | null)[]

        sequences.forEach(
          (value: number | null, index: number) => {
            if (!value) return

            const sound: Players = sounds[type as keyof Sounds][value - 1] as Players

            if (
              eighthNotes &&
              instru?.eighthNotes &&
              (index as number) % 2 != 0 &&
              note == index
            ) {
              const player = sound[eighthNotes ? 'eighth' : 'quarter']
              try {
                if (store.selectedPattern?.improvisation) {
                  improvise(type, time, player, note, index, eighthNotes)
                } else {
                  player.start(time)
                }
              } catch (error) {
                console.error('Error calling player.start():', error)
              }
            } else if (!eighthNotes && (index as number) % 2 == 0 && note == index) {
              const player = sound[eighthNotes ? 'eighth' : 'quarter']
              try {
                if (store.selectedPattern?.improvisation) {
                  improvise(type, time, player, note, index, eighthNotes)
                } else {
                  player.start(time)
                }
              } catch (error) {
                console.error('Error calling player.start():', error)
              }
            }
          }
        )
      }
    }
  }

  /**
   * Builds a compas sequence from a pattern.
   */
  const buildSequence = (
    name: string | undefined,
    eighthNotes: boolean,
    type: string,
    sequence: number[],
    isLoop: boolean
  ) => {
    // 'note' is an occurence of an element inside the sequence variable (integer)
    const seq = new Tone.Sequence((time, note) => {
      // Type is not an event, it is a prestartBeat or a selected instrument

      // Call animation on event time.
      // The 'event' sequence is used to trigger events which will trigger UI modifications
      if (type === ('event') && !eighthNotes && note % 2 === 0) {
        Tone.Draw.schedule(async() => {
          // Animation triggered from store mutation, invoked close to AudioContext time
          if (name === 'simple-click') {
            triggerEvent(metronomeEvent.value === 0 ? 2 : 0)
          } else {
            if (note !== null) triggerEvent(note as number | null)
          }
        }, time) // Use AudioContext time of the event
      } else {
        triggerAudioOnEvent(eighthNotes, type, isLoop, time, note)
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
   */
  const initSequences = async (): Promise<void> => {
    const introSeq = []
    const loopSeq: number[] = []

    if (store.selectedData?.nbBeatsInPattern) {
      if (
        store.prestartBeat
      ) {
        // Add prestart beats to intro sequence
        const prestartBeat = store.selectedData?.nbBeatsInPattern - store.selectedPattern?.prestartBeat.value * 2
        for (let i = prestartBeat; i < store.selectedData?.nbBeatsInPattern; i++) {
          introSeq.push(i)
        }
      }
      // Add pattern beats to loopable sequence
      for (let i = 0; i < store.selectedData?.nbBeatsInPattern; i++) {
        loopSeq.push(i)
      }
    }

    const instruKeys = soundsData.map((instru: SoundsData) => instru.name)
    instruKeys.push('event')

    // Build all sequences
    sequences.quarterNotes = {
      introduction: {
        prestartBeat: buildSequence(store.selectedData?.name, false, ('prestartBeat' as keyof InstruSeqs) as string, introSeq, false),
        event: buildSequence(store.selectedPattern?.name, false, ('event' as keyof InstruSeqs) as string, introSeq, false),
      },
      loop: instruKeys.reduce((acc: Seq, instru: string) => {
        acc[instru as keyof Seq] = buildSequence(store.selectedPattern?.name, false, (instru as keyof InstruSeqs) as string, loopSeq, true)
        return acc
      }, {})
    }

    sequences.eighthNotes = {
      loop: instruKeys.reduce((acc: Seq, instru: string) => {
        if (instru === 'event') return acc
        acc[instru as keyof Seq] = buildSequence(store.selectedPattern?.name, true, (instru as keyof InstruSeqs) as string, loopSeq, true)
        return acc
      }, {})
    }
  }

  const getContext = () => Tone.getContext()
  const getTransport = () => Tone.getTransport()
  const isSupported = Tone.supported

  const reinitialize = async (): Promise<void> => {
    if (store.selectedPattern) {
      await initSequences()
      await changeTempo(store.tempo)
      await changeSwing(store.swing)
      forEachValue(sounds as Sounds, async (sound, key) => {
        await changeVolume({ instrument: key, volume: store.instruments?.find((i => i.value == key))?.volume ?? 0 })
        await changeDecay(store.globalDecay)
      })
    }
  }

  /**
   * Initializes the metronome.
   */
  const initMetronome = async () => {
    await checkBrowserSupport()
    return await Tone.loaded()
      .then(async () => {
        await loadSounds()
        await reinitialize()
        soundsIsLoaded.value = true
        console.log('Metronome initialized successfully')
        return true
      })
      .catch((error) => {
        console.error(error)
        soundsIsLoaded.value = false
        Notify.create({
          message: 'Failed to load the audio samples !',
          color: 'secondary',
          icon: 'mdi-alert-circle-outline',
        })
        return false
      })
  }

  /**
   * Starts all sequences.
   */
  const startSequences = async (): Promise<void> => {
    Loading.show({
      delay: 0,
      message: 'Initializing audio…',
    })

    try {
      await Tone.start()
      console.log('Audio context state:', Tone.context.state)

      await reinitialize()

      const offset = sequences.quarterNotes.introduction?.event?.length || 0
      const loopStart = `0:${offset / 2}`

      getTransport().start()
      Loading.hide()

      if (sequences.quarterNotes && sequences.eighthNotes) {
        if (sequences.quarterNotes.introduction?.event?.length !== 0) {
          sequences.quarterNotes.introduction?.event?.start(0).stop(offset)
          sequences.quarterNotes.introduction?.prestartBeat?.start(0).stop(offset)

          forEachValue(sequences.quarterNotes.loop as Seq, (seq: Tone.Sequence) => {
            seq.start(loopStart)
          })
          forEachValue(sequences.eighthNotes.loop as Seq, (seq: Tone.Sequence) => {
            seq.start(loopStart)
          })
        } else {
          forEachValue(sequences.quarterNotes.loop as Seq, (seq: Tone.Sequence) => {
            seq.start(0)
          })
          forEachValue(sequences.eighthNotes.loop as Seq, (seq: Tone.Sequence) => {
            seq.start(0)
          })
        }
      }

      console.log('Sequences started successfully')
    } catch (error) {
      Loading.hide()
      console.error('Failed to start sequences:', error)

      Notify.create({
        message: 'Failed to start audio sequences. Please try again.',
        color: 'negative',
        icon: 'mdi-alert-circle-outline',
        timeout: 3000
      })

      throw error
    }
  }

  /**
   * Stops all sequences.
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

    getTransport().stop()
    triggerEvent(null)
  }

  /**
   * Changes the tempo of the metronome.
   */
  const changeTempo = async (tempo: number): Promise<void> => {
    getTransport().bpm.value = tempo
  }

  /**
   * Changes the swing of the metronome.
   */
  const changeSwing = async (swing: number): Promise<void> => {
    getTransport().swing = swing
  }

  /**
   * Changes the humanization of the metronome.
   */
  const humanize = async (humanization: boolean): Promise<void> => {
    // Do nothing if sequences have not been initialized
    if (typeof sequences.quarterNotes === 'undefined') return

    forEachValue(sequences.quarterNotes.loop as Seq, (seq: Tone.Sequence, type: string) => {
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
   */
  const changeVolume = async (payload: VolumeOpts): Promise<void> => {
    try {
      // Update legacy system for compatibility
      const sound = sounds[payload.instrument as keyof Sounds]
      if (sound) {
        forEachValue(sound as Sound, (player: Players) => {
          if (player.quarter.volume) {
            // Appliquer le volume en combinant defaultVolume + offset demandé
            const baseVolume = player.quarter.defaultVolume || 0
            player.quarter.volume.value = baseVolume + payload.volume
          }
          if (player.eighth.volume) {
            // Appliquer le volume en combinant defaultVolume + offset demandé
            const baseVolume = player.eighth.defaultVolume || 0
            player.eighth.volume.value = baseVolume + payload.volume
          }
        })
      }
    } catch (error) {
      console.warn('Error changing volume:', error)
    }
  }

  /**
   * Gets performance information from all monitoring services.
   */
  const getPerformanceInfo = () => {
    return {
      audioState: Tone.context.state,
      audioPerformance: {
        latency: Tone.context.lookAhead * 1000, // Convert to ms
        contextState: Tone.context.state,
        sampleRate: Tone.context.sampleRate
      },
      poolStats: audioPoolService.getStats(),
      isInitialized: soundsIsLoaded.value,
      performanceReport: performanceMonitor.getPerformanceReport()
    }
  }

  /**
   * Resets performance monitoring data.
   */
  const resetPerformanceData = () => {
    performanceMonitor.reset()
  }

  /**
   * Logs a detailed performance report to console.
   */
  const logPerformanceReport = () => {
    performanceMonitor.logReport()
  }

  /**
   * Changes the decay of the metronome.
   */
  const changeDecay = async (decay: number): Promise<void> => {
    reverb.decay = decay
  }

  /**
   * Warns the user if the browser lacks the Web Audio support required by
   * the app. `Tone.supported` resolves to `false` (it does not reject) when
   * unsupported, so we inspect the resolved value rather than catching.
   * Called from initMetronome() so it runs in a real runtime context, not
   * during Pinia store setup (where component lifecycle hooks are unavailable).
   */
  const checkBrowserSupport = async (): Promise<void> => {
    const supported = await isSupported().catch(() => false)
    if (!supported) {
      Dialog.create({
        title: 'Update your browser!',
        message:
          "Your browser doesn't support one or more technologies used by this app. Please come back with another one or another version of this one.",
        persistent: true
      })
    }
  }

  return {
    // Reactive states
    audioFormat,
    reverbDecay,
    reverb,
    soundsIsLoaded,
    metronomeEvent,

    // Basic audio functions
    loadSounds,
    triggerEvent,
    improvise,
    improviseJaleo,
    triggerPrestartBeatClick,
    triggerAudioOnEvent,
    buildSequence,

    // Context functions
    getContext,
    isSupported,
    checkBrowserSupport,

    // Initialization functions
    initSequences,
    initMetronome,
    reinitialize,

    // Metronome controls
    startSequences,
    stopAllSequences,
    changeTempo,
    changeSwing,
    humanize,
    changeVolume,
    changeDecay,

    // Performance monitoring
    getPerformanceInfo,
    resetPerformanceData,
    logPerformanceReport,

    // Services (for debugging/monitoring)
    audioPoolService,
    mobileAudioService,
    performanceMonitor
  }
}

// Single shared metronome instance. The audio graph (channels, reverb),
// the optimization services and the reactive state must be unique across the
// whole app: the Pinia store and any component (e.g. the performance panel)
// have to drive the *same* metronome, not separate detached copies.
let metronomeInstance: ReturnType<typeof createMetronome> | null = null

/**
 * Returns the shared metronome singleton, creating it on first use.
 *
 * The first call happens during the patterns store setup; the re-entrant
 * `usePatternStore()` inside `createMetronome` resolves to the store proxy
 * Pinia has already registered, so no recursion occurs. Only call this once
 * the patterns store can be initialized (i.e. from within Pinia/components).
 */
export const useMetronome = () => {
  if (!metronomeInstance) {
    metronomeInstance = createMetronome()
  }
  return metronomeInstance
}
