<script setup lang="ts">
import { ref, computed, onUpdated } from 'vue'
import { storeToRefs } from 'pinia'
import { QCheckbox, QToggle, QSlider, useQuasar } from 'quasar'
import type { instruOpts } from 'src/utils/types'
import { usePatternStore } from 'src/stores/patterns'
import { isFocusableElement } from 'src/utils/utils'

const $q = useQuasar()
const patternStore = usePatternStore()

const {
  instrument,
  toggleEighthNotes,
  selectVolume,
  selectInstruments
} = patternStore

const {
  selectedPattern,
  instruments
} = storeToRefs(patternStore)

const props = defineProps(['slug'])

const toggleBtn = ref<QToggle | null>(null)
const sliderBtn = ref<QSlider | null>(null)
const checkboxBtn = ref<QCheckbox | null>(null)

const instrumentEnabled = computed({
  get() { return instrument(props.slug as string)?.enabled ?? false },
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

onUpdated(() => {
  if (isFocusableElement(document.activeElement)) document.activeElement?.blur()
  if (isFocusableElement(checkboxBtn.value?.$el)) checkboxBtn.value?.$el.blur()
  if (isFocusableElement(toggleBtn.value?.$el)) toggleBtn.value?.$el.blur()
  if (isFocusableElement(sliderBtn.value?.$el)) sliderBtn.value?.$el.blur()
})
</script>

<template lang="pug">
tr
  td
    q-checkbox(
      ref="checkboxBtn",
      color="primary",
      v-model="instrumentEnabled",
      :label="instrument(props.slug).label"
    )
  td
    q-toggle(
      ref="toggleBtn"
      icon="audiotrack",
      v-model="instrumentEighthNotesEnabled",
      :disable="!instrumentEnabled",
      color="primary",
      keep-color
    ).primary
  td(style="width: 100%;")
    q-slider(
      ref="sliderBtn",
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
