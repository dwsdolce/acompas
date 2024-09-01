<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template lang="pug">
p.text-center {{ $t('doc.shortcuts.title') }}
q-markup-table(flat)
  tbody
    tr
      td.text-right
        kbd Space
      td.text-left {{ $t('doc.shortcuts.space') }}
    tr
      td.text-right
        kbd Up
      td.text-left {{ $t('doc.shortcuts.up') }}
    tr
      td.text-right
        kbd Down
      td.text-left {{ $t('doc.shortcuts.down') }}
    tr
      td.text-right
        kbd Esc
      td.text-left {{ $t('doc.shortcuts.esc') }}
    tr
      td.text-right
        kbd Tab
      td.text-left {{ $t('doc.shortcuts.tab') }}
</template>
