import Tone from 'tone'
import { Loading } from 'quasar'
import { deepCopy, forEachValue } from '../assets/utils'
import * as types from '@store/mutation-types'
import audioSettings from '@store/data/audioDefaultSettings'
import { restoreLocalStorage } from '@plugins/localStorage'

const aCompas = {
    audioFormat: null,
    sounds: {},
    sequences: {}
}

// ==========================
// Metronome initial settings
// ==========================

/**
     * Detect the audio format to use for playing
     * load sounds by creating the Tone players
 */
const initSounds = () => {
    if (new Audio().canPlayType('audio/flac')) {
        aCompas.audioFormat = 'flac'
    } else if (new Audio().canPlayType('audio/ogg')) {
        aCompas.audioFormat = 'ogg'
    } else if (new Audio().canPlayType('audio/mpeg')) {
        aCompas.audioFormat = 'mp3'
    } else if (new Audio().canPlayType('audio/mp4')) {
        aCompas.audioFormat = 'mp4'
    } else if (new Audio().canPlayType('audio/wav')) {
        aCompas.audioFormat = 'wav'
    } else {
        throw new Error('None of the available audio formats can be played')
    }

    let path = 'statics/audio/'

    forEachValue(audioSettings, (value, key) => {
        aCompas.sounds[key] = {}
        forEachValue(value, (v, k) => {
            let url = path + v.src + '.' + aCompas.audioFormat
            aCompas.sounds[key][k] = new Tone.Player(url).toMaster()
            aCompas.sounds[key][k].volume.value = 0
        })
    })
}

// ==========================
// Metronome palos settings
// ==========================

const improviseSequence = (sound, time, value) => {
    // For the "click" sounds, follow the sequence and never improvise
    if (sound === 'click') {
        aCompas.sounds[sound][value].start(time)
        return
    }
    // Pick a probability that the sound occurence is following the pattern
    const improvisationProbability = Math.random()
    const improvisationThreshold = 0.4
    if (improvisationProbability > improvisationThreshold) { // Follow the pattern ?
        aCompas.sounds[sound][value].start(time)
    } else {
        // Pick a probability that the sound is played
        const playProbability = Math.random()
        const playThreshold = 0.5
        if (playProbability > playThreshold) {
            aCompas.sounds[sound][value].start(time)
        }
    }
}

/**
     * Builds a compas sequence from a palo, an "is eighthNote ?" boolean and a sound
     * @param {Object} store The Vuex store
     * @param {Object} palo The palo to build sequence for
     * @param {Boolean} eighthNotes Is this a eighthNotes sequence ?
     * @param {String} sound The sound to build sequence with
     * @param {Array} sequence The compas sequence for Tone
     * @return {Object} Returns the Tone sequence object
 */
const buildSequence = (store, palo, eighthNotes, sound, sequence) => {
    // 'events' is an occurence of an element inside the sequence variable (integer)
    let seq = new Tone.Sequence((time, events) => {
        // Call canvas animation on event time.
        if (sound === store.state.selectedInstruments[0] && events % 2 === 0) {
            Tone.Draw.schedule(() => {
                // Callback invoked from a requestAnimationFrame, is invoked close to AudioContext time
                store.commit(types.TRIGGER_EVENT, events / 2)
            }, time) // Use AudioContext time of the event
        }

        // key is a pulsation number, value is the number of clara sound
        forEachValue(palo[sound], (value, key) => {
            events = parseInt(events)
            key = parseInt(key)
            if (eighthNotes) {
                if (events === key && key % 2 !== 0) {
                    if (!store.state.improvise) {
                        aCompas.sounds[sound][value].start(time)
                    } else {
                        improviseSequence(sound, time, value)
                    }
                }
            } else {
                if (events === key && key % 2 === 0) {
                    if (!store.state.improvise) {
                        aCompas.sounds[sound][value].start(time)
                    } else {
                        improviseSequence(sound, time, value)
                    }
                }
            }
        })
    }, sequence, '8n')
    return seq
}

const initPalos = store => {
    forEachValue(store.state.palos, palo => {
        let sequence = []
        for (let i = 0; i < palo.nbBeatsInPattern; i++) {
            sequence.push(i)
        }
        aCompas.sequences[palo.value] = {
            quarterNotes: {
                clara: buildSequence(store, palo, false, 'clara', sequence),
                sorda: buildSequence(store, palo, false, 'sorda', sequence),
                cajon: buildSequence(store, palo, false, 'cajon', sequence),
                udu: buildSequence(store, palo, false, 'udu', sequence),
                click: buildSequence(store, palo, false, 'click', sequence)
            },
            eighthNotes: {
                clara: buildSequence(store, palo, true, 'clara', sequence),
                sorda: buildSequence(store, palo, true, 'sorda', sequence),
                cajon: buildSequence(store, palo, true, 'cajon', sequence),
                udu: buildSequence(store, palo, true, 'udu', sequence),
                click: buildSequence(store, palo, true, 'click', sequence)
            }
        }
    })
}

// ==========================
// Metronome user inputs
// ==========================

const selectTempo = tempo => {
    Tone.Transport.bpm.value = tempo
}

const initSequences = prevState => {
    forEachValue(aCompas.sequences[prevState.selectedPalo.value].quarterNotes, (seq, key) => {
        if (seq.state === 'stopped') seq.start(0)
    })
    forEachValue(aCompas.sequences[prevState.selectedPalo.value].eighthNotes, (seq, key) => {
        if (seq.state === 'stopped') seq.start(0)
    })
}

const selectPalo = (prevState, nextState) => {
    forEachValue(aCompas.sequences[prevState.selectedPalo.value].quarterNotes, (seq, key) => {
        if (seq.state === 'started') seq.stop()
    })
    forEachValue(aCompas.sequences[prevState.selectedPalo.value].eighthNotes, (seq, key) => {
        if (seq.state === 'started') seq.stop()
    })
    forEachValue(aCompas.sequences[nextState.selectedPalo.value].quarterNotes, (seq, key) => {
        if (seq.state === 'stopped') seq.start(0)
    })
    forEachValue(aCompas.sequences[nextState.selectedPalo.value].eighthNotes, (seq, key) => {
        if (seq.state === 'stopped') seq.start(0)
    })
}

const toggleEighthNotes = state => {
    forEachValue(aCompas.sequences[state.selectedPalo.value].quarterNotes, (seq, key) => {
        seq.mute = !state.selectedInstruments.includes(key)
    })
    forEachValue(aCompas.sequences[state.selectedPalo.value].eighthNotes, (seq, key) => {
        let instrument = state.instruments.find(o => o.value === key)
        if (state.selectedInstruments.includes(key) && instrument.eighthNotes) {
            seq.mute = false
        } else {
            seq.mute = true
        }
    })
}

const toggleImprovise = state => {
    forEachValue(aCompas.sequences[state.selectedPalo.value].quarterNotes, (seq, key) => {
        seq.improvise = state.improvise
    })
    forEachValue(aCompas.sequences[state.selectedPalo.value].eighthNotes, (seq, key) => {
        seq.improvise = state.improvise
    })
}

const toggleHumanize = state => {
    forEachValue(aCompas.sequences[state.selectedPalo.value].quarterNotes, (seq, key) => {
        seq.humanize = state.humanize
    })
    forEachValue(aCompas.sequences[state.selectedPalo.value].eighthNotes, (seq, key) => {
        seq.humanize = state.humanize
    })
}

const changeVolume = (prevState, nextState) => {
    forEachValue(nextState.instruments, (instrument, key) => {
        if (instrument.volume !== prevState.instruments[key].volume) {
            forEachValue(aCompas.sounds[instrument.value], sound => {
                sound.volume.value = instrument.volume
            })
        }
    })
}

// ==========================
// Metronome init functions
// ==========================

const initInputs = async store => {
    await initSequences(store.state)
    await toggleEighthNotes(store.state)
    await toggleImprovise(store.state)
    await toggleHumanize(store.state)
    await selectTempo(store.state.tempo)
    await restoreLocalStorage(store)
}

export const getContext = Tone.context

export const initMetronome = async (store, callback) => {
    Loading.show()
    await initSounds()
    await initPalos(store)
    await initInputs(store)
    if (Loading.isActive()) Loading.hide()
    callback(getContext.state)
}

// ==========================
// Metronome listen store
// ==========================

const stopAll = () => {
    forEachValue(aCompas.sequences, notes => {
        forEachValue(notes, instruments => {
            forEachValue(instruments, seq => {
                if (seq.state === 'started') seq.stop()
            })
        })
    })
}

const selectSequences = async (prevState, nextState) => {
    await selectPalo(prevState, nextState)
    await toggleEighthNotes(nextState)
    await toggleImprovise(nextState)
    await toggleHumanize(nextState)
}

const playStop = state => {
    if (state.isUnlocked) {
        if (state.isPlaying) {
            Tone.Transport.start('+0.1')
            window._paq.push(['trackEvent', 'Playing', 'Start', state.selectedPalo.label])
            state.playStartTime = Tone.context.currentTime
        } else {
            Tone.Transport.stop()
            stopAll()
            window._paq.push(['trackEvent', 'Playing', 'Stop', state.selectedPalo.label,
                Math.round(Tone.context.currentTime - state.playStartTime)])
        }
    }
}

const metronome = store => {
    let prevState = deepCopy(store.state)
    store.subscribe((mutation, state) => {
        let nextState = deepCopy(state)

        switch (mutation.type) {
            case types.PLAY_STOP:
                selectSequences(prevState, nextState)
                playStop(nextState)
                break

            case types.SELECT_TEMPO:
                selectTempo(nextState.tempo)
                break

            case types.SELECT_PALO:
                if (!nextState.isPlaying) Tone.Transport.stop()
                selectSequences(prevState, nextState)
                selectTempo(nextState.selectedPalo.defaultTempo)
                window._paq.push(['trackEvent', 'PaloSwitch', 'Set', nextState.selectedPalo.label])
                break

            case types.CHANGE_VOLUME:
                changeVolume(prevState, nextState)
                break

            case types.SELECT_INSTRUMENTS:
            case types.TOGGLE_EIGHTHNOTES:
            case types.ENABLE_EIGHTHNOTES:
            case types.DISABLE_EIGHTHNOTES:
            case types.TOGGLE_IMPROVISE:
            case types.ENABLE_IMPROVISE:
            case types.DISABLE_IMPROVISE:
            case types.TOGGLE_HUMANIZE:
            case types.ENABLE_HUMANIZE:
            case types.DISABLE_HUMANIZE:
                selectSequences(prevState, nextState)
                break

            default:
                return
        }
        prevState = nextState
    })
}

export default metronome
