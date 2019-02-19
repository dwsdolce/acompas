import * as types from '../store/mutation-types'
import { forEachValue, deepCopy } from '../assets/utils'

const storage = window.localStorage

const restoreVisualization = store => {
  return new Promise(resolve => {
    if (storage.getItem('visualization-mode') !== null) {
      store.dispatch('selectVisualizationMode', storage.getItem('visualization-mode'))
    }
    return resolve()
  })
}

const restoreSelectedPalo = store => {
  return new Promise(resolve => {
    if (storage.getItem('palo') !== null) {
      store.dispatch('selectPalo', storage.getItem('palo'))
    }
    return resolve()
  })
}

const restoreTempo = store => {
  return new Promise(resolve => {
    let selectedPaloSlug = store.state.selectedPalo.value
    if (storage.getItem('tempo-' + selectedPaloSlug) !== null) {
      if (parseInt(storage.getItem('tempo-' + selectedPaloSlug))) {
        store.dispatch('selectTempo', parseInt(storage.getItem('tempo-' + selectedPaloSlug)))
      }
    }
    return resolve()
  })
}

const restoreSelectedInstruments = store => {
  return new Promise(resolve => {
    if (storage.getItem('selected-instruments') !== null) {
      let selectedInstrumentsParsed = JSON.parse(storage.getItem('selected-instruments'))
      if (selectedInstrumentsParsed) {
        store.dispatch('selectInstruments', selectedInstrumentsParsed)
      }
    }
    return resolve()
  })
}

const restoreEighthNotes = store => {
  return new Promise(resolve => {
    forEachValue(store.state.instruments, (v, k) => {
      if (storage.getItem(v.value + '-eighthNotes') !== null) {
        if (storage.getItem(v.value + '-eighthNotes') === 'true') {
          store.dispatch('enableEighthNotes', v)
        }
        if (storage.getItem(v.value + '-eighthNotes') === 'false') {
          store.dispatch('disableEighthNotes', v)
        }
      }
    })
    return resolve()
  })
}

const restoreInstrumentsVolumes = store => {
  return new Promise(resolve => {
    forEachValue(store.state.instruments, (v, k) => {
      if (storage.getItem(v.value + '-volume') !== null) {
        if (parseInt(storage.getItem(v.value + '-volume'))) {
          let payload = {}
          payload.instrument = v
          payload.volume = parseInt(storage.getItem(v.value + '-volume'))
          store.dispatch('changeVolume', payload)
        }
      }
    })
    return resolve()
  })
}

const restoreHumanize = store => {
  return new Promise(resolve => {
    if (storage.getItem('humanize') !== null) {
      if (storage.getItem('humanize') === 'true') {
        store.dispatch('enableHumanize')
      }
      if (storage.getItem('humanize') === 'false') {
        store.dispatch('disableHumanize')
      }
    }
    return resolve()
  })
}

const restoreImprovise = store => {
  return new Promise(resolve => {
    if (storage.getItem('improvise') !== null) {
      if (storage.getItem('improvise') === 'true') {
        store.dispatch('enableImprovise')
      }
      if (storage.getItem('improvise') === 'false') {
        store.dispatch('disableImprovise')
      }
    }
    return resolve()
  })
}

export const restoreLocalStorage = store => {
  return new Promise(resolve => {
    if (!storage.length) return resolve()
    return Promise.all([
      restoreVisualization(store),
      restoreSelectedPalo(store),
      restoreTempo(store),
      restoreSelectedInstruments(store),
      restoreEighthNotes(store),
      restoreInstrumentsVolumes(store),
      restoreHumanize(store),
      restoreImprovise(store)
    ]).then(() => resolve())
  })
}

const localStorage = store => {
  store.subscribe((mutation, state) => {
    let nextState = deepCopy(state)
    switch (mutation.type) {
      case types.SELECT_VISUALIZATION_MODE:
        storage.setItem('visualization-mode', mutation.payload)
        break

      case types.SELECT_PALO:
        storage.setItem('palo', mutation.payload.value)
        if (window.localStorage.getItem('tempo-' + mutation.payload.value) !== null) {
          if (parseInt(window.localStorage.getItem('tempo-' + mutation.payload.value))) {
            store.dispatch('selectTempo', parseInt(window.localStorage.getItem('tempo-' + mutation.payload.value)))
          } else {
            store.dispatch('selectTempo', mutation.payload.defaultTempo)
          }
        } else {
          store.dispatch('selectTempo', mutation.payload.defaultTempo)
        }
        break

      case types.SELECT_TEMPO:
        storage.setItem('tempo-' + nextState.selectedPalo.value, mutation.payload)
        break

      case types.SELECT_INSTRUMENTS:
        storage.setItem('selected-instruments', JSON.stringify(nextState.selectedInstruments))
        break

      case types.CHANGE_VOLUME:
        storage.setItem(mutation.payload.instrument.value + '-volume', mutation.payload.volume)
        break

      case types.TOGGLE_EIGHTHNOTES:
        storage.setItem(mutation.payload.value + '-eighthNotes', mutation.payload.eighthNotes)
        break

      case types.ENABLE_EIGHTHNOTES:
        storage.setItem(mutation.payload.value + '-eighthNotes', mutation.payload.eighthNotes)
        break

      case types.DISABLE_EIGHTHNOTES:
        storage.setItem(mutation.payload.value + '-eighthNotes', mutation.payload.eighthNotes)
        break

      case types.TOGGLE_IMPROVISE:
        storage.setItem('improvise', nextState.improvise)
        break

      case types.ENABLE_IMPROVISE:
        storage.setItem('improvise', nextState.improvise)
        break

      case types.DISABLE_IMPROVISE:
        storage.setItem('improvise', nextState.improvise)
        break

      case types.TOGGLE_HUMANIZE:
        storage.setItem('humanize', nextState.humanize)
        break

      case types.ENABLE_HUMANIZE:
        storage.setItem('humanize', nextState.humanize)
        break

      case types.DISABLE_HUMANIZE:
        storage.setItem('humanize', nextState.humanize)
        break
    }
  })
}

export default localStorage
