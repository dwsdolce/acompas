import palosDefaultSettings from './data/palosDefaultSettings'

const state = {
  shownSideMenu: true,
  visualizationModes: [
    { label: 'Dots', value: 'dots' },
    { label: 'Counter', value: 'counter' },
    { label: 'Clock', value: 'clock' }
  ],
  visualizationSize: {},
  selectedVisualizationMode: 'dots',
  palos: palosDefaultSettings,
  selectedPalo: palosDefaultSettings[0],
  instruments: [
    { label: 'Claras', value: 'clara', eighthNotes: false, volume: 0 },
    { label: 'Sordas', value: 'sorda', eighthNotes: false, volume: 0 },
    { label: 'Nudillos', value: 'nudillo', eighthNotes: false, volume: 0 },
    { label: 'Cajon', value: 'cajon', eighthNotes: false, volume: 0 },
    { label: 'Udu', value: 'udu', eighthNotes: false, volume: 0 },
    { label: 'Jaleo', value: 'jaleo', eighthNotes: false, volume: 0 },
    { label: 'Click', value: 'click', eighthNotes: false, volume: 0 }
  ],
  selectedInstruments: [ 'clara', 'nudillo' ],
  defaultSelectedInstruments: [ 'clara', 'nudillo' ],
  noEighthNotes: [ 'jaleo', 'click', 'nudillo' ],
  preCounts: palosDefaultSettings[0].preCounts,
  selectedPreCount: palosDefaultSettings[0].preCounts[0],
  startBeats: palosDefaultSettings[0].startBeats,
  selectedStartBeat: palosDefaultSettings[0].startBeats[0],
  tempo: palosDefaultSettings[0].defaultTempo,
  swing: 0,
  improvise: false,
  humanize: false,
  isPlaying: false,
  metronomeEvent: null,
  isTooSlow: false,
  isTooFast: false,
  trackVisits: false,
  trackingInitialized: false,
  trackingChosen: false,
  privacyDialogOpen: false,
  dialogOpen: false,
  tuningFork: {
    isPlaying: false,
    notes: [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ],
    activeNote: null
  }
}

export default state
