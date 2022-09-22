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
}

export interface Size {
  width:                      number | null
  height:                     number | null
}

export interface Volume {
  instrument:                 string
  volume:                     number
}

export interface Palo {
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

export interface State {
  visualizationModes:         stringOpts[]
  visualizationSize:          Size
  selectedVisualizationMode:  string
  palos:                      Palo[]
  selectedPalo:               Palo
  instruments:                instruOpts[]
  selectedInstruments:        string[]
  defaultSelectedInstruments: string[]
  preCounts:                  numOpts[]
  selectedPreCount:           numOpts
  startBeats:                 numOpts[]
  selectedStartBeat:          numOpts
  swing:                      number | null
  improvise:                  boolean
  humanize:                   boolean
  isPlaying:                  boolean
  metronomeEvent:             number | null
  isTooSlow:                  boolean
  isTooFast:                  boolean
}
