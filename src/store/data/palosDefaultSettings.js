export default [
  {
    id: 1,
    label: 'Alegría',
    value: 'alegria',
    minTempo: 40,
    maxTempo: 200,
    defaultTempo: 130,
    slowTempo: 110,
    fastTempo: 170,
    nbBeatsInPattern: 24,
    accents: [ 0, 3, 6, 8, 10 ],
    clara: {
      0: 1, // 12 >
      2: 3, // 1
      3: 2,
      4: 3, // 2
      6: 1, // 3 >
      8: 3, // 4
      10: 3, // 5
      12: 1, // 6
      13: 2,
      14: 3, // 7 >
      15: 2,
      16: 1, // 8 >
      18: 3, // 9
      19: 1,
      20: 1, // 10 >
      22: 3 // 11
    },
    sorda: {
      0: 1, // 12 >
      1: 3,
      2: 2, // 1
      3: 1,
      4: 2, // 2
      5: 3,
      6: 1, // 3 >
      7: 3,
      8: 2, // 4
      9: 3,
      10: 2, // 5
      11: 3,
      12: 1, // 6
      13: 3,
      14: 2, // 7 >
      15: 3,
      16: 1, // 8 >
      17: 3,
      18: 2, // 9
      19: 1,
      20: 1, // 10 >
      21: 3,
      22: 2, // 11
      23: 3
    },
    cajon: {
      0: 3, // 12 >
      1: 2,
      2: 1, // 1
      3: 2,
      4: 1, // 2
      5: 2,
      6: 3, // 3 >
      7: 2,
      8: 1, // 4
      9: 2,
      10: 1, // 5
      11: 2,
      12: 3, // 6
      13: 2,
      14: 1, // 7 >
      15: 1,
      16: 3, // 8 >
      17: 2,
      18: 1, // 9
      19: 2,
      20: 3, // 10
      21: 2,
      22: 1, // 11
      23: 2
    },
    udu: {
      0: 1, // 12 >
      2: 2, // 1
      3: 3,
      4: 2, // 2
      6: 1, // 3 >
      8: 2, // 4
      10: 2, // 5
      12: 1, // 6
      14: 2, // 7
      15: 3,
      16: 1, // 8
      18: 2, // 9
      19: 3,
      20: 1, // 10
      22: 2 // 11
    },
    click: {
      0: 1,
      2: 2,
      4: 2,
      6: 1,
      8: 2,
      10: 2,
      12: 2,
      14: 1,
      16: 1,
      18: 2,
      20: 1,
      22: 2
    },
    beats: {
      0: 'strong',
      1: 'down',
      2: 'up',
      3: 'down',
      4: 'up',
      5: 'down',
      6: 'strong',
      7: 'down',
      8: 'up',
      9: 'down',
      10: 'up',
      11: 'down',
      12: 'strong',
      13: 'down',
      14: 'up',
      15: 'down',
      16: 'strong',
      17: 'down',
      18: 'up',
      19: 'down',
      20: 'strong',
      21: 'down',
      22: 'up',
      23: 'down'
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
    preCounts: [
      { value: 0, label: 'Off' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6 (half a compás)' },
      { value: 7, label: '7' },
      { value: 8, label: '8' },
      { value: 9, label: '9' },
      { value: 10, label: '10' },
      { value: 11, label: '11' },
      { value: 12, label: '12 (one compás)' }
    ],
    startBeats: [
      { value: 0, label: '12 (default)' },
      { value: 2, label: '1' },
      { value: 4, label: '2' },
      { value: 6, label: '3' },
      { value: 8, label: '4' },
      { value: 10, label: '5' },
      { value: 12, label: '6 (half a compás)' },
      { value: 14, label: '7' },
      { value: 16, label: '8' },
      { value: 18, label: '9' },
      { value: 20, label: '10' },
      { value: 22, label: '11' }
    ],
    slowMessage: 'Your tempo is very slow',
    fastMessage: 'Your tempo is por buleria',
    longLabel: 'Alegría',
    doc: 'One compás is made of 12 beats, and an emphasis is put on beats 12, 3, 6, 8 and 10. It can be seen as "the first half of the compás is ternary", and "the second half is binary". Alegría means "joy" in Spanish.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Alegr%C3%ADas',
    cities: 'Cádiz',
    videoExample: 'https://www.youtube.com/watch?v=M4x02TRlaqw'
  },
  {
    id: 2,
    label: 'Bulería (6)',
    value: 'buleria-6',
    minTempo: 60,
    maxTempo: 300,
    defaultTempo: 190,
    slowTempo: 135,
    fastTempo: 230,
    nbBeatsInPattern: 12,
    accents: [ 0, 3 ],
    clara: {
      0: 3, // 6 >
      1: 2,
      2: 1, // 1
      3: 2,
      4: 3, // 2
      6: 1, // 3 >
      7: 3,
      8: 3, // 4
      10: 3 // 5
    },
    sorda: {
      0: 1, // 6 >
      1: 3,
      2: 2, // 1
      3: 1,
      4: 2, // 2
      5: 3,
      6: 1, // 3 >
      8: 3, // 4
      10: 3
    },
    cajon: {
      0: 3, // 6 >
      1: 2,
      2: 1, // 1
      3: 2,
      4: 1, // 2
      5: 2,
      6: 3, // 3 >
      7: 2,
      8: 1, // 4
      9: 2,
      10: 2, // 5
      11: 2
    },
    udu: {
      0: 1, // 6 >
      2: 2, // 1
      3: 3,
      4: 2, // 2
      6: 1, // 3 >
      8: 2, // 4
      10: 2 // 5
    },
    click: {
      0: 1,
      2: 2,
      4: 2,
      6: 1,
      8: 2,
      10: 2
    },
    beats: {
      0: 'strong',
      1: 'down',
      2: 'up',
      3: 'down',
      4: 'up',
      5: 'down',
      6: 'strong',
      7: 'down',
      8: 'up',
      9: 'down',
      10: 'up',
      11: 'down'
    },
    beatLabels: {
      0: 1,
      2: 2,
      4: 3,
      6: 4,
      8: 5,
      10: 6
    },
    preCounts: [
      { value: 0, label: 'Off' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3 (half a compás)' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6 (one compás)' }
    ],
    startBeats: [
      { value: 0, label: '1 (default)' },
      { value: 2, label: '2' },
      { value: 4, label: '3' },
      { value: 6, label: '4 (half a compás)' },
      { value: 8, label: '5' },
      { value: 10, label: '6' }
    ],
    slowMessage: 'Your tempo is very slow',
    fastMessage: 'Your tempo is very fast',
    longLabel: '6 beats Bulería',
    doc: 'One compás is made of 2 groups of 3 ternary quarter notes, so this palo is purely ternary. It can be seen as the first half of a 12 beats bulería.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Buler%C3%ADas',
    cities: 'Jerez de la Frontera',
    videoExample: null
  },
  {
    id: 3,
    label: 'Bulería (12)',
    value: 'buleria-12',
    minTempo: 60,
    maxTempo: 300,
    defaultTempo: 190,
    slowTempo: 135,
    fastTempo: 230,
    nbBeatsInPattern: 24,
    accents: [ 0, 3, 6, 8, 10 ],
    clara: {
      0: 1, // 12 >
      1: 2,
      2: 3, // 1
      3: 1,
      4: 3, // 2
      5: 2,
      6: 1, // 3 >
      7: 2,
      8: 3, // 4
      9: 2,
      10: 3, // 5
      11: 2,
      12: 1, // 6 >
      13: 2,
      14: 3, // 7
      15: 2,
      16: 1, // 8 >
      17: 2,
      18: 3, // 9
      19: 2,
      20: 1, // 10 >
      22: 3 // 11
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
      12: 1, // 6
      13: 3,
      14: 2, // 7
      15: 3,
      16: 1, // 8
      17: 3,
      18: 2, // 9
      19: 1,
      20: 2, // 10
      22: 3
    },
    cajon: {
      0: 3, // 12 >
      1: 2,
      2: 1, // 1
      3: 2,
      4: 1, // 2
      5: 2,
      6: 3, // 3 >
      7: 2,
      8: 1, // 4
      9: 2,
      10: 1, // 5
      11: 2,
      12: 3, // 6 >
      13: 2,
      14: 1, // 7
      15: 2,
      16: 3, // 8 >
      17: 2,
      18: 1, // 9
      19: 2,
      20: 3, // 10
      21: 2,
      22: 1, // 11
      23: 2
    },
    udu: {
      0: 1, // 12 >
      3: 2,
      4: 2, // 2
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
    click: {
      0: 1,
      2: 2,
      4: 2,
      6: 1,
      8: 2,
      10: 2,
      12: 1,
      14: 2,
      16: 1,
      18: 2,
      20: 1,
      22: 2
    },
    beats: {
      0: 'strong',
      1: 'down',
      2: 'up',
      3: 'down',
      4: 'up',
      5: 'down',
      6: 'strong',
      7: 'down',
      8: 'up',
      9: 'down',
      10: 'up',
      11: 'down',
      12: 'strong',
      13: 'down',
      14: 'up',
      15: 'down',
      16: 'strong',
      17: 'down',
      18: 'up',
      19: 'down',
      20: 'strong',
      21: 'down',
      22: 'up',
      23: 'down'
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
    preCounts: [
      { value: 0, label: 'Off' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6 (half a compás)' },
      { value: 7, label: '7' },
      { value: 8, label: '8' },
      { value: 9, label: '9' },
      { value: 10, label: '10' },
      { value: 11, label: '11' },
      { value: 12, label: '12 (one compás)' }
    ],
    startBeats: [
      { value: 0, label: '12 (default)' },
      { value: 2, label: '1' },
      { value: 4, label: '2' },
      { value: 6, label: '3' },
      { value: 8, label: '4' },
      { value: 10, label: '5' },
      { value: 12, label: '6 (half a compás)' },
      { value: 14, label: '7' },
      { value: 16, label: '8' },
      { value: 18, label: '9' },
      { value: 20, label: '10' },
      { value: 22, label: '11' }
    ],
    slowMessage: 'Your rhythm is very slow',
    fastMessage: 'Your tempo is very fast',
    longLabel: '12 beats Bulería',
    doc: 'One compás is made of 12 beats, and an emphasis is put on beats 12, 3, 6, 8 and 10. It can be seen as "the first half of the compás is ternary", and "the second half is binary".',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Buler%C3%ADas',
    cities: 'Jerez de la Frontera and others',
    videoExample: 'https://www.youtube.com/watch?v=p5ypbEOZLUU'
  },
  {
    id: 4,
    label: 'Bulería (12) variation',
    value: 'buleria-12-variation',
    minTempo: 120,
    maxTempo: 300,
    defaultTempo: 190,
    slowTempo: 135,
    fastTempo: 230,
    nbBeatsInPattern: 24,
    accents: [ 0, 3, 7, 8, 10 ],
    clara: {
      0: 1, // 12 >
      1: 2,
      2: 3, // 1
      3: 1,
      4: 3, // 2
      5: 2,
      6: 1, // 3 >
      7: 2,
      8: 3, // 4
      9: 2,
      10: 3, // 5
      11: 2,
      12: 3, // 6
      13: 2,
      14: 1, // 7 >
      15: 2,
      16: 1, // 8 >
      17: 2,
      18: 3, // 9
      19: 1,
      20: 1, // 10 >
      22: 3 // 11
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
      0: 3, // 12 >
      1: 2,
      2: 1, // 1
      3: 2,
      4: 1, // 2
      5: 2,
      6: 3, // 3 >
      7: 2,
      8: 1, // 4
      9: 2,
      10: 1, // 5
      11: 2,
      12: 1, // 6
      13: 2,
      14: 3, // 7 >
      15: 2,
      16: 3, // 8 >
      17: 2,
      18: 1, // 9
      19: 2,
      20: 3, // 10 >
      21: 2,
      22: 1, // 11
      23: 2
    },
    udu: {
      0: 1,
      3: 2,
      4: 3,
      6: 1,
      9: 2,
      10: 3,
      12: 2,
      14: 1,
      15: 2,
      16: 1,
      19: 2,
      20: 1,
      22: 2
    },
    click: {
      0: 1,
      2: 2,
      4: 2,
      6: 1,
      8: 2,
      10: 2,
      12: 2,
      14: 1,
      16: 1,
      18: 2,
      20: 1,
      22: 2
    },
    beats: {
      0: 'strong',
      1: 'down',
      2: 'up',
      3: 'down',
      4: 'up',
      5: 'down',
      6: 'strong',
      7: 'down',
      8: 'up',
      9: 'down',
      10: 'up',
      11: 'down',
      12: 'up',
      13: 'down',
      14: 'strong',
      15: 'down',
      16: 'strong',
      17: 'down',
      18: 'up',
      19: 'down',
      20: 'strong',
      21: 'down',
      22: 'up',
      23: 'down'
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
    preCounts: [
      { value: 0, label: 'Off' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6 (half a compás)' },
      { value: 7, label: '7' },
      { value: 8, label: '8' },
      { value: 9, label: '9' },
      { value: 10, label: '10' },
      { value: 11, label: '11' },
      { value: 12, label: '12 (one compás)' }
    ],
    startBeats: [
      { value: 0, label: '12 (default)' },
      { value: 2, label: '1' },
      { value: 4, label: '2' },
      { value: 6, label: '3' },
      { value: 8, label: '4' },
      { value: 10, label: '5' },
      { value: 12, label: '6 (half a compás)' },
      { value: 14, label: '7' },
      { value: 16, label: '8' },
      { value: 18, label: '9' },
      { value: 20, label: '10' },
      { value: 22, label: '11' }
    ],
    slowMessage: 'Your tempo is very slow',
    fastMessage: 'Your tempo is very fast',
    longLabel: '12 beats Bulería (variation)',
    doc: 'In this popular variation of the 12 beats bulería compás, an accent is put on beat 7 instead of beat 6.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Buler%C3%ADas',
    cities: 'Jerez de la Frontera and others',
    videoExample: null
  },
  {
    id: 5,
    label: 'Fandangos',
    value: 'fandangos',
    minTempo: 80,
    maxTempo: 200,
    defaultTempo: 130,
    slowTempo: 110,
    fastTempo: 170,
    nbBeatsInPattern: 24,
    accents: [ 0, 3, 6, 9, 10 ],
    clara: {
      0: 1, // 12 >
      1: 2,
      2: 3, // 1
      3: 1,
      4: 3, // 2
      5: 2,
      6: 1, // 3 >
      7: 2,
      8: 3, // 4
      9: 2,
      10: 3, // 5
      11: 2,
      12: 1, // 6 >
      13: 2,
      14: 3, // 7
      15: 2,
      16: 3, // 8
      17: 2,
      18: 1, // 9 >
      19: 1,
      20: 1, // 10 >
      22: 3 // 11
    },
    sorda: {
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
    cajon: {
      0: 3, // 12 >
      1: 2,
      2: 1, // 1
      3: 2,
      4: 1, // 2
      5: 2,
      6: 3, // 3 >
      7: 2,
      8: 1, // 4
      9: 2,
      10: 1, // 5
      11: 2,
      12: 3, // 6 >
      13: 2,
      14: 1, // 7
      15: 2,
      16: 1, // 8
      17: 2,
      18: 3, // 9 >
      19: 1,
      20: 3, // 10
      21: 2,
      22: 2, // 11
      23: 2
    },
    udu: {
      0: 1,
      2: 2,
      3: 3,
      4: 2,
      6: 1,
      8: 2,
      10: 2,
      12: 1,
      14: 2,
      15: 3,
      16: 2,
      18: 1,
      19: 2,
      20: 1
    },
    click: {
      0: 1,
      2: 2,
      4: 2,
      6: 1,
      8: 2,
      10: 2,
      12: 1,
      14: 2,
      16: 2,
      18: 1,
      20: 1,
      22: 2
    },
    beats: {
      0: 'strong',
      1: 'down',
      2: 'up',
      3: 'down',
      4: 'up',
      5: 'down',
      6: 'strong',
      7: 'down',
      8: 'up',
      9: 'down',
      10: 'up',
      11: 'down',
      12: 'strong',
      13: 'down',
      14: 'up',
      15: 'down',
      16: 'up',
      17: 'down',
      18: 'strong',
      19: 'down',
      20: 'strong',
      21: 'down',
      22: 'up',
      23: 'down'
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
    preCounts: [
      { value: 0, label: 'Off' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6 (half a compás)' },
      { value: 7, label: '7' },
      { value: 8, label: '8' },
      { value: 9, label: '9' },
      { value: 10, label: '10' },
      { value: 11, label: '11' },
      { value: 12, label: '12 (one compás)' }
    ],
    startBeats: [
      { value: 0, label: '12 (default)' },
      { value: 2, label: '1' },
      { value: 4, label: '2' },
      { value: 6, label: '3' },
      { value: 8, label: '4' },
      { value: 10, label: '5' },
      { value: 12, label: '6 (half a compás)' },
      { value: 14, label: '7' },
      { value: 16, label: '8' },
      { value: 18, label: '9' },
      { value: 20, label: '10' },
      { value: 22, label: '11' }
    ],
    slowMessage: 'Your tempo is very slow',
    fastMessage: 'Your tempo is very fast',
    longLabel: 'Fandangos',
    doc: 'This 12 beats-based palo has accents on beats 12, 3, 6, 9 and 10.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Fandango',
    cities: 'Huelva, Málaga, and others',
    videoExample: 'https://www.youtube.com/watch?v=RS8sy3gdb_Y'
  },
  {
    id: 6,
    label: 'Rumba',
    value: 'rumba',
    minTempo: 120,
    maxTempo: 250,
    defaultTempo: 170,
    slowTempo: 140,
    fastTempo: 220,
    nbBeatsInPattern: 16,
    accents: [ 0, 4 ],
    clara: {
      0: 3, // 1
      1: 2,
      2: 1, // 2 >
      3: 1,
      4: 3, // 3
      6: 1, // 4 >
      8: 3, // 5
      9: 2,
      10: 2, // 6 >
      11: 2,
      12: 3, // 7
      14: 2 // 8 >
    },
    sorda: {
      0: 3, // 1
      1: 2,
      2: 1, // 2
      3: 1,
      4: 2, // 3
      6: 1,
      8: 3,
      9: 2,
      10: 1,
      11: 2,
      12: 3,
      14: 2
    },
    cajon: {
      0: 3, // 1
      1: 2,
      2: 1, // 2 >
      3: 3,
      4: 3, // 3
      5: 2,
      6: 1, // 4 >
      7: 2,
      8: 3, // 5
      9: 2,
      10: 1, // 6 >
      11: 3,
      12: 3, // 7
      13: 2,
      14: 1, // 8 >
      15: 2
    },
    udu: {
      0: 1,
      3: 1,
      6: 1,
      10: 2,
      12: 2
    },
    click: {
      0: 1,
      2: 2,
      4: 2,
      6: 2,
      8: 1,
      10: 2,
      12: 2,
      14: 2
    },
    beats: {
      0: 'strong',
      1: 'down',
      2: 'up',
      3: 'down',
      4: 'up',
      5: 'down',
      6: 'up',
      7: 'down',
      8: 'strong',
      9: 'down',
      10: 'up',
      11: 'down',
      12: 'up',
      13: 'down',
      14: 'up',
      15: 'down'
    },
    beatLabels: {
      0: 1,
      2: 2,
      4: 3,
      6: 4,
      8: 1,
      10: 2,
      12: 3,
      14: 4
    },
    preCounts: [
      { value: 0, label: 'Off' },
      { value: 1, label: '1' },
      { value: 2, label: '2 (half a compás)' },
      { value: 3, label: '3' },
      { value: 4, label: '4 (one compás)' },
      { value: 5, label: '5' },
      { value: 6, label: '6 (one compás and a half)' },
      { value: 7, label: '7' },
      { value: 8, label: '8 (two compás)' }
    ],
    startBeats: [
      { value: 0, label: '1 (default)' },
      { value: 10, label: '2' },
      { value: 12, label: '3 (half a compás)' },
      { value: 14, label: '4' }
    ],
    slowMessage: 'Your tempo is very slow',
    fastMessage: 'Your tempo is very fast',
    longLabel: 'Rumba',
    doc: 'Rumba is a 4/4 palo, it can be counted as 1, 2, 3, 4. There is an accent on the first beat. Remark : our example pattern is made of 2 bars.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Rumba_flamenca',
    cities: 'Barcelona and others',
    videoExample: 'https://www.youtube.com/watch?v=2oyhlad64-s'
  },
  {
    id: 7,
    label: 'Siguiriya',
    value: 'siguiriya',
    minTempo: 30,
    maxTempo: 300,
    defaultTempo: 130,
    slowTempo: 70,
    fastTempo: 170,
    nbBeatsInPattern: 24,
    accents: [ 0, 2, 4, 7, 10 ],
    clara: {
      0: 1, // 12 >
      1: 2,
      2: 3, // 1
      3: 2,
      4: 1, // 2 >
      5: 2,
      6: 3, // 3
      7: 2,
      8: 1, // 4 >
      9: 2,
      10: 3, // 5
      11: 1,
      12: 3, // 6
      13: 2,
      14: 1, // 7 >
      15: 2,
      16: 3, // 8
      17: 1,
      18: 3, // 9
      19: 2,
      20: 1, // 10 >
      22: 3 // 11
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
      0: 3, // 12 >
      1: 2,
      2: 1, // 1
      3: 2,
      4: 3, // 2 >
      5: 2,
      6: 1, // 3
      7: 2,
      8: 3, // 4 >
      9: 2,
      10: 1, // 5
      11: 2,
      12: 1, // 6
      13: 2,
      14: 3, // 7 >
      15: 2,
      16: 1, // 8
      17: 2,
      18: 1, // 9
      19: 2,
      20: 3, // 10 >
      21: 2,
      22: 1, // 11
      23: 2
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
    click: {
      0: 1,
      2: 2,
      4: 1,
      6: 2,
      8: 1,
      10: 2,
      12: 2,
      14: 1,
      16: 2,
      18: 2,
      20: 1,
      22: 2
    },
    beats: {
      0: 'strong',
      1: 'down',
      2: 'up',
      3: 'down',
      4: 'strong',
      5: 'down',
      6: 'up',
      7: 'down',
      8: 'strong',
      9: 'down',
      10: 'up',
      11: 'down',
      12: 'up',
      13: 'down',
      14: 'strong',
      15: 'down',
      16: 'up',
      17: 'down',
      18: 'up',
      19: 'down',
      20: 'strong',
      21: 'down',
      22: 'up',
      23: 'down'
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
    preCounts: [
      { value: 0, label: 'Off' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6 (half a compás)' },
      { value: 7, label: '7' },
      { value: 8, label: '8' },
      { value: 9, label: '9' },
      { value: 10, label: '10' },
      { value: 11, label: '11' },
      { value: 12, label: '12 (one compás)' }
    ],
    startBeats: [
      { value: 0, label: '12 (default)' },
      { value: 2, label: '1' },
      { value: 4, label: '2' },
      { value: 6, label: '3' },
      { value: 8, label: '4' },
      { value: 10, label: '5' },
      { value: 12, label: '6 (half a compás)' },
      { value: 14, label: '7' },
      { value: 16, label: '8' },
      { value: 18, label: '9' },
      { value: 20, label: '10' },
      { value: 22, label: '11' }
    ],
    slowMessage: 'Your tempo is very slow',
    fastMessage: 'Your tempo is very fast',
    longLabel: 'Siguiriya',
    doc: 'Siguiriya is a 12 beats-based palo, with accents on beats 12, 2, 4, 7 and 10.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Siguiriyas',
    cities: 'Sevilla, Cádiz and others',
    videoExample: 'https://www.youtube.com/watch?v=3u66TxY1S88'
  },
  {
    id: 8,
    label: 'Soleá',
    value: 'solea',
    minTempo: 50,
    maxTempo: 150,
    defaultTempo: 80,
    slowTempo: 65,
    fastTempo: 110,
    nbBeatsInPattern: 24,
    accents: [ 2, 5, 7, 9, 11 ],
    clara: {
      0: 3,
      1: 1,
      2: 2, // 2
      4: 1,
      6: 3,
      7: 1,
      8: 2, // 5
      10: 1, // 6 >
      12: 3,
      13: 2,
      14: 1, // 8 >
      16: 3,
      17: 2,
      18: 1, // 10 >
      20: 3, // 11
      22: 1 // 12 >
    },
    sorda: {
      0: 3,
      1: 2,
      2: 3,
      3: 2,
      4: 1,
      5: 2,
      6: 3,
      7: 2,
      8: 3,
      9: 2,
      10: 1, // 6 >
      11: 2,
      12: 3,
      13: 2,
      14: 1,
      15: 2,
      16: 3,
      17: 2,
      18: 1,
      20: 3,
      22: 1
    },
    cajon: {
      1: 2,
      2: 1, // 2
      3: 2,
      4: 3, // 3 >
      7: 2,
      8: 1, // 5
      9: 2,
      10: 3, // 6 >
      13: 2,
      14: 3, // 8 >
      17: 2,
      18: 3, // 10 >
      20: 1, // 11
      21: 2,
      22: 3 // 12 >
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
    click: {
      0: 2,
      2: 2,
      4: 1,
      6: 2,
      8: 2,
      10: 1,
      12: 2,
      14: 1,
      16: 2,
      18: 1,
      20: 2,
      22: 1
    },
    beats: {
      0: 'up',
      1: 'down',
      2: 'up',
      3: 'down',
      4: 'strong',
      5: 'down',
      6: 'up',
      7: 'down',
      8: 'up',
      9: 'down',
      10: 'strong',
      11: 'down',
      12: 'up',
      13: 'down',
      14: 'strong',
      15: 'down',
      16: 'up',
      17: 'down',
      18: 'strong',
      19: 'down',
      20: 'up',
      21: 'down',
      22: 'strong',
      23: 'down'
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
    preCounts: [
      { value: 0, label: 'Off' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6 (half a compás)' },
      { value: 7, label: '7' },
      { value: 8, label: '8' },
      { value: 9, label: '9' },
      { value: 10, label: '10' },
      { value: 11, label: '11' },
      { value: 12, label: '12 (one compás)' }
    ],
    startBeats: [
      { value: 0, label: '1 (default)' },
      { value: 2, label: '2' },
      { value: 4, label: '3' },
      { value: 6, label: '4' },
      { value: 8, label: '5' },
      { value: 10, label: '6' },
      { value: 12, label: '7 (half a compás)' },
      { value: 14, label: '8' },
      { value: 16, label: '9' },
      { value: 18, label: '10' },
      { value: 20, label: '11' },
      { value: 22, label: '12' }
    ],
    slowMessage: 'Your tempo is very slow',
    fastMessage: 'Your tempo is solea por bulería or alegría',
    longLabel: 'Soleá',
    doc: 'Soleá is a sad 12 beats-based palo, with accents on beats 3, 6, 8, 10 and 12.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Sole%C3%A1',
    cities: 'Sevilla, Cádiz and others',
    videoExample: 'https://www.youtube.com/watch?v=U9iw1gMVoO0'
  },
  {
    id: 9,
    label: 'Tangos',
    value: 'tangos',
    minTempo: 40,
    maxTempo: 200,
    defaultTempo: 130,
    slowTempo: 90,
    fastTempo: 150,
    nbBeatsInPattern: 16,
    accents: [ 0, 4 ],
    clara: {
      0: 3, // 1
      1: 2,
      2: 1, // 2 >
      3: 1,
      4: 3, // 3
      6: 1, // 4 >
      8: 3, // 5
      9: 2,
      10: 1, // 6 >
      11: 1,
      12: 3, // 7 >
      14: 2 // 8
    },
    sorda: {
      0: 3,
      1: 2,
      2: 1,
      3: 2,
      4: 3,
      5: 2,
      6: 1,
      7: 2,
      8: 3,
      9: 2,
      10: 1,
      11: 2,
      12: 3,
      14: 1
    },
    cajon: {
      0: 3, // 1
      1: 2,
      2: 1, // 2 >
      3: 1,
      4: 3, // 3
      5: 2,
      6: 1, // 4 >
      7: 2,
      8: 3, // 5
      9: 2,
      10: 1, // 6 >
      11: 2,
      12: 1, // 7 >
      13: 2,
      14: 1, // 8
      15: 2
    },
    udu: {
      2: 1,
      3: 2,
      6: 3,
      10: 1,
      11: 2,
      12: 1,
      14: 2
    },
    click: {
      0: 1,
      2: 2,
      4: 2,
      6: 2,
      8: 1,
      10: 2,
      12: 2,
      14: 2
    },
    beats: {
      0: 'strong',
      1: 'down',
      2: 'up',
      3: 'down',
      4: 'up',
      5: 'down',
      6: 'up',
      7: 'down',
      8: 'strong',
      9: 'down',
      10: 'up',
      11: 'down',
      12: 'up',
      13: 'down',
      14: 'up',
      15: 'down'
    },
    beatLabels: {
      0: 1,
      2: 2,
      4: 3,
      6: 4,
      8: 1,
      10: 2,
      12: 3,
      14: 4
    },
    preCounts: [
      { value: 0, label: 'Off' },
      { value: 1, label: '1' },
      { value: 2, label: '2 (half a compás)' },
      { value: 3, label: '3' },
      { value: 4, label: '4 (one compás)' },
      { value: 5, label: '5' },
      { value: 6, label: '6 (one compás and a half)' },
      { value: 7, label: '7' },
      { value: 8, label: '8 (two compás)' }
    ],
    startBeats: [
      { value: 0, label: '1 (default)' },
      { value: 10, label: '2' },
      { value: 12, label: '3 (half a compás)' },
      { value: 14, label: '4' }
    ],
    slowMessage: 'Your tempo is por tientos',
    fastMessage: 'Your tempo is por rumba',
    longLabel: 'Tangos',
    doc: 'Tangos is a 4/4 palo, it can be counted as 1, 2, 3, 4. There is an accent on the first beat. Remark : our example pattern is made of 2 bars.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Tango_(flamenco)',
    cities: null,
    videoExample: 'https://www.youtube.com/watch?v=k3y02uQ-yoc'
  },
  {
    id: 10,
    label: 'Sevillanas',
    value: 'sevillana',
    minTempo: 80,
    maxTempo: 200,
    defaultTempo: 130,
    slowTempo: 110,
    fastTempo: 170,
    nbBeatsInPattern: 12,
    accents: [ 0, 3 ],
    clara: {
      0: 1, // 1 >
      1: 2,
      2: 3, // 2
      3: 1,
      4: 3, // 3
      6: 1, // 4 >
      7: 2,
      8: 1, // 5 >
      10: 3 // 6
    },
    sorda: {
      0: 1,
      1: 2,
      2: 3,
      3: 2,
      4: 3,
      5: 2,
      6: 1,
      7: 2,
      8: 1,
      10: 3
    },
    cajon: {
      0: 3, // 1 >
      1: 2,
      2: 1, // 2
      3: 2,
      4: 1, // 3
      5: 2,
      6: 3, // 4 >
      7: 2,
      8: 3, // 5 >
      9: 2,
      10: 1, // 6
      11: 2
    },
    udu: {
      0: 1,
      2: 2,
      3: 3,
      4: 2,
      6: 1,
      7: 2,
      8: 1
    },
    click: {
      0: 1,
      2: 2,
      4: 2,
      6: 1,
      8: 2,
      10: 2
    },
    beats: {
      0: 'strong',
      1: 'down',
      2: 'up',
      3: 'down',
      4: 'up',
      5: 'down',
      6: 'strong',
      7: 'down',
      8: 'strong',
      9: 'down',
      10: 'up',
      11: 'down'
    },
    beatLabels: {
      0: 1,
      2: 2,
      4: 3,
      6: 1,
      8: 2,
      10: 3
    },
    preCounts: [
      { value: 0, label: 'Off' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3 (one compás)' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6 (two compás)' }
    ],
    startBeats: [
      { value: 0, label: '1 (default)' },
      { value: 8, label: '2' },
      { value: 10, label: '3' }
    ],
    slowMessage: 'Your tempo is very slow',
    fastMessage: 'Your tempo is very fast',
    longLabel: 'Sevillanas',
    doc: 'Sevillanas is a purely ternary palo, with an accent on beat 1. It is just like a waltz. Remark : our example pattern is made of 2 bars.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Sevillanas',
    cities: 'Sevilla',
    videoExample: 'https://www.youtube.com/watch?v=PL_EOB79dow'
  }
]
