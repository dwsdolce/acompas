<script setup lang="ts">
import { ref, computed, onUpdated, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'
import HelpPattern from 'src/components/HelpPattern.vue'
import CustomCard from 'src/components/CustomCard.vue'
import HelpSearchPattern from 'src/components/HelpSearchPattern.vue'
import { getDefaultPatterns } from 'src/utils/utils'

import type { QBtn } from 'quasar'
import type { PatternState, PatternSetting } from 'src/utils/types'


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
  data,
  patterns,
  selectedContext,
  selectedPattern,
  selectedData,
  patternsInSelectedContext
} = storeToRefs(patternStore)

const {
  toggleDialog
} = sessionStore

const patternsDialog = ref(false)
const filter = ref('')

const patternsOptions = computed(() => {
  if (filter.value !== '') {
    const regex = new RegExp(filter.value, 'g')
    return patternsInSelectedContext.value.filter(pattern => {
      const patternData = data.value.find(data => data.name === pattern.value)
      return patternData?.linkedPatterns?.some(linkedPattern => {
        return regex.test(linkedPattern.value)
      })
    })
  } else {
    return patternsInSelectedContext.value
  }
})

const selectedPatternOption = computed(() => {
  return patternsOptions.value.find(pattern => pattern.value === selectedPattern.value?.name)
})


const onSelectedPattern = (v: string) => {
  patternsDialog.value = false
  router.push(`/${selectedContext.value.value}/${v}`)
}
</script>

<template lang="pug">
div
  p Pattern
    help-pattern(v-show="selectedData?.name !== 'simple-click'")
  q-btn(
    id="patternBtn",
    ref="patternBtn",
    outline,
    color="white",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    :label="selectedData?.label",
    @click="patternsDialog = true"
  )

  q-dialog(
    id="optDialog",
    v-model="patternsDialog"
  )
    custom-card
      template(v-slot:title) Please select a pattern
      template(v-slot:content)
        .row.items-center.q-mb-md
          HelpSearchPattern.col-1
          q-input(
            v-model="filter",
            outlined,
            dense,
            :debounce="500",
            :placeholder="$q.screen.lt.md ? 'Search' : 'Search for a pattern'"
          ).col-11
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
