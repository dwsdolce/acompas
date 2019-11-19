import Tone from 'tone'
import { Loading } from 'quasar'
import { deepCopy, forEachValue } from '../assets/utils'
import * as types from '../store/mutation-types'
import audioSettings from '../store/data/audioDefaultSettings'
import { restoreLocalStorage } from './localStorage'

const aCompas = {
  audioFormat: null,
  sounds: {},
  sequences: {}
}

const synth = new Tone.Synth().toMaster()

export const playSynth = note => {
  synth.triggerAttackRelease(note, 4)
}

// ==========================
// Metronome initial settings
// ==========================

/**
     * Detect the audio format to use for playing
     * load sounds by creating the Tone players
 */
const initSounds = async () => {
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
      for (let i = 0; i < value.length; i++) {
        let url = path + value[i].src + '.' + aCompas.audioFormat
        aCompas.sounds[key][i] = new Tone.Player(url).toMaster()
        aCompas.sounds[key][i].volume.value = value[i].volume
        aCompas.sounds[key][i].volume.default = value[i].volume
      }
    })
    return resolve()
  })
}

// ========================
// Metronome palos settings
// ========================

const improvise = (store, palo, sound, time, value, note, key, eighthNotes) => {
  // For the "click" sounds, follow the sequence and never improvise
  if (sound === 'click') {
    aCompas.sounds[sound][value - 1].start(time)
    return
  }

  // Pick a probability that the sound occurence is following the pattern
  const improvisationProbability = Math.random()
  const improvisationThreshold = 0.30 // 30% chances that we don't follow the pattern
  let index = note - store.state.selectedPreCount.value * 2 + store.state.selectedStartBeat.value
  if (index < 0) {
    index += palo.nbBeatsInPattern
  }
  let noteIndexInPattern = index % palo.nbBeatsInPattern
  if (improvisationProbability > improvisationThreshold) { // Follow the pattern ?
    if (noteIndexInPattern === key && eighthNotes && key % 2 !== 0) {
      aCompas.sounds[sound][value - 1].start(time)
    }
    if (noteIndexInPattern === key && !eighthNotes && key % 2 === 0) {
      aCompas.sounds[sound][value - 1].start(time)
    }
  } else {
    // Pick a probability that the sound is played
    const playProbability = Math.random()
    const playThreshold = 0.50 // 50% chances that the sound is not played
    if (playProbability > playThreshold) {
      aCompas.sounds[sound][value - 1].start(time)
    }
  }
}

const improviseJaleo = (note, time, palo, eighthNotes) => {
  if (!eighthNotes && (note % 2 !== 0)) {
    return
  }
  let playThreshold = 0.95 // 95% chances that the the sound is not played
  // Check if time is a strong beat
  if (palo.accents.includes(note)) {
    // if the event is a strong beat, sound occurence will be more probable
    playThreshold = 0.7 // 70% chances that the sound is not played
  }
  const playProbability = Math.random()
  if (playProbability > playThreshold) {
    // Pick a random index in the available jaleo sounds
    const jaleoSoundsCount = Object.keys(aCompas.sounds['jaleo']).length
    let randomIndex = Math.round(Math.random() * (jaleoSoundsCount - 1))
    aCompas.sounds['jaleo'][randomIndex].start(time)
  }
}

const triggerPreCountClick = (store, time, note) => {
  if (store.state.selectedPreCount.value > 0 && note < store.state.selectedPreCount.value * 2 && note % 2 === 0) {
    forEachValue(store.state.selectedPalo.beats, (value, key) => {
      let index = key - store.state.selectedPreCount.value * 2 + store.state.selectedStartBeat.value
      if (index < 0) {
        index += store.state.selectedPalo.nbBeatsInPattern
      }
      if (note === index % store.state.selectedPalo.nbBeatsInPattern) {
        if (value === 'strong') {
          aCompas.sounds['click'][0].start(time)
        } else {
          aCompas.sounds['click'][1].start(time)
        }
      }
    })
  }
}

const appendEventsToSequences = (store) => {
  // seq is a Tone.Sequence, sound is an instrument track name
  forEachValue(aCompas.sequences.quarterNotes, (seq, sound) => {
    let initialSeqLength = seq.length
    for (let i = 0; i < store.state.selectedPalo.nbBeatsInPattern; i++) {
      seq.add(initialSeqLength + i, initialSeqLength + i)
      // triggerAudioOnEvent(store, store.state.selectedPalo, false, sound,
      //   [initialSeqLength + 1], time, initialSeqLength + i)
    }
  })
  forEachValue(aCompas.sequences.eighthNotes, (seq, sound) => {
    let initialSeqLength = seq.length
    for (let i = 0; i < store.state.selectedPalo.nbBeatsInPattern; i++) {
      seq.add(initialSeqLength + i, initialSeqLength + i)
      // triggerAudioOnEvent(store, store.state.selectedPalo, true, sound,
      //   [initialSeqLength + 1], time, initialSeqLength + i)
    }
  })
}

const triggerAudioOnEvent = (store, palo, eighthNotes, sound, time, note) => {
  // Prepend pre-count beats if required
  if (sound === 'preCount') {
    triggerPreCountClick(store, time, note)
  } else {
    // Don't play non-preCount sequences if note is during pre-count
    if (note < store.state.selectedPreCount.value * 2) {
      return
    }

    if (sound === 'jaleo') {
      improviseJaleo(note, time, palo, eighthNotes)
      return
    }

    // key is a pulsation number, value is the sound number
    forEachValue(palo[sound], (value, key) => {
      key = parseInt(key)
      let index = note - store.state.selectedPreCount.value * 2 + store.state.selectedStartBeat.value
      if (index < 0) {
        index += palo.nbBeatsInPattern
      }
      let noteIndexInPattern = index % palo.nbBeatsInPattern
      if (eighthNotes && key % 2 !== 0) {
        if (!store.state.improvise && noteIndexInPattern === key) {
          aCompas.sounds[sound][value - 1].start(time)
        }
        if (store.state.improvise && noteIndexInPattern === key) {
          improvise(store, palo, sound, time, value, note, key, eighthNotes)
        }
      }
      if (!eighthNotes && key % 2 === 0) {
        if (!store.state.improvise && noteIndexInPattern === key) {
          aCompas.sounds[sound][value - 1].start(time)
        }
        if (store.state.improvise && noteIndexInPattern === key) {
          improvise(store, palo, sound, time, value, note, key, eighthNotes)
        }
      }
    })
  }
}

/**
 * Builds a compas sequence from a palo, an "is eighthNote ?" boolean and a sound
 * @param {Object} store The Vuex store
 * @param {Object} palo The palo to build sequence for
 * @param {Boolean} eighthNotes Is this a eighthNotes sequence ?
 * @param {String} sound The sound to build sequence with (slug)
 * @param {Array} sequence The compas sequence for Tone
 * @return {Object} Returns the Tone sequence object
 */
const buildSequence = (store, palo, eighthNotes, sound, sequence) => {
  // 'note' is an occurence of an element inside the sequence variable (integer)
  let seq = new Tone.Sequence((time, note) => {
    note = parseInt(note)

    // Append new compás events to the sequences as playing goes on
    let index = note - store.state.selectedPreCount.value * 2 + store.state.selectedStartBeat.value
    if (index < 0) {
      index += store.state.selectedPalo.nbBeatsInPattern
    }
    if (sound === 'preCount' && index % store.state.selectedPalo.nbBeatsInPattern === store.state.selectedStartBeat.value) {
      appendEventsToSequences(store)
    }

    // Call animation on event time.
    // The preCount track is used to trigger events which will trigger UI modifications
    if (sound === 'preCount' && note % 2 === 0) {
      Tone.Draw.schedule(() => {
        // Animation triggered from store mutation, invoked close to AudioContext time
        store.commit(types.TRIGGER_EVENT, note)
      }, time) // Use AudioContext time of the event
    }

    triggerAudioOnEvent(store, palo, eighthNotes, sound, time, note)
  }, sequence, '8n')
  // Deactivate sequence looping
  seq.loop = false
  return seq
}

// =====================
// Metronome user inputs
// =====================

const selectTempo = tempo => {
  Tone.Transport.bpm.value = tempo
}

const toggleEighthNotes = state => {
  return new Promise(resolve => {
    forEachValue(aCompas.sequences.quarterNotes, (seq, key) => {
      if (key === 'preCount') {
        seq.mute = false
      } else {
        seq.mute = !state.selectedInstruments.includes(key)
      }
    })
    forEachValue(aCompas.sequences.eighthNotes, (seq, key) => {
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
    forEachValue(aCompas.sequences.quarterNotes, seq => {
      seq.improvise = state.improvise
    })
    forEachValue(aCompas.sequences.eighthNotes, seq => {
      seq.improvise = state.improvise
    })
    return resolve()
  })
}

const toggleHumanize = state => {
  return new Promise(resolve => {
    forEachValue(aCompas.sequences.quarterNotes, (seq, sound) => {
      if (sound === 'preCount' || sound === 'click') {
        seq.humanize = false
      } else {
        seq.humanize = state.humanize
      }
    })
    forEachValue(aCompas.sequences.eighthNotes, (seq, sound) => {
      if (sound === 'preCount' || sound === 'click') {
        seq.humanize = false
      } else {
        seq.humanize = state.humanize
      }
    })
    return resolve()
  })
}

const changeVolume = (prevState, nextState) => {
  return new Promise(resolve => {
    forEachValue(nextState.instruments, (instrument, key) => {
      if (instrument.volume !== prevState.instruments[key].volume) {
        forEachValue(aCompas.sounds[instrument.value], sound => {
          sound.volume.value = instrument.volume + sound.volume.default
        })
      }
    })
    return resolve()
  })
}

// ========================
// Metronome init functions
// ========================

const startSequences = state => {
  forEachValue(aCompas.sequences.quarterNotes, seq => {
    seq.start()
  })
  forEachValue(aCompas.sequences.eighthNotes, seq => {
    seq.start()
  })
  Tone.Transport.start('+0.1')
}

const stopAllSequences = () => {
  Tone.Transport.stop()
  forEachValue(aCompas.sequences, notes => {
    forEachValue(notes, seq => {
      if (seq.state === 'started') seq.stop()
    })
  })
}

const initSequences = store => {
  let sequence = []
  let palo = store.state.selectedPalo
  // Add pre-count to sequence
  for (let i = 0; i < parseInt(store.state.selectedPreCount.value); i++) {
    sequence.push(i * 2)
    sequence.push(i * 2 + 1)
  }
  // Add pattern beats to sequence, starting from the selected start beat
  for (let i = 0; i < palo.nbBeatsInPattern - store.state.selectedStartBeat.value; i++) {
    sequence.push(store.state.selectedPreCount.value * 2 + i)
  }
  // Set aCompas.sequences
  aCompas.sequences = {
    quarterNotes: {
      preCount: buildSequence(store, palo, false, 'preCount', sequence),
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

// const startTransport = () => {
//   Tone.Transport.start('+0.1')
// }

export const getContext = Tone.context

export const isSupported = Tone.supported

export const initMetronome = (store) => {
  Loading.show({ delay: 100 })
  initSounds()
  restoreLocalStorage(store)
  initSequences(store)
  activateSequences(store.state)
  Loading.hide()
  return getContext.state
}

// ================================
// Metronome store events listening
// ================================

const metronome = store => {
  let prevState = deepCopy(store.state)

  store.subscribe((mutation, state) => {
    let nextState = deepCopy(state)

    switch (mutation.type) {
      case types.PLAY:
        startSequences(nextState)
        break

      case types.STOP:
        stopAllSequences()
        break

      case types.SELECT_TEMPO:
        selectTempo(nextState.tempo)
        break

      case types.SELECT_PALO:
        if (!nextState.isPlaying) stopAllSequences()
        initSequences(store)
        toggleEighthNotes(nextState)
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
