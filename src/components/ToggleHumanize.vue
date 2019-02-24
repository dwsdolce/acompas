<template lang="pug">
div
  b Humanize
  br
  q-toggle(
    :value="humanize",
    @input="toggleHumanize"
  ).primary
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { QToggle } from 'quasar'

export default {
  components: { QToggle },
  computed: {
    ...mapState({
      humanize: state => state.humanize
    })
  },
  methods: {
    ...mapActions([
      'toggleHumanize'
    ])
  }
}
</script>
