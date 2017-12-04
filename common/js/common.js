/*
    This file is part of A Compás.

    A Compás is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    A Compás is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with A Compás. If not, see <http://www.gnu.org/licenses/>.
*/

// Initialize the metronome object
window.aCompas = {
    audioContext: null,
    isPlaying: false,               // Are we currently playing ?
    currentNote: null,              // What note is currently last scheduled ?
    defaultPaloSlug: "buleria-12",  // Slug of the default palo
    palo: null,                     // Current palo's slug
    masterVolume: 90,               // Default master volume
    lookahead: 30,                  // How frequently to call scheduling function ?
                                    // (in milliseconds)
    scheduleAheadTime: 0.3,         // How far ahead to schedule audio (sec)
                                    // This is calculated from lookahead, and overlaps
                                    // with next interval (in case the timer is late)
    masterGainNode: null,           // GainNode used for the master volume
    nextNoteTime: 0.0,              // When the next note is due ?
    noteResolution: 0,              // 0 = times + counter times, 1 = times only
    mixer: [],                      // Volume for each instrument
    improvise: true,                // Is improvisation mode on ?
    timerWorker: null,              // The Web Worker used to fire timer messages
    nbBeatsInPattern: null,         // Number of beats in the current pattern (counting eighth notes)
    defaultBarHeight: 5,            // Initial height of a bar in the bar visualization (in pixels)
    barMaxHeight: null,             // Maximum height of a bar (float, in pixels)
    palos: null,                    // Palos data
    deviceOrientation: null,        // String ("Landscape" or "Portrait")
    playStartTime: null,            // The time when the user starts playing is stored
                                    // in this property
    audioFormat: null,              // Audio format to use for playing
    sounds: {                       // Sounds used by the application
        clara_1: {
            src: 'clara/clara_1',
            volume : 1
        },
        clara_2: {
            src: 'clara/clara_2',
            volume : 1
        },
        clara_3: {
            src: 'clara/clara_3',
            volume : 0.8
        },
        sorda_1: {
            src: 'sorda/sorda_1',
            volume : 0.8
        },
        sorda_2: {
            src: 'sorda/sorda_2',
            volume : 0.8
        },
        sorda_3: {
            src: "sorda/sorda_3",
            volume: 0.8
        },
        cajon_1: {
            src: 'cajon/cajon_1',
            volume: 0.8
        },
        cajon_2: {
            src: 'cajon/cajon_2',
            volume: 0.8
        },
        cajon_3: {
            src: 'cajon/cajon_3',
            volume: 0.8
        },
        udu_1: {
            src: 'udu/udu_1',
            volume : 1
        },
        udu_2: {
            src: 'udu/udu_2',
            volume : 0.8
        },
        jaleo_1: {
            src: "jaleo/jaleo_1",
            volume: 0.8
        },
        jaleo_2: {
            src: "jaleo/jaleo_2",
            volume: 0.8
        },
        jaleo_3: {
            src: "jaleo/jaleo_3",
            volume: 0.8
        },
        jaleo_4: {
            src: "jaleo/jaleo_4",
            volume: 0.8
        },
        jaleo_5: {
            src: "jaleo/jaleo_5",
            volume: 0.8
        },
        jaleo_6: {
            src: "jaleo/jaleo_6",
            volume: 0.8
        },
        jaleo_7: {
            src: "jaleo/jaleo_7",
            volume: 0.8
        },
        jaleo_8: {
            src: "jaleo/jaleo_8",
            volume: 0.8
        },
        jaleo_9: {
            src: "jaleo/jaleo_9",
            volume: 0.8
        },
        jaleo_10: {
            src: "jaleo/jaleo_10",
            volume: 0.8
        },
        jaleo_11: {
            src: "jaleo/jaleo_11",
            volume: 0.8
        },
        jaleo_12: {
            src: "jaleo/jaleo_12",
            volume: 0.8
        },
        jaleo_13: {
            src: "jaleo/jaleo_13",
            volume: 0.8
        },
        jaleo_14: {
            src: "jaleo/jaleo_14",
            volume: 0.8
        },
        jaleo_15: {
            src: "jaleo/jaleo_15",
            volume: 0.8
        },
        jaleo_16: {
            src: "jaleo/jaleo_16",
            volume: 0.8
        },
        jaleo_17: {
            src: "jaleo/jaleo_17",
            volume: 0.8
        },
        click_1: {
            src: 'click/click_1',
            volume: 0.2
        },
        click_2: {
            src: 'click/click_2',
            volume: 0.2
        }
    },
    soundCounts: {
        clara: 3,
        sorda: 3,
        cajon: 3,
        udu: 2,
        jaleo: 17
    },
    instruments: [
        {
            slug: "clara",
            label: "Palma clara",
            defaultVolume: 100
        },
        {
            slug: "sorda",
            label: "Palma sorda",
            defaultVolume: 100
        },
        {
            slug: "cajon",
            label: "Cajón",
            defaultVolume: 80
        },
        {
            slug: "udu",
            label: "Udu",
            defaultVolume: 80
        },
        {
            slug: "jaleo",
            label: "Jaleo",
            defaultVolume: 8
        },
        {
            slug: "click",
            label: "Click",
            defaultVolume: 0
        }
    ]
};

// Palos data
//
// Tempo = number of quarter notes per minute
// Nb beats in pattern : number of beats in a pattern (counting an eighth note as a beat)
window.aCompas.palos = [
    {
        slug: "alegria",
        label: "Alegría",
        minTempo: 10,
        maxTempo: 115,
        defaultTempo: 50,
        nbBeatsInPattern: 24,
        timeSignatureTop: 12,
        timeSignatureBottom: 8,
        clara: {
            0: 1,
            2: 2,
            3: 2,
            4: 3,
            6: 1,
            8: 2,
            10: 3,
            12: 3,
            14: 1,
            15: 1,
            16: 1,
            18: 1,
            19: 1,
            20: 1,
            22: 3
        },
        sorda: {
            0: 1,
            2: 2,
            3: 2,
            4: 3,
            6: 1,
            8: 2,
            10: 3,
            12: 3,
            14: 1,
            15: 1,
            16: 1,
            18: 1,
            19: 1,
            20: 1,
            22: 3
        },
        cajon: {
            0: 1,
            2: 2,
            3: 2,
            4: 3,
            6: 1,
            8: 2,
            10: 2,
            12: 3,
            14: 1,
            15: 1,
            16: 1,
            18: 1,
            19: 1,
            20: 1,
            22: 3
        },
        udu: {
            0: 1,
            2: 2,
            4: 2,
            6: 1,
            8: 2,
            10: 2,
            12: 2,
            14: 1,
            15: 1,
            16: 1,
            18: 1,
            19: 1,
            20: 1,
            22: 2
        },
        beats: {
            0: "strong",
            1: "down",
            2: "up",
            3: "down",
            4: "up",
            5: "down",
            6: "strong",
            7: "down",
            8: "up",
            9: "down",
            10: "up",
            11: "down",
            12: "strong",
            13: "down",
            14: "up",
            15: "down",
            16: "strong",
            17: "down",
            18: "up",
            19: "down",
            20: "strong",
            21: "down",
            22: "up",
            23: "down"
        },
        beatLabels: {
            0: 12,
            2: 1,
            4: 2,
            6: 3,
            8: 4,
            10: 5,
            12: 6,
            14: 7,
            16: 8,
            18: 9,
            20: 10,
            22: 11
        },
        setTempoInfo: function() {
            var tempo = getTempo();
            if (tempo >= 80) {
                setInfoMessage("Your rhythm is very fast");
            } else if (tempo >= 60 && tempo > 20) {
                setInfoMessage("Your tempo is por buleria");
            } else if (tempo <= 20) {
                setInfoMessage("Your rhythm is very slow");
            } else {
                setInfoMessage(null);
            }
        }
    },
    {
        slug: "buleria-6",
        label: "Bulería (6)",
        minTempo: 15,
        maxTempo: 115,
        defaultTempo: 65,
        nbBeatsInPattern: 12,
        timeSignatureTop: 6,
        timeSignatureBottom: 8,
        clara: {
            0: 3,
            1: 3,
            2: 2,
            3: 3,
            4: 3,
            6: 1,
            7: 3,
            8: 3,
            10: 3
        },
        sorda: {
            0: 1,
            1: 3,
            2: 2,
            3: 3,
            4: 3,
            6: 1,
            8: 3,
            10: 3
        },
        cajon: {
            0: 3,
            1: 3,
            2: 2,
            3: 2,
            4: 3,
            6: 1,
            8: 2,
            10: 3
        },
        udu: {
            0: 1,
            3: 2,
            4: 2,
            6: 1,
            9: 2,
            10: 2
        },
        beats: {
            0: "strong",
            1: "down",
            2: "up",
            3: "down",
            4: "up",
            5: "down",
            6: "strong",
            7: "down",
            8: "up",
            9: "down",
            10: "up",
            11: "down"
        },
        beatLabels: {
            0: 6,
            2: 1,
            4: 2,
            6: 3,
            8: 4,
            10: 5
        },
        setTempoInfo: function() {
            var tempo = getTempo();
            if (tempo >= 90) {
                setInfoMessage("Your rhythm is very fast");
            } else if (tempo <= 30) {
                setInfoMessage("Your rhythm is very slow");
            } else {
                setInfoMessage(null);
            }
        }
    },
    {
        slug: "buleria-12",
        label: "Bulería (12)",
        minTempo: 10,
        maxTempo: 115,
        defaultTempo: 65,
        nbBeatsInPattern: 24,
        timeSignatureTop: 12,
        timeSignatureBottom: 8,
        clara: {
            0: 1,
            1: 3,
            2: 2,
            3: 3,
            4: 3,
            6: 1,
            7: 3,
            8: 3,
            10: 3,
            12: 1,
            13: 3,
            14: 3,
//            15: 3,
            16: 1,
            17: 3,
            18: 3,
//            19: 3,
            20: 1,
            22: 3
        },
        sorda: {
            0: 3,
            1: 3,
            2: 1,
            3: 2,
            4: 3,
            6: 1,
            8: 3,
            10: 3,
            12: 1,
            13: 1,
            14: 3,
            15: 2,
            16: 1,
            17: 3,
            18: 3,
            19: 2,
            20: 1,
            22: 3
        },
        cajon: {
            0: 3,
            1: 2,
            2: 1,
            3: 2,
            4: 3,
            6: 3,
            7: 2,
            8: 1,
            9: 2,
            10: 3,
            12: 1,
            13: 1,
            14: 3,
            15: 2,
            16: 1,
            17: 2,
            18: 3,
            19: 2,
            20: 1,
            22: 2
        },
        udu: {
            0: 1,
            3: 2,
            4: 2,
            6: 1,
            9: 2,
            10: 2,
            12: 1,
            15: 2,
            16: 1,
            19: 2,
            20: 1,
            22: 2
        },
        beats: {
            0: "strong",
            1: "down",
            2: "up",
            3: "down",
            4: "up",
            5: "down",
            6: "strong",
            7: "down",
            8: "up",
            9: "down",
            10: "up",
            11: "down",
            12: "strong",
            13: "down",
            14: "up",
            15: "down",
            16: "strong",
            17: "down",
            18: "up",
            19: "down",
            20: "strong",
            21: "down",
            22: "up",
            23: "down"
        },
        beatLabels: {
            0: 12,
            2: 1,
            4: 2,
            6: 3,
            8: 4,
            10: 5,
            12: 6,
            14: 7,
            16: 8,
            18: 9,
            20: 10,
            22: 11
        },
        setTempoInfo: function() {
            var tempo = getTempo();
            if (tempo >= 80) {
                setInfoMessage("Your rhythm is very fast");
            } else if (tempo <= 60 && tempo > 20) {
                setInfoMessage("Your tempo is solea por buleria or alegria");
            } else if (tempo <= 20) {
                setInfoMessage("Your rhythm is very slow");
            } else {
                setInfoMessage(null);
            }
        }
    },
    {
        slug: "buleria-12-variation",
        label: "Bulería (12) - Variation",
        minTempo: 10,
        maxTempo: 115,
        defaultTempo: 65,
        nbBeatsInPattern: 24,
        timeSignatureTop: 12,
        timeSignatureBottom: 8,
        clara: {
            0: 1,
            1: 3,
            2: 2,
            3: 3,
            4: 3,
            6: 1,
            7: 3,
            8: 3,
            10: 3,
            12: 3,
            13: 3,
            14: 1,
            15: 2,
            16: 1,
            17: 3,
            18: 3,
            19: 2,
            20: 1,
            22: 3
        },
        sorda: {
            0: 3,
            1: 3,
            2: 1,
            3: 2,
            4: 3,
            6: 1,
            8: 3,
            10: 3,
            12: 3,
            13: 3,
            14: 1,
            15: 2,
            16: 1,
            17: 3,
            18: 3,
            19: 2,
            20: 1,
            22: 3
        },
        cajon: {
            0: 3,
            1: 2,
            2: 1,
            3: 2,
            4: 3,
            6: 3,
            7: 2,
            8: 1,
            9: 2,
            10: 3,
            12: 3,
            13: 2,
            14: 1,
            15: 2,
            16: 1,
            17: 2,
            18: 3,
            19: 1,
            20: 3,
            22: 2
        },
        udu: {
            0: 1,
            3: 2,
            4: 2,
            6: 1,
            9: 2,
            10: 2,
            12: 1,
            15: 2,
            16: 1,
            19: 2,
            20: 1,
            22: 2
        },
        beats: {
            0: "strong",
            1: "down",
            2: "up",
            3: "down",
            4: "up",
            5: "down",
            6: "strong",
            7: "down",
            8: "up",
            9: "down",
            10: "up",
            11: "down",
            12: "up",
            13: "down",
            14: "strong",
            15: "down",
            16: "strong",
            17: "down",
            18: "up",
            19: "down",
            20: "strong",
            21: "down",
            22: "up",
            23: "down"
        },
        beatLabels: {
            0: 12,
            2: 1,
            4: 2,
            6: 3,
            8: 4,
            10: 5,
            12: 6,
            14: 7,
            16: 8,
            18: 9,
            20: 10,
            22: 11
        },
        setTempoInfo: function() {
            var tempo = getTempo();
            if (tempo >= 80) {
                setInfoMessage("Your rhythm is very fast");
            } else if (tempo <= 60 && tempo > 20) {
                setInfoMessage("Your tempo is solea por buleria or alegria");
            } else if (tempo <= 20) {
                setInfoMessage("Your rhythm is very slow");
            } else {
                setInfoMessage(null);
            }
        }
    },
    {
        slug: "fandangos",
        label: "Fandangos",
        minTempo: 10,
        maxTempo: 90,
        defaultTempo: 50,
        nbBeatsInPattern: 24,
        timeSignatureTop: 12,
        timeSignatureBottom: 8,
        clara: {
            0: 1,
            1: 2,
            2: 3,
            3: 2,
            4: 3,
            6: 1,
            7: 2,
            8: 3,
            10: 3,
            12: 1,
            13: 2,
            14: 3,
            15: 2,
            16: 3,
            18: 1,
            19: 2,
            20: 1,
            22: 3
        },
        sorda: {
            0: 3,
            1: 2,
            2: 1,
            3: 2,
            4: 1,
            6: 3,
            7: 2,
            8: 1,
            10: 1,
            12: 3,
            13: 2,
            14: 1,
            15: 2,
            16: 1,
            18: 3,
            19: 2,
            20: 3,
            22: 1
        },
        cajon: {
            0: 3,
            1: 2,
            2: 1,
            3: 2,
            4: 1,
            6: 3,
            7: 2,
            8: 1,
            10: 1,
            12: 3,
            13: 2,
            14: 1,
            15: 2,
            16: 2,
            18: 3,
            19: 2,
            20: 3,
            22: 2
        },
        udu: {
            0: 1,
            3: 2,
            6: 1,
            12: 1,
            15: 2,
            18: 1,
            20: 1
        },
        beats: {
            0: "strong",
            1: "down",
            2: "up",
            3: "down",
            4: "up",
            5: "down",
            6: "strong",
            7: "down",
            8: "up",
            9: "down",
            10: "up",
            11: "down",
            12: "strong",
            13: "down",
            14: "up",
            15: "down",
            16: "up",
            17: "down",
            18: "strong",
            19: "down",
            20: "strong",
            21: "down",
            22: "up",
            23: "down"
        },
        beatLabels: {
            0: 1,
            2: 2,
            4: 3,
            6: 4,
            8: 5,
            10: 6,
            12: 7,
            14: 8,
            16: 9,
            18: 10,
            20: 11,
            22: 12
        },
        setTempoInfo: function() {
            var tempo = getTempo();
            if (tempo >= 70) {
                setInfoMessage("Your rhythm is very fast");
            } else if (tempo <= 25) {
                setInfoMessage("Your rhythm is very slow");
            } else {
                setInfoMessage(null);
            }
        }
    },
    {
        slug: "rumba",
        label: "Rumba",
        minTempo: 30,
        maxTempo: 340,
        defaultTempo: 200,
        nbBeatsInPattern: 16,
        timeSignatureTop: 4,
        timeSignatureBottom: 4,
        clara: {
            0: 3,
            1: 2,
            2: 1,
            3: 1,
            4: 2,
            6: 1,
            8: 3,
            9: 2,
            10: 1,
            11: 2,
            12: 3,
            14: 2
        },
        sorda: {
            0: 3,
            1: 2,
            2: 1,
            3: 1,
            4: 2,
            6: 1,
            8: 3,
            9: 2,
            10: 1,
            11: 2,
            12: 3,
            14: 2
        },
        cajon: {
            0: 3,
            1: 2,
            2: 1,
            3: 1,
            4: 3,
            6: 1,
            8: 3,
            9: 2,
            10: 1,
            11: 2,
            12: 3,
            14: 2
        },
        udu: {
            0: 1,
            3: 2,
            4: 1,
            6: 2,
            8: 1,
            11: 2,
            12: 1,
            14: 2
        },
        beats: {
            0: "strong",
            1: "down",
            2: "up",
            3: "down",
            4: "up",
            5: "down",
            6: "up",
            7: "down",
            8: "strong",
            9: "down",
            10: "up",
            11: "down",
            12: "up",
            13: "down",
            14: "up",
            15: "down"
        },
        beatLabels: {
            0: 1,
            2: 2,
            4: 3,
            6: 4,
            8: 5,
            10: 6,
            12: 7,
            14: 8
        },
        setTempoInfo: function() {
            var tempo = getTempo();
            if (tempo >= 240) {
                setInfoMessage("Your rhythm is very fast");
            } else if (tempo <= 90) {
                setInfoMessage("Your rhythm is very slow");
            } else {
                setInfoMessage(null);
            }
        }
    },
    {
        slug: "sevillana",
        label: "Sevillana",
        minTempo: 20,
        maxTempo: 140,
        defaultTempo: 65,
        nbBeatsInPattern: 24,
        timeSignatureTop: 12,
        timeSignatureBottom: 8,
        clara: {
            0: 1,
            1: 1,
            2: 2,
            4: 3,
            6: 1,
            7: 1,
            8: 2,
            10: 3,
            12: 1,
            13: 1,
            14: 2,
            16: 3,
            18: 1,
            19: 1,
            20: 2,
            22: 3
        },
        sorda: {
            0: 1,
            2: 2,
            3: 1,
            4: 3,
            6: 1,
            8: 2,
            9: 1,
            10: 3,
            12: 1,
            14: 2,
            15: 1,
            16: 3,
            18: 1,
            20: 2,
            21: 1,
            22: 3
        },
        cajon: {
            0: 1,
            2: 2,
            3: 1,
            4: 3,
            6: 1,
            8: 2,
            9: 1,
            10: 3,
            12: 1,
            14: 2,
            15: 1,
            16: 3,
            18: 1,
            20: 2,
            21: 1,
            22: 3
        },
        udu: {
            0: 1,
            1: 1,
            2: 2,
            4: 2,
            6: 1,
            7: 1,
            8: 2,
            10: 2,
            12: 1,
            13: 1,
            14: 2,
            16: 2,
            18: 1,
            19: 1,
            20: 2,
            22: 2
        },
        beats: {
            0: "strong",
            1: "down",
            2: "up",
            3: "down",
            4: "up",
            5: "down",
            6: "strong",
            7: "down",
            8: "up",
            9: "down",
            10: "up",
            11: "down",
            12: "strong",
            13: "down",
            14: "up",
            15: "down",
            16: "up",
            17: "down",
            18: "strong",
            19: "down",
            20: "up",
            21: "down",
            22: "up",
            23: "down"
        },
        beatLabels: {
            0: 1,
            2: 2,
            4: 3,
            6: 1,
            8: 2,
            10: 3,
            12: 1,
            14: 2,
            16: 3,
            18: 1,
            20: 2,
            22: 3
        },
        setTempoInfo: function() {
            var tempo = getTempo();
            if (tempo >= 90) {
                setInfoMessage("Your rhythm is very fast");
            } else if (tempo <= 45) {
                setInfoMessage("Your rhythm is very slow");
            } else {
                setInfoMessage(null);
            }
        }
    },
    {
        slug: "siguiriya",
        label: "Siguiriya",
        minTempo: 10,
        maxTempo: 60,
        defaultTempo: 30,
        nbBeatsInPattern: 24,
        timeSignatureTop: 12,
        timeSignatureBottom: 8,
        clara: {
            0: 1,
            1: 3,
            2: 2,
            3: 2,
            4: 1,
            5: 3,
            6: 2,
            7: 2,
            8: 1,
            9: 3,
            10: 3,
            11: 1,
            12: 3,
            13: 2,
            14: 1,
            15: 3,
            16: 3,
            17: 1,
            18: 3,
            19: 2,
            20: 1,
            22: 3
        },
        sorda: {
            0: 1,
            1: 3,
            2: 2,
            3: 3,
            4: 1,
            5: 3,
            6: 2,
            7: 3,
            8: 1,
            9: 3,
            10: 3,
            11: 1,
            12: 3,
            13: 2,
            14: 1,
            15: 3,
            16: 3,
            17: 1,
            18: 3,
            19: 2,
            20: 1,
            22: 3
        },
        cajon: {
            0: 3,
            1: 2,
            2: 1,
            3: 1,
            4: 3,
            5: 2,
            6: 1,
            7: 1,
            8: 3,
            9: 2,
            10: 2,
            11: 1,
            12: 2,
            13: 1,
            14: 3,
            15: 2,
            16: 2,
            17: 1,
            18: 2,
            19: 1,
            20: 3,
            22: 1
        },
        udu: {
            0: 1,
            3: 2,
            4: 1,
            7: 2,
            8: 1,
            11: 2,
            13: 2,
            14: 1,
            17: 2,
            19: 2,
            20: 1,
            22: 2
        },
        beats: {
            0: "strong",
            1: "down",
            2: "up",
            3: "down",
            4: "strong",
            5: "down",
            6: "up",
            7: "down",
            8: "strong",
            9: "down",
            10: "up",
            11: "down",
            12: "up",
            13: "down",
            14: "strong",
            15: "down",
            16: "up",
            17: "down",
            18: "up",
            19: "down",
            20: "strong",
            21: "down",
            22: "up",
            23: "down"
        },
        beatLabels: {
            0: 1,
            4: 2,
            8: 3,
            14: 4,
            20: 5
        },
        setTempoInfo: function() {
            var tempo = getTempo();
            if (tempo >= 50) {
                setInfoMessage("Your rhythm is very fast");
            } else if (tempo <= 20) {
                setInfoMessage("Your rhythm is very slow");
            } else {
                setInfoMessage(null);
            }
        }
    },
    {
        slug: "solea",
        label: "Soleá",
        minTempo: 10,
        maxTempo: 65,
        defaultTempo: 30,
        nbBeatsInPattern: 24,
        timeSignatureTop: 12,
        timeSignatureBottom: 8,
        clara: {
            0: 3,
            1: 2,
            2: 3,
            4: 1,
            6: 3,
            7: 2,
            8: 3,
            10: 1,
            12: 2,
            13: 3,
            14: 1,
            16: 2,
            17: 3,
            18: 1,
            20: 3,
            22: 1
        },
        sorda: {
            0: 3,
            1: 2,
            2: 3,
            4: 1,
            6: 3,
            7: 2,
            8: 3,
            10: 1,
            12: 2,
            13: 3,
            14: 1,
            16: 2,
            17: 3,
            18: 1,
            20: 3,
            22: 1
        },
        cajon: {
            0: 2,
            1: 1,
            2: 2,
            4: 3,
            6: 2,
            7: 1,
            8: 2,
            10: 3,
            11: 2,
            12: 1,
            13: 2,
            14: 3,
            15: 2,
            16: 1,
            17: 2,
            18: 3,
            20: 2,
            22: 3
        },
        udu: {
            1: 2,
            4: 1,
            7: 2,
            10: 1,
            13: 2,
            14: 1,
            17: 2,
            18: 1,
            20: 2,
            22: 1
        },
        beats: {
            0: "up",
            1: "down",
            2: "up",
            3: "down",
            4: "strong",
            5: "down",
            6: "up",
            7: "down",
            8: "up",
            9: "down",
            10: "strong",
            11: "down",
            12: "up",
            13: "down",
            14: "strong",
            15: "down",
            16: "up",
            17: "down",
            18: "strong",
            19: "down",
            20: "up",
            21: "down",
            22: "strong",
            23: "down"
        },
        beatLabels: {
            0: 1,
            2: 2,
            4: 3,
            6: 4,
            8: 5,
            10: 6,
            12: 7,
            14: 8,
            16: 9,
            18: 10,
            20: 11,
            22: 12
        },
        setTempoInfo: function() {
            var tempo = getTempo();
            if (tempo >= 60) {
                setInfoMessage("Your rhythm is very fast");
            } else if (tempo >= 40 && tempo > 20) {
                setInfoMessage("Your tempo is solea por buleria or alegria");
            } else if ( tempo <= 20 ) {
                setInfoMessage("Your rhythm is very slow");
            } else {
                setInfoMessage(null);
            }
        }
    },
    {
        slug: "tangos",
        label: "Tangos",
        minTempo: 30,
        maxTempo: 340,
        defaultTempo: 170,
        nbBeatsInPattern: 16,
        timeSignatureTop: 4,
        timeSignatureBottom: 4,
        clara: {
            0: 3,
            1: 3,
            2: 1,
            3: 2,
            4: 3,
            6: 1,
            8: 3,
            9: 3,
            10: 1,
            11: 3,
            12: 2,
            14: 1
        },
        sorda: {
            0: 3,
            1: 3,
            2: 1,
            3: 1,
            4: 3,
            6: 1,
            8: 3,
            9: 3,
            10: 1,
            11: 3,
            12: 2,
            14: 3
        },
        cajon: {
            0: 3,
            1: 2,
            2: 1,
            3: 1,
            4: 2,
            6: 1,
            8: 3,
            9: 2,
            10: 1,
            11: 2,
            12: 1,
            14: 2
        },
        udu: {
            0: 1,
            3: 2,
            4: 1,
            6: 2,
            8: 1,
            11: 2,
            12: 1,
            14: 2
        },
        beats: {
            0: "strong",
            1: "down",
            2: "up",
            3: "down",
            4: "up",
            5: "down",
            6: "up",
            7: "down",
            8: "strong",
            9: "down",
            10: "up",
            11: "down",
            12: "up",
            13: "down",
            14: "up",
            15: "down"
        },
        beatLabels: {
            0: 1,
            2: 2,
            4: 3,
            6: 4,
            8: 5,
            10: 6,
            12: 7,
            14: 8
        },
        setTempoInfo: function() {
            var tempo = getTempo();
            if ( tempo >= 180 ) {
                setInfoMessage("Your rhythm is por rumba");
            } else if ( tempo <= 90 ) {
                setInfoMessage("Your rhythm is por tientos");
            } else {
                setInfoMessage(null);
            }
        }
    }
];

function localStorageSet(name, value) {
    window.localStorage.setItem(name, value);
}

function localStorageGet(name) {
    return window.localStorage.getItem(name);
}

// Set functions
function playSound(name, start, soundVol, instrumentSlug) {
    // If soundVol is null, use the sound's default volume
    if (soundVol === null) {
        soundVol = window.aCompas.sounds[name].volume;
    }
    // Lazy-load the master gain node
    if (window.aCompas.masterGainNode === null) {
        window.aCompas.masterGainNode = window.aCompas.audioContext.createGain();
        window.aCompas.masterGainNode.connect( window.aCompas.audioContext.destination );
    }
    // Create a gainNode
    var soundGainNode = window.aCompas.audioContext.createGain();
    // Set gain values
    window.aCompas.masterGainNode.gain.value = window.aCompas.masterVolume / 100;
    soundGainNode.gain.value = soundVol;
    // Create a gainNode
    var instrumentGainNode = window.aCompas.audioContext.createGain();
    let instrumentVol = null;
    $.each(window.aCompas.mixer, function(index, item) {
        if (instrumentSlug === item.instrumentSlug) {
            instrumentVol = item.volume / 100;
        }
    });
    instrumentGainNode.gain.value = instrumentVol;
    // Create bufferSource
    var bufferSource = window.aCompas.audioContext.createBufferSource();
    bufferSource.buffer = window.aCompas.sounds[name].buffer;
    // Connect everything
    bufferSource.connect(soundGainNode);
    soundGainNode.connect(instrumentGainNode);
    instrumentGainNode.connect(window.aCompas.masterGainNode);
    // Play
    bufferSource.start(start);
}

function getTempo() {
    return parseInt($("#tempo-slider").val());
}

function nextNote() {
    var paloData = null;
    $.each(window.aCompas.palos, function(paloIndex, paloData2) {
        if (paloData2.slug === window.aCompas.palo) {
            paloData = paloData2;
        }
    });
    // Add beat length to last beat time
    // Remark : here, a beat is actualy an eighth note
    var beatLength = null;
    var secondsPerQuarterNote = 60.0 / getTempo();
    if (paloData.timeSignatureBottom === 4) {
       beatLength = secondsPerQuarterNote / 2;
    } else { // paloData.timeSignatureBottom === 8
        // Remark 1 : this short rule only applies to flamenco palos
        // where all x/8 time signatures are basicaly ternary.
        // Remark 2 : for ternary rhythms (this case), there are 6 beats per
        // quarter note (i.e. a double triplet).
        beatLength = secondsPerQuarterNote / 6;
    }
    window.aCompas.nextNoteTime += beatLength;
    // Advance the beat number, going back to zero when the loop is finished
    window.aCompas.currentNote++;
    if (window.aCompas.currentNote === window.aCompas.nbBeatsInPattern) {
        window.aCompas.currentNote = 0;
    }
}

function scheduleInstrumentWithoutImprovisation(instrument, beatNumber, time, paloData) {
    if (paloData[instrument][beatNumber] !== undefined) {
        var nb = null;
        var volume = null;
        // Check if paloData[instrument][beatNumber] is an object
        if (paloData[instrument][beatNumber] === Object(paloData[instrument][beatNumber])) {
            nb = paloData[instrument][beatNumber].nb;
            volume = paloData[instrument][beatNumber].volume;
        } else {
            nb = paloData[instrument][beatNumber];
        }
        playSound(instrument + "_" + nb, time, volume, instrument);
    }
}

function scheduleInstrumentWithImprovisation(instrument, time) {
    // Pick a random sound
    var nb = Math.round(Math.random() * (window.aCompas.soundCounts[instrument] - 1)) + 1;
    // Pick a random volume, using the sound's default volume as a maximum value
    var volume = Math.random() * window.aCompas.sounds[instrument + "_" + nb].volume;
    playSound(instrument + "_" + nb, time, volume, instrument);
}

function scheduleInstrument(instrument, beatNumber, time, paloData) {
    if (window.aCompas.improvise) {
        var improvisationProbability = 20; // Percentage of chances that the pattern is not followed
        var willStickToPattern = (Math.random() > improvisationProbability / 100);
        if (willStickToPattern) {
            scheduleInstrumentWithoutImprovisation(instrument, beatNumber, time, paloData);
        } else {
            scheduleInstrumentWithImprovisation(instrument, time);
        }
    } else {
        scheduleInstrumentWithoutImprovisation(instrument, beatNumber, time, paloData);
    }
}

function scheduleJaleo(beatNumber, time, paloData) {
    if (paloData.beats[beatNumber] === "strong") {
        var willPlay = null;
        if (beatNumber === 0) {
            willPlay = true;
        } else {
            // Randomly chose if a sound will be played
            willPlay = Math.random() < .20;
        }
        if (willPlay) {
            var maxNbVoices = 3;
            var nbVoices = null;
            if (beatNumber === 0) {
                // Pick the number of voices which will actualy be used
                nbVoices = Math.ceil(Math.random() * maxNbVoices);
            } else {
                nbVoices = 1;
            }
            for (var i = 0; i < nbVoices; i++) {
                // Pick a random jaleo sound
                var nb = Math.round(Math.random() * (window.aCompas.soundCounts.jaleo - 1)) + 1;
                playSound("jaleo_" + nb, time, null, "jaleo");
            }
        }
    }
}

function scheduleClick(beatNumber, time, paloData) {
    if (beatNumber % 2 === 0) {
        if (paloData.beats[beatNumber] === "strong") {
            playSound("click_1", time, null, "click");
        } else {
            playSound("click_2", time, null, "click");
        }
    }
}

function scheduleNote(beatNumber, time) {
    // Don't schedule anything if the browser is lagging too much
    var maximumLag = 1; // Seconds
    if (window.aCompas.audioContext.currentTime - time > maximumLag) {
        return ;
    }
    // If option "times only" selected, don't play counter times
    if ( (window.aCompas.noteResolution === 1) && (beatNumber % 2 === 1) ) {
        return;
    }
    var paloData = null;
    $.each(window.aCompas.palos, function(paloIndex, paloData2) {
        if (paloData2.slug === window.aCompas.palo) {
            paloData = paloData2;
        }
    });
    // Schedule instruments
    scheduleInstrument("clara", beatNumber, time, paloData);
    scheduleInstrument("sorda", beatNumber, time, paloData);
    scheduleInstrument("cajon", beatNumber, time, paloData);
    scheduleInstrument("udu", beatNumber, time, paloData);
    scheduleJaleo(beatNumber, time, paloData);
    scheduleClick(beatNumber, time, paloData);
    // Animate visualization
    animateBar(beatNumber, time, paloData.beats[beatNumber]);
}

function scheduler() {
    // while there are notes that will need to play before the next worker interval,
    // schedule them and advance the pointer.
    while ( window.aCompas.nextNoteTime < window.aCompas.audioContext.currentTime + window.aCompas.scheduleAheadTime ) {
        scheduleNote( window.aCompas.currentNote, window.aCompas.nextNoteTime );
        nextNote();
    }
}

function play() {
    var playButton = $('.play > .material-icons');
    var paloData = null;
    $.each(window.aCompas.palos, function(paloIndex, paloData2) {
        if (window.aCompas.palo === paloData2.slug) {
            paloData = paloData2;
        }
    });
    if (! window.aCompas.isPlaying) {
        window.aCompas.currentNote = 0;
        window.aCompas.nextNoteTime = window.aCompas.audioContext.currentTime;
        window.aCompas.playStartTime = window.aCompas.audioContext.currentTime;
        // change play button
        playButton.html("stop");
        $('.play').css("border-color", "firebrick").addClass('active');
        // Send message to worker
        window.aCompas.timerWorker.postMessage("start");
        window.aCompas.isPlaying = true;
        // Track event in Piwik
        _paq.push(['trackEvent', 'Playing', 'Play', paloData.label]);
    } else {
        // change play button
        playButton.html("play_arrow");
        $('.play').css("border-color", "tomato").removeClass('active');
        // Send message to worker
        window.aCompas.timerWorker.postMessage("stop");
        window.aCompas.isPlaying = false;
        // Track event in Piwik
        _paq.push(['trackEvent', 'Playing', 'Stop', paloData.label,
            Math.round(window.aCompas.audioContext.currentTime - window.aCompas.playStartTime)]);
    }
}

function callAtGivenTime(time, callback) {
    window.setTimeout(callback, Math.round((time - window.aCompas.audioContext.currentTime) * 1000));
}

function reduceBar(i, stepTime, stepHeight) {
    var bar = document.getElementById("bar-" + i);
    if (bar) {
        var currentHeight = parseFloat(bar.style.height.replace("px", ""));
        // When the function is called for the first time in the recursion,
        // compute the height to remove at each step
        if (stepHeight === null) {
            stepHeight = currentHeight * .20;
        }
        if (currentHeight > window.aCompas.defaultBarHeight) {
            window.setTimeout(function() {
                var newHeight = currentHeight - stepHeight;
                if (newHeight >= window.aCompas.defaultBarHeight) {
                    bar.style.height = newHeight + "px";
                    // Recursive call with the stepHeight parameter set
                    reduceBar(i, stepTime, stepHeight);
                } else {
                    bar.style.height = window.aCompas.defaultBarHeight + "px";
                    return ;
                }
            }, stepTime);
        }
    }
}

function animateBar(i, time, beatType) {
    callAtGivenTime(time, function() {
        var maxHeight = window.aCompas.barMaxHeight;
        if (beatType === "up") {
            maxHeight *= 2/3;
        }
        if (beatType === "down") {
            maxHeight *= 1/3;
        }
        var bar = document.getElementById("bar-" + i);
        if (bar) {
            bar.style.height = maxHeight + "px";
            var stepTime = 50; // milliseconds
            reduceBar(i, stepTime, null);
        }
    });
}

function draw() {
    var html = "";
    var paloData = null;
    $.each(window.aCompas.palos, function(paloIndex, paloData2) {
        if (window.aCompas.palo === paloData2.slug) {
            paloData = paloData2;
        }
    });
    html += "<div class=\"row-1\">";
    for (var i = 0; i < window.aCompas.nbBeatsInPattern; i++) {
        html += "<div id=\"bar-" + i + "\" class=\"bar bar-" + paloData.beats[i] + "\"></div>";
    }
    html += "</div>"; // End .row-1
    html += "<div class=\"row-2\">";
    for (var i = 0; i < window.aCompas.nbBeatsInPattern; i++) {
        html += "<div class=\"beat-label beat-label-" + paloData.beats[i] + "\">";
        if (paloData.beatLabels[i] !== undefined) {
            html += paloData.beatLabels[i];
        }
        html += "</div>";
    }
    html += "</div>"; // End .row-2
    $("#visualizer").html(html);

    // Set height for #visualizer
    var ratio = 0.13; // height / width ratio
    var visualizerHeight = ratio * $("#visualizer").width();
    $("#visualizer").css("height", visualizerHeight);
    // Set CSS for each bar
    var sideMargin = 2; // px
    var columnWidth = ($("#visualizer").width() - (window.aCompas.nbBeatsInPattern * sideMargin * 2)) / window.aCompas.nbBeatsInPattern;
    $("#visualizer .bar, #visualizer .beat-label").css({
        marginLeft: sideMargin + "px",
        marginRight: sideMargin + "px",
        width: columnWidth
    });
    var barLeft = null;
    for (var i = 0; i < window.aCompas.nbBeatsInPattern; i++) {
        barLeft = (columnWidth + (2 * sideMargin)) * i;
        $("#bar-" + i).css("left", barLeft);
    }
    $("#visualizer .bar").css("height", window.aCompas.defaultBarHeight + "px");
    var row1Height = visualizerHeight - $("#visualizer > .row-2").height();
    $("#visualizer > .row-1").css("height", row1Height + "px");
    window.aCompas.barMaxHeight = Math.ceil(row1Height);
}

function setInfoMessage(txt) {
    var txtDiv = $("#info");
    if (txt === null) {
        txtDiv.css({ "opacity": 0 }, 300).empty();
    } else {
        if (txtDiv.html().length !== 0 ) {
            txtDiv.html(txt);
        } else {
            txtDiv.html(txt).animate({"opacity": 1}, 300);
        }
    }
}

function setPalo(paloSlug) {
    // Stop playing if needed
    if (window.aCompas.isPlaying) {
        play();
    }
    window.aCompas.palo = paloSlug;
    localStorageSet("palo", paloSlug);
    var paloData = null;
    $.each(window.aCompas.palos, function(paloIndex, paloData2) {
        if (window.aCompas.palo === paloData2.slug) {
            paloData = paloData2;
        }
    });
    // Update window.aCompas.nbBeatsInPattern
    window.aCompas.nbBeatsInPattern = paloData.nbBeatsInPattern;
    var tempoValue = paloData.defaultTempo;
    if (localStorageGet("tempo-" + window.aCompas.palo)) {
        tempoValue = parseInt(localStorageGet("tempo-" + window.aCompas.palo));
    }
    if (document.getElementById("tempo-slider").MaterialSlider) {
        document.getElementById("tempo-slider").MaterialSlider.change(tempoValue);
    } else {
        $("#tempo-slider").val(tempoValue);
    }
    $("#tempo-slider").attr("min", paloData.minTempo);
    $("#tempo-slider").attr("max", paloData.maxTempo);
    // This will update tempo label
    $("#tempo-slider").trigger("change");
    // Draw visualization
    draw();
}

function setVolumeLabel() {
    $("#volume-label").html(window.aCompas.masterVolume + " %");
}

function buildUi() {
    var html = "";

    // Visualization
    html += "<div id=\"visualizer\">";
    html += "</div>";

    html += "<div class=\"mdl-grid\">";
    html += "    <div class=\"mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone\">";

    html += "<div class=\"mdl-grid\">";

    // Palo switcher
    html += "    <div class=\"mdl-cell mdl-cell--3-col mdl-cell--hide-tablet mdl-cell--hide-phone\">";
    html += "    </div>";
    html += "    <div class=\"label-cell mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--2-col-phone\">";
    html += "        <b>Rhythm</b>";
    html += "    </div>";
    html += "    <div class=\"action-cell mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--2-col-phone\">";
    html += "        <select id=\"palo\" class=\"form-control\">";
    $.each(window.aCompas.palos, function(paloIndex, paloData) {
        html += "<option value=\"" + paloData.slug + "\">";
        html += paloData.label;
        html += "</option>";
    });
    html += "        </select>";
    html += "    </div>";
    html += "    <div class=\"mdl-cell mdl-cell--3-col mdl-cell--hide-tablet mdl-cell--hide-phone\">";
    html += "    </div>";

    // Improvise
    html += "    <div class=\"mdl-cell mdl-cell--3-col mdl-cell--hide-tablet mdl-cell--hide-phone\">";
    html += "    </div>";
    html += "    <div class=\"label-cell mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--2-col-phone\">";
    html += "        <b>Improvise</b>";
    html += "    </div>";
    html += "    <div class=\"action-cell mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--2-col-phone\">";
    html += "        <label class=\"mdl-switch mdl-js-switch mdl-js-ripple-effect\" for=\"improvise-switch\">";
    html += "            <input type=\"checkbox\" id=\"improvise-switch\" class=\"mdl-switch__input\" checked>";
    html += "            <span class=\"mdl-switch__label\"></span>";
    html += "        </label>";
    html += "    </div>";
    html += "    <div class=\"mdl-cell mdl-cell--3-col mdl-cell--hide-tablet mdl-cell--hide-phone\">";
    html += "    </div>";

    // Resolution
    html += "    <div class=\"mdl-cell mdl-cell--3-col mdl-cell--hide-tablet mdl-cell--hide-phone\">";
    html += "    </div>";
    html += "    <div class=\"label-cell mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--2-col-phone\">";
    html += "        <b>Eighth-note</b>"
    html += "    </div>";
    html += "    <div class=\"action-cell mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--2-col-phone\">";
    html += "        <label class=\"mdl-switch mdl-js-switch mdl-js-ripple-effect\" for=\"resolution-switch\">";
    html += "            <input type=\"checkbox\" id=\"resolution-switch\" class=\"mdl-switch__input\" checked>";
    html += "            <span class=\"mdl-switch__label\"></span>";
    html += "        </label>";
    html += "    </div>";
    html += "    <div class=\"mdl-cell mdl-cell--3-col mdl-cell--hide-tablet mdl-cell--hide-phone\">";
    html += "    </div>";

    // Mixer
    html += "    <div class=\"mdl-cell mdl-cell--3-col mdl-cell--hide-tablet mdl-cell--hide-phone\">";
    html += "    </div>";
    html += "    <div class=\"label-cell mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--2-col-phone\">";
    html += "        <b>Instruments</b>";
    html += "    </div>";
    html += "    <div class=\"action-cell mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--2-col-phone\">";
    html += "        <button class=\"mixer-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent\">";
    html += "            Mixer";
    html += "        </button>";
    html += "    </div>";
    html += "    <div class=\"mdl-cell mdl-cell--3-col mdl-cell--hide-tablet mdl-cell--hide-phone\">";
    html += "    </div>";

    html += "</div>"; // ! .mdl-grid

    html += "    </div>"; // ! .mdl-cell
    html += "    <div class=\"mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone\">";

    // Tempo
    html += "<span><b>Tempo :</b> <span id=\"tempo-label\"></span></span>";
    html += "<div id=\"tempo-grid\" class=\"mdl-grid\">";
    html += "    <div class=\"mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell--1-col-phone\">";
    html += "        <button id=\"tempo-decrease-button\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent\">";
    html += "            -";
    html += "        </button>";
    html += "    </div>"
    html += "    <div class=\"mdl-cell mdl-cell--8-col mdl-cell--6-col-tablet mdl-cell--2-col-phone\">";
    html += "       <input id=\"tempo-slider\" class=\"mdl-slider mdl-js-slider\" type=\"range\" "
        + "min=\"0\" max=\"400\" value=\"0\" tabindex=\"0\">";
    html += "   </div>";
    html += "    <div class=\"mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell--1-col-phone\">";
    html += "        <button id=\"tempo-increase-button\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent\">";
    html += "            +";
    html += "        </button>";
    html += "    </div>";
    html += "</div>";

    // Volume
    html += "<span><b>Volume :</b> <span id=\"volume-label\"></span></span>";
    html += "<div id=\"volume-grid\" class=\"mdl-grid\">";
    html += "    <div class=\"mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell--1-col-phone\">";
    html += "        <button id=\"volume-decrease-button\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent\">";
    html += "            -";
    html += "        </button>";
    html += "    </div>"
    html += "    <div class=\"mdl-cell mdl-cell--8-col mdl-cell--6-col-tablet mdl-cell--2-col-phone\">";
    html += "        <input id=\"volume-slider\" class=\"mdl-slider mdl-js-slider\" type=\"range\" "
        + "min=\"0\" max=\"100\" value=\"0\" tabindex=\"0\">";
    html += "   </div>";
    html += "    <div class=\"mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell--1-col-phone\">";
    html += "        <button id=\"volume-increase-button\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent\">";
    html += "            +";
    html += "        </button>";
    html += "    </div>";
    html += "</div>";

    // Info area
    html += "<div id=\"info\"></div>";

    html += "    </div>"; // ! .mdl-cell
    html += "</div>"; // ! .mdl-grid

    // Play button
    html += "<button class=\"play\">";
    html += "    <i class=\"material-icons\">play_arrow</i>";
    html += "</button>";

    $("#main").html(html);

    // On palo change
    $("#palo").change(function(e) {
        // Set rhythm style
        setPalo($(this).val());
        // Trick to force rendering the newly selected value on mobile
        $(this).blur();
        // Track event in Piwik
        var paloData = null;
        $.each(window.aCompas.palos, function(paloIndex, paloData2) {
            if (window.aCompas.palo === paloData2.slug) {
                paloData = paloData2;
            }
        });
        _paq.push(['trackEvent', 'PaloSwitch', 'Set', paloData.label]);
    });

    // Tempo controls

    $("#tempo-slider").change(function() {
        $("#tempo-label").html(getTempo() + " bpm");
        var paloData = null;
        $.each(window.aCompas.palos, function(paloIndex, paloData2) {
            if (window.aCompas.palo === paloData2.slug) {
                paloData = paloData2;
            }
        });
        paloData.setTempoInfo();
        localStorageSet("tempo-" + window.aCompas.palo, getTempo());
    });
    // Mouse wheel behavior
    $("#tempo-slider").off("mousewheel").on("mousewheel", function(e) {
        if (e.deltaY > 0) {
            document.getElementById("tempo-slider").MaterialSlider.change(parseInt($("#tempo-slider").val()) + 1);
        } else {
            document.getElementById("tempo-slider").MaterialSlider.change(parseInt($("#tempo-slider").val()) - 1);
        }
        $("#tempo-slider").trigger("change");
    });
    $("#tempo-decrease-button").click(function(e) {
        document.getElementById("tempo-slider").MaterialSlider.change(parseInt($("#tempo-slider").val()) - 1);
        $("#tempo-slider").trigger("change");
    });
    $("#tempo-increase-button").click(function(e) {
        document.getElementById("tempo-slider").MaterialSlider.change(parseInt($("#tempo-slider").val()) + 1);
        $("#tempo-slider").trigger("change");
    });


    // Volume controls

    $("#volume-slider").change(function() {
        var volume = parseInt($(this).val());
        window.aCompas.masterVolume = volume;
        setVolumeLabel();
        localStorageSet("volume", window.aCompas.masterVolume);
    });
    // Mouse wheel behavior
    $("#volume-slider").off("mousewheel").on("mousewheel", function(e) {
        if (e.deltaY > 0) {
            document.getElementById("volume-slider").MaterialSlider.change(parseInt($("#volume-slider").val()) + 1);
        } else {
            document.getElementById("volume-slider").MaterialSlider.change(parseInt($("#volume-slider").val()) - 1);
        }
        $("#volume-slider").trigger("change");
    });
    $("#volume-decrease-button").click(function(e) {
        document.getElementById("volume-slider").MaterialSlider.change(parseInt($("#volume-slider").val()) - 1);
        $("#volume-slider").trigger("change");
    });
    $("#volume-increase-button").click(function(e) {
        document.getElementById("volume-slider").MaterialSlider.change(parseInt($("#volume-slider").val()) + 1);
        $("#volume-slider").trigger("change");
    });

    // Play button
    $('.play').on('click', function() {
        play();
    });

    // Resolution
    $("#resolution-switch").on("click", function(e) {
        window.aCompas.noteResolution = $(this).parent().hasClass("is-checked") ? 1 : 0;
        localStorageSet("resolution", window.aCompas.noteResolution);
        var label = null;
        if (window.aCompas.noteResolution === 0) {
            label = "Contratiempo";
        } else {
            label = "Tiempo";
        }
        // Track event in Piwik
        _paq.push(['trackEvent', 'Options', 'Resolution', label]);
    });

    // Improvisation
    $("#improvise-switch").on("click", function(e) {
        var label = null;
        if ($(this).parent().hasClass("is-checked")) {
            window.aCompas.improvise = false;
            label = "Off";
        } else {
            window.aCompas.improvise = true;
            label = "On";
        }
        localStorageSet("improvise", window.aCompas.improvise);
        _paq.push(['trackEvent', 'Options', "Improvisation", label]);
    });

    // Play/Stop when the space bar is pressed
    $("body").on("keypress", function(e) {
        // If the play button has the focus, pressing the space bar will
        // trigger a click on it, which will play/pause the metronome.
        if ($(".play").is(":focus")) {
            return ;
        }
        if (e.which === 32) {
            e.preventDefault();
            play();
        }
    });

    var html = "";
    html += "<h4 class=\"mdl-dialog__title\">Mixer</h4>";
    html += "<div class=\"mdl-dialog__content\">";
    $.each(window.aCompas.instruments, function(index, instrument) {
        html += "<div>";
        html += "    <b><img src=\"common/images/" + instrument.slug
            + ".svg\" class=\"instrument-icon\"/>" + instrument.label + "</b>";
        html += "    <input id=\"instrument-slider-" + instrument.slug
            + "\" class=\"instrument-slider mdl-slider mdl-js-slider\" "
            + "data-instrument=\"" + instrument.slug + "\" type=\"range\" "
            + "min=\"0\" max=\"100\" value=\"0\" tabindex=\"0\">";
        html += "</div>";
    });
    html += "</div>";
    html += "<div class=\"mdl-dialog__actions\">";
    html += "    <button type=\"button\" class=\"mdl-button mdl-js-button "
        + "mdl-button--raised mdl-js-ripple-effect mdl-button--accent close\">Ok</button>";
    html += "</div>";

    $("#mixer-dialog").html(html);

    initMixer();

    $(".mixer-button").click(function(e) {
        e.preventDefault();
        $("#mixer-dialog").show();
    });

    $("#mixer-dialog .close").click(function(e) {
        e.preventDefault();
        $("#mixer-dialog").fadeOut();
    });

    $("#will-not-work-dialog .close").click(function(e) {
        e.preventDefault();
        $("#will-not-work-dialog").fadeOut();
    });

    // Mouse wheel behavior
    $.each(window.aCompas.instruments, function(index, instrument) {
        var selector = "instrument-slider-" + instrument.slug;
        $("#" + selector).off("mousewheel").on("mousewheel", function(e) {
            if (e.deltaY > 0) {
                document.getElementById(selector).MaterialSlider.change(parseInt($("#" + selector).val()) + 1);
            } else {
                document.getElementById(selector).MaterialSlider.change(parseInt($("#" + selector).val()) - 1);
            }
        });
    });

    // Instruments sliders
    $("#mixer-dialog .instrument-slider").change(function() {
        let instrumentSlug = $(this).data("instrument");
        let value = parseInt($(this).val());
        $.each(window.aCompas.mixer, function(index, item) {
            if (item.instrumentSlug === instrumentSlug) {
                window.aCompas.mixer[index].volume = value;
            }
        });
        localStorageSet("instrument-" + instrumentSlug, value);
    });

    // On window resize and/or orientation change
    $(window).on("resize", function(e) {
        draw();
        // Track event in Piwik
        trackDeviceOrientation();
    });

    // Initialization
    restoreValuesFromLocalStorage();
    trackDeviceOrientation();
}

function restoreValuesFromLocalStorage() {
    // Palo
    var paloSlug = (localStorageGet("palo") !== null) ? localStorageGet("palo"): window.aCompas.defaultPaloSlug;
    setPalo(paloSlug);
    $("#palo").val(paloSlug);
    // Resolution
    if (localStorageGet("resolution") !== null && parseInt(localStorageGet("resolution")) !== window.aCompas.noteResolution) {
        $("#resolution-switch").click();
    }
    // Instruments
    $.each(window.aCompas.instruments, function(index, instrument) {
        var readValue = localStorageGet("instrument-" + instrument.slug);
        if (readValue !== null && JSON.parse(readValue) !== null) {
            let volume = readValue;
            // Remark : old version of the code used to set "true" or "false"
            // (strings, not booleans). The next if (...) is here for backward
            // compatibility
            if (readValue === "true") {
                volume = 100;
            } else {
                // Same thing here : this is for backward compatibility
                if (readValue === "false") {
                    volume = 0;
                } else { // General case
                    volume = parseInt(readValue)
                }
            }
            $.each(window.aCompas.mixer, function(index, item) {
                if (item.instrumentSlug === instrument.slug) {
                    window.aCompas.mixer[index].volume = volume;
                }
            });
            $("#mixer-dialog .instrument-slider[data-instrument="
                + instrument.slug + "]").val(volume);
        }
    });
    // Improvise
    if (localStorageGet("improvise") !== null && JSON.parse(localStorageGet("improvise")) !== window.aCompas.improvise) {
        $("#improvise-switch").click();
    }
    // Volume
    if (localStorageGet("volume") !== null && parseInt(localStorageGet("volume")) !== window.aCompas.masterVolume) {
        var volume = parseInt(localStorageGet("volume"));
        window.aCompas.masterVolume = volume;
    }
    $("#volume-slider").val(window.aCompas.masterVolume);
    setVolumeLabel();

}

function trackDeviceOrientation() {
    var label = null;
    if (window.innerHeight > window.innerWidth) {
        label = "Portrait";
    } else {
        label = "Landscape";
    }
    if (window.aCompas.deviceOrientation !== label) {
        window.aCompas.deviceOrientation = label;
        _paq.push(['trackEvent', 'Device', 'Orientation', window.aCompas.deviceOrientation]);
    }
}

function initMixer() {
    $.each(window.aCompas.instruments, function(index, instrument) {
        window.aCompas.mixer.push({
            instrumentSlug: instrument.slug,
            volume: instrument.defaultVolume
        });
        $("#mixer-dialog .instrument-slider[data-instrument="
            + instrument.slug + "]").val(instrument.defaultVolume);
    });
}

function loadSoundObj(obj, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', "common/audio/" + obj.src + "." + window.aCompas.audioFormat, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
        // request.response is encoded... so decode it now
        window.aCompas.audioContext.decodeAudioData(request.response, function(buffer) {
            obj.buffer = buffer;
            }, function() {
                message.call($wrapper, 'error', 'Error loading ' + obj.src);
            });
    };

    request.send();
}

function loadSounds() {
    // iterate over sounds obj
    for (var i in window.aCompas.sounds) {
        if (window.aCompas.sounds.hasOwnProperty(i)) {
            // load sound
            loadSoundObj(window.aCompas.sounds[i]);
        }
    }
}

function initAudio() {
    try {
        // Create Web Audio API audio context
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        if (window.AudioContext != undefined) {
            window.aCompas.audioContext = new AudioContext();
            // Trick for getting audio working in iOS
            // Tell StartAudioContext to start AudioContext when the play button is touched
            // https://github.com/tambien/StartAudioContext
            StartAudioContext(window.aCompas.audioContext, ".play");
            // Detect the audio format to use for playing
            if (new Audio().canPlayType("audio/flac")) {
                window.aCompas.audioFormat = "flac";
            } else if (new Audio().canPlayType("audio/ogg")) {
                window.aCompas.audioFormat = "ogg";
            } else if (new Audio().canPlayType("audio/mpeg")) {
                window.aCompas.audioFormat = "mp3";
            } else if (new Audio().canPlayType("audio/mp4")) {
                window.aCompas.audioFormat = "mp4";
            } else if (new Audio().canPlayType("audio/wav")) {
                window.aCompas.audioFormat = "wav";
            } else {
                throw new Error("None of the available audio formats can be played");
            }
            // Load sounds
            loadSounds();
            // Set the message worker
            window.aCompas.timerWorker = new Worker("common/js/metronomeworker.js");
            window.aCompas.timerWorker.onmessage = function(e) {
                if (e.data === "tick") {
                    // console.log("tick!");
                    scheduler();
                } else {
                    console.log("message: " + e.data);
                }
            };
            window.aCompas.timerWorker.postMessage({"interval":window.aCompas.lookahead});
        } else {
            $("#will-not-work-dialog").show();
        }
    } catch (e) {
        $("#will-not-work-dialog").show();
    }
}

// ****************************
// ****************************
// Main initialization function
// ****************************
// ****************************

function initMetronome() {
    buildUi();
    initAudio();
}
