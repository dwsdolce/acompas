<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useQuasar, Platform } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { usePatternStore } from 'src/stores/patterns'

const { t } = useI18n()

</script>

<template lang="pug">
q-page.text-grey-1.q-pa-sm.flex.justify-center.items-center
  .main-panel.page404.column.flex-center.text-center.relative-position
    .page404-hero.text-grey-5.flex.flex-center.no-wrap.q-gutter-sm 404
    .page404-subtitle.q-mb-xl {{ $t('notFound.header') }}
    q-btn(
      color="primary",
      :label="$t('notFound.btn')",
      to="/"
    )
</template>

<style lang="sass">
.page404
  margin: 0 auto
.page404-hero
  font-family: 'Playball'
  font-size: 18rem
  margin: -60px auto
.page404-subtitle
  font-size: 1.5rem
</style>
