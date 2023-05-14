import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { Notify } from 'quasar'
import { useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import palosData from 'src/data/palosData'
import { useSessionStore } from 'src/stores/session'
import { useMetronome } from 'src/composables/metronome'
import { useMatomo } from 'src/composables/matomo'
import type { numOpts, instruOpts, VolumeOpts, PaloState, visuOpts, Size } from 'src/composables/models'

export const usePaloStore = (name: string | undefined) => {
  return defineStore(name || 'default', () => {
    const {
      reinitialize,
      initMetronome,
      initSequences,
      startSequences,
      stopAllSequences,
      humanize,
      changeSwing,
      changeTempo,
      changeVolume,
      changeDecay
    } = useMetronome()

    const {
      trackPlay,
      trackStop
    } = useMatomo()

    const router = useRouter()

    const paloData = palosData.find((el) => el.value == name)

    // ###################
    // STATE
    // ###################

    const palo = useStorage(
      name || 'default',
      ref<PaloState>({
        name: name || 'default',
        tempo: (paloData?.defaultTempo as number),
        selectedPrestartBeat: (paloData?.prestartBeats[0] as numOpts),
        swing: name === 'tientos' ? 0.6 : 0,
        improvisation: false,
        humanization: false,
        isTooSlow: false,
        isTooFast: false,
        instruments: [
          {
            label: 'Claras',
            value: 'clara',
            enabled: true,
            eighthNotes: false,
            volume: 0,
            decay: 0.5
          },
          {
            label: 'Sordas',
            value: 'sorda',
            enabled: false,
            eighthNotes: false,
            volume: 0,
            decay: 0.5
          },
          {
            label: 'Pitos',
            value: 'pito',
            enabled: true,
            eighthNotes: false,
            volume: 0,
            decay: 0.5
          },
          {
            label: 'Nudillos',
            value: 'nudillo',
            enabled: true,
            eighthNotes: false,
            volume: 0,
            decay: 0.5
          },
          {
            label: 'Cajon',
            value: 'cajon',
            enabled: false,
            eighthNotes: false,
            volume: 0,
            decay: 0.5
          },
          {
            label: 'Udu',
            value: 'udu',
            enabled: false,
            eighthNotes: false,
            volume: 0,
            decay: 0.5
          },
          {
            label: 'Jaleo',
            value: 'jaleo',
            enabled: false,
            eighthNotes: null,
            volume: 0,
            decay: 0.5
          },
          {
            label: 'Click',
            value: 'click',
            enabled: false,
            eighthNotes: null,
            volume: 0,
            decay: 0.5
          }
        ],
        globalDecay: 0.5
      })
    )

    const visualizationModes = ref([
      { label: 'Dots', value: 'dots' },
      { label: 'Counter', value: 'counter' },
      { label: 'Clock', value: 'clock' }
    ])
    const visualizationMode = useStorage('visualization-mode', ref('dots'))
    const isPlaying = ref<boolean>(false)
    const metronomeEvent = ref<number | null>(null)
    const isTooSlow = ref<boolean>(false)
    const isTooFast = ref<boolean>(false)

    // ###################
    // GETTERS
    // ###################

    const nbBeatsInPattern = computed(
      () => paloData?.nbBeatsInPattern as number
    )
    const beatLabels = computed(() => paloData?.beatLabels)
    const numLabels = computed(() => paloData?.beatLabels.filter((el) => el != null))
    const prestartBeats = computed(() => paloData?.prestartBeats)
    const accents = computed(() => paloData?.accents)
    const clockStep = computed(
      () => 360 / ((paloData?.nbBeatsInPattern as number) / 2)
    )
    const clockVelocity = computed(() =>
      palo.value.tempo
        ? Math.floor(60000 / palo.value.tempo)
        : paloData?.defaultTempo
    )
    const startingPoint = computed(() =>
      palo.value.selectedPrestartBeat
        ? nbBeatsInPattern.value - palo.value.selectedPrestartBeat.value
        : 0
    )
    const instrument = computed(
      () => (slug: string) =>
        palo.value.instruments.find((o) => o.value === slug)
    )
    const selectedInstruments = computed(() =>
      palo.value.instruments.filter((i) => i.enabled)
    )
    const unselectedInstruments = computed(() =>
      palo.value.instruments.filter((i) => !i.enabled)
    )
    const tempo = computed(() => palo.value.tempo)

    // ###################
    // ACTIONS
    // ###################

    const init = () => {
      if (tempo.value !== undefined) initMetronome(palo.value)
    }

    const selectPalo = (payload: string) => {
      if (isPlaying.value) stop()
      router.push(`/${payload}`)
    }

    const play = async () => {
      isPlaying.value = true
      startSequences()
      trackPlay(palo.value.name)
    }

    const stop = () => {
      isPlaying.value = false
      stopAllSequences()
      trackStop(palo.value.name)
      triggerEvent(null)
      reinitialize(palo.value)
    }

    const playStop = () => {
      if (isPlaying.value) {
        stop()
      } else {
        play()
      }
    }

    const triggerEvent = (payload: number | null) => {
      metronomeEvent.value = payload
    }

    const selectVisualizationMode = (payload: string) => {
      visualizationMode.value = payload
      if (isPlaying.value) {
        stop()
      }
    }

    const selectInstruments = async (key: string, payload: boolean) => {
      const instru = instrument.value(key)
      if (instru) {
        instru.enabled = payload
      }
    }

    const selectVolume = (payload: VolumeOpts) => {
      if (payload !== null) {
        const volume = payload?.volume
        const instru = instrument.value(payload?.instrument)
        if (instru !== undefined) instru.volume = volume
        changeVolume(payload)
      }
    }

    const selectDecay = (decay: number) => {
      if (decay) {
        palo.value.globalDecay = decay
        palo.value.instruments.forEach(instrument => {
          instrument.decay = decay
          changeDecay(decay)
        })
      }
    }

    const selectSwing = (payload: number | null) => {
      if (payload !== null) {
        palo.value.swing = payload
        changeSwing(palo.value.swing)
      }
    }

    const selectPrestartBeat = (payload: number) => {
      console.log('selectPrestartBeat', payload)
      if (!payload && !paloData) return
      palo.value.selectedPrestartBeat
        = paloData?.prestartBeats.find(el => el?.value === payload)
        || (paloData?.prestartBeats[0] as numOpts)
      stop()
    }

    const toggleEighthNotes = (payload: instruOpts) => {
      const instru: instruOpts | undefined = palo.value.instruments.find(
        (i) => i.value === payload.value
      )
      if (instru) instru.eighthNotes = !instru.eighthNotes
    }

    const enableEighthNotes = (payload: instruOpts) => {
      const instru: instruOpts | undefined = palo.value.instruments.find(
        (i) => i.value === payload.value
      )
      if (instru) instru.eighthNotes = true
    }

    const disableEighthNotes = (payload: instruOpts) => {
      const instru: instruOpts | undefined = palo.value.instruments.find(
        (i) => i.value === payload.value
      )
      if (instru) instru.eighthNotes = false
    }

    const toggleImprovise = () => {
      palo.value.improvisation = !palo.value.improvisation
    }

    const enableImprovise = () => {
      palo.value.improvisation = true
    }

    const disableImprovise = () => {
      palo.value.improvisation = false
    }

    const toggleHumanize = () => {
      palo.value.humanization = !palo.value.humanization
      humanize()
    }

    const enableHumanize = () => {
      palo.value.humanization = true
      humanize()
    }

    const disableHumanize = () => {
      palo.value.humanization = false
      humanize()
    }

    const selectTempo = (payload: number) => {
      palo.value.tempo = payload
      changeTempo(palo.value.tempo)

      if (paloData && palo.value.tempo) {
        if (
          palo.value.tempo < paloData.minTempo ||
          palo.value.tempo > paloData.maxTempo
        ) {
          Notify.create({
            message:
              'Tempo must be between ' +
              paloData.minTempo +
              ' and ' +
              paloData.maxTempo +
              ' bpm !',
            color: 'warning',
            icon: 'warning',
          })
          return
        }

        if (palo.value.tempo > paloData.fastTempo && !palo.value.isTooFast) {
          palo.value.isTooFast = true
          Notify.create({
            message: paloData.fastMessage,
            color: 'secondary',
            icon: 'warning',
          })
        } else if (
          palo.value.tempo < paloData.fastTempo &&
          palo.value.isTooFast
        ) {
          palo.value.isTooFast = false
        }

        if (palo.value.tempo < paloData.slowTempo && !palo.value.isTooSlow) {
          palo.value.isTooSlow = true
          Notify.create({
            message: paloData?.slowMessage,
            color: 'secondary',
            icon: 'warning',
          })
        } else if (
          palo.value.tempo > paloData.slowTempo &&
          palo.value.isTooSlow
        ) {
          palo.value.isTooSlow = false
        }
      }
    }

    const restoreDefault = (payload: string) => {
      if (isPlaying.value) stop()
      if (payload === 'all') {
        window.localStorage.clear()
      } else {
        window.localStorage.removeItem(payload)
      }
      router.go(0)
    }

    return {
      // STATE
      palo,
      visualizationModes,
      isPlaying,
      metronomeEvent,
      isTooFast,
      isTooSlow,

      // GETTERS
      nbBeatsInPattern,
      visualizationMode,
      beatLabels,
      numLabels,
      prestartBeats,
      accents,
      clockStep,
      clockVelocity,
      startingPoint,
      instrument,
      selectedInstruments,
      unselectedInstruments,
      tempo,

      // ACTIONS
      init,
      play,
      stop,
      playStop,
      selectVisualizationMode,
      selectPalo,
      selectTempo,
      selectVolume,
      selectDecay,
      selectSwing,
      selectInstruments,
      selectPrestartBeat,
      toggleEighthNotes,
      enableEighthNotes,
      disableEighthNotes,
      toggleImprovise,
      enableImprovise,
      disableImprovise,
      toggleHumanize,
      enableHumanize,
      disableHumanize,
      triggerEvent,
      restoreDefault
    }
  })
}
