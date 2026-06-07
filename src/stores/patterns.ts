import { ref, reactive, computed, onMounted, onUpdated, watch } from 'vue'
import { Loading, Notify, Platform, is } from 'quasar'
import { defineStore, storeToRefs } from 'pinia'
import { useStorage, useDebounceFn } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'
import soundsData from 'src/assets/data/soundsData'
import { useMetronome } from 'src/composables/metronome'
import { useMatomo } from 'src/composables/matomo'
import { useKeepAwake } from 'src/composables/keep-awake'
import type {
  numOpts,
  instruOpts,
  InstruSeqs,
  VolumeOpts,
  PatternState,
  PatternSetting,
  ContextOption
} from 'src/utils/types'

const findInArray = <T>(array: T[], key: keyof T, value: string): T | undefined => {
  return array.find((el) => el[key] === value)
}


export const usePatternStore = defineStore('patterns', () => {
  const router = useRouter()

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

  // *****************************************
  // State
  // *****************************************

  const isPlaying = ref<boolean>(false)
  const data = ref<PatternState[]>([] as PatternState[])
  const patterns = useStorage('patterns', ref<PatternSetting[]>([]))
  const selectedPatternName = useStorage('selected-pattern-name', ref('alegria'))
  const selectedContextName = useStorage('selected-context-name', ref('flamenco'))
  const contexts = ref<ContextOption[]>([
    { label: 'Flamenco', value: 'flamenco', colors: { primary: 'red-6', secondary: 'red-10' }},
    // { label: 'Afro-Cuban', value: 'afro-cuban', colors: { primary: 'orange-6', secondary: 'orange-10' }},
    // { label: 'Afro-Brazilian', value: 'afro-brazilian', colors: { primary: 'purple-6', secondary: 'purple-10' }},
    // { label: 'Fundamental Global', value: 'fundamental-global', colors: { primary: 'light-blue-6', secondary: 'light-blue-10' }},
    // { label: 'Ternary African', value: 'ternary-african', colors: { primary: 'teal-6', secondary: 'teal-10' }}
  ])

  // *****************************************
  // Computed
  // *****************************************

  const selectedContext = computed(() => {
    return findInArray(contexts.value, 'value', selectedContextName.value) as ContextOption
    // return contexts.value.find((el: ContextOption) => el.value === selectedContextName.value) as ContextOption
  })

  const selectedPattern = computed(() => {
    return findInArray(patterns.value, 'name', selectedPatternName.value) as PatternSetting
    // return patterns.value?.find((el: PatternSetting) => el.name === selectedPatternName.value) as PatternSetting
  })

  const selectedData = computed(() => {
    return findInArray(data.value, 'name', selectedPatternName.value) as PatternState
    // return data.value.find((el: PatternState) => el.name === selectedPatternName.value) as PatternState
  })

  const patternsInSelectedContext = computed(() => {
    return data.value
      .filter((el: PatternState) => el.context === selectedContextName.value)
      .map((el: PatternState) => ({ label: el.label, value: el.name }))
  })

  const tempo = computed({
    get: () => selectedPattern.value?.tempo || selectedData.value?.defaultTempo || 120,
    set: (value: number) => {
      if (!selectedData.value?.defaultTempo) value = selectedPattern.value?.tempo || 120
      if (selectedPattern.value) {
        selectedPattern.value.tempo = value
        changeTempo(value)

        if (selectedData.value && value > selectedData.value.fastTempo) {
          Notify.create({
            message: selectedData.value.fastMessage,
            color: 'secondary',
            icon: 'mdi-alert-circle-outline'
          })
        }

        if (selectedData.value && value < selectedData.value.slowTempo) {
          Notify.create({
            message: selectedData.value.slowMessage,
            color: 'secondary',
            icon: 'mdi-alert-circle-outline'
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

  // Applying the decay regenerates the reverb's impulse response (an offline
  // render), so debounce it: dragging the slider updates the stored value
  // immediately but only triggers the costly regeneration once movement settles.
  const debouncedChangeDecay = useDebounceFn((value: number) => changeDecay(value), 150)

  const globalDecay = computed({
    get: () => selectedPattern.value?.globalDecay ?? 0.5,
    set: (value: number) => {
      if (selectedPattern.value) {
        selectedPattern.value.globalDecay = value
        debouncedChangeDecay(value)
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
    selectedPattern.value?.instruments?.filter((i: instruOpts) => i?.enabled ?? false)
  )

  const unselectedInstruments = computed(() =>
    selectedPattern.value?.instruments?.filter((i: instruOpts) => !(i?.enabled ?? false))
  )

  const beatLabels = computed(() =>
    selectedData.value?.sequences?.beatLabels
  )

  // *****************************************
  // Utility methods
  // *****************************************

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

    return patternsData.flat()
  }

  const instrument = (type: string): instruOpts | undefined => {
    return instruments.value.find((el: instruOpts) => el.value === type)
  }

  const buildPattern = async (): Promise<PatternSetting> => {
    const tmp = {
      name: selectedData.value.name,
      context: selectedData.value.context || '',
      tempo: selectedData.value.defaultTempo,
      swing: selectedData.value.name === 'tientos' ? 0.6 : 0,
      globalDecay: 0.5,
      improvisation: false,
      humanization: false,
      prestartBeat: selectedData.value.prestartBeats[0],
      instruments: Object.entries(selectedData.value.sequences).reduce((acc, [key, value]) => {
        const sound = soundsData.find((el) => el.name === key)
        if (key !== 'beatLabels' && sound) {
          acc.push({
            label: sound?.label || '',
            value: key,
            enabled: false,
            eighthNotes: sound?.noEighthNotes ? null : false,
            volume: 0
          })
        }
        return acc
      }, [] as instruOpts[])
    } as PatternSetting

    tmp.instruments[0].enabled = true

    if (selectedContext.value.value === 'flamenco') {
      tmp.instruments.push({
        label: 'Jaleos',
        value: 'jaleos',
        enabled: false,
        eighthNotes: null,
        volume: 0
      })
    }

    return tmp
  }

  // *****************************************
  // Actions
  // *****************************************

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

  const restoreDefault = async (payload: string) => {
    if (isPlaying.value) stop()
    if (payload === 'all') {
      patterns.value = []
      if (!data.value.length) initStore()
    } else {
      const patternName = selectedPatternName.value
      const patternIndex = patterns.value.findIndex((el) => el.name === patternName)
      patterns.value.splice(patternIndex, 1)
    }
    return
  }

  // *****************************************
  // Initialization
  // *****************************************

  const resetContextPattern = () => {
    const tmpContext = selectedContextName.value || data.value[0].context
    const tmpPattern: string = selectedPatternName.value || data.value.find((el) => el.context === tmpContext)?.name || ''
    return router.push(`/${tmpContext}/${tmpPattern}`)
  }

  const initStore = async () => {
    // Load the data
    data.value = await getAllData()

    if (!data.value.length) {
      Notify.create({
        message: 'Error fetching data',
        color: 'negative',
        icon: 'mdi-alert-circle-outline'
      })
    }

    // If no selected context, select the first one and redirect
    // if (!selectedContext.value || !selectedPattern.value) {
    //   resetContextPattern()
    // }
  }

  const initContext = async (contextName: string) => {
    const contextExists = data.value.some((el) => el.context === contextName)
    if (contextExists) {
      selectedContextName.value = contextName
      selectedPatternName.value = data.value.find((el) => el.context === contextName)?.name || ''
    } else {
      resetContextPattern()
    }
  }

  const initPattern = async (contextName: string, patternName: string) => {
    selectedPatternName.value = patternName

    const existingPattern = patterns.value.find(pattern => pattern.name === patternName)
    if (!existingPattern) {
      patterns.value.push(await buildPattern())
    }
  }

  const initAll = async (contextName: string, patternName: string) => {
    Loading.show({
      message: 'Loading…',
    })
    await initStore()
    await initContext(contextName)
    await initPattern(contextName, patternName)
    await initMetronome()
    await initSequences()
    Loading.hide()
  }

  // *****************************************
  // Lifecycle
  // *****************************************

  // onUpdated(async () => {
  //   if (!selectedPattern.value) await initPattern()
  //   stop()
  // })

  watch(selectedInstruments, (value) => {
    if (value?.length === 0) {
      Notify.create({
        message: 'At least one instrument must be selected !',
        color: 'secondary',
        icon: 'mdi-alert-circle-outline'
      })
    }
  })

  watch(selectedContext, async (newContext) => {
    if (isPlaying.value) stop()
    if (newContext) await initContext(newContext.value)
  })

  watch(selectedPattern, async (newPattern) => {
    if (isPlaying.value) stop()
    if (newPattern) await initPattern(selectedContextName.value, newPattern.name)
  })


  // *****************************************
  // Return
  // *****************************************

  return {
    data,
    metronomeEvent,
    isPlaying,
    patterns,
    contexts,
    selectedContext,
    selectedPattern,
    selectedPatternName,
    selectedContextName,
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
    initAll,
    initStore,
    instrument,
    initContext,
    initPattern,
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
