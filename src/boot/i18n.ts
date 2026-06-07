import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import { watch } from 'vue'

import messages from 'src/i18n'

export type MessageLanguages = keyof typeof messages
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = typeof messages['en-US']

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

export default boot(({ app }) => {
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('acompas-locale') : null
  const browser = (typeof navigator !== 'undefined' && navigator.language) ? navigator.language : 'en-US'
  const available = Object.keys(messages)
  const initial = stored && available.includes(stored)
    ? stored
    : (available.includes(browser) ? browser : 'en-US')

  const i18n = createI18n({
    locale: initial,
    fallbackLocale: 'en-US',
    legacy: false,
    messages,
  })

  // Persistance réactive de la locale
  watch(() => i18n.global.locale.value, (val: string) => {
    try { localStorage.setItem('acompas-locale', val) } catch {}
  })

  // Set i18n instance on app
  app.use(i18n)
})
