import type { Player, Reverb, Volume, Sequence, Gain } from 'tone'

export interface SoundsDataKey {
  src:                      string
  volume:                   number
}

export interface SoundsData {
  name:                     string
  label:                    string
  longLabel?:               string
  medias:                   SoundsDataKey[]
  noEighthNotes?:           boolean
}

export interface ExtendedPlayer extends Player {
  defaultVolume:            number
}

export interface Players {
  quarter:                  ExtendedPlayer
  eighth:                   ExtendedPlayer
}

export interface Sound {
  [x: number]:              Players
  reverb:                   Reverb
  volume:                   number
}

export interface Sounds {
  clara:                    Sound
  sorda:                    Sound
  pito:                     Sound
  nudillo:                  Sound
  cajon:                    Sound
  udu:                      Sound
  jaleo:                    Sound
  click:                    Sound
}

export interface Seq {
  clara?:                   Sequence
  sorda?:                   Sequence
  pito?:                    Sequence
  nudillo?:                 Sequence
  cajon?:                   Sequence
  udu?:                     Sequence
  jaleo?:                   Sequence
  click?:                   Sequence
  event?:                   Sequence
  prestartBeat?:            Sequence
}

export interface SeqSubdiv {
  introduction?:            Seq
  loop:                     Seq
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
  label:                    string
  value:                    string
}

export interface numOpts {
  label:                    string
  value:                    number
}

export interface instruOpts extends stringOpts {
  enabled:                  boolean
  eighthNotes:              boolean | null
  volume:                   number
}

export interface visuOpts extends stringOpts {
  isActive:                 boolean
}

export interface Size {
  width:                    number | null
  height:                   number | null
}

export interface VolumeOpts {
  instrument:               string
  volume:                   number
}

export interface DecayOpts {
  instrument:               string
  decay:                    number
}

export interface InstruSeqs {
  clara:                  (number | null)[]
  sorda:                  (number | null)[]
  pito:                   (number | null)[]
  cajon:                  (number | null)[]
  nudillo:                (number | null)[]
  udu:                    (number | null)[]
  click:                  (number | null)[]
  beatLabels:             (number | null)[]
}

export interface PatternState {
  id:                       number
  name:                     string
  label:                    string
  minTempo:                 number
  maxTempo:                 number
  defaultTempo:             number
  slowTempo:                number
  fastTempo:                number
  nbBeatsInPattern:         number
  accents:                  number[]
  sequences:                InstruSeqs
  prestartBeats:            numOpts[]
  slowMessage?:             string
  fastMessage?:             string
  longLabel?:               string
  doc?:                     string
  wikipediaUrl?:            string
  places?:                  string
  videoExample?:            string
  selectedPrestartBeat?:    numOpts
  tempo:                    number
  isTooFast?:               boolean
  isTooSlow?:               boolean
  swing:                    number
  improvisation?:           boolean
  humanization?:            boolean
  // visualizationModes:    visuOpts[]
  instruments?:             instruOpts[]
  globalDecay:              number
  visualizationMode?:       string

}

export interface SessionState {
  trackingEnabled:          boolean
  trackingInitialized:      boolean
  trackingChosen:           boolean
  privacyDialogOpen:        boolean
  dialogOpen:               boolean
  leftDrawerOpen:           boolean
  visualizationSize:        Size
}

export interface ColorOption {
  primary:                  string
  secondary:                string
}
export interface ContextOption {
  label:                    string
  value:                    string
  colors:                   ColorOption
}
