<template lang="pug">
.full-width
  canvas#canvas
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
    this.getCanvasEl(document.getElementById('canvas'))
  },
  methods: {
    ...mapMutations({
      getCanvasEl: 'GET_CANVAS_EL'
    })
  }
}
</script>
