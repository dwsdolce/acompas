<template lang="pug">
div
  p.caption Rythm options
  q-btn#optBtn(
    outline,
    color="white",
    icon="build",
    @click="optDialog = true"
  )
  q-dialog#optDialog(v-model="optDialog")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Rythm options
      q-card-section
        toggle-improvise.q-mb-md
        toggle-humanize.q-mb-md
        select-swing
      q-card-section(align="center")
        q-btn#closeOptDialogBtn(
          color="primary",
          v-close-popup
        ) Close
</template>

<script>
import ToggleImprovise from './ToggleImprovise'
import ToggleHumanize from './ToggleHumanize'
import SelectSwing from './SelectSwing'

export default {
  components: { ToggleImprovise, ToggleHumanize, SelectSwing },
  data () {
    return {
      optDialog: false
    }
  }
}
</script>
