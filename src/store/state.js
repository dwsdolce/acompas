import palosDefaultSettings from '@store/data/palosDefaultSettings'

const state = {
    isUnlocked: false,
    shownSideMenu: true,
    visualizationModes: [
        { label: 'Dots', value: 'dots' },
        { label: 'Counter', value: 'counter' }
    ],
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
    tempo: palosDefaultSettings[2].defaultTempo,
    improvise: false,
    humanize: false,
    isPlaying: false,
    metronomeEvent: null,
    isTooSlow: false,
    isTooFast: false,
    canvasElement: null
}

export default state
