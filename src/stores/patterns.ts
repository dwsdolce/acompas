import { ref, reactive, computed, onMounted, onUpdated, watch } from 'vue'
import { Notify, Platform, colors, setCssVar } from 'quasar'
import { defineStore, storeToRefs } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'
import soundsData from 'src/assets/data/soundsData'
import { useMetronome } from 'src/composables/metronome'
import { useMatomo } from 'src/composables/matomo'
import { useKeepAwake } from 'src/composables/keep-awake'
import type {
  numOpts,
  instruOpts,
  VolumeOpts,
  PatternState,
  PatternSetting,
  ContextOption
} from 'src/utils/types'


export const usePatternStore = defineStore('patterns', () => {
  const router = useRouter()
  const route = useRoute()

  const { getPaletteColor } = colors

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

  // **************
  // State
  // **************

  const isPlaying = ref<boolean>(false)
  const data = ref<PatternState[]>([] as PatternState[])
  const patterns = useStorage('patterns', ref<PatternSetting[]>([]))
  const selectedPatternName = useStorage('selected-pattern-name', ref('alegria'))
  const selectedContextName = useStorage('selected-context-name', ref('flamenco'))
  const contexts = ref<ContextOption[]>([
    { label: 'Flamenco', value: 'flamenco', colors: { primary: 'red-6', secondary: 'red-10' }},
    { label: 'Afro-Cuban', value: 'afro-cuban', colors: { primary: 'orange-6', secondary: 'orange-10' }},
    { label: 'Afro-Brazilian', value: 'afro-brazilian', colors: { primary: 'purple-6', secondary: 'purple-10' }},
    { label: 'Fundamental Global', value: 'fundamental-global', colors: { primary: 'light-blue-6', secondary: 'light-blue-10' }},
    { label: 'Ternary African', value: 'ternary-african', colors: { primary: 'teal-6', secondary: 'teal-10' }}
  ])

  // **************
  // Computed
  // **************

  const selectedContext = computed(() => {
    const name = route.params.context ? route.params.context : selectedContextName.value
    return contexts.value.find((el: ContextOption) => el.value === name) as ContextOption
  })

  const selectedPattern = computed(() => {
    const name = route.params.pattern ? route.params.pattern : selectedPatternName.value
    return patterns.value?.find((el: PatternSetting) => el.name === name) as PatternSetting
  })

  const selectedData = computed(() => {
    const name = route.params.pattern ? route.params.pattern : selectedPatternName.value
    return data.value.find((el: PatternState) => el.name === name) as PatternState
  })

  const patternsInSelectedContext = computed(() => {
    return data.value.filter((el: PatternState) => el.context === route.params.context).map((el: PatternState) => ({ label: el.label, value: el.name }))
  })

  const tempo = computed({
    get: () => selectedPattern.value?.tempo ?? selectedData.value?.defaultTempo,
    set: (value: number) => {
      if (selectedPattern.value) {
        selectedPattern.value.tempo = value
        changeTempo(value)

        if (selectedData.value && value > selectedData.value.fastTempo) {
          Notify.create({
            message: selectedData.value.fastMessage,
            color: 'secondary',
            icon: 'warning',
          })
        }

        if (selectedData.value && value < selectedData.value.slowTempo) {
          Notify.create({
            message: selectedData.value.slowMessage,
            color: 'secondary',
            icon: 'warning',
          })
        }
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
    get: () => selectedPattern.value?.prestartBeat?.value,
    set: (value: number) => {
      if (selectedPattern.value) {
        selectedPattern.value.prestartBeat
          = selectedData.value?.prestartBeats.find(el => el?.value === value)
          || (selectedData.value?.prestartBeats[0] as numOpts)
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
    selectedData.value?.sequences?.beatLabels
  )

  // **************
  // Utility methods
  // **************

  const getAllData = async () => {
    // const patternsModules = import.meta.glob('/src/assets/data/patterns/*.ts')
    const patternsModules = import.meta.globEager('/src/assets/data/patterns/*.ts')

    const patternsData = Object.entries(patternsModules).map(([path, patternsModule]) => {
      const context = path.match(/\/src\/assets\/data\/patterns\/(.*)\.ts$/)![1] // eslint-disable-line @typescript-eslint/no-non-null-assertion

      const patterns = patternsModule.default.map((pattern: PatternState) => {
        return {
          ...pattern,
          context
        }
      })

      return patterns
    })

    // flatten the array
    return patternsData.flat()
  }

  const instrument = (slug: string): instruOpts | undefined =>
    instruments.value.find((el: instruOpts) => el.value === slug)

  const buildPattern = async (): Promise<PatternSetting> => {
    const tmp: PatternSetting = {} as PatternSetting

    tmp.name = selectedData.value.name
    tmp.context = selectedData.value.context || ''
    tmp.tempo = selectedData.value.defaultTempo
    tmp.swing = selectedData.value.name === 'tientos' ? 0.6 : 0
    tmp.globalDecay = 0.5
    tmp.improvisation = false
    tmp.humanization = false
    tmp.prestartBeat = selectedData.value.prestartBeats[0]

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

    return tmp
  }

  // const buildPatterns = async () => {
  //   if (patterns.value.length == 0) {
  //     patterns.value = data.value.map((patternDefault) => buildPattern(patternDefault))
  //   }
  // }

  // const rebuildPattern = (patternData: PatternState) => {
  //   patterns.value[patterns.value.findIndex((el) => el.name === patternData.name)] = buildPattern(patternData)
  // }

  // **************
  // Actions
  // **************

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
      buildPattern()
    } else {
      const existingPattern = patterns.value.find((el) => el.name === route.name) as PatternSetting
      const newPattern = buildPattern()
      Object.assign(existingPattern, newPattern)
    }
    router.go(0)
  }

  // **************
  // Lifecycle
  // **************

  const initStore = async () => {
    data.value = await getAllData()

    if (data.value.length === 0) {
      Notify.create({
        message: 'Error fetching data',
        color: 'negative',
        icon: 'warning'
      })
    }

    if (!data.value.some((el) => el.context === route.params.context)) {
      const selectedContext = selectedContextName.value || data.value[0].context;
      const selectedPattern = data.value.find((el) => el.context === selectedContext)?.name;
      return router.push(`/${selectedContext}/${selectedPattern}`);
    }

    if (!data.value.some((el) => el.name === route.params.pattern)) {
      const selectedPattern = selectedPatternName.value || data.value.find((el) => el.context === route.params.context)?.name;
      return router.push(`/${route.params.context}/${selectedPattern}`);
    }

    if (!selectedPattern.value) patterns.value.push(await buildPattern())

    setCssVar('primary', getPaletteColor(selectedContext.value.colors?.primary))
    setCssVar('secondary', getPaletteColor(selectedContext.value.colors?.secondary))
  }

  onMounted(async () => {
    initStore()
    initMetronome()
    initSequences()
  })

  onUpdated(async () => {
    if (!selectedPattern.value) {
      patterns.value.push(await buildPattern())
    }
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
    if (value) selectedPatternName.value = value.name
  })

  watch(selectedContext, (newContext) => {
    if (newContext) selectedContextName.value = newContext.value
    setCssVar('primary', getPaletteColor(newContext.colors?.primary))
    setCssVar('secondary', getPaletteColor(newContext.colors?.secondary))
  })

  return {
    data,
    metronomeEvent,
    isPlaying,
    patterns,
    contexts,
    selectedContext,
    selectedPattern,
    selectedPatternName,
    selectedData,
    patternsInSelectedContext,
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
    // buildPatterns,
    // rebuildPattern,
    play,
    stop,
    playStop,
    selectInstruments,
    selectVolume,
    toggleEighthNotes,
    restoreDefault,
    getContext
  }
})
