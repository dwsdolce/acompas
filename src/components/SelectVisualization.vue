<template lang="pug">
div
  p.caption View mode
  q-btn(
    outline,
    icon="remove_red_eye",
    :disable="selectedPalo.value === 'no-compas'",
    @click="visualizationDialog = true"
  )
    q-tooltip(
      v-if="selectedPalo.value === 'no-compas'",
      anchor="top middle",
      self="bottom middle",
      :offset="[10, 10]"
    ) This option is disabled for this palo.
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
      selectedPalo: state => state.selectedPalo
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
