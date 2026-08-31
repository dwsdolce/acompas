<script setup lang="ts">
import { ref, computed, onUpdated } from 'vue'
import { QCheckbox, QToggle, QSlider, useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { usePatternStore } from 'src/stores/patterns'
import { isFocusableElement } from 'src/utils/utils'

const $q = useQuasar()
const patternStore = usePatternStore()

const {
  instrument,
  toggleEighthNotes,
  selectVolume,
  selectInstruments,
  visualizeInstrument
} = patternStore

const { visualizedInstrument } = storeToRefs(patternStore)

const props = defineProps<{ slug: string }>()

const toggleBtn = ref<QToggle | null>(null)
const sliderBtn = ref<QSlider | null>(null)
const checkboxBtn = ref<QCheckbox | null>(null)

const instru = computed(() => instrument(props.slug as string))

const instrumentEnabled = computed({
  get() { return instrument(props.slug as string)?.enabled ?? false },
  set(value: boolean) { selectInstruments(props.slug, value) }
})

const instrumentEighthNotesEnabled = computed({
  get() { return instrument(props.slug)?.eighthNotes ?? false },
  set(value: boolean) { toggleEighthNotes(props.slug) }
})

// Exactly one instrument is drawn by the visualizations, and it is always one
// you can hear. With a single instrument enabled the store answers with it
// without being told, so this only has to carry a deliberate choice.
const isShown = computed(() => visualizedInstrument.value?.value === props.slug)

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
  td.text-center
    q-radio(
      :model-value="visualizedInstrument?.value ?? ''",
      :val="props.slug",
      :disable="!instrumentEnabled",
      color="primary",
      dense,
      :aria-label="instrument(props.slug).label",
      @update:model-value="visualizeInstrument(props.slug)"
    )
  td
    q-toggle(
      ref="toggleBtn"
      icon="mdi-music-note-eighth",
      v-if="instru.eighthNotes !== null",
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
