<template lang="pug">
.full-width
  canvas#canvas(ref="canvas")
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      visualizationMode: state => state.selectedVisualizationMode
    })
  },
  mounted () {
    this.getCanvasEl(this.$refs.canvas)
  },
  methods: {
    ...mapMutations({
      getCanvasEl: 'GET_CANVAS_EL'
    })
  }
}
</script>
