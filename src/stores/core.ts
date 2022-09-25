import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import type { Size } from 'src/composables/models'
import { useMetronome } from 'src/composables/metronome'

export const useCoreStore = defineStore('core', () => {
  const router = useRouter()

  const {
    initMetronome,
    isSupported,
    initSequences,
    startSequences,
    stopAllSequences,
    changeTempo
  } = useMetronome()

  const visualizationSize = ref<Size>({ width: null, height: null })
  const isPlaying = ref<boolean>(false)
  const metronomeEvent = ref<number | null>(null)
  const isTooSlow = ref<boolean>(false)
  const isTooFast = ref<boolean>(false)

  const play = async () => {
    isPlaying.value = true
    startSequences()
  }

  const stop = () => {
    isPlaying.value = false
    stopAllSequences()
    triggerEvent(null)
  }

  const triggerEvent = (payload: number | null) => {
    metronomeEvent.value = payload
  }

  const playStop = () => {
    if (isPlaying.value) {
      stop()
    } else {
      play()
    }
  }

  const restoreDefault = (payload: string) => {
    if (isPlaying.value) stop()
    // if (payload === 'all') commit(types.RESET_STORAGE)

    // selectTempo(selectedPalo.value.defaultTempo)
    // selectSwing(0)
    // forEachValue(instruments.value, (instrument: instruOpts) => {
    //   disableEighthNotes(instrument)
    //   selectVolume({ instrument: instrument.value, volume: 0 })
    // })
    // disableHumanize()
    // disableImprovise()
    // selectVisualizationMode('dots')
    // selectPreCount(selectedPalo.value.preCounts[0])
    // selectStartBeat(selectedPalo.value.startBeats[0])
  }

  const selectPalo = (payload: string) => {
    if (isPlaying.value) stop()
    router.push(`/${payload}`)
    // selectedPalo.value = palos.value.find(p => p.value === payload)
    // initSequences()
    // selectTempo(selectedPalo.value.defaultTempo)
  }

  const getVisualizationSize = (payload: Size) => {
    visualizationSize.value = payload
  }

  return {
    visualizationSize,
    isPlaying,
    metronomeEvent,
    isTooFast,
    isTooSlow,

    play,
    stop,
    playStop,
    triggerEvent,
    restoreDefault,
    selectPalo,
    getVisualizationSize,
  }
})
