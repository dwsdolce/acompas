# Contributing to A Compás

If you are a musician and would like to contribute, you can submit new
patterns. A Compás is getting more generalistic and will ultimately be able to
play any kind of rhythm. You can also contribute to the code by submitting a
merge request.

This guide covers the data formats. For getting the project running first, see
the [README](../README.md).

## Contents

- [Adding a new rhythm (pattern)](#adding-a-new-rhythm-pattern)
- [Writing a sequence](#writing-a-sequence)
- [Adding a sound](#adding-a-sound)

## Adding a new rhythm (pattern)

To submit a new rhythm, you can create a new file in the `src/assets/patterns` folder. The file should be named `your-context-name.ts`.

The file should contain an array of objects, each object representing a pattern.

A pattern object is defined by the `PatternState` interface, which is defined in the `src/utils/types.ts` file.

```typescript
export interface PatternState {
  id:                       number // Unique identifier
  name:                     string // Unique name of the pattern. Should be in lowercase and without spaces.
  label:                    string // Displayed name of the pattern. Could contain spaces and uppercase letters.
  context?:                 string // The musical context name. As 'name', it should be in lowercase and without spaces.
  linkedPatterns?:          stringOpts[] // In case this style is a variation of another style, or has other names, you can link it here.
  minTempo:                 number // Minimum absolute tempo
  maxTempo:                 number // Maximum absolute tempo
  defaultTempo:             number // Default tempo. Is the tempo that will be set when the user selects this pattern for the first time. After that, the tempo will be the last one set by the user.
  slowTempo:                number // Slow tempo. If the tempo is below this value, a message will be displayed to the user.
  fastTempo:                number // Fast tempo. If the tempo is above this value, a message will be displayed to the user.
  nbBeatsInPattern:         number // Number of beats in the pattern. It is the number of eighth notes in the pattern. For example, a 4/4 pattern has 8 beats.
  accents:                  number[] // Array of the accentuated eighth notes. Max elements and max value for each element are equal to nbBeatsInPattern. The accents are displayed in a different color.
  sequences:                InstruSeqs
  prestartBeats:            numOpts[] // Array of possible prestart beats.
  slowMessage?:             string // Message displayed to the user when the tempo is too slow.
  fastMessage?:             string // Message displayed to the user when the tempo is too fast.
  longLabel?:               string // Long label of the pattern. Could contain spaces and uppercase letters.
  doc?:                     string // Documentation of the pattern. Could contain spaces and uppercase letters.
  wikipediaUrl?:            string // Wikipedia URL of the pattern.
  places?:                  string // Places where the pattern is played. Could contain spaces and uppercase letters.
  videoExample?:            string // Video example of the pattern.
}
```

About the `InstruSeqs` type, it is defined in the `src/utils/types.ts` file as follows :

```typescript
export type InstruSeqs = {
  [instru: string]: number[] // The key is the name of the instrument, and the value is an array of numbers. Each number is the index of the beat in the pattern.
}
```

## Writing a sequence

You can think of a sequence as an instrument line pattern.

A sequence in A Compas has a key, which is the name of the instrument, and a value, which is an array of numbers or nulls.
The index of the array is the beat number, and the value is the index of the sound as shown in the 'Adding a sound' section.
Notice that there must be a link between the `nbBeatsInPattern` property, the values in `accents` and the length of the `sequences` arrays.
The array must contain the same number of elements as the `nbBeatsInPattern` property of the `PatternState` object.

For example, the following sequence :

```typescript
...
nbBeatsInPattern: 8, // 8 beats, that is 4/4
accents: [0, 2], // The first and third beats are displayed in a different color (no incidence on the sound, just a visual help for the user)
sequences: {
  // The array must contain 8 elements
  // The number 1 is the sound 1 of the cajon sounds. Null means no sound.
  cajon: [ 1,    2,    2,    null, 1,    2,    3,    2 ],
        // 0     1     2     3     4     5     6     7 // This is just a helper for the index number
        // 1     &     2     &     3     &     4     & // This is just a helper for the rhythm (like beatLabels)

  // As a convenience, we can write a bonus sequence called beatLabels.
  // It is still an array of numbers, strings or nulls, but this time the values are printed on the screen, like time labels.
  // It is useful for the user to understand the rhythm.
  beatLabels: [ 1,    null, 2,    null, 3,    null, 4,    null ],
             // 0     1     2     3     4     5     6     7
             // 1     &     2     &     3     &     4     &
}
```

This means that the app will display 4 dots, first one and third one will be of a different color. Each dot (and hole between sdots) will be associated with the corresponding value in the beatLabels sequence.
Notice that you write the whole sequence, with fourth and eighth notes. But keep in mind that the user can turn on and off the eighths notes and even the whole instrument for this pattern.
For now, it is not possible to set other note subdivisions than the fourth and eighth notes. But if you need ternary, you could try to turn on the `swing` option.

## Adding a sound

To add a sound, you must provide a clean .wav file inside the public/audio folder. Then, you must update the `src/assets/data/soundsData.ts` file. Sounds can be grouped by instrument, and each sound must have a unique identifier. Here is an example :

```typescript
  {
    name: 'myinstrument',
    label: 'My instrument',
    medias: [
      {
        src: 'somefolder/myinstrument/myinstrument_1',
        volume: -2,
      },
      {
        src: 'somefolder/myinstrument/myinstrument_2',
        volume: -2,
      },
      {
        src: 'somefolder/myinstrument/myinstrument_2',
        volume: -12,
      }
    ]
  },
```

There, we load two times the same sound with a different volume. The volume is a number in decibels. The volume is optional, and if not provided, it will be set to 0.

Don't forget to run `yarn audio` to convert the new .wav file into .mp3, .mp4, .ogg and .flac. `yarn install` does this too, but only for files that are not already converted.

Beware of the licence of the sounds you use. You must have the right to use them in a free software.
