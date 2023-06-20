<script setup lang="ts">
import { ref, onUpdated } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'
import HelpPattern from 'src/components/HelpPattern.vue'
import type { QBtn } from 'quasar'

const patternBtn = ref<QBtn | null>(null)

const $q = useQuasar()
const router = useRouter()
const patternStore = usePatternStore()
const sessionStore = useSessionStore()

const {
  patterns,
  selectedPattern
} = storeToRefs(patternStore)

const {
  toggleDialog
} = sessionStore

const patternsDialog = ref(false)

const patternsOptions = patterns.value.map(pattern => ({
  label: pattern.label,
  value: pattern.name
}))

const selectedPatternOption = patternsOptions.find(pattern => pattern.value === selectedPattern.value?.name)

const onSelectedPattern = (v: string) => {
  patternsDialog.value = false
  router.push(`/${v}`)
}

onUpdated(() => {
  if (!patternsDialog.value && patternBtn.value !== null) {
    patternBtn.value.$el.querySelector('.q-focus-helper').blur()
  }
})
</script>

<template lang="pug">
div
  p Pattern
    help-pattern(v-show="selectedPattern?.name !== 'simple-click'")
  q-btn(
    id="patternBtn",
    ref="patternBtn",
    outline,
    color="white",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    :label="selectedPattern?.label",
    @click="patternsDialog = true"
  )
  q-dialog(
    id="optDialog",
    v-model="patternsDialog"
  )
    q-card(style="width: 100%; overflow: hidden;")
      q-card-section
        q-btn(icon="close", flat, round, dense, v-close-popup).absolute.q-top-right.q-mr-sm
        .text-h6.text-center Please select a pattern
      q-card-section.scroll(style="max-height: 80vh;")
        q-option-group(
          type="radio",
          color="primary",
          :options="patternsOptions",
          :model-value="selectedPatternOption?.value",
          @update:model-value="onSelectedPattern($event)"
        )
</template>
