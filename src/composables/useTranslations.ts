/**
 * Composable for using centralized translations with namespace support
 *
 * Usage:
 *
 * // In component - using global scope with namespace prefix
 * const { t } = useTranslations('builder.chatWithAI')
 * t('helloMessage') // translates to: builder.chatWithAI.helloMessage
 *
 * // Or use full key path
 * const { t } = useTranslations()
 * t('builder.chatWithAI.helloMessage')
 */

import { useI18n } from 'vue-i18n'
import type { Composer } from 'vue-i18n'

export type TranslationNamespace =
  | 'common'
  | 'builder'
  | 'builder.chatWithAI'
  | 'builder.formNodeMock'
  | 'elementsDrawer'
  | 'elementsDrawer.drawer'
  | 'elementsDrawer.controls'
  | 'elementsDrawer.static'
  | 'mainCanvas'
  | 'propertiesDrawer.atoms'
  | 'propertiesDrawer.panels'
  | 'propertiesDrawer.controls'

/**
 * Use translations with optional namespace prefix
 *
 * @param namespace - Optional namespace prefix for all translations
 * @returns Translation function and i18n utilities
 */
export function useTranslations(namespace?: TranslationNamespace) {
  const i18n = useI18n({ useScope: 'global' })
  const { t: originalT, locale, availableLocales } = i18n

  // Create namespaced translation function
  const t = (key: string, named?: Record<string, unknown>) => {
    const fullKey = namespace ? `${namespace}.${key}` : key
    return named ? originalT(fullKey, named) : originalT(fullKey)
  }

  return {
    t,
    locale,
    availableLocales,
    i18n: i18n as Composer,
  }
}

/**
 * Helper to create translation keys with type safety
 * Useful for defining translation keys in a structured way
 */
export function createTranslationKeys<T extends Record<string, string>>(
  namespace: TranslationNamespace,
  keys: T
): { [K in keyof T]: string } {
  const result = {} as { [K in keyof T]: string }

  for (const key in keys) {
    result[key] = `${namespace}.${keys[key]}`
  }

  return result
}

export default useTranslations

