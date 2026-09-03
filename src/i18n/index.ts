import enUS from './en-US'

/**
 * en-US is the only locale bundled with the app.
 *
 * It has to be: it is the `fallbackLocale`, so vue-i18n needs it present for
 * any key another locale is missing, and `MessageSchema` in src/boot/i18n.ts
 * derives the type of every message from it.
 *
 * The other eight are fetched when someone actually asks for them. All nine
 * used to be imported here, which put roughly 40 KB gzipped of translations
 * into the main chunk so that every visitor downloaded nine languages to read
 * one.
 */
export const messages = { 'en-US': enUS }

/**
 * The rest, as loaders rather than modules.
 *
 * Written out one per line rather than with import.meta.glob so the set is
 * greppable and a typo is a build error rather than a locale that silently
 * fails to load.
 */
const loaders = {
  'fr-FR': () => import('./fr-FR'),
  'es-ES': () => import('./es-ES'),
  'ja-JP': () => import('./ja-JP'),
  'zh-CN': () => import('./zh-CN'),
  ar: () => import('./ar'),
  fa: () => import('./fa'),
  de: () => import('./de'),
  it: () => import('./it')
} as const

export type LocaleCode = 'en-US' | keyof typeof loaders

/** Every locale the app can display, whether or not it is loaded yet. */
export const availableLocales: LocaleCode[] = [
  'en-US',
  ...(Object.keys(loaders) as (keyof typeof loaders)[])
]

/** Fetch one locale's messages. Returns null for a code we do not ship. */
export async function loadLocaleMessages (code: string) {
  if (code === 'en-US') return enUS
  const loader = loaders[code as keyof typeof loaders]
  if (loader === undefined) return null
  return (await loader()).default
}

export default messages
