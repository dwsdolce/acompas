<script setup lang="ts">
import { ref, watch, onUpdated } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'
import InstrumentMixer from 'src/components/InstrumentMixer.vue'
import SelectDecay from 'src/components/SelectDecay.vue'
import CustomCard from 'src/components/CustomCard.vue'
import type { QBtn } from 'quasar'

const $q = useQuasar()
const patternStore = usePatternStore()
const sessionStore = useSessionStore()

const mixerDialog = ref(false)
const mixerBtn = ref<QBtn | null>(null)

const {
  selectedPattern,
} = storeToRefs(patternStore)

const {
  isDarkMode,
} = storeToRefs(sessionStore)

onUpdated(() => {
  if (!mixerDialog.value && mixerBtn.value !== null) {
    mixerBtn.value.$el.querySelector('.q-focus-helper').blur()
  }
})
</script>

<template lang="pug">
div
  q-btn(
    id="mixerBtn",
    ref="mixerBtn",
    outline,
    :color="isDarkMode ? 'white' : 'black'",
    icon="mdi-tune-variant",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    :label="$t('doc.mixer.title')",
    @click="mixerDialog = true"
  )
  q-dialog(
    id="mixerDialog",
    v-model="mixerDialog"
  )
    custom-card
      template(v-slot:title) {{ $t('doc.mixer.title') }}
      template(v-slot:content)
        select-decay.q-mt-md
        table#table.q-table.q-mb-md
          thead
            tr
              th.text-center {{ $t('doc.mixer.active.title') }}
                q-tooltip(
                  anchor="center middle",
                  self="bottom middle",
                  :offset="[10, 10]"
                )
                  p.text-body2 {{ $t('doc.mixer.active.content') }}
              th.text-center {{ $t('doc.mixer.shown.title') }}
                q-tooltip(
                  anchor="center middle",
                  self="bottom middle",
                  :offset="[10, 10]"
                )
                  p.text-body2 {{ $t('doc.mixer.shown.content') }}
              th.text-center {{ $t('doc.mixer.eighth.title') }}
                q-tooltip(
                  anchor="center middle",
                  self="bottom middle",
                  :offset="[10, 10]"
                )
                  p.text-body2 {{ $t('doc.mixer.eighth.content') }}
              th.text-center {{ $t('doc.mixer.volume.title') }}
                q-tooltip(
                  anchor="center middle",
                  self="bottom middle",
                  :offset="[10, 10]"
                )
                  p.text-body2 {{ $t('doc.mixer.volume.content') }}
          tbody
            instrument-mixer(
              v-for="instrument in selectedPattern.instruments",
              :key="instrument.value",
              :slug="instrument.value"
            )
</template>
