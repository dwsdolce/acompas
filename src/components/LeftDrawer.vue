<script setup lang="ts">
  import { watch, ref, computed, onMounted, onUpdated } from 'vue'
  import { openURL, Platform } from 'quasar'
  import { storeToRefs } from 'pinia'
  import { useRouter, useRoute } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import SelectPrivacy from 'src/components/SelectPrivacy.vue'
  import KeyboardShortcuts from 'src/components/KeyboardShortcuts.vue'
  import HelpApp from 'src/components/HelpApp.vue'
  import CustomCard from 'src/components/CustomCard.vue'
  import { useTuningForkStore } from 'src/stores/tuning-fork'
  import { useSessionStore } from 'src/stores/session'
  import { isFocusableElement } from 'src/utils/utils'
  import type { QItem } from 'quasar'

  const helpDialog = ref(false)
  const shortcutsDialog = ref(false)
  const aboutDialog = ref(false)

  const helpQItem = ref<QItem | null>(null)
  const tuningForkQItem = ref<QItem | null>(null)
  const shortcutsQItem = ref<QItem | null>(null)

  const router = useRouter()
  const route = useRoute()
  const { t } = useI18n()
  const sessionStore = useSessionStore()

  const {
    trackingChosen,
    trackingInitialized,
    privacyDialogOpen,
    isUpToDatev3
  } = storeToRefs(sessionStore)

  const {
    openPrivacyDialog,
    toggleDialog
  } = sessionStore

  const tuningForkStore = useTuningForkStore()

  const {
    stop
  } = tuningForkStore

  const launch = (url: string) => {
    // if (Platform.is.cordova) {
    //   cordova.InAppBrowser.open(url, '_system')
    //   return
    // }
    openURL(url)
  }

  // onMounted(() => {
  //   if (!trackingChosen.value && route.path !== '/privacy-policy') {
  //     openPrivacyDialog()
  //   }
  // })

  onUpdated(() => {
    if (isFocusableElement(document.activeElement)) document.activeElement?.blur()
    if (isFocusableElement(helpQItem.value?.$el)) helpQItem.value?.$el.blur()
    if (isFocusableElement(tuningForkQItem.value?.$el)) tuningForkQItem.value?.$el.blur()
    if (isFocusableElement(shortcutsQItem.value?.$el)) shortcutsQItem.value?.$el.blur()
  })
</script>

<template lang="pug">
div
  q-list(no-border, link, separator)

    q-item(
      clickable,
      v-ripple,
      @click="launch('https://www.paypal.com/donate/?hosted_button_id=NCN4GX9DL3L5W')"
    )
     q-item-section(avatar)
      q-icon(name="mdi-currency-usd")
     q-item-section {{ $t('donate') }}

    q-item(
      id="helpQItem",
      ref="helpQItem",
      clickable,
      v-ripple,
      @click="helpDialog = true"
    )
      q-item-section(avatar)
        q-icon(name="mdi-help-circle")
      q-item-section {{ $t('help') }}

    q-item(clickable, v-ripple, @click="router.push('/tuning-fork')")
      q-item-section(avatar)
        q-icon(name="mdi-ear-hearing")
      q-item-section {{ $t('tuning') }}

    q-item(
      id="shortcutsQItem",
      ref="shortcutsQItem",
      clickable,
      v-ripple,
      @click="shortcutsDialog = true"
    )
      q-item-section(avatar)
        q-icon(name="mdi-keyboard")
      q-item-section {{ $t('shortcuts') }}

    q-item(clickable, v-ripple, @click="router.push('/privacy-policy')")
      q-item-section(avatar)
        q-icon(name="mdi-security")
      q-item-section {{ $t('privacy') }}

    q-item(clickable, v-ripple, @click="launch('https://play.google.com/store/apps/details?id=audio.acompas.app')")
      q-item-section(avatar)
        q-icon(name="mdi-android")
      q-item-section {{ $t('android') }}

    q-expansion-item(icon="mdi-web", :label="$t('follow')")
      q-list(no-border, link, inset-separator)

        q-item(clickable, v-ripple, @click="launch('https://www.facebook.com/acompas.org/')")
          q-item-section(avatar)
            q-icon(name="mdi-facebook")
          q-item-section Facebook

        q-item(clickable, v-ripple, @click="launch('https://twitter.com/acompas_org')")
          q-item-section(avatar)
            q-icon(name="mdi-twitter")
          q-item-section Twitter

        q-item(clickable, v-ripple, @click="launch('https://mastodon.social/@acompas')")
          q-item-section(avatar)
            q-icon(name="mdi-mastodon")
          q-item-section Mastodon

        q-item(clickable, v-ripple, @click="launch('https://bsky.app/profile/acompas.bsky.social')")
          q-item-section(avatar)
            q-icon(name="mdi-weather-cloudy")
          q-item-section Bluesky

    q-expansion-item(icon="mdi-share-variant", :label="$t('share')")
      q-list(no-border, link, inset-separator)

        q-item(clickable, v-ripple, @click="launch('https://www.facebook.com/sharer/sharer.php?u=https://acompas.org')")
          q-item-section(avatar)
            q-icon(name="mdi-facebook")
          q-item-section Facebook

        q-item(clickable, v-ripple, @click="launch('https://twitter.com/share?url=https://acompas.org')")
          q-item-section(avatar)
            q-icon(name="mdi-twitter")
          q-item-section Twitter

    q-item(clickable, v-ripple, @click="launch('https://gitlab.com/acompas/acompas')")
      q-item-section(avatar)
        q-icon(name="mdi-xml")
      q-item-section {{ $t('source') }}

    q-item(clickable, v-ripple, @click="launch('https://gitlab.com/acompas/acompas/issues')")
      q-item-section(avatar)
        q-icon(name="mdi-bug")
      q-item-section {{ $t('issues') }}


  q-dialog(
    id="helpDialog",
    v-model="helpDialog",
    @show="toggleDialog(true)",
    @hide="toggleDialog(false)"
  )
    custom-card
      template(v-slot:title) {{ $t('help') }}
      template(v-slot:content)
        help-app

  //- q-dialog(
  //-   id="privacyDialog",
  //-   v-model="privacyDialogOpen",
  //-   @show="toggleDialog(true)",
  //-   @hide="toggleDialog(false)"
  //- )
  //-   select-privacy

  q-dialog(
    id="shortcutsDialog",
    v-model="shortcutsDialog",
    @show="toggleDialog(true)",
    @hide="toggleDialog(false)"
  )
    custom-card
      template(v-slot:title) {{ $t('shortcuts') }}
      template(v-slot:content)
        keyboard-shortcuts
</template>

