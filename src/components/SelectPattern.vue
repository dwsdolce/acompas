<script setup lang="ts">
import { ref, computed, onUpdated, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'
import HelpPattern from 'src/components/HelpPattern.vue'
import CustomCard from 'src/components/CustomCard.vue'
import type { QBtn } from 'quasar'

import type { PatternState } from 'src/utils/types'


interface PatternOtion {
  name: string
  label: string
}

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
const filter = ref('')

const formatPattern = (pattern: PatternState) => {
  return {
    label: pattern.label,
    value: pattern.name
  }
}

const patternsOptions = computed(() => {
  let selected = patterns.value
  if (filter.value !== '') {
    console.log('filter.value', filter.value)
    const regex = new RegExp(filter.value, 'g')
    selected = patterns.value.filter(pattern => {
      return pattern.linkedPatterns?.some(linkedPattern => {
        return regex.test(linkedPattern.value)
      })
    })
  }

  return selected
    .map(pattern => formatPattern(pattern))
})

const selectedPatternOption = patternsOptions.value.find(pattern => pattern.value === selectedPattern.value?.name)

const stringMatchesRegex = (str: string, regex: RegExp) => {
  const matches = regex.test(str)
}

const onSelectedPattern = (v: string) => {
  patternsDialog.value = false
  router.push(`/${v}`)
}

watch(filter, () => {
  console.log('filter', filter.value)
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
    custom-card
      template(v-slot:title) Please select a pattern
      template(v-slot:content)
        q-input(
          v-model="filter",
          outlined,
          dense,
          :debounce="500",
          :placeholder="$q.screen.lt.md ? 'Search' : 'Search for a pattern'"
        ).q-mb-md
          template(v-slot:append)
            q-icon(name="close", @click="filter = ''").cursor-pointer

        q-option-group(
          type="radio",
          color="primary",
          :options="patternsOptions",
          :model-value="selectedPatternOption?.value",
          @update:model-value="onSelectedPattern($event)"
        )
</template>
