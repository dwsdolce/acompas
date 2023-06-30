<template lang="pug">
div
  div.q-mb-md
    .text-h6.text-center Welcome to A Compas
  div.q-mb-md.text-center
    p
      | This app is designed to help you learn and practice flamenco dance or guitar.
      | It is a work in progress, so please be patient with us as we continue to improve it.
      | If you have any questions or suggestions, please contact us.
  q-separator.q-mb-md
  div.q-mb-md
    .text-h6.text-center Get started
    ul
      li
        | Select a pattern from the list.
        | A pattern (also called "palo" in flamenco) is a rhythmic style.
      li
        | Adjust the tempo (speed) of the pattern.
      li
        | Select instruments in the mixer.
      li
        | Start playing the metronome.
  q-separator.q-mb-md
  div.q-mb-md
    .text-h6.text-center List of options
  div.text-center.q-mb-md
    p: b Start beat
    p
      | Change the start beat (which beat selected the pattern starts on).
      | This is useful if you want to start the pattern on a different beat.
      | For example, if you want to start on the 2nd beat of the pattern, set the start beat to 2.
      | The start beat is also useful if you want to practice a particular part of the pattern.
      | The notes between the start beat and the begining of the pattern will be played as a click sound.

  div.text-center.q-mb-md
    p: b Improvise
    p If it is on, then sometimes the metronome will stop sticking to the pre-programmed pattern and play random beats for one or more instrument(s).
      | This produces some "surprise" in the pattern.
  div.text-center.q-mb-md
    p: b Humanize
    p If it is on, then random little time variations are applied to the sounds. The result is a bit more realistic.
  div.text-center.q-mb-md
    p: b Swing
    p If its value is 0, the eighth note is exactly half a quarter note. When it approaches to 1, a lag is applied, for a "jazz-like" rhythm feel.
  div.text-center.q-mb-md
    p: b Tempo
    p There are 2 ways to define the tempo: the knob circle, and you can decrement/increment the bpm with the + and - buttons.
  div.text-center.q-mb-md
    p: b Instruments mixer
    p Access the mixer. Select playing instruments, set its own relative volume, and wether playing quarter notes or eighth notes.
  div.text-center.q-mb-md
    p: b Reverb
    p Adjust the reverb of the sound. It simulates a room or a hall effect.
  div.text-center.q-mb-md
    p: b View mode
    p Choose between dots, counter and clock visualisations.
  div.text-center.q-mb-md
    p: b Reset
    p Reset the metronome's settings to the default values. You can reset all settings or reset settings for the current pattern.
</template>
