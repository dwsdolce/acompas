import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { Notify } from 'quasar'
import { useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import palosData from 'src/data/palosData'
import { useMetronome } from 'src/composables/metronome'
import type { numOpts, instruOpts, VolumeOpts, PaloState, Size } from 'src/composables/models'

export const usePaloStore = (name: string) =>
  defineStore(name, () => {
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

    const router = useRouter()

    const paloData = palosData.find((el) => el.value == name)

    // STATE
    const palo = useStorage(
      name,
      ref<PaloState>({
        name: name,
        tempo: (paloData?.defaultTempo as number),
        selectedPreCount: (paloData?.preCounts[0] as numOpts),
        selectedStartBeat: (paloData?.startBeats[0] as numOpts),
        swing: 0,
        improvisation: false,
        humanization: false,
        isTooSlow: false,
        isTooFast: false,
        visualizationModes: [
          { label: 'Dots', value: 'dots', isActive: true },
          { label: 'Counter', value: 'counter', isActive: false },
          { label: 'Clock', value: 'clock', isActive: false },
        ],
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
            label: 'Nudillos',
            value: 'nudillo',
            enabled: true,
            eighthNotes: null,
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

    const visualizationSize = ref<Size>({ width: null, height: null })
    const isPlaying = ref<boolean>(false)
    const metronomeEvent = ref<number | null>(null)
    const isTooSlow = ref<boolean>(false)
    const isTooFast = ref<boolean>(false)

    // GETTERS
    const visualizationMode = computed(() =>
      palo.value.visualizationModes.find((el) => el.isActive)
    )
    const nbBeatsInPattern = computed(
      () => paloData?.nbBeatsInPattern as number
    )
    const beatLabels = computed(() => paloData?.beatLabels)
    const accents = computed(() => paloData?.accents)
    const alpha = computed(
      () => 360 / ((paloData?.nbBeatsInPattern as number) / 2)
    )
    const velocity = computed(() =>
      palo.value.tempo
        ? Math.floor(60000 / palo.value.tempo)
        : paloData?.defaultTempo
    )
    const startingPoint = computed(() =>
      palo.value.selectedStartBeat && palo.value.selectedPreCount
        ? palo.value.selectedStartBeat.value / 2 -
          palo.value.selectedPreCount.value
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

    // ACTIONS
    const init = () => {
      if (tempo.value !== undefined) initMetronome(palo.value)
    }

    const play = async () => {
      isPlaying.value = true
      startSequences()
    }

    const stop = () => {
      isPlaying.value = false
      stopAllSequences()
      triggerEvent(null)
      reinitialize(palo.value)
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

    const selectPalo = (payload: string) => {
      if (isPlaying.value) stop()
      router.push(`/${payload}`)
    }

    const getVisualizationSize = (payload: Size) => {
      visualizationSize.value = payload
    }


    const selectVisualizationMode = (payload: string) => {
      const oldMode = palo.value.visualizationModes.find((el) => el.isActive)
      const newMode = palo.value.visualizationModes.find(
        (el) => el.value === payload
      )
      if (oldMode && newMode) {
        oldMode.isActive = false
        newMode.isActive = true
      }
    }

    // const getVisualizationSize = (payload: Size) => {
    //   visualizationSize.value = payload
    // }

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
          changeDecay(instrument.value, decay)
        })
      }
    }

    const selectSwing = (payload: number | null) => {
      if (payload !== null) {
        palo.value.swing = payload
        changeSwing(palo.value.swing)
      }
    }

    const selectInstruments = async (key: string, payload: boolean) => {
      const instru = instrument.value(key)
      if (instru) {
        instru.enabled = payload
      }
    }

    const selectPreCount = (payload: number) => {
      if (!payload && !paloData) return
      palo.value.selectedPreCount
        = paloData?.preCounts.find(el => el?.value === payload)
        || (paloData?.preCounts[0] as numOpts)
      reinitialize(palo.value)
    }

    const selectStartBeat = (payload: number) => {
      if (!payload && !paloData) return
      palo.value.selectedStartBeat
        = paloData?.startBeats.find(el => el?.value === payload)
        || (paloData?.startBeats[0] as numOpts)
      reinitialize(palo.value)
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

    // const triggerEvent = (payload: number | null) => {
    //   metronomeEvent.value = payload
    // }

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

    return {
      // STATE
      palo,
      visualizationSize,
      isPlaying,
      metronomeEvent,
      isTooFast,
      isTooSlow,

      // GETTERS
      nbBeatsInPattern,
      visualizationMode,
      beatLabels,
      accents,
      alpha,
      velocity,
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
      getVisualizationSize,
      selectPalo,
      selectTempo,
      selectVolume,
      selectDecay,
      selectSwing,
      selectInstruments,
      selectPreCount,
      selectStartBeat,
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
