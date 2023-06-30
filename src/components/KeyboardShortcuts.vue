<template lang="pug">
p.text-center The following shortcuts are available for usage with the keyboard:
q-markup-table(flat)
  tbody
    tr
      td.text-right
        kbd Space
      td.text-left
        | Start / Stop metronome
    tr
      td.text-right
        kbd Up
      td.text-left
        | Tempo + 1
    tr
      td.text-right
        kbd Down
      td.text-left
        | Tempo - 1
    tr
      td.text-right
        kbd Shift
        | +
        kbd Up
      td.text-left
        | Tempo + 2
    tr
      td.text-right
        kbd Shift
        | +
        kbd Down
      td.text-left
        | Tempo - 2
    tr
      td.text-right
        kbd Alt
        | +
        kbd Shift
        | +
        kbd Up
      td.text-left
        | Tempo + 5
    tr
      td.text-right
        kbd Alt
        | +
        kbd Shift
        | +
        kbd Down
      td.text-left
        | Tempo - 5
    tr
      td.text-right
        kbd Esc
      td.text-left
        | Close dialog
    tr
      td.text-right
        kbd Tab
      td.text-left
        | Change focus button
</template>

<style lang="sass">
kbd
  background-color: lightgray
  padding: 3px 8px
  margin: 3px
  border-radius: 4px
  text-shadow: 1px 1px 0 white
</style>
