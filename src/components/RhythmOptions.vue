<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useSessionStore } from 'src/stores/session'
import ToggleImprovise from 'src/components/ToggleImprovise.vue'
import ToggleHumanize from 'src/components/ToggleHumanize.vue'
import SelectSwing from 'src/components/SelectSwing.vue'
import SelectPrestartBeat from 'src/components/SelectPrestartBeat.vue'

import CustomCard from 'src/components/CustomCard.vue'
import type { QBtn } from 'quasar'

const $q = useQuasar()
const { t } = useI18n()

const sessionStore = useSessionStore()
const { isDarkMode } = storeToRefs(sessionStore)

const optDialog = ref(false)
const optBtn = ref<QBtn | null>(null)

onUpdated(() => {
  if (!optDialog.value && optBtn.value !== null) {
    optBtn?.value?.$el?.querySelector('.q-focus-helper')?.blur()
  }
})
</script>

<template lang="pug">
div
  q-btn(
    ref="optBtn",
    outline,
    :color="isDarkMode ? 'white' : 'black'",
    icon="mdi-tune-vertical-variant",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    :label="t('buttons.options')",
    @click="optDialog = true"
  )
  q-dialog(
    id="optDialog",
    v-model="optDialog"
  )
    custom-card
      template(v-slot:title) {{ t('buttons.options') }}
      template(v-slot:content)
        toggle-improvise.q-mb-md
        toggle-humanize.q-mb-md
        select-swing.q-mb-md
        select-prestart-beat.q-mb-md

</template>
