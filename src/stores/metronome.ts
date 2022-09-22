import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Notify } from 'quasar'
import { useStorage } from '@vueuse/core'
import palosData from 'src/data/palosData'
import { forEachValue } from 'src/composables/utils'
import type {
  numOpts,
  instruOpts,
  Size,
  Volume,
  stringOpts,
  Palo,
} from 'src/composables/models'
import { useMetronome } from 'src/composables/metronome'

export const useMetronomeStore = defineStore('metronome', () => {
  const {
    initMetronome,
    isSupported,
    initSequences,
    startSequences,
    stopAllSequences,
    humanize,
    changeSwing,
    changeTempo,
    changeVolume,
  } = useMetronome()

  // STATE
  const visualizationModes = ref<stringOpts[]>([
    { label: 'Dots', value: 'dots' },
    { label: 'Counter', value: 'counter' },
    { label: 'Clock', value: 'clock' },
  ])
  const visualizationSize = ref<Size>({ width: null, height: null })
  const selectedVisualizationMode = useStorage(
    'selectedVisualizationMode',
    ref<string>('dots')
  )
  const palos = useStorage('palos', ref<Palo[]>(palosData))
  const selectedPalo = useStorage('selectedPalo', ref<Palo>(palosData[0]))
  const instruments = useStorage(
    'instruments',
    ref<instruOpts[]>([
      {
        label: 'Claras',
        value: 'clara',
        enabled: true,
        eighthNotes: false,
        volume: 0,
      },
      {
        label: 'Sordas',
        value: 'sorda',
        enabled: false,
        eighthNotes: false,
        volume: 0,
      },
      {
        label: 'Nudillos',
        value: 'nudillo',
        enabled: true,
        eighthNotes: null,
        volume: 0,
      },
      {
        label: 'Cajon',
        value: 'cajon',
        enabled: false,
        eighthNotes: false,
        volume: 0,
      },
      {
        label: 'Udu',
        value: 'udu',
        enabled: false,
        eighthNotes: false,
        volume: 0,
      },
      {
        label: 'Jaleo',
        value: 'jaleo',
        enabled: false,
        eighthNotes: null,
        volume: 0,
      },
      {
        label: 'Click',
        value: 'click',
        enabled: false,
        eighthNotes: null,
        volume: 0,
      },
    ])
  )
  const preCounts = ref<numOpts[]>(palosData[0].preCounts)
  const selectedPreCount = useStorage(
    'selectedPreCount',
    ref<numOpts>(palosData[0].preCounts[0])
  )
  const startBeats = ref<numOpts[]>(palosData[0].startBeats)
  const selectedStartBeat = useStorage(
    'selectedStartBeat',
    ref<numOpts>(palosData[0].startBeats[0])
  )
  const tempo = ref<number>(palosData[0].defaultTempo)
  const swing = ref<number | null>(0)
  const improvisation = ref<boolean>(false)
  const humanization = ref<boolean>(false)
  const isPlaying = ref<boolean>(false)
  const metronomeEvent = ref<number | null>(null)
  const isTooSlow = ref<boolean>(false)
  const isTooFast = ref<boolean>(false)

  // GETTERS
  const nbBeatsInPattern = computed(
    () => selectedPalo.value.nbBeatsInPattern as number
  )
  const beatLabels = computed(() => selectedPalo.value.beatLabels)
  const accents = computed(() => selectedPalo.value.accents)
  const alpha = computed(() => 360 / (selectedPalo.value.nbBeatsInPattern / 2))
  const velocity = computed(() => Math.floor(60000 / tempo.value))
  const startingPoint = computed(
    () => selectedStartBeat.value.value / 2 - selectedPreCount.value.value
  )
  const instrument = computed(
    () => (slug: string) => instruments.value.find((o) => o.value === slug)
  )
  const selectedInstruments = computed(() =>
    instruments.value.filter((i) => i.enabled)
  )
  const unselectedInstruments = computed(() =>
    instruments.value.filter((i) => !i.enabled)
  )

  // ACTIONS
  const init = () => {
    initMetronome()
  }

  const play = async () => {
    isPlaying.value = true
    await initSequences()
    startSequences()
  }

  const stop = () => {
    isPlaying.value = false
    stopAllSequences()
  }

  const playStop = () => {
    if (isPlaying.value) {
      stop()
      triggerEvent(null)
    } else {
      play()
    }
  }

  const selectVisualizationMode = (payload: string) => {
    selectedVisualizationMode.value = payload
  }

  const getVisualizationSize = (payload: Size) => {
    visualizationSize.value = payload
  }

  const selectPalo = (payload: string) => {
    if (isPlaying.value) stop()
    selectedPalo.value = palos.value.find((p) => p.value === payload)
    initSequences()
    selectTempo(selectedPalo.value.defaultTempo)
  }

  const selectTempo = (payload: number) => {
    tempo.value = payload
    changeTempo(tempo.value)

    if (
      tempo.value < selectedPalo.value.minTempo ||
      tempo.value > selectedPalo.value.maxTempo
    ) {
      Notify.create({
        message:
          'Tempo must be between ' +
          selectedPalo.value.minTempo +
          ' and ' +
          selectedPalo.value.maxTempo +
          ' bpm !',
        color: 'warning',
        icon: 'warning',
      })
      return
    }

    if (tempo.value > selectedPalo.value.fastTempo && !isTooFast.value) {
      isTooFast.value = true
      Notify.create({
        message: selectedPalo.value.fastMessage,
        color: 'secondary',
        icon: 'warning',
      })
    } else if (tempo.value < selectedPalo.value.fastTempo && isTooFast.value) {
      isTooFast.value = false
    }

    if (tempo.value < selectedPalo.value.slowTempo && !isTooSlow.value) {
      isTooSlow.value = true
      Notify.create({
        message: selectedPalo.value.slowMessage,
        color: 'secondary',
        icon: 'warning',
      })
    } else if (tempo.value > selectedPalo.value.slowTempo && isTooSlow.value) {
      isTooSlow.value = false
    }
  }

  const selectVolume = (payload: Volume) => {
    if (payload !== null) {
      const volume = payload?.volume
      const instru = instrument.value(payload?.instrument)
      if (instru !== undefined) instru.volume = volume
      changeVolume(payload)
    }
  }

  const selectSwing = (payload: number | null) => {
    if (payload !== null) {
      swing.value = payload
      changeSwing(swing.value)
    }
  }

  const selectInstruments = async (key: string, payload: boolean) => {
    const instru = instrument.value(key)
    if (instru) {
      instru.enabled = payload
    }
  }

  const selectPreCount = (payload: numOpts) => {
    selectedPreCount.value = payload
  }

  const selectStartBeat = (payload: numOpts) => {
    selectedStartBeat.value = payload
  }

  const toggleEighthNotes = (payload: instruOpts) => {
    const instru: instruOpts | undefined = instruments.value.find(
      (i) => i.value === payload.value
    )
    if (instru) instru.eighthNotes = !instru.eighthNotes
  }

  const enableEighthNotes = (payload: instruOpts) => {
    const instru: instruOpts | undefined = instruments.value.find(
      (i) => i.value === payload.value
    )
    if (instru) instru.eighthNotes = true
  }

  const disableEighthNotes = (payload: instruOpts) => {
    const instru: instruOpts | undefined = instruments.value.find(
      (i) => i.value === payload.value
    )
    if (instru) instru.eighthNotes = false
  }

  const toggleImprovise = () => {
    improvisation.value = !improvisation.value
  }

  const enableImprovise = () => {
    improvisation.value = true
  }

  const disableImprovise = () => {
    improvisation.value = false
  }

  const toggleHumanize = () => {
    humanization.value = !humanization.value
    humanize()
  }

  const enableHumanize = () => {
    humanization.value = true
    humanize()
  }

  const disableHumanize = () => {
    humanization.value = false
    humanize()
  }

  const triggerEvent = (payload: number | null) => {
    metronomeEvent.value = payload
  }

  const restoreDefault = (payload: string) => {
    if (isPlaying.value) stop()
    // if (payload === 'all') commit(types.RESET_STORAGE)

    selectTempo(selectedPalo.value.defaultTempo)
    selectSwing(0)
    forEachValue(instruments.value, (instrument: instruOpts) => {
      disableEighthNotes(instrument)
      selectVolume({ instrument: instrument.value, volume: 0 })
    })
    disableHumanize()
    disableImprovise()
    selectVisualizationMode('dots')
    selectPreCount(selectedPalo.value.preCounts[0])
    selectStartBeat(selectedPalo.value.startBeats[0])
  }

  return {
    // STATE
    visualizationModes,
    visualizationSize,
    selectedVisualizationMode,
    palos,
    selectedPalo,
    instruments,
    preCounts,
    selectedPreCount,
    startBeats,
    selectedStartBeat,
    tempo,
    swing,
    improvisation,
    humanization,
    isPlaying,
    metronomeEvent,
    isTooSlow,
    isTooFast,

    // GETTERS
    nbBeatsInPattern,
    beatLabels,
    accents,
    alpha,
    velocity,
    startingPoint,
    instrument,
    selectedInstruments,
    unselectedInstruments,

    // ACTIONS
    init,
    play,
    stop,
    playStop,
    selectVisualizationMode,
    getVisualizationSize,
    selectPalo,
    selectTempo,
    selectVolume,
    selectSwing,
    selectInstruments,
    selectPreCount,
    selectStartBeat,
    toggleEighthNotes,
    enableEighthNotes,
    changeTempo,
    disableEighthNotes,
    toggleImprovise,
    enableImprovise,
    disableImprovise,
    toggleHumanize,
    enableHumanize,
    disableHumanize,
    triggerEvent,
    restoreDefault,
  }
})
