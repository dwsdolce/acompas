<template lang="pug">
div
  p.caption.q-mb-sm Humanize
  q-toggle(
    :value="humanize",
    @input="toggleHumanize",
    color="primary",
    keep-color
  )
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
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
