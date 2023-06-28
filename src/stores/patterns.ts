import { ref, reactive, computed, onMounted, onUpdated, watch } from 'vue'
import { Notify, Platform } from 'quasar'
import { defineStore, storeToRefs } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'
import soundsData from 'src/data/soundsData'
import patternsData from 'src/data/patternsData'
import { useMetronome } from 'src/composables/metronome'
import { useMatomo } from 'src/composables/matomo'
import { useKeepAwake } from 'src/composables/keep-awake'
import type {
  numOpts,
  instruOpts,
  VolumeOpts,
  PatternState
} from 'src/utils/types'

export const usePatternStore = defineStore('patterns', () => {
  const router = useRouter()
  const route = useRoute()

  const {
    metronomeEvent,
    getContext,
    reinitialize,
    initSequences,
    initMetronome,
    startSequences,
    stopAllSequences,
    changeTempo,
    changeSwing,
    humanize,
    changeVolume,
    changeDecay
  } = useMetronome()

  const {
    isSupported,
    keepAwake,
    allowSleep
  } = useKeepAwake()

  const {
    matomoExists,
    trackPlay,
    trackStop
  } = useMatomo()


  const isPlaying = ref<boolean>(false)
  const patterns = useStorage('patterns', ref<PatternState[]>([]))
  const selectedVisualizationMode = useStorage('visualization-mode', ref('dots'))
  const selectedPatternName = useStorage('selected-pattern-name', ref('alegria'))

  const visualizationModes = ref([
    { label: 'Dots', value: 'dots' },
    { label: 'Counter', value: 'counter' },
    { label: 'Clock', value: 'clock' }
  ])

  const selectedPattern = computed(() =>
    patterns.value?.find((el: PatternState) => el.name === route.name) as PatternState
  )

  const visualizationMode = computed({
    get: () => selectedVisualizationMode.value,
    set: (value: string) => {
      selectedVisualizationMode.value = value
    }
  })

  const tempo = computed({
    get: () => selectedPattern.value?.tempo,
    set: (value: number) => {
      if (selectedPattern.value) {
        selectTempo(value)
      }
    }
  })

  const improvisation = computed({
    get: () => selectedPattern.value?.improvisation ?? false,
    set: (value: boolean) => {
      if (selectedPattern.value) {
        selectedPattern.value.improvisation = value
      }
    }
  })

  const humanization = computed({
    get: () => selectedPattern.value?.humanization ?? false,
    set: (value: boolean) => {
      if (selectedPattern.value) {
        selectedPattern.value.humanization = value
        humanize(value)
      }
    }
  })

  const swing = computed({
    get: () => selectedPattern.value?.swing,
    set: (value: number) => {
      if (selectedPattern.value) {
        selectedPattern.value.swing = value
        changeSwing(value)
      }
    }
  })

  const prestartBeat = computed({
    get: () => selectedPattern.value?.selectedPrestartBeat?.value ?? 0,
    set: (value: number) => {
      if (selectedPattern.value) {
        selectedPattern.value.selectedPrestartBeat
          = selectedPattern.value.prestartBeats.find(el => el?.value === value)
          || (selectedPattern.value.prestartBeats[0] as numOpts)
        stop()
      }
    }
  })

  const globalDecay = computed({
    get: () => selectedPattern.value?.globalDecay ?? 0.5,
    set: (value: number) => {
      if (selectedPattern.value) {
        selectedPattern.value.globalDecay = value
        changeDecay(value)
      }
    }
  })

  const instruments = computed({
    get: () => selectedPattern.value?.instruments ?? [],
    set: (value: instruOpts[]) => {
      if (selectedPattern.value) {
        selectedPattern.value.instruments = value
      }
    }
  })

  const selectedInstruments = computed(() =>
    selectedPattern.value?.instruments?.filter((i: instruOpts) => i.enabled)
  )

  const unselectedInstruments = computed(() =>
    selectedPattern.value?.instruments?.filter((i: instruOpts) => !i.enabled)
  )

  const beatLabels = computed(() =>
    selectedPattern.value?.sequences?.beatLabels
  )

  const instrument = (slug: string): instruOpts | undefined =>
    instruments.value.find((el: instruOpts) => el.value === slug)

  const buildPattern = (patternData: PatternState) => {
    const tmp: PatternState = patternData
    tmp.instruments = soundsData.map((audio) => {
      return {
        label: audio.label,
        value: audio.name,
        enabled: false,
        eighthNotes: audio.noEighthNotes ? null : false,
        volume: 0
      }
    })
    tmp.tempo = patternData.defaultTempo
    tmp.isTooFast = false
    tmp.isTooSlow = false
    tmp.swing = patternData.name === 'tientos' ? 0.6 : 0
    tmp.improvisation = false
    tmp.humanization = false
    tmp.globalDecay = 0.5
    tmp.instruments[0].enabled = true
    return tmp
  }

  const buildPatterns = () => {
    if (patterns.value.length == 0) {
      patterns.value = patternsData.map((patternData) => buildPattern(patternData))
    }
  }

  const play = async () => {
    if (selectedPattern.value) {
      isPlaying.value = true
      startSequences()
      if (matomoExists()) trackPlay(selectedPattern.value.name)
      if (Platform.is.capacitor && await isSupported()) keepAwake()
    }
  }

  const stop = async () => {
    isPlaying.value = false
    stopAllSequences()
    if (matomoExists()) trackStop(selectedPattern.value?.name)
    if (Platform.is.capacitor && await isSupported()) allowSleep()
    reinitialize()
  }

  const playStop = () => {
    isPlaying.value ? stop() : play()
  }

  const selectVisualizationMode = (payload: string) => {
    if (isPlaying.value) stop()
    if (selectedPattern.value) selectedPattern.value.visualizationMode = payload
  }

  const selectTempo = (payload: number) => {
    if (selectedPattern.value) {
      selectedPattern.value.tempo = payload
      changeTempo(selectedPattern.value.tempo)
      if (
        selectedPattern.value.tempo < selectedPattern.value.minTempo ||
        selectedPattern.value.tempo > selectedPattern.value.maxTempo
      ) {
        Notify.create({
          message:
            'Tempo must be between ' +
            selectedPattern.value.minTempo +
            ' and ' +
            selectedPattern.value.maxTempo +
            ' bpm !',
          color: 'warning',
          icon: 'warning',
        })
      }

      if (selectedPattern.value.tempo > selectedPattern.value.fastTempo) {
        Notify.create({
          message: selectedPattern.value.fastMessage,
          color: 'secondary',
          icon: 'warning',
        })
      }

      if (selectedPattern.value.tempo < selectedPattern.value.slowTempo) {
        Notify.create({
          message: selectedPattern.value.slowMessage,
          color: 'secondary',
          icon: 'warning',
        })
      }
    }
  }

  const selectInstruments = (key: string, payload: boolean) => {
    const instru = instrument(key)
    if (instru) {
      instru.enabled = payload
    }
  }

  const toggleEighthNotes = (key: string) => {
    const instru = instrument(key)
    if (instru) instru.eighthNotes = !instru.eighthNotes
  }

  const selectVolume = (payload: VolumeOpts) => {
    if (payload !== null) {
      const volume = payload?.volume
      const instru = instrument(payload?.instrument)
      if (instru !== undefined) instru.volume = volume
      changeVolume(payload)
    }
  }

  const restoreDefault = (payload: string) => {
    if (isPlaying.value) stop()
    if (payload === 'all') {
      patterns.value = []
      buildPatterns()
    } else {
      const existingPattern = patterns.value.find((el) => el.name === route.name) as PatternState
      const newPattern = buildPattern(patternsData.find(el => el.name === payload) as PatternState)
      Object.assign(existingPattern, newPattern)
    }
    router.go(0)
  }

  onMounted(() => {
    buildPatterns()
    initMetronome()
    initSequences()
  })

  onUpdated(() => {
    stop()
  })

  watch(selectedInstruments, (value) => {
    if (value?.length === 0) {
      Notify.create({
        message: 'At least one instrument must be selected !',
        color: 'secondary',
        icon: 'warning'
      })
    }
  })

  watch(selectedPattern, (value) => {
    if (value) {
      selectedPatternName.value = value.name
    }
  })

  return {
    metronomeEvent,
    isPlaying,
    patterns,
    visualizationModes,
    visualizationMode,
    selectedPattern,
    selectedPatternName,
    beatLabels,
    tempo,
    improvisation,
    humanization,
    swing,
    prestartBeat,
    selectedInstruments,
    unselectedInstruments,
    instruments,
    globalDecay,
    // numLabels,
    instrument,
    buildPatterns,
    play,
    stop,
    playStop,
    selectVisualizationMode,
    selectInstruments,
    selectVolume,
    toggleEighthNotes,
    selectTempo,
    restoreDefault,
    getContext
  }
})
