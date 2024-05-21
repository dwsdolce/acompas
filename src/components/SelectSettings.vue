<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CustomCard from 'src/components/CustomCard.vue'
import SelectVisualization from 'src/components/SelectVisualization.vue'
import ResetButton from 'src/components/ResetButton.vue'

const { t } = useI18n()

const settingsDialog = ref(false)

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
        select-visualization.q-mb-md
        reset-button.q-mb-md
</template>
