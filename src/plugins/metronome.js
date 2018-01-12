import Tone from 'tone'
import { Loading } from 'quasar'
import { deepCopy, forEachValue } from '../assets/utils'
import * as types from '@store/mutation-types'
import audioSettings from '@store/data/audioDefaultSettings'
import { restoreLocalStorage } from '@plugins/localStorage'

const aCompas = {
    audioFormat: null,
    sounds: {},
    sequences: {},
    cursor: {}
}

// ==========================
// Metronome initial settings
// ==========================

/**
     * Detect the audio format to use for playing
     * load sounds by creating the Tone players
 */
const initSounds = () => {
    return new Promise(resolve => {
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
        return resolve()
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

const improviseJaleoSequence = (seq, events, time, palo, eighthNotes) => {
    if (!eighthNotes && (events % 2 !== 0)) {
        return
    }
    let playThreshold = 0.95
    // Check if time is a strong beat
    if (palo.accents.includes(events)) {
        // if the event is a strong beat, sound occurence will be more probable
        playThreshold = 0.8
    }
    const playProbability = Math.random()
    if (playProbability > playThreshold) {
        // Pick a random index in the available jaleo sounds
        const jaleoSoundsCount = Object.keys(aCompas.sounds['jaleo']).length
        let randomIndex = Math.round(Math.random() * (jaleoSoundsCount - 1))
        aCompas.sounds['jaleo'][randomIndex].start(time)
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
        events = parseInt(events)
        // Call canvas animation on event time.
        if (sound === store.state.selectedInstruments[0] && events % 2 === 0) {
            Tone.Draw.schedule(() => {
                // Callback invoked from a requestAnimationFrame, is invoked close to AudioContext time
                store.commit(types.TRIGGER_EVENT, events / 2)
            }, time) // Use AudioContext time of the event
        }

        if (sound === 'jaleo') {
            improviseJaleoSequence(seq, events, time, palo, eighthNotes)
            return
        }

        // key is a pulsation number, value is the number of clara sound
        forEachValue(palo[sound], (value, key) => {
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
    return new Promise(resolve => {
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
                    jaleo: buildSequence(store, palo, false, 'jaleo', sequence),
                    click: buildSequence(store, palo, false, 'click', sequence)
                },
                eighthNotes: {
                    clara: buildSequence(store, palo, true, 'clara', sequence),
                    sorda: buildSequence(store, palo, true, 'sorda', sequence),
                    cajon: buildSequence(store, palo, true, 'cajon', sequence),
                    udu: buildSequence(store, palo, true, 'udu', sequence),
                    jaleo: buildSequence(store, palo, true, 'jaleo', sequence),
                    click: buildSequence(store, palo, true, 'click', sequence)
                }
            }
        })
        return resolve()
    })
}

// ==========================
// Metronome user inputs
// ==========================

const selectTempo = tempo => {
    Tone.Transport.bpm.value = tempo
}

const toggleEighthNotes = state => {
    return new Promise(resolve => {
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
        return resolve()
    })
}

const toggleImprovise = state => {
    return new Promise(resolve => {
        forEachValue(aCompas.sequences[state.selectedPalo.value].quarterNotes, seq => {
            seq.improvise = state.improvise
        })
        forEachValue(aCompas.sequences[state.selectedPalo.value].eighthNotes, seq => {
            seq.improvise = state.improvise
        })
        return resolve()
    })
}

const toggleHumanize = state => {
    return new Promise(resolve => {
        forEachValue(aCompas.sequences[state.selectedPalo.value].quarterNotes, seq => {
            seq.humanize = state.humanize
        })
        forEachValue(aCompas.sequences[state.selectedPalo.value].eighthNotes, seq => {
            seq.humanize = state.humanize
        })
        return resolve()
    })
}

const changeVolume = (prevState, nextState) => {
    return new Promise(resolve => {
        forEachValue(nextState.instruments, (instrument, key) => {
            if (instrument.volume !== prevState.instruments[key].volume) {
                forEachValue(aCompas.sounds[instrument.value], sound => {
                    sound.volume.value = instrument.volume
                })
            }
        })
        return resolve()
    })
}

// ==========================
// Metronome init functions
// ==========================

const startSequences = state => {
    return new Promise(resolve => {
        forEachValue(aCompas.sequences[state.selectedPalo.value].quarterNotes, seq => {
            seq.start()
        })
        forEachValue(aCompas.sequences[state.selectedPalo.value].eighthNotes, seq => {
            seq.start()
        })
        return resolve()
    })
}

const stopAllSequences = () => {
    forEachValue(aCompas.sequences, notes => {
        forEachValue(notes, instruments => {
            forEachValue(instruments, seq => {
                if (seq.state === 'started') seq.stop()
            })
        })
    })
}

const activateSequences = state => {
    return new Promise(resolve => {
        return Promise.all([
            toggleEighthNotes(state),
            toggleImprovise(state),
            toggleHumanize(state),
            selectTempo(state.tempo)
        ]).then(() => resolve())
    })
}

export const getContext = Tone.context

export const isSupported = Tone.supported

export const initMetronome = async (store, callback) => {
    Loading.show({ delay: 300 })
    await initSounds()
    await initPalos(store)
    await restoreLocalStorage(store)
    await activateSequences(store.state).then(() => {
        Tone.Transport.start('+0.1')
        if (Loading.isActive()) Loading.hide()
        callback(getContext.state)
    })
}

const play = async state => {
    await startSequences(state)
    window._paq.push(['trackEvent', 'Playing', 'Start', state.selectedPalo.label])
    state.playStartTime = Tone.context.currentTime
}

const stop = state => {
    stopAllSequences()
    window._paq.push(['trackEvent', 'Playing', 'Stop', state.selectedPalo.label,
        Math.round(Tone.context.currentTime - state.playStartTime)])
}

// ==========================
// Metronome listen store
// ==========================

const metronome = store => {
    let prevState = deepCopy(store.state)

    store.subscribe((mutation, state) => {
        let nextState = deepCopy(state)

        switch (mutation.type) {
            case types.PLAY:
                play(nextState)
                break

            case types.STOP:
                stop(nextState)
                break

            case types.SELECT_TEMPO:
                selectTempo(nextState.tempo)
                break

            case types.SELECT_PALO:
                if (!nextState.isPlaying) stop(nextState)
                toggleEighthNotes(nextState)
                window._paq.push(['trackEvent', 'PaloSwitch', 'Set', nextState.selectedPalo.label])
                break

            case types.CHANGE_VOLUME:
                changeVolume(prevState, nextState)
                break

            case types.SELECT_INSTRUMENTS:
            case types.TOGGLE_EIGHTHNOTES:
            case types.ENABLE_EIGHTHNOTES:
            case types.DISABLE_EIGHTHNOTES:
                toggleEighthNotes(nextState)
                break

            case types.TOGGLE_IMPROVISE:
            case types.ENABLE_IMPROVISE:
            case types.DISABLE_IMPROVISE:
                toggleImprovise(nextState)
                break

            case types.TOGGLE_HUMANIZE:
            case types.ENABLE_HUMANIZE:
            case types.DISABLE_HUMANIZE:
                toggleHumanize(nextState)
                break

            default:
                return
        }
        prevState = nextState
    })
}

export default metronome
