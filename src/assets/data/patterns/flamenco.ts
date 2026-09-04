import type { PatternState } from 'src/utils/types'

export default [
  {
    id: 1,
    label: 'Alegría / Soleá por bulería',
    name: 'alegria',
    linkedPatterns: [
      { label: 'Soleá por bulería', value: 'solea-por-buleria' },
      { label: 'Caña', value: 'cana' },
      { label: 'Polo', value: 'polo' },
      { label: 'Caracoles', value: 'caracoles' },
      { label: 'Mirabras', value: 'mirabras' },
      { label: 'Bambera', value: 'bambera' },
      { label: 'Guajira', value: 'guajira' },
      { label: 'Cantiñas', value: 'cantinas' },
      { label: 'Romera', value: 'romera' }
    ],
    minTempo: 30,
    maxTempo: 200,
    defaultTempo: 130,
    slowTempo: 110,
    fastTempo: 170,
    nbBeatsInPattern: 24,
    accents: [0, 6, 14, 16, 20],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
        [ 1,    null, 3,    2,    3,    null, 1,    null, 3,    null, 3,    null, 3,    null, 1,    2,    1,    null, 3,    1,    1,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      sorda:
        [ 1,    3,    2,    1,    2,    3,    1,    null, 2,    3,    2,    null, 2,    3,    1,    1,    1,    3,    2,    1,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      pito:
      [ 1,    3,    2,    3,    2,    3,    1,    3,    2,    3,    2,    3,    2,    3,    1,    3,    1,    3,    2,    3,    1,    3,    2,    3 ],
    //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
    //  12          1           2           3           4           5           6           7           8           9           10          11

      cajon:
        [ 1,    null, 2,    2,    3,    null, 1,    null, 2,    null, 2,    null, 3,    2,    1,    2,    1,    null, 2,    3,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      nudillo:
        [ 1,    null, 2,    2,    2,    null, 1,    null, 2,    null, 2,    null, 2,    null, 1,    2,    1,    null, 2,    2,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      udu:
        [ 1,    null, 2,    3,    2,    null, 1,    null, 2,    null, 2,    null, 2,    null, 1,    3,    1,    null, 2,    3,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      click:
        [ 1,    null, 2,    null, 2,    null, 1,    null, 2,    null, 2,    null, 2,    null, 1,    null, 1,    null, 2,    null, 1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      beatLabels:
        [ 12,   null, 1, null,    2, null,    3, null,    4, null,    5, null,    6, null,    7,    null, 8,    null, 9,    null, 10,   null, 11,   null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11
    },
    prestartBeats: [
      { value: 0, label: 'Off' },
      { value: 1, label: '11' },
      { value: 2, label: '10' },
      { value: 3, label: '9' },
      { value: 4, label: '8' },
      { value: 5, label: '7' },
      { value: 6, label: '6' },
      { value: 7, label: '5' },
      { value: 8, label: '4' },
      { value: 9, label: '3' },
      { value: 10, label: '2' },
      { value: 11, label: '1' }
    ],
    slowMessage: 'verySlow',
    fastMessage: 'porBuleria',
    longLabel: 'Alegría',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Alegr%C3%ADas',
    videoExample: 'https://www.youtube.com/watch?v=M4x02TRlaqw'
  },
  {
    id: 2,
    label: 'Abandolaos',
    name: 'abandolaos',
    linkedPatterns: [
      { label: 'Fandango abandolao', value: 'fandango-abandolao' },
      { label: 'Jaleo extremeño', value: 'jaleo-extremeno' },
      { label: 'Verdiales', value: 'verdiales' }
    ],
    minTempo: 15,
    maxTempo: 300,
    defaultTempo: 190,
    slowTempo: 135,
    fastTempo: 230,
    nbBeatsInPattern: 12,
    accents: [0, 4, 8],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 3,    null, 1,    2,    3,    null, 1,    3,    3,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      sorda: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 3,    null, 2,    1,    2,    3,    1,    2,    2,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      pito: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, null, 3,    2,    3,    1,    3,    2,    3,    2,    3 ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      cajon: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    3,    1,    null, 2,    3,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      nudillo: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    2,    1,    null, null, 2,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      udu: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    3,    1,    null, 2,    3,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      click: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    null, 1,    null, 2,    null, 1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      beatLabels: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 6,    null, 1,    null, 2,    null, 3,    null, 4,    null, 5,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5
    },
    prestartBeats: [
      { value: 0, label: 'Off' },
      { value: 1, label: '5' },
      { value: 2, label: '4' },
      { value: 3, label: '3' },
      { value: 4, label: '2' },
      { value: 5, label: '1' }
    ],
    slowMessage: 'verySlow',
    fastMessage: 'veryFast',
    longLabel: '6 beats Abandolaos',
  },
  {
    id: 3,
    label: 'Bulería (6)',
    name: 'buleria-6',
    linkedPatterns: [
      { label: 'Canción por buleria', value: 'cancion-por-buleria' },
      { label: 'Bulería de Jeréz', value: 'buleria-de-jerez' },
      { label: 'Bulería de Cádiz', value: 'buleria-de-cadiz' },
      { label: 'Bulería de Lebrija', value: 'buleria-de-lebrija' },
      { label: 'Bulería de Utrera', value: 'buleria-de-utrera' }
    ],
    minTempo: 15,
    maxTempo: 300,
    defaultTempo: 190,
    slowTempo: 135,
    fastTempo: 230,
    nbBeatsInPattern: 12,
    accents: [0, 6],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 3,    2,    1,    2,    3,    null, 1,    null, 3,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      sorda: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 3,    3,    2,    1,    2,    3,    1,    2,    2,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      pito: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    3,    2,    3,    2,    3,    1,    3,    2,    3,    2,    3 ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      cajon: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    3,    3,    2,    3,    null, 2,    null, 3,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      nudillo: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    1,    2,    null, 1,    null, 2,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      udu: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    3,    2,    null, 3,    2,    2,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      click: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    null, 2,    null, 1,    null, 2,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      beatLabels: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 6,    null, 1,    null, 2,    null, 3,    null, 4,    null, 5,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5
    },
    prestartBeats: [
      { value: 0, label: 'Off' },
      { value: 1, label: '5' },
      { value: 2, label: '4' },
      { value: 3, label: '3' },
      { value: 4, label: '2' },
      { value: 5, label: '1' }
    ],
    slowMessage: 'verySlow',
    fastMessage: 'veryFast',
    longLabel: '6 beats Bulería',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Buler%C3%ADas',
  },
  {
    id: 4,
    label: 'Bulería (12)',
    name: 'buleria-12',
    linkedPatterns: [
      { label: 'Cancion por buleria', value: 'cancion-por-buleria' },
      { label: 'Bulería de Jeréz', value: 'buleria-de-jerez' },
      { label: 'Bulería de Cádiz', value: 'buleria-de-cadiz' },
      { label: 'Bulería de Lebrija', value: 'buleria-de-lebrija' },
      { label: 'Bulería de Utrera', value: 'buleria-de-utrera' }
    ],
    minTempo: 15,
    maxTempo: 300,
    defaultTempo: 190,
    slowTempo: 135,
    fastTempo: 230,
    nbBeatsInPattern: 24,
    accents: [0, 6, 12, 16, 20],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 3,    2,    3,    null, 1,    null, 3,    null, 3,    null, 1,    null, 3,    2,    1,    null, 3,    2,    1,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      sorda: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    3,    2,    2,    3,    3,    2,    null, 3,    null, 3,    null, 1,    3,    2,    2,    1,    3,    2,    2,    1,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      pito: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    3,    2,    3,    2,    3,    1,    3,    2,    3,    2,    3,    1,    3,    2,    3,    1,    3,    2,    3,    1,    3,    2,    3 ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      cajon: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    3,    3,    2,    3,    null, 2,    null, 3,    null, 3,    null, 1,    null, 2,    3,    1,    null, 2,    3,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      nudillo:
        [ 1,    null, 2,    1,    2,    null, 1,    null, 2,    null, 2,    null, 1,    null, 2,    2,    1,    null, 2,    2,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      udu:
        [ 1,    null, 2,    3,    2,    null, 3,    null, null, 2,    2,    null, 1,    null, null, 3,    1,    null, null, 3,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      click:
        [ 1,    null, 2,    null, 2,    null, 1,    null, 2,    null, 2,    null, 1,    null, 2,    null, 1,    null, 2,    null, 1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      beatLabels:
        [ 12,   null, 1, null,    2, null,    3, null,    4, null,    5, null,    6, null,    7,    null, 8,    null, 9,    null, 10,   null, 11,   null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11
    },
    prestartBeats: [
      { value: 0, label: 'Off' },
      { value: 1, label: '11' },
      { value: 2, label: '10' },
      { value: 3, label: '9' },
      { value: 4, label: '8' },
      { value: 5, label: '7' },
      { value: 6, label: '6' },
      { value: 7, label: '5' },
      { value: 8, label: '4' },
      { value: 9, label: '3' },
      { value: 10, label: '2' },
      { value: 11, label: '1' }
    ],
    slowMessage: 'rhythmVerySlow',
    fastMessage: 'veryFast',
    longLabel: '12 beats Bulería',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Buler%C3%ADas',
    videoExample: 'https://www.youtube.com/watch?v=p5ypbEOZLUU'
  },
  {
    id: 5,
    label: 'Bulería (12) variation',
    name: 'buleria-12-variation',
    linkedPatterns: [
      { label: 'Cancion por buleria', value: 'cancion-por-buleria' },
      { label: 'Bulería de Jeréz', value: 'buleria-de-jerez' },
      { label: 'Bulería de Cádiz', value: 'buleria-de-cadiz' },
      { label: 'Bulería de Lebrija', value: 'buleria-de-lebrija' },
      { label: 'Bulería de Utrera', value: 'buleria-de-utrera' }
    ],
    minTempo: 15,
    maxTempo: 300,
    defaultTempo: 190,
    slowTempo: 135,
    fastTempo: 230,
    nbBeatsInPattern: 24,
    accents: [0, 6, 14, 16, 20],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 3,    2,    3,    null, 1,    null, 3,    null, 3,    null, 3,    null, 1,    2,    1,    null, 3,    2,    1,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      sorda: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    3,    2,    2,    3,    3,    1,    null, 3,    null, 3,    null, 3,    3,    1,    2,    1,    3,    2,    2,    1,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      pito: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    3,    2,    3,    2,    3,    1,    3,    2,    3,    2,    3,    2,    3,    1,    3,    1,    3,    2,    3,    1,    3,    2,    3 ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      cajon: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    3,    3,    2,    3,    null, 2,    null, 3,    null, 3,    null, 3,    null, 1,    3,    1,    null, 2,    3,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      nudillo:
        [ 1,    null, 2,    1,    2,    null, 1,    null, 2,    null, 2,    null, 2,    null, 1,    2,    1,    null, 2,    2,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      udu:
        [ 1,    null, 2,    3,    2,    null, 3,    null, null, 2,    2,    null, 2,    null, 1,    3,    1,    null, null, 3,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      click:
        [ 1,    null, 2,    null, 2,    null, 1,    null, 2,    null, 2,    null, 2,    null, 1,    null, 1,    null, 2,    null, 1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      beatLabels:
        [ 12,   null, 1, null,    2, null,    3, null,    4, null,    5, null,    6, null,    7,    null, 8,    null, 9,    null, 10,   null, 11,   null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11
    },
    prestartBeats: [
      { value: 0, label: 'Off' },
      { value: 1, label: '11' },
      { value: 2, label: '10' },
      { value: 3, label: '9' },
      { value: 4, label: '8' },
      { value: 5, label: '7' },
      { value: 6, label: '6' },
      { value: 7, label: '5' },
      { value: 8, label: '4' },
      { value: 9, label: '3' },
      { value: 10, label: '2' },
      { value: 11, label: '1' }
    ],
    slowMessage: 'verySlow',
    fastMessage: 'veryFast',
    longLabel: '12 beats Bulería (variation)',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Buler%C3%ADas',
  },
  {
    id: 6,
    label: 'Fandangos',
    name: 'fandangos',
    linkedPatterns: [
      { label: 'Fandangos de Huelva', value: 'fandangos-de-huelva' },
      { label: 'Fandangos de Lucena', value: 'fandangos-de-lucena' },
      { label: 'Fandangos de Alosno', value: 'fandangos-de-alosno' },
      { label: 'Canastera', value: 'canastera' }
    ],
    minTempo: 15,
    maxTempo: 300,
    defaultTempo: 130,
    slowTempo: 110,
    fastTempo: 170,
    nbBeatsInPattern: 24,
    accents: [0, 6, 12, 18, 20],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 3,    1,    3,    null, 1,    null, 3,    null, 3,    null, 1,    null, 3,    2,    3,    null, 1,    2,    1,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      sorda: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    2,    3,    2,    3,    null, 1,    2,    3,    null, 3,    null, 1,    2,    3,    2,    3,    null, 1,    2,    1,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      pito: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    3,    2,    3,    2,    3,    1,    3,    2,    3,    2,    3,    1,    3,    2,    3,    2,    3,    1,    3,    1,    3,    2,    3 ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      cajon: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    3,    3,    null, 1,    3,    3,    null, 3,    null, 1,    null, 2,    3,    3,    null, 1,    2,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      nudillo:
        [ 1,    null, 2,    1,    2,    null, 1,    null, 2,    null, 2,    null, 1,    null, 2,    1,    2,    null, 1,    2,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      udu:
        [ 1,    null, 2,    3,    2,    null, 1,    null, 2,    null, 2,    null, 1,    null, 2,    3,    2,    null, 1,    2,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      click:
        [ 1,    null, 2,    null, 2,    null, 1,    null, 2,    null, 2,    null, 1,    null, 2,    null, 2,    null, 1,    null, 1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11

      beatLabels:
        [ 12,   null, 1, null,    2, null,    3, null,    4, null,    5, null,    6, null,    7,    null, 8,    null, 9,    null, 10,   null, 11,   null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  12          1           2           3           4           5           6           7           8           9           10          11
    },
    prestartBeats: [
      { value: 0, label: 'Off' },
      { value: 1, label: '11' },
      { value: 2, label: '10' },
      { value: 3, label: '9' },
      { value: 4, label: '8' },
      { value: 5, label: '7' },
      { value: 6, label: '6' },
      { value: 7, label: '5' },
      { value: 8, label: '4' },
      { value: 9, label: '3' },
      { value: 10, label: '2' },
      { value: 11, label: '1' }
    ],
    slowMessage: 'verySlow',
    fastMessage: 'veryFast',
    longLabel: 'Fandangos',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Fandango',
    videoExample: 'https://www.youtube.com/watch?v=RS8sy3gdb_Y'
  },
  {
    id: 7,
    label: 'Rumba',
    name: 'rumba',
    linkedPatterns: [
      { label: 'Rumba', value: 'rumba' },
      { label: 'Tango arumbado', value: 'tango-arumbado' },
      { label: 'Garrotin', value: 'garrotin' },
      { label: 'Colombiana', value: 'colombiana' },
      { label: 'Tanguillo', value: 'tanguillo' }
    ],
    minTempo: 15,
    maxTempo: 300,
    defaultTempo: 170,
    slowTempo: 140,
    fastTempo: 220,
    nbBeatsInPattern: 16,
    accents: [0, 8],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 3,    null, 1,    1,    3,    null, 1,    null, 3,    null, 1,    2,    3,    null, 1,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      sorda: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 2,    3,    1,    2,    3,    2,    1,    null, 2,    3,    1,    1,    2,    3,    1,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      pito: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 2,    3,    1,    3,    2,    3,    1,    3,    2,    3,    1,    3,    2,    3,    1,    3 ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      cajon: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    1,    3,    null, 1,    null, 3,    null, 2,    1,    2,    null, 1,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      nudillo: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    1,    2,    null, 2,    null, 1,    null, 2,    1,    2,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      udu: //<[number, ...(number | null)[]]>
        //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, null, 3,    2,    null, 3,    null, 1,    null, 2,    3,    2,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      click: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    null, 2,    null, 2,    null, 1,    null, 2,    null, 2,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      beatLabels: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    null, 3,    null, 4,    null, 1,    null, 2,    null, 3,    null, 4,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8
    },
    prestartBeats: [
      { value: 0, label: 'Off' },
      { value: 1, label: '8' },
      { value: 2, label: '7' },
      { value: 3, label: '6' },
      { value: 4, label: '5' },
      { value: 5, label: '4' },
      { value: 6, label: '3' },
      { value: 7, label: '2' }
    ],
    slowMessage: 'verySlow',
    fastMessage: 'veryFast',
    longLabel: 'Rumba',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Rumba_flamenca',
    videoExample: 'https://www.youtube.com/watch?v=2oyhlad64-s'
  },
  {
    id: 8,
    label: 'Sevillanas',
    name: 'sevillana',
    linkedPatterns: [
      { label: 'Sevillanas', value: 'sevillanas' },
      { label: 'Fandangos de Huelva', value: 'fandangos-de-huelva' },
      { label: 'Fandangos de Lucena', value: 'fandangos-de-lucena' },
      { label: 'Fandangos de Alosno', value: 'fandangos-de-alosno' },
      { label: 'Canastera', value: 'canastera' }
    ],
    minTempo: 15,
    maxTempo: 300,
    defaultTempo: 130,
    slowTempo: 110,
    fastTempo: 170,
    nbBeatsInPattern: 12,
    accents: [0, 6, 8],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 3,    1,    3,    null, 1,    2,    1,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      sorda: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    2,    3,    2,    3,    2,    1,    2,    1,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      pito: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    3,    2,    3,    2,    3,    1,    3,    1,    3,    2,    3 ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      cajon: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    3,    2,    null, 1,    2,    1,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      nudillo: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    1,    2,    null, 1,    2,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      udu: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    3,    2,    null, 1,    2,    1,    null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      click: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    null, 2,    null, 1,    null, 1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5

      beatLabels: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    null, 3,    null, 1,    null, 2,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  6           1           2           3           4           5
    },
    prestartBeats: [
      { value: 0, label: 'Off' },
      { value: 1, label: '6' },
      { value: 2, label: '5' },
      { value: 3, label: '4' },
      { value: 4, label: '3' },
      { value: 5, label: '2' }
    ],
    slowMessage: 'verySlow',
    fastMessage: 'veryFast',
    longLabel: 'Sevillanas',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Sevillanas',
    videoExample: 'https://www.youtube.com/watch?v=PL_EOB79dow'
  },
  {
    id: 9,
    label: 'Siguiriya',
    name: 'siguiriya',
    linkedPatterns: [
      { label: 'Siguiriya', value: 'siguiriya' },
      { label: 'Serrana', value: 'serrana' },
      { label: 'Liviana', value: 'liviana' },
      { label: 'Cabales', value: 'cabales' },
      { label: 'Toná', value: 'tona' },
      { label: 'Petenera', value: 'petenera' },
      { label: 'Martinete', value: 'martinete' }
    ],
    minTempo: 15,
    maxTempo: 300,
    defaultTempo: 130,
    slowTempo: 70,
    fastTempo: 170,
    nbBeatsInPattern: 24,
    accents: [0, 4, 8, 14, 20],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 3,    2,    1,    null, 3,    2,    1,    null, 3,    1,    3,    2,    1,    null, 3,    1,    3,    2,    1,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  1                       2                       3                                   4                                   5

      sorda: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    3,    2,    3,    1,    3,    2,    3,    1,    3,    2,    1,    2,    3,    1,    3,    2,    1,    2,    3,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  1                       2                       3                                   4                                   5

      pito: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    3,    2,    3,    1,    3,    2,    3,    1,    3,    2,    3,    2,    3,    1,    3,    2,    3,    2,    3,    1,    3,    2,    3 ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  1                       2                       3                                   4                                   5

      cajon: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    3,    1,    null, 2,    3,    1,    null, 3,    2,    3,    null, 1,    null, 3,    2,    3,    null, 1,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  1                       2                       3                                   4                                   5

      nudillo: //<[number, ...(number | null)[]]>
        [ 1,    null, 2,    2,    1,    null, 2,    2,    1,    null, 2,    1,    2,    null, 1,    null, 2,    1,    2,    null, 1,    null, 1,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  1                       2                       3                                   4                                   5

      udu: //<[number, ...(number | null)[]]>
        [ 1,    null, 2,    3,    1,    null, 2,    3,    1,    null, 2,    3,    2,    null, 1,    null, 2,    3,    2,    null, 1,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  1                       2                       3                                   4                                   5

      click: //<[number, ...(number | null)[]]>
        [ 1,    null, 2,    null, 1,    null, 2,    null, 1,    null, 2,    null, 2,    null, 1,    null, 2,    null, 2,    null, 1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  1                       2                       3                                   4                                   5

      beatLabels: //<[number, ...(number | null)[]]>
        [ 1,    null, null, null, 2,    null, null, null, 3,    null, null, null, null, null, 4,    null, null, null, null, null, 5,    null, null, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  1                       2                       3                                   4                                   5
    },
    prestartBeats: [
      { value: 0, label: 'Off' },
      { value: 1, label: '·' },
      { value: 2, label: '5' },
      { value: 3, label: '·' },
      { value: 4, label: '·' },
      { value: 5, label: '4' },
      { value: 6, label: '·' },
      { value: 7, label: '·' },
      { value: 8, label: '3' },
      { value: 9, label: '·' },
      { value: 10, label: '2' },
      { value: 11, label: '·' }
    ],
    slowMessage: 'verySlow',
    fastMessage: 'veryFast',
    longLabel: 'Siguiriya',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Siguiriyas',
    videoExample: 'https://www.youtube.com/watch?v=3u66TxY1S88'
  },
  {
    id: 10,
    label: 'Soleá',
    name: 'solea',
    linkedPatterns: [
      { label: 'Soleá', value: 'solea' },
      { label: 'Soleá por Bulerías', value: 'solea-por-bulerias' },
      { label: 'Caña', value: 'cana' },
      { label: 'Polo', value: 'polo' },
      { label: 'Soleá de Alcala', value: 'solea-de-alcala' },
      { label: 'Soleá apola', value: 'solea-apola' },
      { label: 'Soleá de Cadiz', value: 'solea-de-cadiz' },
      { label: 'Soleá de Triana', value: 'solea-de-triana' }
    ],
    minTempo: 15,
    maxTempo: 300,
    defaultTempo: 80,
    slowTempo: 60,
    fastTempo: 110,
    nbBeatsInPattern: 24,
    accents: [4, 10, 14, 18, 22],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 3,    1,    2,    null, 1,    null, 3,    1,    2,    null, 1,    null, 3,    2,    1,    null, 3,    2,    1,    null, 3,    null, 1,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  1           2           3           4           5           6           7           8           9           10          11          12
      sorda:
        [ 3,    2,    3,    2,    1,    null, 3,    2,    3,    2,    1,    null, 3,    2,    1,    2,    3,    2,    1,    null, 3,    null, 1,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  1           2           3           4           5           6           7           8           9           10          11          12

      pito:
      [ 2,    3,    2,    3,    1,    3,    2,    3,    2,    3,    1,    3,    2,    3,    1,    3,    2,    3,    1,    3,    2,    3,    1,    3 ],
    //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
    //  1           2           3           4           5           6           7           8           9           10          11          12

      cajon:
        [ 3,    2,    3,    null, 1,    null, 3,    2,    3,    null, 1,    null, 3,    2,    1,    null, 3,    2,    1,    null, 2,    null, 1,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  1           2           3           4           5           6           7           8           9           10          11          12
      nudillo:
        [ 2,    2,    2,    null, 1,    null, 2,    2,    2,    null, 1,    null, 2,    2,    1,    null, 2,    2,    1,    null, 2,    null, 1,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  1           2           3           4           5           6           7           8           9           10          11          12
      udu:
        [ 2,    3,    2,    null, 1,    null, 2,    3,    2,    null, 1,    null, 2,    3,    1,    null, 2,    3,    1,    null, 3,    null, 1,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  1           2           3           4           5           6           7           8           9           10          11          12
      click:
        [ 2,    null, 2,    null, 1,    null, 2,    null, 2,    null, 1,    null, 2,    null, 1,    null, 2,    null, 1,    null, 2,    null, 1,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  1           2           3           4           5           6           7           8           9           10          11          12
      beatLabels:
        [ 1,    null, 2,    null, 3,    null, 4,    null, 5,    null, 6,    null, 7,    null, 8,    null, 9,    null, 10,   null, 11,   null, 12,   null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16    17    18    19    20    21    22    23
      //  1           2           3           4           5           6           7           8           9           10          11          12
    },
    prestartBeats: [
      { value: 0, label: 'Off' },
      { value: 1, label: '12' },
      { value: 2, label: '11' },
      { value: 3, label: '10' },
      { value: 4, label: '9' },
      { value: 5, label: '8' },
      { value: 6, label: '7' },
      { value: 7, label: '6' },
      { value: 8, label: '5' },
      { value: 9, label: '4' },
      { value: 10, label: '3' },
      { value: 11, label: '2' }
    ],
    slowMessage: 'verySlow',
    fastMessage: 'soleaBuleriaAlegria',
    longLabel: 'Soleá',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Sole%C3%A1',
    videoExample: 'https://www.youtube.com/watch?v=U9iw1gMVoO0'
  },
  {
    id: 11,
    label: 'Tanguillos',
    name: 'tanguillos',
    linkedPatterns: [
      { label: 'Tanguillos', value: 'tanguillos' },
      { label: 'Rumba', value: 'rumba' },
      { label: 'Tangos de Cádiz', value: 'tangos-de-cadiz' },
      { label: 'Tanguillos de Cádiz', value: 'tanguillos-de-cadiz' }
    ],
    minTempo: 30,
    maxTempo: 300,
    defaultTempo: 150,
    slowTempo: 90,
    fastTempo: 200,
    nbBeatsInPattern: 12,
    accents: [0, 6],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
      //  0     1     2     3     4     5     6     7     8     9     10    11
        [ 3,    1,    1,    2,    1,    null, 3,    1,    1,    2,    1,    null ],
      //  1           2           3           1           2           3

      sorda: //<[number, ...(number | null)[]]>
      //  0     1     2     3     4     5     6     7     8     9     10    11
        [ 3,    2,    1,    2,    1,    null, 3,    2,    1,    2,    1,    null ],
      //  1           2           3           1           2           3

      pito: //<[number, ...(number | null)[]]>
      //  0     1     2     3     4     5     6     7     8     9     10    11
        [ 2,    3,    1,    3,    1,    3,    2,    3,    1,    3,    1,    3 ],
      //  1           2           3           1           2           3

      cajon: //<[number, ...(number | null)[]]>
      //  0     1     2     3     4     5     6     7     8     9     10    11
        [ 1,    3,    2,    1,    3,    null, 1,    3,    2,    1,    3,    null ],
      //  1           2           3           1           2           3

      nudillo: //<[number, ...(number | null)[]]>
      //  0     1     2     3     4     5     6     7     8     9     10    11
        [ 1,    null, 2,    1,    2,    null, 1,    null, 2,    1,    2,    null ],
      //  1           2           3           1           2           3

      udu: //<[number, ...(number | null)[]]>
      //  0     1     2     3     4     5     6     7     8     9     10    11
      //  1           2           3           1           2           3
        [ 1,    2,    2,    3,    2,    null, 1,    2,    2,    3,    2,    null ],

      click: //<[number, ...(number | null)[]]>
      //  0     1     2     3     4     5     6     7     8     9     10    11
        [ 1,    null, 2,    null, 2,    null, 1,    null, 2,    null, 2,    null ],
      //  1           2           3           1           2           3

      beatLabels: //<[number, ...(number | null)[]]>
      //  0     1     2     3     4     5     6     7     8     9     10    11
        [ 1,    null, 2,    null, 3,    null, 1,    null, 2,    null, 3,    null ],
      //  1           2           3           1           2           3
    },
    prestartBeats: [
      { value: 0, label: 'Off' },
      { value: 1, label: '6' },
      { value: 2, label: '5' },
      { value: 3, label: '4' },
      { value: 4, label: '3' },
      { value: 5, label: '2' }
    ],
    slowMessage: 'verySlow',
    fastMessage: 'veryFast',
    longLabel: 'Tanguillos de Cádiz',
    videoExample: 'https://www.youtube.com/watch?v=AzvKavPKrXw'
  },
  {
    id: 12,
    label: 'Tangos',
    name: 'tangos',
    linkedPatterns: [
      { label: 'Tangos', value: 'tangos' },
      { label: 'Tangos de Málaga', value: 'tangos-de-malaga' },
      { label: 'Tangos de Granada', value: 'tangos-de-granada' },
      { label: 'Tangos de Triana', value: 'tangos-de-triana' },
      { label: 'Tangos de Cádiz', value: 'tangos-de-cadiz' },
      { label: 'Tangos del Titi', value: 'tangos-del-titi' },
      { label: 'Tangos de Extremadura', value: 'tangos-de-extremadura' },
      { label: 'Colombiana', value: 'colombiana' },
      { label: 'Garrotin', value: 'garrotin' },
      { label: 'Zambra', value: 'zambra' }
    ],
    minTempo: 15,
    maxTempo: 300,
    defaultTempo: 130,
    slowTempo: 90,
    fastTempo: 150,
    nbBeatsInPattern: 16,
    accents: [0, 8],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 3,    null, 1,    1,    3,    null, 1,    null, 3,    null, 1,    1,    3,    null, 1,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      sorda: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 3,    2,    1,    2,    3,    2,    1,    null, 3,    2,    1,    2,    3,    2,    1,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      pito: //<[number, ...(number | null)[]]>
      //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 2,    3,    1,    3,    2,    3,    1,    3,    2,    3,    1,    3,    2,    3,    1,    3 ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      cajon: //<[number, ...(number | null)[]]>
        //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    3,    2,    1,    3,    null, 1,    null, 3,    2,    1,    3,    1,    null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      nudillo: //<[number, ...(number | null)[]]>
        //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    2,    1,    null, 2,    null, 1,    null, 2,    2,    1,    null, 2,    null  ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      udu: //<[number, ...(number | null)[]]>
        //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    3,    2,    null, 3,    null, 1,    null, 2,    3,    2,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      click: //<[number, ...(number | null)[]]>
        //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    null, 2,    null, 2,    null, 1,    null, 2,    null, 2,   null, 2,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      beatLabels: //<[number, ...(number | null)[]]>
        //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    null, 3,    null, 4,    null, 1,    null, 2,    null, 3,    null, 4,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8
    },
    prestartBeats: [
      { value: 0, label: 'Off' },
      { value: 1, label: '8' },
      { value: 2, label: '7' },
      { value: 3, label: '6' },
      { value: 4, label: '5' },
      { value: 5, label: '4' },
      { value: 6, label: '3' },
      { value: 7, label: '2' }
    ],
    slowMessage: 'porTientos',
    fastMessage: 'porRumba',
    longLabel: 'Tangos',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Tango_(flamenco)',
    videoExample: 'https://www.youtube.com/watch?v=k3y02uQ-yoc'
  },
  {
    id: 13,
    label: 'Tientos',
    name: 'tientos',
    linkedPatterns: [
      { label: 'Tientos', value: 'tientos' },
      { label: 'Tientos Tangos', value: 'tientos-tangos' },
      { label: 'Farruca', value: 'farruca' },
      { label: 'Zambra', value: 'zambra' }
    ],
    minTempo: 15,
    maxTempo: 130,
    defaultTempo: 60,
    slowTempo: 40,
    fastTempo: 90,
    nbBeatsInPattern: 16,
    accents: [0, 8],
    sequences: {
      clara: //<[number, ...(number | null)[]]>
        //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 3,    2,    1,    1,    3, null,    1,    null, 3,    2,    1,    1,    3,    null, 1,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      sorda: //<[number, ...(number | null)[]]>
        //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 3,    2,    1,    2,    3,    2,    1,    2,    3,    2,    1,    2,    3,    2,    1,    2 ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      pito: //<[number, ...(number | null)[]]>
        //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 2,    3,    1,    3,    2,    3,    1,    3,    2,    3,    1,    3,    2,    3,    1,    3 ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      cajon: //<[number, ...(number | null)[]]>
        //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    3,    2,    3,    1,    null, 2,    null, 1,    3,    2,    3,    1,    null, 2,    null],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      nudillo: //<[number, ...(number | null)[]]>
        //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null,  2,    2,    1,    null, 2,    null, 1,    null, 2,    1,    1,    null, 2, null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      udu: //<[number, ...(number | null)[]]>
        //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    3,    2,    null, 3,    null, 1,    null, 2,    3,    2,    null, 3,    null ],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      click: //<[number, ...(number | null)[]]>
        //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    null, 2,    null, 2,    null, 1,    null, 2,    null, 2,    null, 2,    null],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8

      beatLabels: //<[number, ...(number | null)[]]>
        //[ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
        [ 1,    null, 2,    null, 3,    null, 4,    null, 1,    null, 2,    null, 3,    null, 4,    null],
      //  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
      //  1           2           3           4           5           6           7           8
    },
    prestartBeats: [
      { value: 0, label: 'Off' },
      { value: 1, label: '8' },
      { value: 2, label: '7' },
      { value: 3, label: '6' },
      { value: 4, label: '5' },
      { value: 5, label: '4' },
      { value: 6, label: '3' },
      { value: 7, label: '2' }
    ],
    slowMessage: 'verySlowTientos',
    fastMessage: 'tangosRumbas',
    longLabel: 'Tientos',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Tientos_(flamenco)',
    videoExample: 'https://www.youtube.com/watch?v=zJ4dHGuX0m4'
  },
  {
    id: 14,
    label: 'Simple click',
    name: 'simple-click',
    minTempo: 15,
    maxTempo: 300,
    defaultTempo: 120,
    slowTempo: 50,
    fastTempo: 200,
    nbBeatsInPattern: 2,
    accents: [],
    sequences: {
      clara:
        [1, 2],

      sorda:
        [1, 2],

      pito:
        [1, 2],

      cajon:
        [1, 2],

      nudillo:
        [1, 2],

      udu:
        [2, 3],

      click:
        [1, null],

      beatLabels:
        [1, null]
    },
    prestartBeats: [
      { value: 0, label: 'Off' }
    ],
    slowMessage: 'verySlow',
    fastMessage: 'veryFast',
    longLabel: 'A simple metronome click'
  }
] as PatternState[]
