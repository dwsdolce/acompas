<template lang="pug">
div
  b Improvise
  br
  q-toggle(
    :value="improvise",
    @input="toggleImprovise"
  ).primary.mt.mb
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { QToggle } from 'quasar'

export default {
  components: { QToggle },
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
