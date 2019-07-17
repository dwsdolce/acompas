<template lang="pug">
.flex.justify-center.q-gutter-md
  q-btn(
    v-for="note in notes",
    :key="note"
    outline,
    color="black",
    @click="playSynth(note)"
  ) {{ note }}
</template>

<script>
import { playSynth } from '../plugins/metronome'

export default {
  data () {
    return {
      notes: [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ]
    }
  },
  methods: {
    playSynth (note) {
      playSynth(note)
    }
  }
}
</script>
