<script setup lang="ts">
  import { ref, onUpdated } from 'vue'
  import { openURL, Platform } from 'quasar'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import SelectPrivacy from 'src/components/SelectPrivacy.vue'
  import KeyboardShortcuts from 'src/components/KeyboardShortcuts.vue'
  import HelpApp from 'src/components/HelpApp.vue'
  import CustomCard from 'src/components/CustomCard.vue'
  import { isFocusableElement } from 'src/utils/utils'
  import type { QItem } from 'quasar'

  const helpDialog = ref(false)
  const shortcutsDialog = ref(false)
  const aboutDialog = ref(false)

  const helpQItem = ref<QItem | null>(null)
  const tuningForkQItem = ref<QItem | null>(null)
  const shortcutsQItem = ref<QItem | null>(null)

  const router = useRouter()
  const { t } = useI18n()

  const launch = (url: string) => {
    // if (Platform.is.cordova) {
    //   cordova.InAppBrowser.open(url, '_system')
    //   return
    // }
    openURL(url)
  }

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

    //- The Play Store entry and the Follow section were removed with the
      rename. Both pointed at A Compás - its listing, its Facebook, X,
      Mastodon and Bluesky accounts - which under a different app's name
      would tell users they were following this one. Palmas has no store
      listing and no accounts of its own yet; when it does, they go here.

    q-expansion-item(icon="mdi-share-variant", :label="$t('share')")
      q-list(no-border, link, inset-separator)

        q-item(clickable, v-ripple, @click="launch('https://www.facebook.com/sharer/sharer.php?u=https://www.dolcesfogato.com/acompas/')")
          q-item-section(avatar)
            q-icon(name="mdi-facebook")
          q-item-section Facebook

        q-item(clickable, v-ripple, @click="launch('https://x.com/share?url=https://www.dolcesfogato.com/acompas/')")
          q-item-section(avatar)
            q-icon(name="mdi-alpha-x")
          q-item-section X

    //- Must point at this fork, not upstream. The app is AGPL and is served
      over a network, so section 13 obliges us to offer the source of the
      version people are actually using - which is this one, not A Compás.
    q-item(clickable, v-ripple, @click="launch('https://github.com/dwsdolce/palmas')")
      q-item-section(avatar)
        q-icon(name="mdi-xml")
      q-item-section {{ $t('source') }}

    q-item(clickable, v-ripple, @click="router.push('/changelog')")
      q-item-section(avatar)
        q-icon(name="mdi-format-list-bulleted")
      q-item-section {{ $t('doc.changelog.title') }}

    q-item(clickable, v-ripple, @click="launch('https://github.com/dwsdolce/palmas/issues')")
      q-item-section(avatar)
        q-icon(name="mdi-bug")
      q-item-section {{ $t('issues') }}


  q-dialog(
    id="helpDialog",
    v-model="helpDialog"
  )
    custom-card
      template(v-slot:title) {{ $t('help') }}
      template(v-slot:content)
        help-app


  q-dialog(
    id="shortcutsDialog",
    v-model="shortcutsDialog"
  )
    custom-card
      template(v-slot:title) {{ $t('shortcuts') }}
      template(v-slot:content)
        keyboard-shortcuts
</template>

