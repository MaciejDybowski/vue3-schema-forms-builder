/**
 * Centralized i18n configuration setup
 *
 * This file provides the i18n instance configuration with support for:
 * - Lazy loading of translation modules
 * - Multiple locales (en, pl)
 * - Flat translations structure for direct access
 *
 * Usage in main app:
 *
 * import { createI18nInstance } from '@/locales/setup'
 * import { createApp } from 'vue'
 *
 * const app = createApp(App)
 * const i18n = await createI18nInstance()
 * app.use(i18n)
 */

import { createI18n, type I18nOptions } from 'vue-i18n'
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  FALLBACK_LOCALE,
  type SupportedLocale,
} from './index'

// Import all locale messages statically for the base setup
import commonEn from './common/en.json'
import commonPl from './common/pl.json'
import builderEn from './builder/en.json'
import builderPl from './builder/pl.json'
import elementsDrawerEn from './elements-drawer/en.json'
import elementsDrawerPl from './elements-drawer/pl.json'
import mainCanvasEn from './main-canvas/en.json'
import mainCanvasPl from './main-canvas/pl.json'
import atomsEn from './properties-drawer/atoms/en.json'
import atomsPl from './properties-drawer/atoms/pl.json'
import panelsEn from './properties-drawer/panels/en.json'
import panelsPl from './properties-drawer/panels/pl.json'
import controlsEn from './properties-drawer/controls/en.json'
import controlsPl from './properties-drawer/controls/pl.json'

// Compile all messages into flat locale bundles
// All keys are merged at root level for direct access via t('key')
const messages = {
  en: {
    // Common translations
    ...commonEn,
    // Builder module (prefixed to avoid conflicts)
    ...builderEn,
    // Elements drawer
    ...elementsDrawerEn,
    // Main canvas
    ...mainCanvasEn,
    // Properties drawer - atoms (flat keys)
    ...atomsEn,
    // Properties drawer - panels
    ...panelsEn,
    // Properties drawer - controls
    ...controlsEn,
  },
  pl: {
    // Common translations
    ...commonPl,
    // Builder module
    ...builderPl,
    // Elements drawer
    ...elementsDrawerPl,
    // Main canvas
    ...mainCanvasPl,
    // Properties drawer - atoms (flat keys)
    ...atomsPl,
    // Properties drawer - panels
    ...panelsPl,
    // Properties drawer - controls
    ...controlsPl,
  },
} as const

export type MessageSchema = typeof messages.en

/**
 * Create a configured i18n instance
 *
 * @param locale - Initial locale (defaults to DEFAULT_LOCALE)
 * @returns Configured i18n instance
 */
export function createI18nInstance(locale?: SupportedLocale) {
  const options: I18nOptions = {
    legacy: false, // Use Composition API
    globalInjection: true, // Enable $t in templates
    locale: locale || DEFAULT_LOCALE,
    fallbackLocale: FALLBACK_LOCALE,
    messages,
    missingWarn: process.env.NODE_ENV === 'development',
    fallbackWarn: process.env.NODE_ENV === 'development',
  }

  return createI18n(options)
}

/**
 * Detect browser locale and return supported locale
 */
export function detectBrowserLocale(): SupportedLocale {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LOCALE
  }

  const browserLang = navigator.language?.split('-')[0]

  if (SUPPORTED_LOCALES.includes(browserLang as SupportedLocale)) {
    return browserLang as SupportedLocale
  }

  return DEFAULT_LOCALE
}

/**
 * Get locale from localStorage or detect from browser
 */
export function getPersistedLocale(): SupportedLocale {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('locale')
    if (stored && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
      return stored as SupportedLocale
    }
  }

  return detectBrowserLocale()
}

/**
 * Persist locale to localStorage
 */
export function persistLocale(locale: SupportedLocale): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('locale', locale)
  }
}

export { messages }
export default createI18nInstance

