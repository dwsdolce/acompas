<template lang="pug">
div
  p: b Pattern
  p Use this button to select the flamenco rhythm that you want.
div
  p: b Pre-count
  p Optionaly define a number of beats to use as pre-count for the selected pattern.
div
  p: b Start beat
  p Optionaly change the start beat for the selected pattern.
div
  p: b Improvise
  p If it is on, then sometimes the metronome will stop sticking to the pre-programmed pattern and play random patterns for one or more instrument(s).
div
  p: b Swing
  p If its value is 0, the eighth note is exactly half a quarter note. When it approaches to 1, a lag is applied, for a "jazz-like" rhythm flavour.
div
  p: b Humanize
  p If it is on, then random little time variations are applied to the sounds. The result is a bit more realistic.
div
  p: b Tempo
  p There are 2 ways to define the tempo: the knob circle, and you can decrement/increment the bpm with the + and - buttons.
div
  p: b Instruments mixer
  p Access the mixer. Select playing instruments, set its own relative volume, and wether playing quarter notes or eighth notes.
div
  p: b View mode
  p Choose between dots, counter and clock visualisations.
div
  p: b Reset
  p Reset the metronome's settings to the default values. You can reset all settings or reset settings for the current pattern.
</template>
