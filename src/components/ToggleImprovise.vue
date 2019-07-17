<template lang="pug">
div
  p.caption.q-mb-sm Improvise
  q-toggle(
    :value="improvise",
    @input="toggleImprovise"
  ).primary
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      improvise: state => state.improvise
    })
  },
  methods: {
    ...mapActions([
      'toggleImprovise'
    ])
  }
}
</script>
