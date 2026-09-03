<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from 'src/boot/i18n'
import HelpTooltip from 'src/components/HelpTooltip.vue'

const { locale } = useI18n()

const languages = ref([
  { code: 'en-US', label: 'English',  flag: '🇬🇧' },
  { code: 'es-ES', label: 'Español',  flag: '🇪🇸' },
  { code: 'fr-FR', label: 'Français', flag: '🇫🇷' },
  { code: 'ja-JP', label: '日本語', flag: '🇯🇵' },
  { code: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
  { code: 'de', label: 'Deutsch',  flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' }
])

const selectedLocale = ref(locale.value)


const current = computed(() =>
  typeof selectedLocale.value === 'string'
    ? languages.value.find(l => l.code === selectedLocale.value) || languages.value[0]
    : selectedLocale.value || languages.value[0]
)

watch(locale, (val) => {
  selectedLocale.value = val
})

watch(selectedLocale, (val) => {
  const code = typeof val === 'string' ? val : val?.code

  if (!code || !languages.value.some(l => l.code === code)) {
    selectedLocale.value = languages.value[0].code
    return
  }

  // setLocale rather than assigning locale directly: the messages for this
  // language may not have been fetched yet, and a bare assignment would fall
  // back to English instead of waiting for them.
  if (code !== locale.value) {
    void setLocale(code)
  }
})

const selectRef = ref(null)

async function selectLanguage(lang) {
  selectedLocale.value = lang
  await setLocale(lang.code)
  selectRef.value?.hidePopup()
}
</script>

<template lang="pug">
.text-center.q-mx-md
  .caption {{ $t('doc.options.content.lang.title') }}
    span.q-ml-sm
      help-tooltip(:text="$t('doc.options.content.lang.content')")

  q-select.select-lang__select(
    ref="selectRef",
    v-model="selectedLocale",
    :options="languages",
    option-value="code",
    option-label="label",
    dense,
    outlined,
    clearable=false,
    behavior="menu",
    :aria-label="$t('doc.options.content.lang.title')"
  ).row.inline.q-mb-lg.q-mt-lg
    template(#selected-item="scope")
      span.flag {{ current.flag }}
      span.q-ml-xs {{ current.label }}
    template(#option="{ opt, selected }")
      q-item(:active="selected", clickable, @click="selectLanguage(opt)")
        q-item-section(avatar)
          span.flag {{ opt.flag }}
        q-item-section
          span {{ opt.label }}
</template>

<style scoped>
.flag {
  font-size: 1.1rem;
}
.select-lang__select :deep(.q-field__native) {
   display: flex;
   align-items: center;
   gap: .35rem;
}
</style>
