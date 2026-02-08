#!/usr/bin/env node

/**
 * Script to migrate Vue SFC files from local <i18n> blocks to centralized translations
 *
 * This script:
 * 1. Removes <i18n> blocks from Vue files
 * 2. Updates useI18n() to use global scope with namespace
 *
 * Usage:
 *   node scripts/migrate-i18n.js [--dry-run]
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, dirname, basename, relative } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const CONFIG = {
  srcDir: join(__dirname, '../src/components'),
  dryRun: process.argv.includes('--dry-run'),
}

// Mapping of folder paths to namespace prefixes
const NAMESPACE_MAP = {
  'builder': 'builder',
  'elements-drawer': 'elementsDrawer',
  'main-canvas': 'mainCanvas',
  'properties-drawer/atoms': 'propertiesDrawer.atoms',
  'properties-drawer/panels': 'propertiesDrawer.panels',
  'properties-drawer/controls': 'propertiesDrawer.controls',
  'properties-drawer': 'propertiesDrawer',
}

/**
 * Recursively find all .vue files
 */
function findVueFiles(dir, files = []) {
  const entries = readdirSync(dir)
  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      findVueFiles(fullPath, files)
    } else if (entry.endsWith('.vue')) {
      files.push(fullPath)
    }
  }
  return files
}

/**
 * Check if file has i18n block
 */
function hasI18nBlock(content) {
  return /<i18n[^>]*>[\s\S]*?<\/i18n>/.test(content)
}

/**
 * Remove i18n block from content
 */
function removeI18nBlock(content) {
  return content.replace(/<i18n[^>]*>[\s\S]*?<\/i18n>\s*/g, '')
}

/**
 * Get namespace for a file based on its path
 */
function getNamespaceForFile(filePath, srcDir) {
  const relativePath = relative(srcDir, filePath)
  const dirPath = dirname(relativePath)

  // Find the most specific matching namespace
  let namespace = ''
  for (const [pathPrefix, ns] of Object.entries(NAMESPACE_MAP)) {
    if (dirPath.startsWith(pathPrefix) && pathPrefix.length > namespace.length) {
      namespace = ns
    }
  }

  // Add component-specific key based on filename
  const componentName = basename(filePath, '.vue')
  const camelCaseName = componentName.charAt(0).toLowerCase() + componentName.slice(1)

  return { namespace, componentKey: camelCaseName }
}

/**
 * Update useI18n import and usage to use global scope
 */
function updateI18nUsage(content, namespace) {
  // Check if file uses useI18n
  if (!content.includes('useI18n')) {
    return content
  }

  // Already using useTranslations - skip
  if (content.includes('useTranslations')) {
    return content
  }

  // Update the useI18n call to use global scope
  // Pattern: const {t} = useI18n() or const { t } = useI18n()
  let updated = content

  // Add global scope to useI18n call
  updated = updated.replace(
    /const\s*\{\s*t\s*\}\s*=\s*useI18n\s*\(\s*\)/g,
    `const {t} = useI18n({ useScope: 'global' })`
  )

  return updated
}

/**
 * Migrate a single file
 */
function migrateFile(filePath) {
  const content = readFileSync(filePath, 'utf-8')

  if (!hasI18nBlock(content)) {
    return { migrated: false, reason: 'No i18n block' }
  }

  const { namespace, componentKey } = getNamespaceForFile(filePath, CONFIG.srcDir)

  // Remove i18n block
  let newContent = removeI18nBlock(content)

  // Update useI18n usage
  newContent = updateI18nUsage(newContent, namespace)

  // Clean up any trailing whitespace/newlines at end of file
  newContent = newContent.trimEnd() + '\n'

  if (!CONFIG.dryRun) {
    writeFileSync(filePath, newContent, 'utf-8')
  }

  return {
    migrated: true,
    namespace,
    componentKey,
    removed: content.length - newContent.length
  }
}

/**
 * Main migration function
 */
function migrate() {
  console.log('🔄 Starting i18n migration...\n')
  console.log(CONFIG.dryRun ? '⚠️  DRY RUN MODE - No files will be modified\n' : '')

  const vueFiles = findVueFiles(CONFIG.srcDir)
  let migratedCount = 0
  let skippedCount = 0

  for (const filePath of vueFiles) {
    const relativePath = relative(join(__dirname, '..'), filePath)
    const result = migrateFile(filePath)

    if (result.migrated) {
      migratedCount++
      console.log(`✅ ${relativePath}`)
      console.log(`   Namespace: ${result.namespace}`)
      console.log(`   Removed: ${result.removed} bytes\n`)
    } else {
      skippedCount++
    }
  }

  console.log('\n📊 Migration Summary:')
  console.log(`   Migrated: ${migratedCount} files`)
  console.log(`   Skipped: ${skippedCount} files (no i18n block)`)

  if (CONFIG.dryRun) {
    console.log('\n⚠️  This was a dry run. Run without --dry-run to apply changes.')
  } else {
    console.log('\n✨ Migration complete!')
  }
}

migrate()

