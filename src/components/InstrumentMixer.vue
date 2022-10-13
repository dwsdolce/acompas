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

const handleToggleEighthNotes = () => {
  if (instru != undefined) toggleEighthNotes(instru)
}

const handleChangeVolume = (e: number | null) => {
  if (instru !== undefined && instru !== null && e !== null) selectVolume({
    instrument: instru.value,
    volume: e
  })
}


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
      :model-value="instru?.eighthNotes",
      @update:model-value="handleToggleEighthNotes()",
      v-if="instru != undefined && instru.eighthNotes != null",
      :disable="!instru?.enabled"
      color="primary",
      keep-color
    ).primary
  td(style="width: 100%;")
    q-slider(
      :model-value="instru?.volume",
      @update:model-value="handleChangeVolume($event)",
      :min="-30",
      :max="30",
      :step="1",
      label,
      snap,
      :disable="!instru?.enabled"
    )
</template>

<style lang="sass" scoped>
tr > td
  padding: 0.5rem 0
</style>
