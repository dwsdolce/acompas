<template lang="pug">
div
  p.caption View {{ $q.screen.gt.sm ? 'mode' : '' }}
  q-btn(
    outline,
    icon="remove_red_eye",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    @click="visualizationDialog = true"
  )
  q-dialog(v-model="visualizationDialog", @show="toggleDialog(true)", @hide="toggleDialog(false)")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Select view mode
      q-card-section
        q-option-group(
          type="radio",
          color="primary",
          :value="selectedVisualizationMode",
          :options="visualizationModes",
          @input="onSelectVisualizationMode"
        )
      q-card-section(align="center")
        q-btn(
          color="primary",
          v-close-popup
        ) Close
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      visualizationDialog: false
    }
  },
  computed: {
    ...mapState({
      visualizationModes: state => state.visualizationModes,
      selectedVisualizationMode: state => state.selectedVisualizationMode,
      visualizationSize: state => state.visualizationSize,
      selectedPalo: state => state.selectedPalo
    })
  },
  methods: {
    ...mapMutations({
      toggleDialog: 'TOGGLE_DIALOG'
    }),
    ...mapActions([
      'selectVisualizationMode'
    ]),
    onSelectVisualizationMode (v) {
      this.selectVisualizationMode(v)
      this.visualizationDialog = false
    }
  }
}
</script>
