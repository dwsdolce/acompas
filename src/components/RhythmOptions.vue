<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useSessionStore } from 'src/stores/session'
import ToggleImprovise from 'src/components/ToggleImprovise.vue'
import ToggleHumanize from 'src/components/ToggleHumanize.vue'
import SelectSwing from 'src/components/SelectSwing.vue'

const sessionStore = useSessionStore()

const $q = useQuasar()

const optDialog = ref(false)

const {
  toggleDialog
} = sessionStore
</script>

<template lang="pug">
div
  p.caption Rhythm options
  q-btn(
    id="optBtn",
    outline,
    color="white",
    icon="speed",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    @click="optDialog = true"
  )
  q-dialog(
    id="optDialog",
    v-model="optDialog",
    @show="toggleDialog(true)",
    @hide="toggleDialog(false)"
  )
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Rhythm options
      q-card-section
        toggle-improvise.q-mb-md
        toggle-humanize.q-mb-md
        select-swing
      q-card-section(align="center")
        q-btn(
          id="closeOptDialogBtn",
          color="primary",
          v-close-popup
        ) Close
</template>
