import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import { watch } from 'vue'
import { Lang } from 'quasar'
import { logger, describeError } from 'src/utils/logger'

import enUS from 'src/i18n/en-US'
import { availableLocales, loadLocaleMessages } from 'src/i18n'

/**
 * Quasar's own language packs, keyed by the app's locale codes.
 *
 * Quasar translates its built-in component strings from these, and - the part
 * that matters here - reads `rtl` from the pack to set `dir` on the document
 * and swap in its right-to-left stylesheet. Arabic and Persian are the two
 * packs that declare it. Without this the framework stays on English and
 * left-to-right no matter what vue-i18n is showing.
 *
 * Loaded on demand for the same reason the messages are.
 */
const quasarLangPacks: Record<string, () => Promise<{ default: unknown }>> = {
  'en-US': () => import('quasar/lang/en-US'),
  'es-ES': () => import('quasar/lang/es'),
  'fr-FR': () => import('quasar/lang/fr'),
  de: () => import('quasar/lang/de'),
  it: () => import('quasar/lang/it'),
  'ja-JP': () => import('quasar/lang/ja'),
  'zh-CN': () => import('quasar/lang/zh-CN'),
  ar: () => import('quasar/lang/ar'),
  fa: () => import('quasar/lang/fa')
}

async function setQuasarLang (code: string): Promise<void> {
  const loader = quasarLangPacks[code]
  if (loader === undefined) return
  try {
    Lang.set((await loader()).default as never)
  } catch (error) {
    // Quasar staying on its previous pack must not stop the app translating,
    // but it must not be silent either: this is what sets `dir` on the
    // document, so a failure here means Arabic and Persian render
    // left-to-right with no other symptom.
    logger.error('Could not set the Quasar language pack for', code, describeError(error))
  }
}

export type MessageLanguages = 'en-US'
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = typeof enUS

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-interface */

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('palmas-locale') : null
const browser = (typeof navigator !== 'undefined' && navigator.language) ? navigator.language : 'en-US'
const initial = stored && availableLocales.includes(stored as never)
  ? stored
  : (availableLocales.includes(browser as never) ? browser : 'en-US')

// Only en-US is here at startup. Anything else arrives through setLocale below,
// which is why the boot function is async: the app must not render in English
// and then flicker into the reader's language.
export const i18n = createI18n({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  legacy: false,
  messages: { 'en-US': enUS },
})

/**
 * Switch language, fetching the messages first if this is their first use.
 *
 * Everything that changes the locale goes through here. Assigning
 * `i18n.global.locale.value` directly still works, but for a locale that has
 * not been loaded it silently falls back to English rather than failing, which
 * looks like a missing translation rather than a missing await.
 */
export async function setLocale (code: string): Promise<void> {
  if (!i18n.global.availableLocales.includes(code as never)) {
    const messages = await loadLocaleMessages(code)
    if (messages === null) return
    i18n.global.setLocaleMessage(code as never, messages as never)
  }
  // Both, in step: vue-i18n for this app's strings, Quasar for its components'
  // strings and for the text direction.
  await setQuasarLang(code)
  i18n.global.locale.value = code as never
}

/**
 * Global translate helper usable outside of components (Pinia stores,
 * composables) where `useI18n()` is unavailable. Resolves against the current
 * locale at call time. For simple key → string lookups only.
 */
export const t = (key: string): string =>
  (i18n.global.t as (k: string) => string)(key)

export default boot(async ({ app }) => {
  // Persistance réactive de la locale
  watch(() => i18n.global.locale.value, (val: string) => {
    try { localStorage.setItem('palmas-locale', val) } catch {}
  })

  // Awaited so the first paint is already in the right language.
  if (initial !== 'en-US') {
    await setLocale(initial)
  }

  // Set i18n instance on app
  app.use(i18n)
})
