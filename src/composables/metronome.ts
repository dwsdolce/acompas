import * as Tone from 'tone'
import { ref } from 'vue'
import { Loading, Notify } from 'quasar'
import { useRoute } from 'vue-router'
import palosData from 'src/data/palosData'
import audioData from 'src/data/audioData'
import { usePaloStore } from 'src/stores/palo'
import { forEachValue } from 'src/composables/utils'
import type {
  VolumeOpts,
  DecayOpts,
  SoundsDataKey,
  SoundsData,
  Sounds,
  Sound,
  Seqs,
  Seq,
  SeqSubdiv,
  PaloData,
  PaloState,
  instruOpts,
  Players,
  ExtendedPlayer
} from 'src/composables/models'
import { Instrument } from 'tone/build/esm/instrument/Instrument'

const sounds: Sounds = {} as Sounds
const sequences: Seqs = {} as Seqs
const quarterChannel = new Tone.Channel(0, 0).toDestination()
const eighthChannel = new Tone.Channel(-4, -0.5).toDestination()
const reverb = new Tone.Reverb({
  decay: 0.3,
  preDelay: 0,
  wet: 1
}).toDestination()
let audioFormat = ''

export const useMetronome = () => {
  const route = useRoute()
  const paloStore = usePaloStore(route.name as string)()
  const paloData = ref(palosData.find((palo) => palo.value === route.name))
  const palo = ref(paloStore.palo)

  const initSounds = async () => {
    const audio = new Audio()
    if (audio.canPlayType('audio/flac')) {
      audioFormat = 'flac'
    } else if (audio.canPlayType('audio/mpeg')) {
      audioFormat = 'mp3'
    } else if (audio.canPlayType('audio/mp4')) {
      audioFormat = 'mp4'
    } else if (audio.canPlayType('audio/wav')) {
      audioFormat = 'wav'
    } else if (audio.canPlayType('audio/ogg')) {
      audioFormat = 'ogg'
    } else {
      throw new Error('None of the available audio formats can be played')
    }

    const path = 'audio/'

    forEachValue(audioData, (value: SoundsDataKey[], key: string) => {
      sounds[key as keyof SoundsData] = {} as Sound
      const sound = sounds[key as keyof SoundsData]

      for (let i = 0; i < value.length; i++) {
        const url = path + value[i].src + '.' + audioFormat
        sound[i] = {
          quarter: new Tone.Player({
            url: url,
            volume: value[i].volume,
            fadeOut: 1
          }) as ExtendedPlayer,
          eighth: new Tone.Player({
            url: url,
            volume: value[i].volume,
            fadeOut: 1
          }) as ExtendedPlayer
        }

        sound[i].quarter.defaultVolume = value[i].volume
        sound[i].eighth.defaultVolume = value[i].volume

        sound[i].quarter.connect(quarterChannel)
        quarterChannel.connect(reverb)

        sound[i].eighth.connect(eighthChannel)
        eighthChannel.connect(reverb)
      }
    })
    console.log('Sounds loaded', sounds)
  }

  // ========================
  // Metronome palos settings
  // ========================

  const noteIndexInPattern = (i: number) => {
    if (
      palo.value.selectedPreCount &&
      palo.value.selectedStartBeat &&
      paloData.value?.nbBeatsInPattern
    ) {
      let index =
        i -
        palo.value.selectedPreCount.value * 2 +
        palo.value.selectedStartBeat.value
      while (index < 0) {
        index += paloData.value?.nbBeatsInPattern
      }
      if (paloData.value) {
        return index % paloData.value?.nbBeatsInPattern
      } else {
        return null
      }
    }
  }

  const improvise = (
    type: string,
    time: number,
    sound: Tone.Player,
    note: number,
    key: number,
    eighthNotes: boolean
  ) => {
    // For the "click" sounds, follow the sequence and never improvise
    if (type == 'click') {
      sound?.start(time)
      return
    }

    // Don't mess with accents
    if (paloData.value?.accents.includes((key / 2) as never)) {
      sound?.start(time)
      return
    }

    // Pick a probability that the sound occurence is following the pattern
    const improvisationProbability = Math.random()
    const improvisationThreshold = 0.7 // 70% chances that we don't follow the pattern
    const index = noteIndexInPattern(note)

    if (improvisationProbability > improvisationThreshold) {
      // Follow the pattern ?
      if (index == key && eighthNotes && key % 2 !== 0) {
        sound?.start(time)
      }
      if (index == key && !eighthNotes && key % 2 === 0) {
        sound?.start(time)
      }
    } else {
      // Pick a probability that the sound is played
      const playProbability = Math.random()
      const playThreshold = 0.7 // 70% chances that the sound is not played
      if (playProbability > playThreshold) {
        sound?.start(time)
      }
    }
  }

  const improviseJaleo = (
    note: number,
    time: number,
    eighthNotes: boolean
  ) => {
    if (!eighthNotes && note % 2 !== 0) {
      return
    }
    let playThreshold = 0.98 // 98% chances that the the sound is not played
    // Check if time is a strong beat
    if (paloData.value?.accents.includes(noteIndexInPattern(note) as never)) {
      // if the event is a strong beat, sound occurence will be more probable
      playThreshold = 0.94 // 94% chances that the sound is not played
    }
    const playProbability = Math.random()
    if (playProbability > playThreshold) {
      // Pick a random index in the available jaleo sounds
      const jaleoSoundsCount = Object.keys(sounds.jaleo).length
      const randomIndex = Math.round(Math.random() * (jaleoSoundsCount - 1))
      sounds.jaleo[randomIndex][eighthNotes ? 'eighth' : 'quarter'].start(time)
    }
  }

  const triggerPreCountClick = (
    time: number,
    note: number
  ) => {
    if (palo.value.selectedPreCount?.value && paloData.value?.accents) {
      if (
        palo.value.selectedPreCount?.value > 0 &&
        note < palo.value.selectedPreCount?.value * 2 &&
        note % 2 === 0
      ) {
        const index = noteIndexInPattern(note)
        if (!index) return
        if (paloData.value?.accents.includes((index / 2) as never)) {
          sounds.click[0].quarter.start(time)
        } else {
          sounds.click[1].quarter.start(time)
        }
      }
    }
  }

  const triggerAudioOnEvent = (
    eighthNotes: boolean,
    type: string,
    isLoop: boolean,
    time: number,
    note: number
  ) => {
    // eighthNotes ? gain.gain.value = 0.2 : gain.gain = 1.2

    // Prepend pre-count beats if required
    if (type == 'preCount') {
      triggerPreCountClick(time, note)
    } else {
      // Don't play non-preCount sequences if note is during pre-count
      if (
        palo.value.selectedPreCount?.value &&
        note < palo.value.selectedPreCount?.value * 2 &&
        !isLoop
      ) {
        return
      }

      if (type == 'jaleo') {
        const jaleo = paloStore.instrument('jaleo')
        if (jaleo?.enabled) improviseJaleo(note, time, eighthNotes)
        return
      }

      const instru = paloStore.instrument((type as string))

      // index is a pulsation number, value is the sound number
      if (instru?.enabled && paloData.value && type) {
        (paloData.value[type as keyof PaloData] as (number | null)[]).forEach(
          (value: number | null, index: number) => {
            if (!value) return
            const sound = sounds[type as keyof Sounds][value - 1]
            const key = noteIndexInPattern(note)

            if (
              eighthNotes &&
              instru?.eighthNotes &&
              (index as number) % 2 != 0 &&
              key == index
            ) {
              palo.value.improvisation
                ? improvise(type, time, sound[eighthNotes ? 'eighth' : 'quarter'], note, index, eighthNotes)
                : sound[eighthNotes ? 'eighth' : 'quarter'].start(time)
            }
            if (!eighthNotes && (index as number) % 2 == 0 && key == index) {
              palo.value.improvisation
                ? improvise(type, time, sound[eighthNotes ? 'eighth' : 'quarter'], note, index, eighthNotes)
                : sound[eighthNotes ? 'eighth' : 'quarter'].start(time)
            }
          }
        )
      }
    }
  }

  /**
   * Builds a compas sequence from a palo, an "is eighthNote ?" boolean and a sound
   */
  const buildSequence = (
    eighthNotes: boolean,
    type: string,
    sequence: number[],
    isLoop: boolean
  ) => {
    // 'note' is an occurence of an element inside the sequence variable (integer)
    const seq = new Tone.Sequence((time, note) => {
      // note = parseInt(note)

      // Type is not an event, it is a preCount or a selected instrument
      if (type !== ('event')) {
        triggerAudioOnEvent(eighthNotes, type, isLoop, time, note)
      }

      // Call animation on event time.
      // The 'event' sequence is used to trigger events which will trigger UI modifications
      if (type === ('event') && !eighthNotes && note % 2 === 0) {
        Tone.Draw.schedule(() => {
          // Animation triggered from store mutation, invoked close to AudioContext time
          if (palo.value.name === 'no-compas') {
            paloStore.triggerEvent(paloStore.metronomeEvent === 0 ? 2 : 0)
          } else {
            const key = noteIndexInPattern(note)
            if (key !== null) paloStore.triggerEvent(key as number | null)
          }
        }, time) // Use AudioContext time of the event
      }
    }, sequence)

    // Set/unset sequence looping
    seq.loop = isLoop

    return seq
  }

  // ========================
  // Metronome init functions
  // ========================

  const initSequences = () => {
    const introSeq = []
    const loopSeq = []

    if (paloData.value?.nbBeatsInPattern) {
      if (
        palo.value.selectedPreCount &&
        palo.value.selectedStartBeat
      ) {
        // Add pre-count to introduction sequence
        for (let i = 0; i < palo.value.selectedPreCount?.value; i++) {
          introSeq.push(i * 2)
          introSeq.push(i * 2 + 1)
        }

        // Add beats to introduction sequence until loop begins
        if (
          palo.value.selectedPreCount?.value !== 0 ||
          palo.value.selectedStartBeat?.value !== 0
        ) {
          let i = introSeq.length
          // Add items to introSeq until we find a beat with index 0 in the pattern
          while (
            (palo.value.selectedStartBeat?.value -
              palo.value.selectedPreCount?.value * 2 +
              i) %
              paloData.value?.nbBeatsInPattern !==
            0
          ) {
            introSeq.push(i)
            i++
          }
        }
      }
      // Add pattern beats to loopable sequence
      for (let i = 0; i < paloData.value?.nbBeatsInPattern; i++) {
        loopSeq.push(i)
      }
    }

    // Build all sequences
    sequences.quarterNotes = {
      introduction: {
        preCount: buildSequence(false, ('preCount' as keyof PaloData), introSeq, false),
        clara: buildSequence(false, ('clara' as keyof PaloData), introSeq, false),
        sorda: buildSequence(false, ('sorda' as keyof PaloData), introSeq, false),
        pito: buildSequence(false, ('pito' as keyof PaloData), introSeq, false),
        cajon: buildSequence(false, ('cajon' as keyof PaloData), introSeq, false),
        nudillo: buildSequence(false, ('nudillo' as keyof PaloData), introSeq, false),
        udu: buildSequence(false, ('udu' as keyof PaloData), introSeq, false),
        jaleo: buildSequence(false, ('jaleo' as keyof PaloData), introSeq, false),
        click: buildSequence(false, ('click' as keyof PaloData), introSeq, false),
        event: buildSequence(false, ('event' as keyof PaloData), introSeq, false),
      },
      loop: {
        clara: buildSequence(false, ('clara' as keyof PaloData), loopSeq, true),
        sorda: buildSequence(false, ('sorda' as keyof PaloData), loopSeq, true),
        pito: buildSequence(false, ('pito' as keyof PaloData), loopSeq, true),
        cajon: buildSequence(false, ('cajon' as keyof PaloData), loopSeq, true),
        nudillo: buildSequence(false, ('nudillo' as keyof PaloData), loopSeq, true),
        udu: buildSequence(false, ('udu' as keyof PaloData), loopSeq, true),
        jaleo: buildSequence(false, ('jaleo' as keyof PaloData), loopSeq, true),
        click: buildSequence(false, ('click' as keyof PaloData), loopSeq, true),
        event: buildSequence(false, ('event' as keyof PaloData), loopSeq, true),
      },
    }

    sequences.eighthNotes = {
      introduction: {
        clara: buildSequence(true, ('clara' as keyof PaloData), introSeq, false),
        sorda: buildSequence(true, ('sorda' as keyof PaloData), introSeq, false),
        pito: buildSequence(true, ('pito' as keyof PaloData), introSeq, false),
        cajon: buildSequence(true, ('cajon' as keyof PaloData), introSeq, false),
        nudillo: buildSequence(true, ('nudillo' as keyof PaloData), introSeq, false),
        udu: buildSequence(true, ('udu' as keyof PaloData), introSeq, false),
        jaleo: buildSequence(true, ('jaleo' as keyof PaloData), introSeq, false),
        click: buildSequence(true, ('click' as keyof PaloData), introSeq, false),
      },
      loop: {
        clara: buildSequence(true, ('clara' as keyof PaloData), loopSeq, true),
        sorda: buildSequence(true, ('sorda' as keyof PaloData), loopSeq, true),
        pito: buildSequence(true, ('pito' as keyof PaloData), loopSeq, true),
        cajon: buildSequence(true, ('cajon' as keyof PaloData), loopSeq, true),
        nudillo: buildSequence(true, ('nudillo' as keyof PaloData), loopSeq, true),
        udu: buildSequence(true, ('udu' as keyof PaloData), loopSeq, true),
        jaleo: buildSequence(true, ('jaleo' as keyof PaloData), loopSeq, true),
        click: buildSequence(true, ('click' as keyof PaloData), loopSeq, true),
      },
    }
  }

  const getContext = Tone.context

  const isSupported = Tone.supported

  const reinitialize = (paloState: PaloState) => {
    if (!paloState) return
    palo.value = paloState
    paloData.value = palosData.find((p) => p.value === palo.value.name)
    initSequences()
    changeTempo()
    changeSwing(palo.value.swing)
    forEachValue(sounds, (sound, key) => {
      changeVolume({ instrument: key, volume: palo.value.instruments.find((i => i.value == key))?.volume || 0 })
      changeDecay(palo.value.globalDecay)
    })
  }

  const initMetronome = (paloState: PaloState) => {
    Loading.show({
      delay: 100,
      message: 'Loading audio samples',
    })
    Tone.loaded()
      .then(() => {
        initSounds()
        reinitialize(paloState)
        Loading.hide()
      })
      .catch(() => {
        Loading.hide()
        Notify.create({
          message: 'Failed to load the audio samples !',
          color: 'secondary',
          icon: 'error',
        })
      })
  }

  // =====================
  // Metronome user inputs
  // =====================

  const startSequences = async () => {
    await Tone.start()

    const offset = sequences.quarterNotes?.introduction.event?.length || 0
    const loopStart = '0:' + offset / 2

    await Tone.Transport.start()

    if (sequences.quarterNotes && sequences.eighthNotes) {
      if (sequences.quarterNotes.introduction.event?.length !== 0) {
        await forEachValue(sequences.quarterNotes.introduction, (seq: Tone.Sequence) => {
          seq.start()
          seq.stop(loopStart)
        })
        await forEachValue(sequences.eighthNotes.introduction, (seq: Tone.Sequence) => {
          seq.start(0)
          seq.stop(loopStart)
        })
        await forEachValue(sequences.quarterNotes.loop, (seq: Tone.Sequence) => {
          seq.start(loopStart, offset)
        })
        await forEachValue(sequences.eighthNotes.loop, (seq: Tone.Sequence) => {
          seq.start(loopStart, offset)
        })
      } else {
        await forEachValue(sequences.quarterNotes.loop, (seq: Tone.Sequence) => {
          seq.start(0)
        })
        await forEachValue(sequences.eighthNotes.loop, (seq: Tone.Sequence) => {
          seq.start(0)
        })
      }
    }
  }

  const stopAllSequences = () => {
    forEachValue(sequences, (seq: SeqSubdiv) => {
      forEachValue(seq, (instrus: Seq) => {
        forEachValue(instrus, (s: Tone.Sequence) => {
          if (s !== null && s.state == 'started') s.stop()
          if (s !== null) s.dispose()
        })
      })
    })
    Tone.Transport.stop()
  }

  const changeTempo = (tempo?: number) => {
    if (tempo) {
      Tone.Transport.bpm.value = tempo
    } else if (palo.value.tempo) {
      Tone.Transport.bpm.value = palo.value.tempo
    } else if (paloData.value) {
      Tone.Transport.bpm.value = paloData.value?.defaultTempo
    }
  }

  const changeSwing = (swing: number) => {
    Tone.Transport.swing = swing
  }

  const humanize = () => {
    // Do nothing if sequences have not been initialized
    if (typeof sequences.quarterNotes === 'undefined') return

    forEachValue(
      sequences.quarterNotes.introduction,
      (seq: Tone.Sequence, type: string) => {
        if (type === 'event' || type === 'preCount' || type === 'click') {
          seq.humanize = false
        } else {
          seq.humanize = palo.value.humanization
        }
      }
    )
    forEachValue(sequences.quarterNotes.loop, (seq: Tone.Sequence, type: string) => {
      if (type === 'event' || type === 'preCount' || type === 'click') {
        seq.humanize = false
      } else {
        seq.humanize = palo.value.humanization
      }
    })
    forEachValue(sequences.eighthNotes, (seq: SeqSubdiv) => {
      forEachValue(seq, (s: Tone.Sequence) => {
        s.humanize = palo.value.humanization
      })
    })
  }

  const changeVolume = async (payload: VolumeOpts) => {
    // increase volume of every player from the sounds instrument by the payload volume
    const sound = sounds[payload.instrument as keyof Sounds]
    forEachValue(sound, (player: Players) => {
      player.quarter.volume.value = player.quarter.defaultVolume + payload.volume
      player.eighth.volume.value = player.eighth.defaultVolume + payload.volume
    })
  }

  const changeDecay = async (decay: number) => {
    reverb.decay = decay
  }

  return {
    reinitialize,
    initMetronome,
    isSupported,
    initSequences,
    startSequences,
    stopAllSequences,
    changeVolume,
    changeDecay,
    humanize,
    changeSwing,
    changeTempo,
    triggerAudioOnEvent,
    triggerPreCountClick,
    improviseJaleo,
    improvise,
    noteIndexInPattern,
  }
}
