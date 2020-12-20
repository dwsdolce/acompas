<template lang="pug">
.text-center.q-mx-md
  p.caption Swing
  q-slider(
    :value="swing",
    :min="0",
    :max="1",
    :step="0.1",
    label,
    snap,
    @change="handleChangeSwing($event)"
  )
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      swing: state => state.swing
    })
  },
  methods: {
    ...mapActions([ 'selectSwing' ]),
    handleChangeSwing (e) {
      this.selectSwing(e)
    }
  }
}
</script>

<style>

</style>
