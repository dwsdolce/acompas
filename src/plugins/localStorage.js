import * as types from '@store/mutation-types'
import { forEachValue, deepCopy } from '../assets/utils'

const storage = window.localStorage

const restoreVisualization = store => {
    if (storage.getItem('visualization-mode') !== null) {
        store.dispatch('selectVisualizationMode', storage.getItem('visualization-mode'))
    }
}

const restoreSelectedPalo = store => {
    if (storage.getItem('palo') !== null) {
        store.dispatch('selectPalo', storage.getItem('palo'))
    }
}

const restoreTempo = store => {
    let selectedPaloSlug = store.state.selectedPalo.value
    if (storage.getItem('tempo-' + selectedPaloSlug) !== null) {
        if (parseInt(storage.getItem('tempo-' + selectedPaloSlug))) {
            store.dispatch('selectTempo', parseInt(storage.getItem('tempo-' + selectedPaloSlug)))
        }
    }
}

const restoreSelectedInstruments = store => {
    if (storage.getItem('selected-instruments') !== null) {
        let selectedInstrumentsParsed = JSON.parse(storage.getItem('selected-instruments'))
        if (selectedInstrumentsParsed) {
            store.dispatch('selectInstruments', selectedInstrumentsParsed)
        }
    }
}

const restoreEighthNotes = store => {
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
}

const restoreInstrumentsVolumes = store => {
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
}

const restoreHumanize = store => {
    if (storage.getItem('humanize') !== null) {
        if (storage.getItem('humanize') === 'true') {
            store.dispatch('enableHumanize')
        }
        if (storage.getItem('humanize') === 'false') {
            store.dispatch('disableHumanize')
        }
    }
}

const restoreImprovise = store => {
    if (storage.getItem('improvise') !== null) {
        if (storage.getItem('improvise') === 'true') {
            store.dispatch('enableImprovise')
        }
        if (storage.getItem('improvise') === 'false') {
            store.dispatch('disableImprovise')
        }
    }
}

export const restoreLocalStorage = async store => {
    await restoreVisualization(store)
    await restoreSelectedPalo(store)
    await restoreTempo(store)
    await restoreSelectedInstruments(store)
    await restoreEighthNotes(store)
    await restoreInstrumentsVolumes(store)
    await restoreHumanize(store)
    await restoreImprovise(store)
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
