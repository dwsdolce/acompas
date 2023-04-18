<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useSessionStore } from 'src/stores/session'
import ToggleImprovise from 'src/components/ToggleImprovise.vue'
import ToggleHumanize from 'src/components/ToggleHumanize.vue'
import SelectSwing from 'src/components/SelectSwing.vue'
import SelectPreCount from 'src/components/SelectPreCount.vue'
import SelectStartBeat from 'src/components/SelectStartBeat.vue'
import SelectVisualization from 'src/components/SelectVisualization.vue'
import ResetButton from 'src/components/ResetButton.vue'

const sessionStore = useSessionStore()

const $q = useQuasar()

const optDialog = ref(false)

const {
  toggleDialog
} = sessionStore
</script>

<template lang="pug">
div
  q-btn(
    id="optBtn",
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
        q-btn(icon="close", flat, round, dense, v-close-popup).absolute.q-top-right.q-mr-sm
        .text-h6.text-center Rhythm options
      q-card-section.scroll(style="max-height: 80vh;")
        toggle-improvise.q-mb-md
        toggle-humanize.q-mb-md
        select-swing.q-mb-md
        select-start-beat.q-mb-md
        select-pre-count.q-mb-md
        select-visualization.q-mb-md
        reset-button.q-mb-md
</template>
