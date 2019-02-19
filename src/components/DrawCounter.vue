<template lang="pug">
h2(:class="className").m-none.mt
  q-icon(v-if="metronomeEvent === null", name="more_horiz")
  div(v-else) {{ counter }}
</template>

<script>
import { mapState } from 'vuex'
import { QIcon } from 'quasar'

export default {
  components: { QIcon },
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
      switch (this.selectedPalo.value) {
        case 'buleria-12':
        case 'buleria-12-variation':
        case 'fandangos':
        case 'alegria':
        case 'siguiriya':
          if (value === 0) {
            this.counter = 12
          } else {
            this.counter = value
          }
          break
        case 'buleria-6':
          if (value === 0) {
            this.counter = 6
          } else {
            this.counter = value
          }
          break
        default:
          this.counter = value + 1
      }
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
