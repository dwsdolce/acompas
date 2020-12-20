<template lang="pug">
div
  p.caption Reset
  q-btn(
    round,
    outline,
    icon="settings_backup_restore",
    @click="resetDialog = true"
  )
  q-dialog(v-model="resetDialog")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Restore default parameters
        p.text-center Warning! This will delete your metronome settings.
      q-card-section
        q-option-group(
          type="radio",
          color="primary",
          :value="selectedResetOption",
          :options="resetOptions",
          @input="onSelectedOption"
        )
      q-card-section(align="center")
        q-btn(
          color="primary",
          v-close-popup
        ).q-mr-md Close
        q-btn(
          color="red-10",
          v-close-popup,
          @click="restoreDefault(selectedResetOption)"
        ) Proceed
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      resetDialog: false,
      selectedResetOption: 'palo',
      resetOptions: [
        { value: 'palo', label: 'Only for current palo' },
        { value: 'all', label: 'All settings' }
      ]
    }
  },
  watch: {
    resetDialog (v) {
      this.selectedResetOption = 'palo'
    }
  },
  methods: {
    ...mapActions([ 'restoreDefault' ]),
    onSelectedOption (v) {
      this.selectedResetOption = v
    }
  }
}
</script>
