<template lang="pug">
h2(:class="className")
  q-icon(v-if="metronomeEvent === null", name="more_horiz")
  div(v-else) {{ counter }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      counter: null,
      className: ''
    }
  },
  computed: {
    ...mapState({
      metronomeEvent: state => state.metronomeEvent,
      selectedPalo: state => state.selectedPalo
    })
  },
  watch: {
    metronomeEvent (value) {
      this.counter = this.selectedPalo.beatLabels[value * 2]
      if (this.selectedPalo.accents.includes(value)) {
        this.className = 'accent'
      } else {
        this.className = ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.accent
  color firebrick
</style>
