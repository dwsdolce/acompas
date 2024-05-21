<script setup lang="ts">
import { ref, onUpdated } from 'vue'
import { openURL, Platform } from 'quasar'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import CustomCard from 'src/components/CustomCard.vue'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'
import { isFocusableElement } from 'src/utils/utils'
import type { QBtn } from 'quasar'

const patternStore = usePatternStore()
const sessionStore = useSessionStore()
const { t } = useI18n()

const { selectedData } = storeToRefs(patternStore)

const {
  visualizationMode,
  toggleDialog
} = sessionStore

const patternHelpDialog = ref(false)

const patternHelpBtn = ref<QBtn | null>(null)
const closeBtn = ref<QBtn | null>(null)

const launch = (url: string | undefined) => {
  if (url) {
    // if (Platform.is.cordova) {
    //   cordova.InAppBrowser.open(url, '_system')
    //   return
    // }
    openURL(url)
  }
}

onUpdated(() => {
  if (isFocusableElement(document.activeElement)) document.activeElement?.blur()
  if (isFocusableElement(patternHelpBtn.value?.$el)) patternHelpBtn.value?.$el.blur()
  if (isFocusableElement(closeBtn.value?.$el)) closeBtn.value?.$el.blur()
})
</script>

<template lang="pug">
span.q-ml-sm
  q-btn(
    id="patternHelpBtn",
    ref="patternHelpBtn",
    dense,
    round,
    flat,
    size="10px",
    padding="none",
    icon="mdi-help-circle",
    @click="patternHelpDialog = true"
  )
  q-dialog(
    id="patternHelpDialog",
    v-model="patternHelpDialog",
    @show="toggleDialog(true)",
    @hide="toggleDialog(false)"
  )
    custom-card
      template(v-slot:title) {{ selectedData?.longLabel }}
      template(v-slot:content)
        div(v-html="selectedData?.doc")
        p {{ selectedData?.places }}
        p(v-if="selectedData?.wikipediaUrl") {{ $t('doc.utils.wikipediaUrl') }}
          q-btn(
            outline,
            size="sm",
            icon="mdi-link-variant",
            :label="$t('doc.utils.openLink')"
            @click="launch(selectedData?.wikipediaUrl)"
          ).q-ml-md
        p(v-if="selectedData?.videoExample") {{ $t('doc.utils.videoExample') }}
          q-btn(
            outline,
            size="sm",
            icon="mdi-link-variant",
            :label="$t('doc.utils.openLink')"
            @click="launch(selectedData?.videoExample)"
          ).q-ml-md
</template>
