/**
 * Centralized i18n configuration for Vue Schema Forms Builder
 *
 * This module provides:
 * - Lazy loading of translations by namespace
 * - Type-safe translation keys
 * - Easy namespace management
 */

import type { I18n } from 'vue-i18n'

// Supported locales
export const SUPPORTED_LOCALES = ['en', 'pl'] as const
export type SupportedLocale = typeof SUPPORTED_LOCALES[number]

// Default locale
export const DEFAULT_LOCALE: SupportedLocale = 'pl'
export const FALLBACK_LOCALE: SupportedLocale = 'en'

// Available namespaces - matching folder structure
export const NAMESPACES = [
  'common',
  'builder',
  'elements-drawer',
  'main-canvas',
  'properties-drawer.atoms',
  'properties-drawer.panels',
  'properties-drawer.controls',
] as const

export type Namespace = typeof NAMESPACES[number]

/**
 * Lazy load translation messages for a specific namespace and locale
 */
export async function loadNamespaceMessages(
  namespace: Namespace,
  locale: SupportedLocale
): Promise<Record<string, any>> {
  const [mainNs, subNs] = namespace.split('.') as [string, string?]

  try {
    if (subNs) {
      // Nested namespace (e.g., properties-drawer.atoms)
      const messages = await import(`./${mainNs}/${subNs}/${locale}.json`)
      return messages.default || messages
    } else {
      // Top-level namespace
      const messages = await import(`./${mainNs}/${locale}.json`)
      return messages.default || messages
    }
  } catch (error) {
    console.warn(`Failed to load translations for namespace "${namespace}" locale "${locale}"`, error)
    return {}
  }
}

/**
 * Load all namespaces for a specific locale
 */
export async function loadAllMessages(locale: SupportedLocale): Promise<Record<string, any>> {
  const allMessages: Record<string, any> = {}

  for (const namespace of NAMESPACES) {
    const messages = await loadNamespaceMessages(namespace, locale)
    const namespaceKey = namespace.replace('.', '_')
    allMessages[namespaceKey] = messages
  }

  return allMessages
}

/**
 * Register a namespace with the i18n instance
 * Useful for lazy loading namespaces on demand
 */
export async function registerNamespace(
  i18n: I18n,
  namespace: Namespace,
  locale?: SupportedLocale
): Promise<void> {
  const targetLocale = locale || (i18n.global.locale as unknown as SupportedLocale)
  const messages = await loadNamespaceMessages(namespace, targetLocale)
  const namespaceKey = namespace.replace('.', '_')

  // Merge with existing messages
  const existingMessages = i18n.global.getLocaleMessage(targetLocale)
  i18n.global.setLocaleMessage(targetLocale, {
    ...existingMessages,
    [namespaceKey]: messages,
  })
}

