<template lang="pug">
div
  p.caption.auto(v-if="visualizationSize.width > breakpoint.sm") View mode
  q-btn(
    round,
    outline,
    icon="remove_red_eye",
    @click="visualizationDialog = true"
  ).mt
  q-dialog(
    v-model="visualizationDialog",
    :content-css="{padding: '2rem'}"
  )
    h5.m-none.mb Select view mode
    q-option-group(
      type="radio",
      color="primary",
      :value="selectedVisualizationMode",
      :options="visualizationModes",
      @input="selectVisualizationMode",
      @change="visualizationDialog = false"
    ).mt
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { QBtn, QDialog, QOptionGroup } from 'quasar'

export default {
  components: { QBtn, QDialog, QOptionGroup },
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
