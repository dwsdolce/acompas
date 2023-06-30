<script setup lang="ts">
import { ref, computed, onUpdated } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'
import HelpPattern from 'src/components/HelpPattern.vue'
import CustomCard from 'src/components/CustomCard.vue'
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

const patternsOptions = computed(() => {
  return patterns.value.map(pattern => ({
    label: pattern.label,
    value: pattern.name
  }))
})

const selectedPatternOption = patternsOptions.value.find(pattern => pattern.value === selectedPattern.value?.name)

const onSelectedPattern = (v: string) => {
  patternsDialog.value = false
  router.push(`/${v}`)
}

// onUpdated(() => {
//   if (!patternsDialog.value && patternBtn.value !== null) {
//     patternBtn.value.$el.querySelector('.q-focus-helper').blur()
//   }
// })
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
    custom-card
      template(v-slot:title) Please select a pattern
      template(v-slot:content)
        q-option-group(
          type="radio",
          color="primary",
          :options="patternsOptions",
          :model-value="selectedPatternOption?.value",
          @update:model-value="onSelectedPattern($event)"
        )
</template>
