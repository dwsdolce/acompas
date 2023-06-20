<script setup lang="ts">
import { ref, onUpdated } from 'vue'
import { openURL, Platform } from 'quasar'
import { storeToRefs } from 'pinia'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'
import { isFocusableElement } from 'src/utils/utils'
import type { QBtn } from 'quasar'

const patternStore = usePatternStore()
const sessionStore = useSessionStore()

const { selectedPattern } = storeToRefs(patternStore)

const {
  visualizationMode,
  selectTempo
} = patternStore

const {
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
    icon="help",
    @click="patternHelpDialog = true"
  )
  q-dialog(
    id="patternHelpDialog",
    v-model="patternHelpDialog",
    @show="toggleDialog(true)",
    @hide="toggleDialog(false)"
  )
    q-card(style="width: 100%; overflow: hidden;")
      q-card-section
        q-btn(
          ref="closeBtn",
          icon="close",
          flat,
          round,
          dense,
          v-close-popup
        ).absolute.q-top-right.q-mr-sm
        .text-h6.text-center {{ selectedPattern?.longLabel }}
      q-card-section.scroll(style="max-height: 80vh;")
        div(v-html="selectedPattern?.doc")
        p {{ selectedPattern?.places }}
        p(v-if="selectedPattern?.wikipediaUrl") Wikipedia article : #[q-btn(round, icon="link", @click="launch(selectedPattern?.wikipediaUrl)")]
        p(v-if="selectedPattern?.videoExample") Example video : #[q-btn(round, icon="link", @click="launch(selectedPattern?.videoExample)")]
</template>
