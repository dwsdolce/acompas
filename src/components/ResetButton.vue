<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CustomCard from 'src/components/CustomCard.vue'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'

const $q = useQuasar()
const router = useRouter()
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

const emit = defineEmits(['reset'])

watch(resetDialog, () => {
  selectedResetOption.value = 'pattern'
})

const {
  restoreDefault,
  initAll
} = patternStore

const {
  selectedContextName,
  selectedPatternName,
} = storeToRefs(patternStore)

const onSelectedOption = (v: string) => {
  selectedResetOption.value = v
}

const handleRestore = async () => {
  if (selectedResetOption.value === 'pattern') {
    await restoreDefault(route.name as string)
  } else if (selectedResetOption.value === 'all') {
    await restoreDefault(selectedResetOption.value)
  }
  // router.go(0)
  await initAll(selectedContextName.value, selectedPatternName.value)
  $q.notify({
    message: t('doc.reset.success'),
    color: 'positive',
    icon: 'mdi-check-circle-outline'
  })
  resetDialog.value = false
  emit('reset', true)
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
    v-model="resetDialog"
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
