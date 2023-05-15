<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue'
import { useQuasar } from 'quasar'
import { useSessionStore } from 'src/stores/session'
import ToggleImprovise from 'src/components/ToggleImprovise.vue'
import ToggleHumanize from 'src/components/ToggleHumanize.vue'
import SelectSwing from 'src/components/SelectSwing.vue'
import SelectPrestartBeat from 'src/components/SelectPrestartBeat.vue'
import SelectVisualization from 'src/components/SelectVisualization.vue'
import ResetButton from 'src/components/ResetButton.vue'
import type { QBtn } from 'quasar'

const sessionStore = useSessionStore()

const $q = useQuasar()

const optDialog = ref(false)
const optBtn = ref<QBtn | null>(null)

const {
  toggleDialog
} = sessionStore

onUpdated(() => {
  if (!optDialog.value && optBtn.value !== null) {
    optBtn?.value?.$el?.querySelector('.q-focus-helper')?.blur()
  }
})
</script>

<template lang="pug">
div
  q-btn(
    ref="optBtn",
    outline,
    color="white",
    icon="settings",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    label="Rhythm options",
    @click="optDialog = true"
  )
  q-dialog(
    id="optDialog",
    v-model="optDialog"
  )
    q-card(style="width: 100%; overflow: hidden;")
      q-card-section
        q-btn(
          icon="close",
          flat,
          round,
          dense,
          v-close-popup
        ).absolute.q-top-right.q-mr-sm
        .text-h6.text-center Rhythm options
      q-card-section.scroll(style="max-height: 80vh;")
        toggle-improvise.q-mb-md
        toggle-humanize.q-mb-md
        select-swing.q-mb-md
        select-prestart-beat.q-mb-md
        select-visualization.q-mb-md
        reset-button.q-mb-md
</template>
