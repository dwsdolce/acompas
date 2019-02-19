<template lang="pug">
div.mb
  q-btn(
    v-for="note in notes",
    :key="note"
    outline,
    color="black",
    @click="playSynth(note)"
  ).mr {{ note }}
</template>

<script>
import { QBtn } from 'quasar'
import { playSynth } from '../plugins/metronome'

export default {
  components: { QBtn },
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
