<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import type { instruOpts } from 'src/composables/models'
import { usePaloStore } from 'src/stores/palo'

const route = useRoute()
const paloStore = usePaloStore(route.name as string)()
const $q = useQuasar()

const {
  toggleEighthNotes,
  selectVolume,
  selectInstruments,
  instrument
} = paloStore

const props = defineProps(['slug'])

const instrumentEnabled = computed({
  get() { return instrument(props.slug)?.enabled ?? false },
  set(value: boolean) { selectInstruments(props.slug, value) }
})

const instrumentEighthNotesEnabled = computed({
  get() { return instrument(props.slug)?.eighthNotes ?? false },
  set(value: boolean) { toggleEighthNotes(props.slug) }
})

const instrumentVolume = computed({
  get() { return instrument(props.slug)?.volume ?? 0 },
  set(value: number) { selectVolume({ instrument: props.slug, volume: value }) }
})
</script>

<template lang="pug">
tr
  td
    q-checkbox(
      color="primary",
      v-model="instrumentEnabled",
      :label="instrument(props.slug).label"
    )
  td
    q-toggle(
      icon="audiotrack",
      v-model="instrumentEighthNotesEnabled",
      :disable="!instrumentEnabled",
      color="primary",
      keep-color
    ).primary
  td(style="width: 100%;")
    q-slider(
      v-model="instrumentVolume",
      :disable="!instrumentEnabled",
      :min="-12",
      :max="12",
      :step="1",
      snap,
      label,
      label-always,
      markers
    )
</template>

<style lang="sass" scoped>
tr > td
  padding: 0.5rem 0
</style>
