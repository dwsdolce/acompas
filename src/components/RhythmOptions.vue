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
  //- p.caption Rhythm options
  q-btn(
    id="optBtn",
    outline,
    color="white",
    icon="build",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    label="Rhythm options",
    @click="optDialog = true"
  )
  q-dialog(
    id="optDialog",
    v-model="optDialog"
  )
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Rhythm options
      q-card-section
        toggle-improvise.q-mb-md
        toggle-humanize.q-mb-md
        select-swing.q-mb-md
        select-start-beat.q-mb-md
        select-pre-count.q-mb-md
        select-visualization.q-mb-md
        reset-button.q-mb-md
      q-card-section(align="center")
        q-btn(
          id="closeOptDialogBtn",
          color="primary",
          @click="optDialog = false"
        ) Close
</template>
