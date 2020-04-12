import palosDefaultSettings from './data/palosDefaultSettings'

const state = {
  shownSideMenu: true,
  visualizationModes: [
    { label: 'Dots', value: 'dots' },
    { label: 'Counter', value: 'counter' }
  ],
  visualizationSize: {},
  breakpoint: { xs: 599, sm: 1023, md: 1439, lg: 1919 },
  selectedVisualizationMode: 'dots',
  palos: palosDefaultSettings,
  selectedPalo: palosDefaultSettings[2],
  instruments: [
    { label: 'Claras', value: 'clara', eighthNotes: false, volume: 0 },
    { label: 'Sordas', value: 'sorda', eighthNotes: false, volume: 0 },
    { label: 'Cajon', value: 'cajon', eighthNotes: false, volume: 0 },
    { label: 'Udu', value: 'udu', eighthNotes: false, volume: 0 },
    { label: 'Jaleo', value: 'jaleo', eighthNotes: false, volume: 0 },
    { label: 'Click', value: 'click', eighthNotes: false, volume: 0 }
  ],
  selectedInstruments: [ 'clara', 'sorda' ],
  preCounts: palosDefaultSettings[2].preCounts,
  selectedPreCount: palosDefaultSettings[2].preCounts[0],
  startBeats: palosDefaultSettings[2].startBeats,
  selectedStartBeat: palosDefaultSettings[2].startBeats[0],
  tempo: palosDefaultSettings[2].defaultTempo,
  improvise: false,
  humanize: false,
  isPlaying: false,
  metronomeEvent: null,
  isTooSlow: false,
  isTooFast: false,
  trackVisits: false,
  trackingInitialized: false,
  trackingChosen: false,
  privacyDialogOpen: false
}

export default state
