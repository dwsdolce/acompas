import * as types from '../store/mutation-types'
import { forEachValue, deepCopy } from '../assets/utils'
import palosDefaultSettings from '../store/data/palosDefaultSettings'

const storage = window.localStorage

const restoreVisualization = store => {
  if (storage.getItem(`visualization-mode`) !== null) {
    store.dispatch(`selectVisualizationMode`, storage.getItem(`visualization-mode`))
  }
}

const restoreSelectedPalo = store => {
  if (storage.getItem(`palo`) !== null) {
    store.dispatch(`selectPalo`, storage.getItem(`palo`))
  }
}

const restoreSelectedPreCount = store => {
  if (storage.getItem(`pre-count-${store.state.selectedPalo.value}`) !== null) {
    forEachValue(store.state.preCounts, (preCount, key) => {
      if (preCount.value === parseInt(storage.getItem(`pre-count-${store.state.selectedPalo.value}`))) {
        store.dispatch(`selectPreCount`, preCount)
      }
    })
  }
}

const restoreSelectedStartBeat = store => {
  if (storage.getItem(`start-beat-${store.state.selectedPalo.value}`) !== null) {
    forEachValue(store.state.startBeats, (startBeat, key) => {
      if (startBeat.value === parseInt(storage.getItem(`start-beat-${store.state.selectedPalo.value}`))) {
        store.dispatch(`selectStartBeat`, startBeat)
      }
    })
  }
}

const restoreTempo = store => {
  const selectedPaloSlug = store.state.selectedPalo.value
  if (storage.getItem(`tempo-${selectedPaloSlug}`) !== null) {
    if (parseInt(storage.getItem(`tempo-${selectedPaloSlug}`))) {
      store.dispatch(`selectTempo`, parseInt(storage.getItem(`tempo-${selectedPaloSlug}`)))
    }
  }
}

const restoreSelectedInstruments = store => {
  if (storage.getItem(`selected-instruments`) !== null) {
    const selectedInstrumentsParsed = JSON.parse(storage.getItem(`selected-instruments`))
    if (selectedInstrumentsParsed) {
      store.dispatch(`selectInstruments`, selectedInstrumentsParsed)
    }
  }
}

const restoreEighthNotes = store => {
  forEachValue(store.state.instruments, (v, k) => {
    if (storage.getItem(v.value + `-eighthNotes`) !== null) {
      if (storage.getItem(v.value + `-eighthNotes`) === `true`) {
        store.dispatch(`enableEighthNotes`, v)
      }
      if (storage.getItem(v.value + `-eighthNotes`) === `false`) {
        store.dispatch(`disableEighthNotes`, v)
      }
    }
  })
}

const restoreInstrumentsVolumes = store => {
  forEachValue(store.state.instruments, (v, k) => {
    if (storage.getItem(v.value + `-volume`) !== null) {
      if (parseInt(storage.getItem(v.value + `-volume`))) {
        const payload = {}
        payload.instrument = v
        payload.volume = parseInt(storage.getItem(v.value + `-volume`))
        store.dispatch(`changeVolume`, payload)
      }
    }
  })
}

const restoreHumanize = store => {
  if (storage.getItem(`humanize`) !== null) {
    if (storage.getItem(`humanize`) === `true`) {
      store.dispatch(`enableHumanize`)
    }
    if (storage.getItem(`humanize`) === `false`) {
      store.dispatch(`disableHumanize`)
    }
  }
}

const restoreImprovise = store => {
  if (storage.getItem(`improvise`) !== null) {
    if (storage.getItem(`improvise`) === `true`) {
      store.dispatch(`enableImprovise`)
    }
    if (storage.getItem(`improvise`) === `false`) {
      store.dispatch(`disableImprovise`)
    }
  }
}

const restoreTrackVisits = store => {
  if (storage.getItem(`track_visits`) !== null) {
    if (storage.getItem(`track_visits`) === `true`) {
      store.dispatch(`initializeTracking`)
      store.dispatch(`enableTrackVisits`)
    }
    if (storage.getItem(`track_visits`) === `false`) {
      store.dispatch(`disableTrackVisits`)
    }
  } else {
    store.dispatch(`disableTrackVisits`)
  }
}

const restoreTrackingChosen = store => {
  if (storage.getItem(`tracking_chosen`) !== null) {
    if (storage.getItem(`tracking_chosen`) === `true`) {
      store.dispatch(`enableTrackingChosen`)
    }
  } else {
    store.dispatch(`openPrivacyDialog`)
  }
}

export const restoreTrackingLocalStorage = store => {
  restoreTrackingChosen(store)
  restoreTrackVisits(store)
}

export const restorePaloLocalStorage = store => {
  restoreVisualization(store)
  restoreSelectedPalo(store)
  restoreSelectedPreCount(store)
  restoreSelectedStartBeat(store)
  restoreTempo(store)
  restoreSelectedInstruments(store)
  restoreEighthNotes(store)
  restoreInstrumentsVolumes(store)
  restoreHumanize(store)
  restoreImprovise(store)
}

export const restoreLocalStorage = async store => {
  restoreTrackingLocalStorage(store)
  restorePaloLocalStorage(store)
}

const localStorage = store => {
  store.subscribe((mutation, state) => {
    const nextState = deepCopy(state)
    switch (mutation.type) {
      case types.SELECT_VISUALIZATION_MODE:
        storage.setItem(`visualization-mode`, mutation.payload)
        break

      case types.SELECT_PALO:
        storage.setItem(`palo`, mutation.payload.value)
        // Select a new tempo
        if (storage.getItem(`tempo-${mutation.payload.value}`) !== null) {
          if (parseInt(storage.getItem(`tempo-${mutation.payload.value}`))) {
            store.dispatch(`selectTempo`, parseInt(storage.getItem(`tempo-${mutation.payload.value}`)))
          } else {
            store.dispatch(`selectTempo`, mutation.payload.defaultTempo)
          }
        } else {
          store.dispatch(`selectTempo`, mutation.payload.defaultTempo)
        }

        // Select a new tempo
        if (storage.getItem(`swing-${mutation.payload.value}`) !== null) {
          store.dispatch(`selectSwing`, parseFloat(storage.getItem(`swing-${mutation.payload.value}`)))
        } else {
          store.dispatch(`selectSwing`, 0)
        }

        // Select a new pre-count
        if (storage.getItem(`pre-count-${mutation.payload.value}`) !== null) {
          if (parseInt(storage.getItem(`pre-count-${mutation.payload.value}`))) {
            forEachValue(store.state.preCounts, (preCount) => {
              if (preCount.value === parseInt(storage.getItem(`pre-count-${mutation.payload.value}`))) {
                store.dispatch(`selectPreCount`, preCount)
              }
            })
          } else {
            store.dispatch(`selectPreCount`, mutation.payload.preCounts[0])
          }
        } else {
          store.dispatch(`selectPreCount`, mutation.payload.preCounts[0])
        }

        // Select a new start beat
        if (storage.getItem(`start-beat-${mutation.payload.value}`) !== null) {
          if (parseInt(storage.getItem(`start-beat-${mutation.payload.value}`))) {
            forEachValue(store.state.startBeats, (startBeat) => {
              if (startBeat.value === parseInt(storage.getItem(`start-beat-${mutation.payload.value}`))) {
                store.dispatch(`selectStartBeat`, startBeat)
              }
            })
          } else {
            store.dispatch(`selectStartBeat`, mutation.payload.startBeats[0])
          }
        } else {
          store.dispatch(`selectStartBeat`, mutation.payload.startBeats[0])
        }
        break

      case types.SELECT_TEMPO:
        storage.setItem(`tempo-${nextState.selectedPalo.value}`, mutation.payload)
        break

      case types.SELECT_SWING:
        storage.setItem(`swing-${nextState.selectedPalo.value}`, mutation.payload)
        break

      case types.SELECT_PRECOUNT:
        storage.setItem(`pre-count-${nextState.selectedPalo.value}`, mutation.payload.value)
        break

      case types.SELECT_STARTBEAT:
        storage.setItem(`start-beat-${nextState.selectedPalo.value}`, mutation.payload.value)
        break

      case types.SELECT_INSTRUMENTS:
        storage.setItem(`selected-instruments`, JSON.stringify(nextState.selectedInstruments))
        break

      case types.CHANGE_VOLUME:
        storage.setItem(mutation.payload.instrument.value + `-volume`, mutation.payload.volume)
        break

      case types.TOGGLE_EIGHTHNOTES:
        storage.setItem(mutation.payload.value + `-eighthNotes`, mutation.payload.eighthNotes)
        break

      case types.ENABLE_EIGHTHNOTES:
        storage.setItem(mutation.payload.value + `-eighthNotes`, mutation.payload.eighthNotes)
        break

      case types.DISABLE_EIGHTHNOTES:
        storage.setItem(mutation.payload.value + `-eighthNotes`, mutation.payload.eighthNotes)
        break

      case types.TOGGLE_IMPROVISE:
        storage.setItem(`improvise`, nextState.improvise)
        break

      case types.ENABLE_IMPROVISE:
        storage.setItem(`improvise`, nextState.improvise)
        break

      case types.DISABLE_IMPROVISE:
        storage.setItem(`improvise`, nextState.improvise)
        break

      case types.TOGGLE_HUMANIZE:
        storage.setItem(`humanize`, nextState.humanize)
        break

      case types.ENABLE_HUMANIZE:
        storage.setItem(`humanize`, nextState.humanize)
        break

      case types.DISABLE_HUMANIZE:
        storage.setItem(`humanize`, nextState.humanize)
        break

      case types.TOGGLE_TRACKVISITS:
        storage.setItem(`track_visits`, nextState.trackVisits)
        break

      case types.ENABLE_TRACKVISITS:
        storage.setItem(`track_visits`, nextState.trackVisits)
        break

      case types.DISABLE_TRACKVISITS:
        storage.setItem(`track_visits`, nextState.trackVisits)
        break

      case types.ENABLE_TRACKINGCHOSEN:
        storage.setItem(`tracking_chosen`, nextState.trackingChosen)
        break

      case types.RESET_STORAGE:
        forEachValue(palosDefaultSettings, palo => {
          storage.setItem(`tempo-${palo.value}`, palo.defaultTempo)
          storage.setItem(`swing-${palo.value}`, 0)
          storage.setItem(`pre-count-${palo.value}`, 0)
          storage.setItem(`start-beat-${palo.value}`, 0)
        })
        storage.setItem(`palo`, palosDefaultSettings[0].value)
        break
    }
  })
}

export default localStorage
