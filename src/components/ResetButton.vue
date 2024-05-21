<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CustomCard from 'src/components/CustomCard.vue'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'

const $q = useQuasar()
const route = useRoute()
const { t } = useI18n()
const patternStore = usePatternStore()
const sessionStore = useSessionStore()

const resetDialog = ref(false)
const selectedResetOption = ref<string>('pattern')
const resetOptions = [
  { value: 'pattern', label: 'Only for current pattern' },
  { value: 'all', label: 'All patterns and settings' }
]

watch(resetDialog, () => {
  selectedResetOption.value = 'pattern'
})

const {
  toggleDialog
} = sessionStore

const {
  restoreDefault
} = patternStore

const onSelectedOption = (v: string) => {
  selectedResetOption.value = v
}

const handleRestore = () => {
  if (selectedResetOption.value === 'pattern') {
    restoreDefault(route.name as string)
  } else if (selectedResetOption.value === 'all') {
    restoreDefault(selectedResetOption.value)
  }
}
</script>

<template lang="pug">
.text-center.q-mx-md
  //- p.caption Reset
  q-btn(
    outline,
    color="red-9",
    icon="mdi-restore-alert",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    :label="$t('buttons.restore')",
    @click="resetDialog = true"
  )
  q-dialog(
    v-model="resetDialog",
    @show="toggleDialog(true)",
    @hide="toggleDialog(false)"
  )
    custom-card
      template(v-slot:title) {{ $t('doc.reset.title') }}
      template(v-slot:content)
        p.text-center {{ $t('doc.reset.warning') }}
        q-option-group(
          type="radio",
          color="primary",
          :model-value="selectedResetOption",
          :options="resetOptions",
          @update:model-value="onSelectedOption"
        )
      template(v-slot:actions)
        q-btn(
          unelevated,
          color="primary",
          v-close-popup
        ).q-mr-md {{ $t('doc.reset.close') }}
        q-btn(
          unelevated,
          color="red-10",
          v-close-popup,
          @click="handleRestore"
        ) {{ $t('doc.reset.proceed') }}
</template>
