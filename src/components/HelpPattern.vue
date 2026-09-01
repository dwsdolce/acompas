<script setup lang="ts">
import { ref, computed, watch, onUpdated } from 'vue'
import { openURL, Platform } from 'quasar'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import CustomCard from 'src/components/CustomCard.vue'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'
import { useWikipediaExtract } from 'src/composables/wikipedia'
import { isFocusableElement } from 'src/utils/utils'
import type { QBtn } from 'quasar'

const patternStore = usePatternStore()
const sessionStore = useSessionStore()
const { t, locale } = useI18n()

const { selectedData } = storeToRefs(patternStore)

const patternHelpDialog = ref(false)

const { extract: wikiExtract, articleUrl: wikiUrl, loading: wikiLoading, load: loadWiki } = useWikipediaExtract()

// Prefer the localized Wikipedia article when we resolved one, else the
// English URL from the pattern data.
const wikipediaLink = computed(() => wikiUrl.value || selectedData.value?.wikipediaUrl)

// Beats per compás. `nbBeatsInPattern` counts subdivisions (2 per beat).
const beatCount = computed(() =>
  selectedData.value ? Math.round(selectedData.value.nbBeatsInPattern / 2) : 0
)

// Fetch the localized Wikipedia intro whenever the dialog is open and the
// pattern or locale changes. Refetches on locale switch so the text follows
// the chosen language.
watch(
  [patternHelpDialog, locale, () => selectedData.value?.wikipediaUrl],
  ([open, , url]) => {
    if (open) void loadWiki(url)
  }
)

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
  q-btn.help-btn(
    id="patternHelpBtn",
    ref="patternHelpBtn",
    dense,
    round,
    flat,
    size="10px",
    icon="mdi-help-circle",
    @click="patternHelpDialog = true"
  )
  q-dialog(
    id="patternHelpDialog",
    v-model="patternHelpDialog"
  )
    custom-card
      template(v-slot:title) {{ selectedData?.longLabel }}
      template(v-slot:content)
        .row.justify-center.q-py-md(v-if="wikiLoading")
          q-spinner-dots(size="2em", color="primary")
        template(v-else-if="wikiExtract")
          div(v-html="wikiExtract")
          p.text-caption.text-grey
            | {{ $t('doc.utils.source') }}
            span(v-if="wikipediaLink")
              q-btn(
                flat,
                round,
                size="sm",
                icon="mdi-open-in-new",
                @click="launch(wikipediaLink)"
              ).q-ml-sm
        div(v-else, v-html="selectedData?.doc")
        h6.text-h6 {{ $t('doc.utils.beats', { count: beatCount }) }}
        p {{ selectedData?.places }}
        //- p(v-if="wikipediaLink") {{ $t('doc.utils.wikipediaUrl') }}
        //-   q-btn(
        //-     outline,
        //-     size="sm",
        //-     icon="mdi-link-variant",
        //-     :label="$t('doc.utils.openLink')"
        //-     @click="launch(wikipediaLink)"
        //-   ).q-ml-md
        q-btn(
          v-if="selectedData?.videoExample",
          outline,
          size="sm",
          icon="mdi-link-variant",
          :label="$t('doc.utils.videoExample')"
          @click="launch(selectedData?.videoExample)"
        )
</template>
