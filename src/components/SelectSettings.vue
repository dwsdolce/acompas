<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useSessionStore } from 'src/stores/session'
import CustomCard from 'src/components/CustomCard.vue'
import ThemeToggle from 'src/components/ThemeToggle.vue'
import SelectLang from 'src/components/SelectLang.vue'
import SelectVisualization from 'src/components/SelectVisualization.vue'
import ResetButton from 'src/components/ResetButton.vue'
import PerformancePanel from 'src/components/PerformancePanel.vue'

const { t } = useI18n()

const sessionStore = useSessionStore()

// Performance monitoring (development only)
const ENABLE_PERFORMANCE_MONITORING = process.env.NODE_ENV === 'development'

const {
  visualizationMode
} = storeToRefs(sessionStore)

const settingsDialog = ref(false)

watch(visualizationMode, () => {
  settingsDialog.value = false
})

const handleReset = () => {
  settingsDialog.value = false
}
</script>

<template lang="pug">
div
  q-btn(
    flat,
    dense,
    round,
    aria-label="Settings",
    @click="settingsDialog = true"
  ).q-mr-sm
    q-icon(name="mdi-cog")

  q-dialog(
    id="settingsDialog",
    v-model="settingsDialog"
  )
    CustomCard
      template(v-slot:title) {{ t('buttons.settings') }}
      template(v-slot:content)
        ThemeToggle
        SelectLang
        select-visualization.q-mb-md
        reset-button(
          @reset="handleReset"
        ).q-mb-md

        //-- Performance Monitoring (Development Only)
        //- div(v-if="ENABLE_PERFORMANCE_MONITORING")
          q-separator.q-mb-md
          .text-subtitle1.q-mb-sm 🔧 Developer Tools
          performance-panel
</template>
