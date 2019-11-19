<template lang="pug">
div
  p(v-if="visualizationSize.width > breakpoint.sm").caption.q-mb-sm View mode
  q-btn(
    round,
    outline,
    size="18px",
    icon="remove_red_eye",
    @click="visualizationDialog = true"
  )
  q-dialog(v-model="visualizationDialog")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Select view mode
      q-card-section
        q-option-group(
          type="radio",
          color="primary",
          :value="selectedVisualizationMode",
          :options="visualizationModes",
          @input="selectVisualizationMode",
          @change="visualizationDialog = false"
        )
      q-card-section(align="center")
        q-btn(
          color="primary",
          v-close-popup
        ) Close
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      visualizationModes: state => state.visualizationModes,
      selectedVisualizationMode: state => state.selectedVisualizationMode,
      visualizationSize: state => state.visualizationSize,
      breakpoint: state => state.breakpoint
    })
  },
  methods: {
    ...mapActions([
      'selectVisualizationMode'
    ])
  },
  data () {
    return {
      visualizationDialog: false
    }
  }
}
</script>
