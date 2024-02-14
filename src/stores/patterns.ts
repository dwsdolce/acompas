import { ref, reactive, computed, onMounted, onUpdated, watch } from 'vue'
import { Notify, Platform } from 'quasar'
import { defineStore, storeToRefs } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'
import soundsData from 'src/assets/data/soundsData'
// import patternsData from 'src/assets/data/patternsData'
import { useMetronome } from 'src/composables/metronome'
import { useMatomo } from 'src/composables/matomo'
import { useKeepAwake } from 'src/composables/keep-awake'
import { useContextStore } from 'src/stores/context'
import { getDefaultPatterns } from 'src/utils/utils'
import type {
  numOpts,
  instruOpts,
  VolumeOpts,
  PatternState,
  PatternSetting
} from 'src/utils/types'

const defaultPatterns = await getDefaultPatterns()
console.log('defaultPatterns', defaultPatterns)

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
  const patterns = useStorage('patterns', ref<PatternSetting[]>([]))
  const selectedPatternName = useStorage('selected-pattern-name', ref('alegria'))



  const selectedDefaultPattern = computed(() =>
    defaultPatterns.find((el: PatternState) => el.name === route.name) as PatternState
  )

  const selectedPattern = computed(() =>
    patterns.value?.find((el: PatternSetting) => el.name === route.name) as PatternSetting
  )

  const tempo = computed({
    get: () => selectedPattern.value?.tempo ?? defaultPatterns.find(el => el.name === selectedPattern.value.name).defaultTempo,
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
    get: () => selectedPattern.value?.swing ?? 0,
    set: (value: number) => {
      if (selectedPattern.value) {
        selectedPattern.value.swing = value
        changeSwing(value)
      }
    }
  })

  const prestartBeat = computed({
    get: () => selectedPattern.value?.prestartBeat?.value ?? 0,
    set: (value: number) => {
      if (selectedPattern.value) {
        selectedPattern.value.prestartBeat
          = selectedDefaultPattern.value.prestartBeats.find(el => el?.value === value)
          || (selectedDefaultPattern.value.prestartBeats[0] as numOpts)
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

  const buildPattern = (patternDefault: PatternState): PatternSetting => {
    const tmp: PatternSetting = {} as PatternSetting

    tmp.context = patternDefault.context || ''
    tmp.tempo = patternDefault.defaultTempo
    tmp.swing = patternDefault.name === 'tientos' ? 0.6 : 0
    tmp.globalDecay = 0.5
    tmp.improvisation = false
    tmp.humanization = false
    tmp.prestartBeat = patternDefault.prestartBeats[0]

    tmp.instruments = soundsData.map((audio) => {
      return {
        label: audio.label,
        value: audio.name,
        enabled: false,
        eighthNotes: audio.noEighthNotes ? null : false,
        volume: 0
      }
    })

    tmp.instruments[0].enabled = true
    // tmp.isTooFast = false
    // tmp.isTooSlow = false

    return tmp
  }

  const buildPatterns = async () => {
    if (patterns.value.length == 0) {
      patterns.value = defaultPatterns.map((patternDefault) => buildPattern(patternDefault))
    }
  }

  const rebuildPattern = (patternData: PatternState) => {
    patterns.value[patterns.value.findIndex((el) => el.name === patternData.name)] = buildPattern(patternData)
  }

  const play = async () => {
    if (selectedPattern.value) {
      isPlaying.value = true
      startSequences()
      if (matomoExists()) trackPlay()
      if (await isSupported()) keepAwake()
    }
  }

  const stop = async () => {
    isPlaying.value = false
    stopAllSequences()
    if (matomoExists()) trackStop()
    if (await isSupported()) allowSleep()
    reinitialize()
  }

  const playStop = () => {
    isPlaying.value ? stop() : play()
  }

  const selectTempo = (payload: number) => {
    if (selectedPattern.value) {
      selectedPattern.value.tempo = payload
      changeTempo(selectedPattern.value.tempo)
      if (
        selectedPattern.value.tempo < selectedDefaultPattern.value.minTempo ||
        selectedPattern.value.tempo > selectedDefaultPattern.value.maxTempo
      ) {
        Notify.create({
          message:
            'Tempo must be between ' +
            selectedDefaultPattern.value.minTempo +
            ' and ' +
            selectedDefaultPattern.value.maxTempo +
            ' bpm !',
          color: 'warning',
          icon: 'warning',
        })
      }

      if (selectedPattern.value.tempo > selectedDefaultPattern.value.fastTempo) {
        Notify.create({
          message: selectedDefaultPattern.value.fastMessage,
          color: 'secondary',
          icon: 'warning',
        })
      }

      if (selectedPattern.value.tempo < selectedDefaultPattern.value.slowTempo) {
        Notify.create({
          message: selectedDefaultPattern.value.slowMessage,
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
      const newPattern = buildPattern(defaultPatterns.find(el => el.name === payload) as PatternState)
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
    rebuildPattern,
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
