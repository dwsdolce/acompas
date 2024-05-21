<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template lang="pug">
div
  div.q-mb-md
    .text-h6.text-center {{ $t('doc.welcome.title') }}
  div.q-mb-md.text-center
    p {{ $t('doc.welcome.content') }}

  q-separator.q-mb-md
  div.q-mb-md
    .text-h6.text-center {{ $t('doc.getStarted.title') }}
    div(v-html="$t('doc.getStarted.content')")

  q-separator.q-mb-md
  div.q-mb-md
    .text-h6.text-center {{ $t('doc.options.title') }}
  div.text-center.q-mb-md
    p: b {{ $t('doc.options.content.tempo.title') }}
    p {{ $t('doc.options.content.tempo.content') }}
  div.text-center.q-mb-md
    p: b {{ $t('doc.options.content.mixer.title') }}
    p {{ $t('doc.options.content.mixer.content') }}
  div.text-center.q-mb-md
    p: b {{ $t('doc.options.content.improvise.title') }}
    p {{ $t('doc.options.content.improvise.content') }}
  div.text-center.q-mb-md
    p: b {{ $t('doc.options.content.humanize.title') }}
    p {{ $t('doc.options.content.humanize.content') }}
  div.text-center.q-mb-md
    p: b {{ $t('doc.options.content.swing.title') }}
    p {{ $t('doc.options.content.swing.content') }}
  div.text-center.q-mb-md
    p: b {{ $t('doc.options.content.reverb.title') }}
    p {{ $t('doc.options.content.reverb.content') }}
  div.text-center.q-mb-md
    p: b {{ $t('doc.options.content.startBeat.title') }}
    p {{ $t('doc.options.content.startBeat.content') }}
  div.text-center.q-mb-md
    p: b {{ $t('doc.options.content.viewMode.title') }}
    p {{ $t('doc.options.content.viewMode.content') }}
  div.text-center.q-mb-md
    p: b {{ $t('doc.options.content.reset.title') }}
    p {{ $t('doc.options.content.reset.content') }}
</template>
