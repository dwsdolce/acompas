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

const triggerAudioOnEvent = (store, palo, eighthNotes, sound, isLoop, time, note) => {
  // Prepend pre-count beats if required
  if (sound === 'preCount') {
    triggerPreCountClick(store, time, note)
  } else {
    // Don't play non-preCount sequences if note is during pre-count
    if (note < store.state.selectedPreCount.value * 2 && !isLoop) {
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
 * @param {Array} sequence Array describing the sequence
 * @param {Boolean} isLoop Are we building a loopable sequence ?
 * @return {Object} Returns the Tone sequence object
 */
const buildSequence = (store, palo, eighthNotes, sound, sequence, isLoop) => {
  // 'note' is an occurence of an element inside the sequence variable (integer)
  let seq = new Tone.Sequence((time, note) => {
    note = parseInt(note)

    // Switch from introduction sequences to loop sequences if required
    if (sound === 'event' && !isLoop && note === sequence[sequence.length - 1]) {
      forEachValue(aCompas.sequences.quarterNotes.loop, seq => {
        seq.start()
      })
      forEachValue(aCompas.sequences.eighthNotes.loop, seq => {
        seq.start()
      })
      forEachValue(aCompas.sequences.quarterNotes.introduction, seq => {
        seq.stop()
      })
      forEachValue(aCompas.sequences.quarterNotes.introduction, seq => {
        seq.stop()
      })
    }

    // Call animation on event time.
    // The event sequence is used to trigger events which will trigger UI modifications
    if (sound === 'event' && note % 2 === 0) {
      Tone.Draw.schedule(() => {
        // Animation triggered from store mutation, invoked close to AudioContext time
        store.commit(types.TRIGGER_EVENT, note)
      }, time) // Use AudioContext time of the event
    }

    if (sound !== 'event') {
      triggerAudioOnEvent(store, palo, eighthNotes, sound, isLoop, time, note)
    }
  }, sequence, '8n')
  // Set/unset sequence looping
  seq.loop = isLoop
  // Set/unset sequence improvise
  seq.improvise = store.state.improvise && sound !== 'preCount' && sound !== 'click'
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
    forEachValue(aCompas.sequences.quarterNotes, (sequences, key) => {
      forEachValue(sequences, (seq, key2) => {
        if (key2 === 'preCount' || key2 === 'event') {
          seq.mute = false
        } else {
          seq.mute = !state.selectedInstruments.includes(key2)
        }
      })
    })
    forEachValue(aCompas.sequences.eighthNotes, (sequences, key) => {
      forEachValue(sequences, (seq, key2) => {
        let instrument = state.instruments.find(o => o.value === key2)
        if (state.selectedInstruments.includes(key2) && instrument.eighthNotes) {
          seq.mute = false
        } else {
          seq.mute = true
        }
      })
    })
    return resolve()
  })
}

const toggleImprovise = state => {
  return new Promise(resolve => {
    forEachValue(aCompas.sequences.quarterNotes, sequences => {
      forEachValue(sequences, seq => {
        seq.improvise = state.improvise
      })
    })
    forEachValue(aCompas.sequences.eighthNotes, sequences => {
      forEachValue(sequences, seq => {
        seq.improvise = state.improvise
      })
    })
    return resolve()
  })
}

const toggleHumanize = state => {
  return new Promise(resolve => {
    forEachValue(aCompas.sequences.quarterNotes.introduction, (seq, sound) => {
      if (sound === 'event' || sound === 'preCount' || sound === 'click') {
        seq.humanize = false
      } else {
        seq.humanize = state.humanize
      }
    })
    forEachValue(aCompas.sequences.eighthNotes, (seq, sound) => {
      forEachValue(seq, seq2 => {
        seq2.humanize = state.humanize
      })
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
  if (state.selectedPreCount.value !== 0 || state.selectedStartBeat.value !== 0) {
    forEachValue(aCompas.sequences.quarterNotes.introduction, seq => {
      seq.start()
    })
    forEachValue(aCompas.sequences.eighthNotes.introduction, seq => {
      seq.start()
    })
  } else {
    forEachValue(aCompas.sequences.quarterNotes.loop, seq => {
      seq.start()
    })
    forEachValue(aCompas.sequences.eighthNotes.loop, seq => {
      seq.start()
    })
  }
  Tone.Transport.start('+0.1')
}

const stopAllSequences = () => {
  Tone.Transport.stop()
  forEachValue(aCompas.sequences, (sequences, key) => {
    forEachValue(sequences, notes => {
      forEachValue(notes, seq => {
        if (seq.state === 'started') seq.stop()
      })
    })
  })
}

const initSequences = store => {
  let introSeq = []
  let loopSeq = []
  let palo = store.state.selectedPalo
  // Add pre-count to introduction sequence
  for (let i = 0; i < parseInt(store.state.selectedPreCount.value); i++) {
    introSeq.push(i * 2)
    introSeq.push(i * 2 + 1)
  }
  // Add from start beat to the beat before loop begins to introduction sequence
  // Remark : the '+ 1' in the for loop condition is here to add a last extra
  // event at the end of introSeq. On this event, loop sequences are started
  // and introduction sequences are stopped.
  for (let i = 0; i < palo.nbBeatsInPattern - store.state.selectedStartBeat.value + 1; i++) {
    introSeq.push(store.state.selectedPreCount.value * 2 + i)
  }
  // Add pattern beats to loopable sequence
  for (let i = 0; i < palo.nbBeatsInPattern; i++) {
    loopSeq.push(i)
  }

  // Set aCompas.sequences
  aCompas.sequences = {
    quarterNotes: {
      introduction: {
        event: buildSequence(store, palo, false, 'event', introSeq, false),
        preCount: buildSequence(store, palo, false, 'preCount', introSeq, false),
        clara: buildSequence(store, palo, false, 'clara', introSeq, false),
        sorda: buildSequence(store, palo, false, 'sorda', introSeq, false),
        cajon: buildSequence(store, palo, false, 'cajon', introSeq, false),
        udu: buildSequence(store, palo, false, 'udu', introSeq, false),
        jaleo: buildSequence(store, palo, false, 'jaleo', introSeq, false),
        click: buildSequence(store, palo, false, 'click', introSeq, false)
      },
      loop: {
        event: buildSequence(store, palo, false, 'event', loopSeq, true),
        clara: buildSequence(store, palo, false, 'clara', loopSeq, true),
        sorda: buildSequence(store, palo, false, 'sorda', loopSeq, true),
        cajon: buildSequence(store, palo, false, 'cajon', loopSeq, true),
        udu: buildSequence(store, palo, false, 'udu', loopSeq, true),
        jaleo: buildSequence(store, palo, false, 'jaleo', loopSeq, true),
        click: buildSequence(store, palo, false, 'click', loopSeq, true)
      }
    },
    eighthNotes: {
      introduction: {
        clara: buildSequence(store, palo, true, 'clara', introSeq, false),
        sorda: buildSequence(store, palo, true, 'sorda', introSeq, false),
        cajon: buildSequence(store, palo, true, 'cajon', introSeq, false),
        udu: buildSequence(store, palo, true, 'udu', introSeq, false),
        jaleo: buildSequence(store, palo, true, 'jaleo', introSeq, false),
        click: buildSequence(store, palo, true, 'click', introSeq, false)
      },
      loop: {
        clara: buildSequence(store, palo, true, 'clara', loopSeq, true),
        sorda: buildSequence(store, palo, true, 'sorda', loopSeq, true),
        cajon: buildSequence(store, palo, true, 'cajon', loopSeq, true),
        udu: buildSequence(store, palo, true, 'udu', loopSeq, true),
        jaleo: buildSequence(store, palo, true, 'jaleo', loopSeq, true),
        click: buildSequence(store, palo, true, 'click', loopSeq, true)
      }
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
