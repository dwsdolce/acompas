<template lang="pug">
div
  p.caption Improvise
  q-toggle(
    :value="improvise",
    @input="toggleImprovise",
    :disable="selectedPalo.value === 'no-compas'",
    color="primary",
    keep-color
  )
    q-tooltip(
      v-if="selectedPalo.value === 'no-compas'",
      anchor="top middle",
      self="bottom middle",
      :offset="[10, 10]"
    ) This option is disabled for this palo.
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      improvise: state => state.improvise,
      selectedPalo: state => state.selectedPalo
    })
  },
  methods: {
    ...mapActions([
      'toggleImprovise'
    ])
  }
}
</script>
