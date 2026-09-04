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
const { t, te, locale } = useI18n()

const { selectedData } = storeToRefs(patternStore)

// The description and the places it comes from are translated like every other
// string, keyed by the pattern's `name`. Only the thirteen flamenco palos carry
// one; everything else renders no description, as it did before, so `te` decides
// rather than a missing key reaching the page as its own name.
const patternText = (field: 'doc' | 'places') => {
  const name = selectedData.value?.name
  if (name === undefined) return ''
  const key = `patterns.${name}.${field}`
  return te(key) ? t(key) : ''
}

const patternDoc = computed(() => patternText('doc'))
const patternPlaces = computed(() => patternText('places'))

const patternHelpDialog = ref(false)

// Only the resolved article URL is wanted now. The intro extract used to be the
// body of this dialog, which meant the description a reader saw depended on
// their language having a Wikipedia article and on there being a network: four
// locales were never mapped at all, and an offline or native launch fell back to
// English everywhere. The description is translated text now, and Wikipedia is
// a link out of it.
const { articleUrl: wikiUrl, load: loadWiki } = useWikipediaExtract()

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
        div(v-if="patternDoc", v-html="patternDoc")
        h6.text-h6 {{ $t('doc.utils.beats', { count: beatCount }) }}
        p(v-if="patternPlaces") {{ patternPlaces }}
        p.text-caption.text-grey(v-if="wikipediaLink")
          | {{ $t('doc.utils.wikipediaUrl') }}
          q-btn(
            flat,
            round,
            size="sm",
            icon="mdi-open-in-new",
            :aria-label="$t('doc.utils.openLink')",
            @click="launch(wikipediaLink)"
          ).q-ml-sm
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
