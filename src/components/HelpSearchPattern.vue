<script setup lang="ts">
import { ref, computed, onUpdated, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import CustomCard from 'src/components/CustomCard.vue'

const { t } = useI18n()
const patternSearchHelpDialog = ref(false)

</script>

<template lang="pug">
span.q-px-sm
  q-btn(
    flat,
    round,
    id="patternSearchHelpBtn",
    ref="patternSearchHelpBtn",
    size="15px",
    padding="none",
    icon="mdi-help-box",
    @click="patternSearchHelpDialog = true"
  )

  q-dialog(
    id="patternSearchHelpDialog",
    v-model="patternSearchHelpDialog"
  )
    custom-card
      template(v-slot:title) {{ t('doc.searchPattern.title') }}
      template(v-slot:content)
        div(v-html="t('doc.searchPattern.content')")
</template>
