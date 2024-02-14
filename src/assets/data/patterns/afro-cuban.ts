import type { PatternState } from 'src/utils/types'

export default [
  {
    id: 1,
    label: 'Son Clave',
    name: 'son-clave',
    minTempo: 60,
    maxTempo: 400,
    defaultTempo: 160,
    slowTempo: 60,
    fastTempo: 400,
    nbBeatsInPattern: 32,
    accents: [0, 3, 6, 10, 12],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
        [ 1,   null, null, null, null, null,  1,   null, null, null, null, null, 1,    null, null, null,  null, null, null, null, 1,   null,  null, null, 1,   null, null, null, null, null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      sorda:
        [ 1,   null, null, null, null, null,  1,   null, null, null, null, null, 1,    null, null, null,  null, null, null, null, 1,   null,  null, null, 1,   null, null, null, null, null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      pito:
		[ 1,   null, null, null, null, null,  1,   null, null, null, null, null, 1,    null, null, null,  null, null, null, null, 1,   null,  null, null, 1,   null, null, null, null, null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      cajon:
        [ 1,   null, null, null, null, null,  1,   null, null, null, null, null, 1,    null, null, null,  null, null, null, null, 1,   null,  null, null, 1,   null, null, null, null, null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      nudillo:
        [ 1,   null, null, null, null, null,  1,   null, null, null, null, null, 1,    null, null, null,  null, null, null, null, 1,   null,  null, null, 1,   null, null, null, null, null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      udu:
        [ 1,   null, null, null, null, null,  1,   null, null, null, null, null, 1,    null, null, null,  null, null, null, null, 1,   null,  null, null, 1,   null, null, null, null, null, null, null ],
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
    longLabel: 'Son Clave',
    doc: '',
    places: '',
    videoExample: ''
  },
  {
    id: 2,
    label: 'Rumba Clave',
    name: 'rumba-clave',
    minTempo: 60,
    maxTempo: 400,
    defaultTempo: 160,
    slowTempo: 60,
    fastTempo: 400,
    nbBeatsInPattern: 32,
    accents: [0, 3, 7, 10, 12],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
        [ 1,   null, null, null, null, null,  1,   null, null, null, null, null, null, null, 1,    null,  null, null, null, null, 1,   null,  null, null, 1,   null, null, null, null, null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      sorda:
        [ 1,   null, null, null, null, null,  1,   null, null, null, null, null, null, null, 1,    null,  null, null, null, null, 1,   null,  null, null, 1,   null, null, null, null, null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      pito:
		[ 1,   null, null, null, null, null,  1,   null, null, null, null, null, null, null, 1,    null,  null, null, null, null, 1,   null,  null, null, 1,   null, null, null, null, null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      cajon:
        [ 1,   null, null, null, null, null,  1,   null, null, null, null, null, null, null, 1,    null,  null, null, null, null, 1,   null,  null, null, 1,   null, null, null, null, null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      nudillo:
        [ 1,   null, null, null, null, null,  1,   null, null, null, null, null, null, null, 1,    null,  null, null, null, null, 1,   null,  null, null, 1,   null, null, null, null, null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      udu:
        [ 1,   null, null, null, null, null,  1,   null, null, null, null, null, null, null, 1,    null,  null, null, null, null, 1,   null,  null, null, 1,   null, null, null, null, null, null, null ],
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
    longLabel: 'Rumba Clave',
    doc: '',
    places: '',
    videoExample: ''
  },
  {
    id: 3,
    label: 'Cáscara',
    name: 'cascara',
    minTempo: 60,
    maxTempo: 400,
    defaultTempo: 160,
    slowTempo: 60,
    fastTempo: 400,
    nbBeatsInPattern: 32,
    accents: [0, 2, 3, 5, 7, 8, 10, 12, 13, 15],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
        [ 1,   null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null, 1,    null,  1,    null, null, null, 1,   null,  null, null, 1,   null,  1,   null, null, null,  1,   null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      sorda:
        [ 1,   null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null, 1,    null,  1,    null, null, null, 1,   null,  null, null, 1,   null,  1,   null, null, null,  1,   null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      pito:
		[ 1,   null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null, 1,    null,  1,    null, null, null, 1,   null,  null, null, 1,   null,  1,   null, null, null,  1,   null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      cajon:
        [ 1,   null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null, 1,    null,  1,    null, null, null, 1,   null,  null, null, 1,   null,  1,   null, null, null,  1,   null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      nudillo:
        [ 1,   null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null, 1,    null,  1,    null, null, null, 1,   null,  null, null, 1,   null,  1,   null, null, null,  1,   null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      udu:
        [ 1,   null, null, null,  1,   null,  1,   null, null, null,  1,   null, null, null, 1,    null,  1,    null, null, null, 1,   null,  null, null, 1,   null,  1,   null, null, null,  1,   null ],
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
    longLabel: 'Cáscara',
    doc: '',
    places: '',
    videoExample: ''
  },
  {
    id: 4,
    label: 'Mozambique',
    name: 'mozambique',
    minTempo: 60,
    maxTempo: 400,
    defaultTempo: 160,
    slowTempo: 60,
    fastTempo: 400,
    nbBeatsInPattern: 32,
    accents: [1, 2, 4, 5, 7, 8, 10, 12, 13, 15],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
        [ null, null, 1, null,    1,   null,  null, null, 1, null,    1,   null, null, null, 1,    null,  1,    null, null, null, 1,   null,  null, null, 1,   null,  1,   null, null, null,  1,   null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      sorda:
        [ null, null, 1, null,    1,   null,  null, null, 1, null,    1,   null, null, null, 1,    null,  1,    null, null, null, 1,   null,  null, null, 1,   null,  1,   null, null, null,  1,   null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      pito:
		[ null, null, 1, null,    1,   null,  null, null, 1, null,    1,   null, null, null, 1,    null,  1,    null, null, null, 1,   null,  null, null, 1,   null,  1,   null, null, null,  1,   null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      cajon:
        [ null, null, 1, null,    1,   null,  null, null, 1, null,    1,   null, null, null, 1,    null,  1,    null, null, null, 1,   null,  null, null, 1,   null,  1,   null, null, null,  1,   null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      nudillo:
        [ null, null, 1, null,    1,   null,  null, null, 1, null,    1,   null, null, null, 1,    null,  1,    null, null, null, 1,   null,  null, null, 1,   null,  1,   null, null, null,  1,   null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
      //  1           &           2           &           3           &           4           &           1           &           2           &           3           &           4           &

      udu:
        [ null, null, 1, null,    1,   null,  null, null, 1, null,    1,   null, null, null, 1,    null,  1,    null, null, null, 1,   null,  null, null, 1,   null,  1,   null, null, null,  1,   null ],
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
    longLabel: 'Mozambique',
    doc: '',
    places: '',
    videoExample: ''
  }
] as PatternState[]
