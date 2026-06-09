import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * i18n locale → Wikipedia language subdomain.
 * Restricted to the "major" languages whose flamenco articles are reliably
 * present. Locales absent from this map (ja-JP, zh-CN, ar, fa) intentionally
 * fall back to the static `doc` field, where the corresponding articles are
 * often missing or stubs.
 */
const LOCALE_TO_WIKI: Record<string, string> = {
  'en-US': 'en',
  'es-ES': 'es',
  'fr-FR': 'fr',
  de: 'de',
  it: 'it',
}

interface WikiResult {
  // Intro HTML (`extract_html`) of the article.
  html: string
  // Canonical URL of the localized article (null → fall back to English URL).
  url: string | null
}

// Memoize across dialog open/close and pattern switches. Key: `${lang}|${url}`.
const cache = new Map<string, WikiResult>()

interface WikiPage {
  langlinks?: { '*'?: string }[]
}

interface WikiSummary {
  extract_html?: string
  extract?: string
  content_urls?: { desktop?: { page?: string } }
}

const titleFromUrl = (url: string): string => {
  const part = url.split('/wiki/')[1]
  return part ? decodeURIComponent(part) : ''
}

/**
 * Resolve the intro summary (`extract_html`) of an English Wikipedia article in
 * the target language. Returns null when there is no translated article, no
 * usable title, or the request fails — the caller then falls back to `doc`.
 */
async function fetchExtract(enUrl: string, wikiLang: string): Promise<WikiResult | null> {
  const enTitle = titleFromUrl(enUrl)
  if (!enTitle) return null

  let lang = 'en'
  let title = enTitle

  // English article → resolve the equivalent title in the target language.
  if (wikiLang !== 'en') {
    const llUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=langlinks&titles=${encodeURIComponent(enTitle)}&lllang=${wikiLang}&redirects=1&format=json&origin=*`
    const res = await fetch(llUrl)
    if (!res.ok) return null
    const data = await res.json()
    const pages = data?.query?.pages as Record<string, WikiPage> | undefined
    const localized = pages && Object.values(pages)[0]?.langlinks?.[0]?.['*']
    if (!localized) return null
    lang = wikiLang
    title = localized
  }

  const sumUrl = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
  const res = await fetch(sumUrl)
  if (!res.ok) return null
  const data = await res.json() as WikiSummary
  const html = data?.extract_html || data?.extract
  if (!html) return null
  return { html, url: data?.content_urls?.desktop?.page ?? null }
}

/**
 * Fetches the localized Wikipedia intro for a pattern's `wikipediaUrl`.
 * `extract` stays null on any failure so the component can fall back to `doc`.
 */
export function useWikipediaExtract() {
  const { locale } = useI18n()
  const extract = ref<string | null>(null)
  // Localized article URL, available only when an extract was fetched.
  const articleUrl = ref<string | null>(null)
  const loading = ref(false)

  let token = 0

  async function load(enUrl: string | undefined) {
    const current = ++token
    extract.value = null
    articleUrl.value = null

    const wikiLang = LOCALE_TO_WIKI[locale.value]
    if (!enUrl || !wikiLang) return // unsupported locale or no URL → fall back to doc

    const key = `${wikiLang}|${enUrl}`
    const cached = cache.get(key)
    if (cached !== undefined) {
      extract.value = cached.html
      articleUrl.value = cached.url
      return
    }

    loading.value = true
    try {
      const result = await fetchExtract(enUrl, wikiLang)
      if (current !== token) return // a newer load() superseded this one
      if (result) {
        cache.set(key, result)
        extract.value = result.html
        articleUrl.value = result.url
      }
    } catch {
      // network/parse error → leave extract null → fall back to doc
    } finally {
      if (current === token) loading.value = false
    }
  }

  return { extract, articleUrl, loading, load }
}
