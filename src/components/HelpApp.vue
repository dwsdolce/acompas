<template lang="pug">
div
  div.q-mb-md
    .text-h6.text-center Welcome to A Compás app
  div.q-mb-md.text-center
    p
      | This app is designed to help you learn and practice your musical instrument.
      | It is a work in progress, so please be patient with us as we continue to improve it.
      | If you have any questions or suggestions, please contact us.
  q-separator.q-mb-md
  div.q-mb-md
    .text-h6.text-center Get started
    ul
      li
        | Select a <b>context</b> from the list.
        | A context is like a musical style, containing a group of patterns.
      li
        | Select a <b>pattern</b> from the list.
        | A pattern (also called "palo" in flamenco) is a rhythmic style.
      li
        | Adjust the <b>tempo</b> (speed) of the pattern.
      li
        | Select <b>instruments</b> in the mixer.
      li
        | <b>Start</b> playing the metronome.
  q-separator.q-mb-md
  div.q-mb-md
    .text-h6.text-center List of options
  div.text-center.q-mb-md
    p: b Tempo
    p There are 2 ways to define the tempo: the knob circle, and you can decrement/increment the bpm with the + and - buttons.
      | You can also type the tempo directly in the input field, use the mouse wheel, or the up and down arrow keys.
      | The tempo is the speed of the metronome, measured in beats per minute.
  div.text-center.q-mb-md
    p: b Instruments mixer
    p Access the mixer. Select playing instruments (make sure to have at least one active instrument), set its own relative volume, and wether playing quarter notes or eighth notes.
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
    p: b Reverb
    p Adjust the reverb of the sound. It simulates a room or a hall effect.
  div.text-center.q-mb-md
    p: b Start beat
    p
      | Change the start beat (which beat selected the pattern starts on).
      | This is useful if you want to start the pattern on a different beat.
      | For example, if you want to start on the 2nd beat of the pattern, set the start beat to 2.
      | The start beat is also useful if you want to practice a particular part of the pattern.
      | The notes between the start beat and the begining of the pattern will be played as a click sound.
  div.text-center.q-mb-md
    p: b View mode
    p Choose between dots, counter and clock visualisations.
  div.text-center.q-mb-md
    p: b Reset
    p Reset the metronome's settings to the default values. You can reset all settings or reset settings for the current pattern.
</template>
