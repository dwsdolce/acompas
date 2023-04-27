<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import { usePaloStore } from 'src/stores/palo'
import { useSessionStore } from 'src/stores/session'
import InstrumentMixer from 'src/components/InstrumentMixer.vue'
import SelectDecay from 'src/components/SelectDecay.vue'

const route = useRoute()

const paloStore = usePaloStore(route.name as string)()
const sessionStore = useSessionStore()

const $q = useQuasar()

const instrumentsDialog = ref(false)

const {
  palo,
  selectedInstruments
} = storeToRefs(paloStore)

const {
  toggleDialog
} = sessionStore

watch(selectedInstruments, (value) => {
  if (!value.length) {
    $q.notify({
      message: 'No instrument is selected. You will have no sound in the metronome ...',
      color: 'secondary',
      icon: 'warning'
    })
  }
})
</script>

<template lang="pug">
div
  q-btn(
    id="mixerBtn",
    outline,
    icon="tune",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    label="Mixer",
    @click="instrumentsDialog = true"
  )
  q-dialog(
    id="mixerDialog",
    v-model="instrumentsDialog",
    @show="toggleDialog(true)",
    @hide="toggleDialog(false)"
  )
    q-card(style="width: 100%; overflow: hidden;")
      q-card-section
        q-btn(icon="close", flat, round, dense, v-close-popup).absolute.q-top-right.q-mr-sm
        .text-h6.text-center Instruments mixer
      q-card-section.scroll(style="max-height: 80vh;").q-mb-md
        select-decay.q-mt-md
        table(style="width: 100%;").q-table
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
              v-for="instrument in palo.instruments",
              :key="instrument.value",
              :slug="instrument.value"
            )
</template>
