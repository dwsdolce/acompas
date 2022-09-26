import type { Player, Reverb, Volume, Sequence } from 'tone'

export interface Sound {
  [x: number]:              Player
  reverb:                   Reverb
  volume:                   Volume
}

export interface Sounds {
  clara:                    Sound
  sorda:                    Sound
  nudillo:                  Sound
  cajon:                    Sound
  udu:                      Sound
  jaleo:                    Sound
  click:                    Sound
}

export interface Seq {
  clara:                    Sequence
  sorda:                    Sequence
  nudillo:                  Sequence
  cajon:                    Sequence
  udu:                      Sequence
  jaleo:                    Sequence
  click:                    Sequence
  event?:                   Sequence
  preCount?:                Sequence
}

export interface SeqSubdiv {
  introduction:            Seq
  loop:                    Seq
}

export interface Seqs {
  quarterNotes:             SeqSubdiv
  eighthNotes:              SeqSubdiv
}

export interface TuningFork {
  isPlaying:                boolean
  notes:                    string[]
  activeNote:               string | null
}

export interface stringOpts {
  label:                      string
  value:                      string
}

export interface numOpts {
  label:                      string
  value:                      number
}

export interface instruOpts extends stringOpts {
  enabled:                    boolean
  eighthNotes:                boolean | null
  volume:                     number
  decay:                      number
}

export interface visuOpts extends stringOpts {
  isActive:                   boolean
}

export interface Size {
  width:                      number | null
  height:                     number | null
}

export interface VolumeOpts {
  instrument:                 string
  volume:                     number
}

export interface PaloData {
  id:                         number
  label:                      string
  value:                      string
  minTempo:                   number
  maxTempo:                   number
  defaultTempo:               number
  slowTempo:                  number
  fastTempo:                  number
  nbBeatsInPattern:           number
  accents:                    number[]
  clara:                      (number | null)[]
  sorda:                      (number | null)[]
  cajon:                      (number | null)[]
  nudillo:                    (number | null)[]
  udu:                        (number | null)[]
  click:                      (number | null)[]
  beatLabels:                 (number | null)[]
  preCounts:                  numOpts[]
  startBeats:                 numOpts[]
  slowMessage?:               string
  fastMessage?:               string
  longLabel?:                 string
  doc?:                       string
  wikipediaUrl?:              string
  places?:                    string
  videoExample?:              string
}

export interface PaloState {
  name:                       string
  tempo:                      number
  selectedPreCount:           numOpts
  selectedStartBeat:          numOpts
  swing:                      number
  improvisation:              boolean
  humanization:               boolean
  isTooSlow:                  boolean
  isTooFast:                  boolean
  visualizationModes:         visuOpts[]
  instruments:                instruOpts[]
  globalDecay:                number
}

// export interface State {
//   visualizationModes:         stringOpts[]
//   visualizationSize:          Size
//   selectedVisualizationMode:  string
//   palos:                      Palo[]
//   selectedPalo:               Palo
//   instruments:                instruOpts[]
//   selectedInstruments:        string[]
//   defaultSelectedInstruments: string[]
//   preCounts:                  numOpts[]
//   selectedPreCount:           numOpts
//   startBeats:                 numOpts[]
//   selectedStartBeat:          numOpts
//   swing:                      number | null
//   improvise:                  boolean
//   humanize:                   boolean
//   isPlaying:                  boolean
//   metronomeEvent:             number | null
//   isTooSlow:                  boolean
//   isTooFast:                  boolean
// }
