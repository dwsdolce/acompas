import Tone from 'tone'
import { Loading } from 'quasar'
import { deepCopy, forEachValue } from '../assets/utils'
import * as types from '../store/mutation-types'
import audioSettings from '../store/data/audioDefaultSettings'
import { restoreLocalStorage } from './localStorage'

export const metronomeData = {
  audioFormat: null,
  sounds: {},
  sequences: {},
  preCount: null,
  startBeat: null
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
      metronomeData.audioFormat = 'flac'
    } else if (new Audio().canPlayType('audio/ogg')) {
      metronomeData.audioFormat = 'ogg'
    } else if (new Audio().canPlayType('audio/mpeg')) {
      metronomeData.audioFormat = 'mp3'
    } else if (new Audio().canPlayType('audio/mp4')) {
      metronomeData.audioFormat = 'mp4'
    } else if (new Audio().canPlayType('audio/wav')) {
      metronomeData.audioFormat = 'wav'
    } else {
      throw new Error('None of the available audio formats can be played')
    }

    let path = 'statics/audio/'

    forEachValue(audioSettings, (value, key) => {
      metronomeData.sounds[key] = {}
      for (let i = 0; i < value.length; i++) {
        let url = path + value[i].src + '.' + metronomeData.audioFormat
        metronomeData.sounds[key][i] = new Tone.Player(url).toMaster()
        metronomeData.sounds[key][i].volume.value = value[i].volume
        metronomeData.sounds[key][i].volume.default = value[i].volume
      }
    })
    return resolve()
  })
}

// ========================
// Metronome palos settings
// ========================

const noteIndexInPattern = (store, i) => {
  let index = i - metronomeData.preCount * 2 + metronomeData.startBeat
  while (index < 0) {
    index += store.state.selectedPalo.nbBeatsInPattern
  }
  return index % store.state.selectedPalo.nbBeatsInPattern
}

const improvise = (store, palo, sound, time, value, note, key, eighthNotes) => {
  // For the "click" sounds, follow the sequence and never improvise
  if (sound === 'click') {
    metronomeData.sounds[sound][value - 1].start(time)
    return
  }

  // Pick a probability that the sound occurence is following the pattern
  const improvisationProbability = Math.random()
  const improvisationThreshold = 0.30 // 30% chances that we don't follow the pattern
  let index = noteIndexInPattern(store, note)
  if (improvisationProbability > improvisationThreshold) { // Follow the pattern ?
    if (index === key && eighthNotes && key % 2 !== 0) {
      metronomeData.sounds[sound][value - 1].start(time)
    }
    if (index === key && !eighthNotes && key % 2 === 0) {
      metronomeData.sounds[sound][value - 1].start(time)
    }
  } else {
    // Pick a probability that the sound is played
    const playProbability = Math.random()
    const playThreshold = 0.50 // 50% chances that the sound is not played
    if (playProbability > playThreshold) {
      metronomeData.sounds[sound][value - 1].start(time)
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
    const jaleoSoundsCount = Object.keys(metronomeData.sounds['jaleo']).length
    let randomIndex = Math.round(Math.random() * (jaleoSoundsCount - 1))
    metronomeData.sounds['jaleo'][randomIndex].start(time)
  }
}

const triggerPreCountClick = (store, time, note) => {
  if (metronomeData.preCount > 0 && note < metronomeData.preCount * 2 && note % 2 === 0) {
    forEachValue(store.state.selectedPalo.beats, (value, key) => {
      let index = noteIndexInPattern(store, key)
      if (note === index % store.state.selectedPalo.nbBeatsInPattern) {
        if (value === 'strong') {
          metronomeData.sounds['click'][0].start(time)
        } else {
          metronomeData.sounds['click'][1].start(time)
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
    if (note < metronomeData.preCount * 2 && !isLoop) {
      return
    }

    if (sound === 'jaleo') {
      improviseJaleo(note, time, palo, eighthNotes)
      return
    }

    // key is a pulsation number, value is the sound number
    forEachValue(palo[sound], (value, key) => {
      key = parseInt(key)
      let index = noteIndexInPattern(store, note)
      if (eighthNotes && key % 2 !== 0) {
        if (!store.state.improvise && index === key) {
          metronomeData.sounds[sound][value - 1].start(time)
        }
        if (store.state.improvise && index === key) {
          improvise(store, palo, sound, time, value, note, key, eighthNotes)
        }
      }
      if (!eighthNotes && key % 2 === 0) {
        if (!store.state.improvise && index === key) {
          metronomeData.sounds[sound][value - 1].start(time)
        }
        if (store.state.improvise && index === key) {
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
      forEachValue(metronomeData.sequences.quarterNotes.loop, seq => {
        seq.start()
      })
      forEachValue(metronomeData.sequences.eighthNotes.loop, seq => {
        seq.start()
      })
      forEachValue(metronomeData.sequences.quarterNotes.introduction, seq => {
        seq.stop()
      })
      forEachValue(metronomeData.sequences.eighthNotes.introduction, seq => {
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
    // Do nothing if sequences have not been initialized
    if (typeof metronomeData.sequences.quarterNotes === 'undefined') {
      return resolve()
    }
    forEachValue(metronomeData.sequences.quarterNotes.introduction, (seq, key) => {
      if (key === 'preCount' || key === 'event') {
        seq.mute = false
      } else {
        seq.mute = !state.selectedInstruments.includes(key)
      }
      // console.log('seq.mute quarterNotes.introduction : ', seq.mute)
    })
    forEachValue(metronomeData.sequences.quarterNotes.loop, (seq, key) => {
      if (key === 'preCount' || key === 'event') {
        seq.mute = false
      } else {
        seq.mute = !state.selectedInstruments.includes(key)
      }
      // console.log('seq.mute quarterNotes.loop : ', seq.mute)
    })
    forEachValue(metronomeData.sequences.eighthNotes.introduction, (seq, key) => {
      let instrument = state.instruments.find(o => o.value === key)
      // console.log('instrument : ', instrument)
      // console.log('key : ', key)
      if (state.selectedInstruments.includes(key) && instrument.eighthNotes) {
        seq.mute = false
      } else {
        seq.mute = true
      }
      // console.log('seq.mute eighthNotes.introduction : ', seq.mute)
    })
    forEachValue(metronomeData.sequences.eighthNotes.loop, (seq, key) => {
      let instrument = state.instruments.find(o => o.value === key)
      // console.log('instrument : ', instrument)
      // console.log('key : ', key)
      if (state.selectedInstruments.includes(key) && instrument.eighthNotes) {
        seq.mute = false
      } else {
        seq.mute = true
      }
      // console.log('seq.mute eighthNotes.loop : ', seq.mute)
    })
    return resolve()
  })
}

const toggleImprovise = state => {
  return new Promise(resolve => {
    forEachValue(metronomeData.sequences.quarterNotes, sequences => {
      forEachValue(sequences, seq => {
        seq.improvise = state.improvise
      })
    })
    forEachValue(metronomeData.sequences.eighthNotes, sequences => {
      forEachValue(sequences, seq => {
        seq.improvise = state.improvise
      })
    })
    return resolve()
  })
}

const toggleHumanize = state => {
  return new Promise(resolve => {
    forEachValue(metronomeData.sequences.quarterNotes.introduction, (seq, sound) => {
      if (sound === 'event' || sound === 'preCount' || sound === 'click') {
        seq.humanize = false
      } else {
        seq.humanize = state.humanize
      }
    })
    forEachValue(metronomeData.sequences.eighthNotes, (seq, sound) => {
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
        forEachValue(metronomeData.sounds[instrument.value], sound => {
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
  if (metronomeData.sequences.quarterNotes.introduction.event.length !== 0) {
    // console.log('starting introduction')
    forEachValue(metronomeData.sequences.quarterNotes.introduction, seq => {
      seq.start()
    })
    forEachValue(metronomeData.sequences.eighthNotes.introduction, seq => {
      seq.start()
    })
  } else {
    // console.log('starting loop')
    forEachValue(metronomeData.sequences.quarterNotes.loop, seq => {
      seq.start()
    })
    forEachValue(metronomeData.sequences.eighthNotes.loop, seq => {
      seq.start()
    })
  }
  Tone.Transport.start('+0.1')
}

const stopAllSequences = () => {
  Tone.Transport.stop()
  forEachValue(metronomeData.sequences, (sequences, key) => {
    forEachValue(sequences, notes => {
      forEachValue(notes, seq => {
        if (seq.state === 'started') seq.stop()
      })
    })
  })
}

const initSequences = (store, nextState) => {
  // console.log('initSequences')
  let introSeq = []
  let loopSeq = []
  let palo = nextState.selectedPalo
  metronomeData.preCount = nextState.selectedPreCount.value
  metronomeData.startBeat = nextState.selectedStartBeat.value
  // console.log(palo.label)
  // Add pre-count to introduction sequence
  for (let i = 0; i < parseInt(nextState.selectedPreCount.value); i++) {
    // console.log('pushing ', i * 2, i * 2 + 1)
    introSeq.push(i * 2)
    introSeq.push(i * 2 + 1)
  }
  // Add beats to introduction sequence until loop begins
  // console.log('preCount: ', nextState.selectedPreCount.value)
  if (parseInt(nextState.selectedPreCount.value) !== 0 || parseInt(nextState.selectedStartBeat.value) !== 0) {
    let i = introSeq.length
    // console.log('nbBeatsInPattern: ', palo.nbBeatsInPattern)
    while (i % palo.nbBeatsInPattern !== 1) {
      // console.log('pushing', i)
      introSeq.push(i)
      i++
    }
  }
  // Add pattern beats to loopable sequence
  for (let i = 0; i < palo.nbBeatsInPattern; i++) {
    loopSeq.push(i)
  }
  // console.log('introSeq : ', introSeq)
  // console.log('loopSeq : ', loopSeq)

  // Build all sequences
  let sequences = {
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
  metronomeData.sequences = sequences
}

export const getContext = Tone.context

export const isSupported = Tone.supported

export const initMetronome = (store) => {
  Loading.show({ delay: 100 })
  initSounds()
  restoreLocalStorage(store)
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
        initSequences(store, nextState)
        toggleEighthNotes(nextState)
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
