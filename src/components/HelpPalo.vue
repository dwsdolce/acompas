<script setup lang="ts">
import { ref, onUpdated } from 'vue'
import { openURL, Platform } from 'quasar'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { usePaloStore } from 'src/stores/palo'
import { useSessionStore } from 'src/stores/session'
import palosData from 'src/data/palosData'
import type { QBtn } from 'quasar'

const route = useRoute()
const paloData = palosData.find(palo => palo.value === route.name)
const paloStore = usePaloStore(route.name as string)()
const sessionStore = useSessionStore()

const { palo } = storeToRefs(paloStore)

const {
  visualizationMode,
  selectTempo
} = paloStore

const {
  toggleDialog
} = sessionStore

const paloHelpDialog = ref(false)

const paloHelpBtn = ref<QBtn | null>(null)

onUpdated(() => {
  if (!paloHelpDialog.value && paloHelpBtn.value !== null) {
    paloHelpBtn?.value?.$el?.querySelector('.q-focus-helper')?.blur()
  }
})

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
  if (!paloHelpDialog.value && paloHelpBtn.value !== null) {
    paloHelpBtn.value.$el.querySelector('.q-focus-helper').blur()
  }
})
</script>

<template lang="pug">
span.q-ml-sm
  q-btn(
    id="paloHelpBtn",
    ref="paloHelpBtn",
    dense,
    round,
    flat,
    size="10px",
    padding="none",
    icon="help",
    @click="paloHelpDialog = true"
  )
  q-dialog(
    id="paloHelpDialog",
    v-model="paloHelpDialog",
    @show="toggleDialog(true)",
    @hide="toggleDialog(false)"
  )
    q-card(style="width: 100%; overflow: hidden;")
      q-card-section
        q-btn(icon="close", flat, round, dense, v-close-popup).absolute.q-top-right.q-mr-sm
        .text-h6.text-center {{ paloData?.longLabel }}
      q-card-section.scroll(style="max-height: 80vh;")
        div(v-html="paloData?.doc")
        p {{ paloData?.places }}
        p(v-if="paloData?.wikipediaUrl") Wikipedia article : #[q-btn(round, icon="link", @click="launch(paloData?.wikipediaUrl)")]
        p(v-if="paloData?.videoExample") Example video : #[q-btn(round, icon="link", @click="launch(paloData?.videoExample)")]
</template>
