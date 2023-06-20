<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'

const $q = useQuasar()
const route = useRoute()
const patternStore = usePatternStore()
const sessionStore = useSessionStore()

const resetDialog = ref(false)
const selectedResetOption = ref<string>('pattern')
const resetOptions = [
  { value: 'pattern', label: 'Only for current pattern' },
  { value: 'all', label: 'All patterns and settings' }
]

watch(resetDialog, () => {
  selectedResetOption.value = 'pattern'
})

const {
  toggleDialog
} = sessionStore

const {
  restoreDefault
} = patternStore

const onSelectedOption = (v: string) => {
  selectedResetOption.value = v
}

const handleRestore = () => {
  if (selectedResetOption.value === 'pattern') {
    restoreDefault(route.name as string)
  } else if (selectedResetOption.value === 'all') {
    restoreDefault(selectedResetOption.value)
  }
}
</script>

<template lang="pug">
.text-center.q-mx-md
  //- p.caption Reset
  q-btn(
    outline,
    icon="settings_backup_restore",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    label="Reset settings",
    @click="resetDialog = true"
  )
  q-dialog(v-model="resetDialog", @show="toggleDialog(true)", @hide="toggleDialog(false)")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Restore default parameters
        p.text-center Warning! This will delete your metronome settings.
      q-card-section
        q-option-group(
          type="radio",
          color="primary",
          :model-value="selectedResetOption",
          :options="resetOptions",
          @update:model-value="onSelectedOption"
        )
      q-card-section(align="center")
        q-btn(
          unelevated,
          color="primary",
          v-close-popup
        ).q-mr-md Close
        q-btn(
          unelevated,
          color="red-10",
          v-close-popup,
          @click="handleRestore"
        ) Proceed
</template>
