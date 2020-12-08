<template lang="pug">
div
  p.caption Reset
  q-btn(
    round,
    outline,
    icon="restore",
    @click="resetDialog = true"
  )
  q-dialog(v-model="resetDialog")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Restore default params
        p.text-center Warning! This will delete all your metronome settings.
      q-card-section(align="center")
        q-btn(
          color="primary",
          v-close-popup
        ).q-mr-md Close
        q-btn(
          color="red-10",
          v-close-popup,
          @click="restoreDefault"
        ) Proceed
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      resetDialog: false
    }
  },
  methods: {
    ...mapActions([ 'restoreDefault' ])
  }
}
</script>
