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
  toggleDialog
} = sessionStore

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
    icon="tune",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    label="Mixer",
    @click="mixerDialog = true"
  )
  q-dialog(
    id="mixerDialog",
    v-model="mixerDialog",
    @show="toggleDialog(true)",
    @hide="toggleDialog(false)"
  )
    custom-card
      template(v-slot:title) Instruments mixer
      template(v-slot:content)
        select-decay.q-mt-md
        table.q-table.q-mb-md
          thead
            tr
              th.text-center Active
                q-tooltip(
                  anchor="center middle",
                  self="bottom middle",
                  :offset="[10, 10]"
                )
                  p.text-body2 Play this instruments
              th.text-center 8th
                q-tooltip(
                  anchor="center middle",
                  self="bottom middle",
                  :offset="[10, 10]"
                )
                  p.text-body2 Toggle eighth notes
              th.text-center Volume (db)
                q-tooltip(
                  anchor="center middle",
                  self="bottom middle",
                  :offset="[10, 10]"
                )
                  p.text-body2 Increase or decrease instrument volume
          tbody
            instrument-mixer(
              v-for="instrument in selectedPattern.instruments",
              :key="instrument.value",
              :slug="instrument.value"
            )
</template>
src/stores/settings
