<script setup lang="ts">
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
const instru: instruOpts | undefined = instrument(props.slug)

</script>

<template lang="pug">
tr
  td
    q-checkbox(
      color="primary",
      :model-value="instru?.enabled",
      @update:model-value="selectInstruments(props.slug, $event)",
      :val="instru?.value",
      :label="instru?.label"
    )
  td
    q-toggle(
      icon="audiotrack",
      v-if="instru != undefined && instru.eighthNotes != null",
      :model-value="instru?.eighthNotes",
      @update:model-value="toggleEighthNotes(instru)",
      :disable="!instru?.enabled"
      color="primary",
      keep-color
    ).primary
  td(style="width: 100%;")
    q-slider(
      :model-value="instru?.volume",
      @update:model-value="selectVolume({ instrument: instru?.value, volume: $event })",
      :disable="!instru?.enabled",
      :min="-12",
      :max="12",
      :step="1",
      label,
      snap
    )
</template>

<style lang="sass" scoped>
tr > td
  padding: 0.5rem 0
</style>
