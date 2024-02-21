import type { PatternState } from 'src/utils/types'

export default [
  {
    id: 1,
    label: 'III + III +II',
    name: '332',
    minTempo: 60,
    maxTempo: 400,
    defaultTempo: 160,
    slowTempo: 60,
    fastTempo: 400,
    nbBeatsInPattern: 32,
    accents: [0, 3, 6, 8, 11, 14],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
        [ 1,   null, null, null, null, null,  1,   null, null, null, null, null, 1,    null, null, null,  1,   null, null, null, null, null,  1,   null, null, null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      sorda:
        [ 1,   null, null, null, null, null,  1,   null, null, null, null, null, 1,    null, null, null,  1,   null, null, null, null, null,  1,   null, null, null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      pito:
		[ 1,   null, null, null, null, null,  1,   null, null, null, null, null, 1,    null, null, null,  1,   null, null, null, null, null,  1,   null, null, null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      cajon:
        [ 1,   null, null, null, null, null,  1,   null, null, null, null, null, 1,    null, null, null,  1,   null, null, null, null, null,  1,   null, null, null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      nudillo:
        [ 1,   null, null, null, null, null,  1,   null, null, null, null, null, 1,    null, null, null,  1,   null, null, null, null, null,  1,   null, null, null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      udu:
        [ 1,   null, null, null, null, null,  1,   null, null, null, null, null, 1,    null, null, null,  1,   null, null, null, null, null,  1,   null, null, null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      click:
        [ 1,   null, null, null, null, null, null, null,  2,   null, null, null, null, null, null, null,  1,   null, null, null, null, null, null, null,  2,   null, null, null, null, null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      beatLabels:
        [ 1,   null, '&', null,    2, null,    '&', null,    3, null,    '&', null,    4, null,    '&',    null, 1,    null, '&',    null, 2,   null, '&',   null,    3, null,    '&', null,    4, null,    '&',    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &
    },
    prestartBeats: [
      { value: 0, label: 'Off' },
      { value: 1, label: '4&' },
      { value: 2, label: '4' },
      { value: 3, label: '3&' },
      { value: 4, label: '3' },
      { value: 5, label: '2&' },
      { value: 6, label: '2' },
      { value: 7, label: '1&' },
      { value: 8, label: '1' },
    ],
    slowMessage: '',
    fastMessage: '',
    longLabel: 'III + III +II',
    doc: '',
    places: '',
    videoExample: ''
  },
  {
    id: 2,
    label: 'Habanera',
    name: 'habanera',
    minTempo: 60,
    maxTempo: 400,
    defaultTempo: 160,
    slowTempo: 60,
    fastTempo: 400,
    nbBeatsInPattern: 32,
    accents: [0, 3, 4, 6, 8, 11, 12, 14],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
        [ 1,    null, null, null, null, null,  1,   null,  1,   null, null, null, 1,    null, null, null,  1,   null, null, null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      sorda:
        [ 1,    null, null, null, null, null,  1,   null,  1,   null, null, null, 1,    null, null, null,  1,   null, null, null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      pito:
        [ 1,    null, null, null, null, null,  1,   null,  1,   null, null, null, 1,    null, null, null,  1,   null, null, null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      cajon:
        [ 1,    null, null, null, null, null,  1,   null,  1,   null, null, null, 1,    null, null, null,  1,   null, null, null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      nudillo:
        [ 1,    null, null, null, null, null,  1,   null,  1,   null, null, null, 1,    null, null, null,  1,   null, null, null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      udu:
        [ 1,    null, null, null, null, null,  1,   null,  1,   null, null, null, 1,    null, null, null,  1,   null, null, null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      click:
        [ 1,    null, null, null, null, null, null, null,  2,   null, null, null, null, null, null, null,  1,   null, null, null, null, null, null, null,  2,   null, null, null, null, null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      beatLabels:
        [ 1,    null, '&', null,    2, null,    '&', null,    3, null,    '&', null,    4, null,    '&',    null, 1,    null, '&',    null, 2,   null, '&',   null,    3, null,    '&', null,    4, null,    '&',    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &
    },
    prestartBeats: [
      { value: 0, label: 'Off' },
      { value: 1, label: '4&' },
      { value: 2, label: '4' },
      { value: 3, label: '3&' },
      { value: 4, label: '3' },
      { value: 5, label: '2&' },
      { value: 6, label: '2' },
      { value: 7, label: '1&' },
      { value: 8, label: '1' },
    ],
    slowMessage: '',
    fastMessage: '',
    longLabel: 'Habanera',
    doc: '',
    places: '',
    videoExample: ''
  },
  {
    id: 3,
    label: 'Arabic (Maqsoum)',
    name: 'arabic',
    minTempo: 60,
    maxTempo: 400,
    defaultTempo: 160,
    slowTempo: 60,
    fastTempo: 400,
    nbBeatsInPattern: 32,
    accents: [0, 1, 3, 4, 6, 8, 9, 11, 12, 14],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
        [ 1,   null, 1,    null, null, null,  1,   null,  1,   null, null, null, 1,    null, null, null,  1,   null,  1,   null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      sorda:
        [ 1,   null, 1,    null, null, null,  1,   null,  1,   null, null, null, 1,    null, null, null,  1,   null,  1,   null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      pito:
		[ 1,   null, 1,    null, null, null,  1,   null,  1,   null, null, null, 1,    null, null, null,  1,   null,  1,   null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      cajon:
        [ 1,   null, 1,    null, null, null,  1,   null,  1,   null, null, null, 1,    null, null, null,  1,   null,  1,   null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      nudillo:
        [ 1,   null, 1,    null, null, null,  1,   null,  1,   null, null, null, 1,    null, null, null,  1,   null,  1,   null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      udu:
        [ 1,   null, 1,    null, null, null,  1,   null,  1,   null, null, null, 1,    null, null, null,  1,   null,  1,   null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      click:
        [ 1,   null, null, null, null, null, null, null,  2,   null, null, null, null, null, null, null,  1,   null, null, null, null, null, null, null,  2,   null, null, null, null, null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      beatLabels:
        [ 1,   null, '&', null,    2, null,    '&', null,    3, null,    '&', null,    4, null,    '&',    null, 1,    null, '&',    null, 2,   null, '&',   null,    3, null,    '&', null,    4, null,    '&',    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &
    },
    prestartBeats: [
      { value: 0, label: 'Off' },
      { value: 1, label: '4&' },
      { value: 2, label: '4' },
      { value: 3, label: '3&' },
      { value: 4, label: '3' },
      { value: 5, label: '2&' },
      { value: 6, label: '2' },
      { value: 7, label: '1&' },
      { value: 8, label: '1' },
    ],
    slowMessage: '',
    fastMessage: '',
    longLabel: 'Arabic',
    doc: '',
    places: '',
    videoExample: ''
  },
  {
    id: 4,
    label: 'Cinquillo',
    name: 'cinquillo',
    minTempo: 60,
    maxTempo: 400,
    defaultTempo: 160,
    slowTempo: 60,
    fastTempo: 400,
    nbBeatsInPattern: 32,
    accents: [0, 2, 3, 5, 6, 8, 10,  11, 13, 14],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
        [ 1,   null, null, null, 1,    null,  1,   null, null, null,  1, null, 1,    null, null, null,    1,   null, null, null, 1,    null,  1,   null, null, null,  1,   null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      sorda:
        [ 1,   null, null, null, 1,    null,  1,   null, null, null,  1, null, 1,    null, null, null,    1,   null, null, null, 1,    null,  1,   null, null, null,  1,   null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      pito:
		[ 1,   null, null, null, 1,    null,  1,   null, null, null,  1, null, 1,    null, null, null,    1,   null, null, null, 1,    null,  1,   null, null, null,  1,   null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      cajon:
        [ 1,   null, null, null, 1,    null,  1,   null, null, null,  1, null, 1,    null, null, null,    1,   null, null, null, 1,    null,  1,   null, null, null,  1,   null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      nudillo:
        [ 1,   null, null, null, 1,    null,  1,   null, null, null,  1, null, 1,    null, null, null,    1,   null, null, null, 1,    null,  1,   null, null, null,  1,   null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      udu:
        [ 1,   null, null, null, 1,    null,  1,   null, null, null,  1, null, 1,    null, null, null,    1,   null, null, null, 1,    null,  1,   null, null, null,  1,   null,  1,   null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      click:
        [ 1,   null, null, null, null, null, null, null,  2,   null, null, null, null, null, null, null,  1,   null, null, null, null, null, null, null,  2,   null, null, null, null, null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      beatLabels:
        [ 1,   null, '&', null,    2, null,    '&', null,    3, null,    '&', null,    4, null,    '&',    null, 1,    null, '&',    null, 2,   null, '&',   null,    3, null,    '&', null,    4, null,    '&',    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &
    },
    prestartBeats: [
      { value: 0, label: 'Off' },
      { value: 1, label: '4&' },
      { value: 2, label: '4' },
      { value: 3, label: '3&' },
      { value: 4, label: '3' },
      { value: 5, label: '2&' },
      { value: 6, label: '2' },
      { value: 7, label: '1&' },
      { value: 8, label: '1' },
    ],
    slowMessage: '',
    fastMessage: '',
    longLabel: 'Cinquillo',
    doc: '',
    places: '',
    videoExample: ''
  }
] as PatternState[]
