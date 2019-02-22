<template lang="pug">
div
  p.caption.auto(v-if="visualizationSize.width > breakpoint.sm") View mode
  q-btn(
    round,
    outline,
    icon="remove_red_eye",
    @click="visualizationDialog = true"
  ).mt
  q-dialog(v-model="visualizationDialog")
    q-card
      q-card-section
        b Select view mode
      q-card-section
        q-option-group(
          type="radio",
          color="primary",
          :value="selectedVisualizationMode",
          :options="visualizationModes",
          @input="selectVisualizationMode",
          @change="visualizationDialog = false"
        ).mt
      q-card-actions(align="right")
        q-btn(
          color="primary",
          v-close-dialog
        ) Close
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { QBtn, QDialog, QOptionGroup, QCard, QCardSection, QCardActions } from 'quasar'

export default {
  components: { QBtn, QDialog, QOptionGroup, QCard, QCardSection, QCardActions },
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
