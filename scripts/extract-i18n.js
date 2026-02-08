#!/usr/bin/env node

/**
 * Script to extract i18n translations from Vue SFC files
 *
 * This script scans all .vue files in the project and extracts
 * <i18n> blocks to centralized JSON files.
 *
 * Usage:
 *   node scripts/extract-i18n.js
 *   node scripts/extract-i18n.js --dry-run    # Preview changes without writing
 *   node scripts/extract-i18n.js --output ./src/locales/extracted
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import { join, dirname, basename, relative } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Configuration
const CONFIG = {
  srcDir: join(__dirname, '../src'),
  outputDir: join(__dirname, '../src/locales/extracted'),
  supportedLocales: ['en', 'pl'],
  dryRun: process.argv.includes('--dry-run'),
}

// Override output directory if specified
const outputIndex = process.argv.indexOf('--output')
if (outputIndex !== -1 && process.argv[outputIndex + 1]) {
  CONFIG.outputDir = join(__dirname, '..', process.argv[outputIndex + 1])
}

/**
 * Recursively find all .vue files in a directory
 */
function findVueFiles(dir, files = []) {
  const entries = readdirSync(dir)

  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)

    if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
      findVueFiles(fullPath, files)
    } else if (entry.endsWith('.vue')) {
      files.push(fullPath)
    }
  }

  return files
}

/**
 * Extract i18n block content from a Vue file
 */
function extractI18nBlock(content) {
  const i18nMatch = content.match(/<i18n[^>]*>([\s\S]*?)<\/i18n>/)

  if (!i18nMatch) {
    return null
  }

  try {
    return JSON.parse(i18nMatch[1].trim())
  } catch (error) {
    console.warn(`Failed to parse i18n JSON: ${error.message}`)
    return null
  }
}

/**
 * Convert file path to namespace key
 * e.g., src/components/builder/ChatWithAI.vue -> builder.chatWithAI
 */
function pathToNamespace(filePath, srcDir) {
  const relativePath = relative(join(srcDir, 'components'), filePath)
  const parts = relativePath.replace(/\.vue$/, '').split('/')

  // Convert to camelCase for the component name
  const componentName = parts[parts.length - 1]
  const camelCaseName = componentName.charAt(0).toLowerCase() + componentName.slice(1)
  parts[parts.length - 1] = camelCaseName

  return parts.join('.')
}

/**
 * Group extracted translations by module
 */
function groupByModule(extractions) {
  const modules = {}

  for (const extraction of extractions) {
    const parts = extraction.namespace.split('.')
    const moduleName = parts[0] // e.g., 'builder', 'properties-drawer'

    if (!modules[moduleName]) {
      modules[moduleName] = {}
    }

    // Use the remaining path as the key within the module
    const subKey = parts.slice(1).join('.') || parts[0]

    for (const locale of CONFIG.supportedLocales) {
      if (!modules[moduleName][locale]) {
        modules[moduleName][locale] = {}
      }

      if (extraction.translations[locale]) {
        modules[moduleName][locale][subKey] = extraction.translations[locale]
      }
    }
  }

  return modules
}

/**
 * Main extraction function
 */
function extractAll() {
  console.log('🔍 Scanning for Vue files with i18n blocks...\n')

  const vueFiles = findVueFiles(CONFIG.srcDir)
  const extractions = []

  for (const filePath of vueFiles) {
    const content = readFileSync(filePath, 'utf-8')
    const translations = extractI18nBlock(content)

    if (translations) {
      const namespace = pathToNamespace(filePath, CONFIG.srcDir)
      const relativePath = relative(CONFIG.srcDir, filePath)

      extractions.push({
        file: relativePath,
        namespace,
        translations,
      })

      console.log(`✅ Found: ${relativePath}`)
      console.log(`   Namespace: ${namespace}`)
      console.log(`   Locales: ${Object.keys(translations).join(', ')}\n`)
    }
  }

  console.log(`\n📊 Total files with i18n blocks: ${extractions.length}\n`)

  // Group by module
  const modules = groupByModule(extractions)

  // Output results
  if (CONFIG.dryRun) {
    console.log('🔄 DRY RUN - No files will be written\n')
    console.log('Extracted modules:', Object.keys(modules))

    for (const [moduleName, locales] of Object.entries(modules)) {
      console.log(`\n📁 Module: ${moduleName}`)
      for (const locale of CONFIG.supportedLocales) {
        if (locales[locale]) {
          console.log(`   ${locale}.json: ${Object.keys(locales[locale]).length} keys`)
        }
      }
    }
  } else {
    // Create output directory
    if (!existsSync(CONFIG.outputDir)) {
      mkdirSync(CONFIG.outputDir, { recursive: true })
    }

    // Write module files
    for (const [moduleName, locales] of Object.entries(modules)) {
      const moduleDir = join(CONFIG.outputDir, moduleName)

      if (!existsSync(moduleDir)) {
        mkdirSync(moduleDir, { recursive: true })
      }

      for (const locale of CONFIG.supportedLocales) {
        if (locales[locale]) {
          const outputPath = join(moduleDir, `${locale}.json`)
          writeFileSync(outputPath, JSON.stringify(locales[locale], null, 2), 'utf-8')
          console.log(`📝 Written: ${relative(process.cwd(), outputPath)}`)
        }
      }
    }

    console.log('\n✨ Extraction complete!')
  }

  // Generate summary report
  console.log('\n📋 Summary Report:')
  console.log('─'.repeat(50))

  const report = extractions.map(e => ({
    file: e.file,
    namespace: e.namespace,
    locales: Object.keys(e.translations),
    keyCount: Object.values(e.translations).reduce((sum, t) =>
      sum + (typeof t === 'object' ? Object.keys(t).length : 1), 0
    ),
  }))

  // Write report
  const reportPath = join(CONFIG.outputDir, 'extraction-report.json')
  if (!CONFIG.dryRun) {
    if (!existsSync(CONFIG.outputDir)) {
      mkdirSync(CONFIG.outputDir, { recursive: true })
    }
    writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8')
    console.log(`📄 Report written to: ${relative(process.cwd(), reportPath)}`)
  }
}

// Run
extractAll()

