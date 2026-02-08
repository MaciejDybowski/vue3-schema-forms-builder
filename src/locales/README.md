# Centralized i18n Translations

## Overview

This directory contains centralized translations for the Vue Schema Forms Builder application.
All translations have been migrated from component-level `<i18n>` blocks to centralized JSON files.

## Directory Structure

```
src/locales/
├── index.ts                     # Main exports and utility functions
├── setup.ts                     # i18n instance configuration
├── README.md                    # This documentation
│
├── common/                      # Shared translations
│   ├── en.json
│   └── pl.json
│
├── builder/                     # Builder components (ChatWithAI, FormNodeMock)
│   ├── en.json
│   └── pl.json
│
├── elements-drawer/             # Elements drawer (form/page elements)
│   ├── en.json
│   └── pl.json
│
├── main-canvas/                 # Main canvas translations
│   ├── en.json
│   └── pl.json
│
└── properties-drawer/           # Properties drawer translations
    ├── atoms/                   # Atomic property components
    │   ├── en.json
    │   └── pl.json
    ├── panels/                  # Panel components
    │   ├── en.json
    │   └── pl.json
    └── controls/                # Control property components
        ├── en.json
        └── pl.json
```

## Supported Locales

- `en` - English (fallback)
- `pl` - Polish (default)

## How It Works

All translations are merged into a flat structure at runtime. This means:
- Components use `useI18n({ useScope: 'global' })` 
- Translation keys are accessed directly: `t('hint')`, `t('label')`, etc.
- Nested keys are still supported: `t('controls.text')`, `t('validations.title')`

## Usage

### In Vue Components

```typescript
import { useI18n } from 'vue-i18n'

// Use global scope (required after migration)
const { t } = useI18n({ useScope: 'global' })

// Access translations
const label = t('label')           // Direct key
const title = t('validations.title') // Nested key
```

### In Templates

```vue
<template>
  <span>{{ t('hint') }}</span>
  <span>{{ $t('controls.text') }}</span>
</template>
```

## Adding New Translations

1. Add the key to the appropriate JSON file (both `en.json` and `pl.json`)
2. Use the key in your component with `t('keyName')`

### Example

```json
// src/locales/properties-drawer/atoms/en.json
{
  "myNewKey": "My new translation"
}

// src/locales/properties-drawer/atoms/pl.json
{
  "myNewKey": "Moje nowe tłumaczenie"
}
```

## Scripts

```bash
# Extract translations from legacy <i18n> blocks (if any remain)
npm run i18n:extract

# Preview extraction without changes
npm run i18n:extract:dry

# Migrate components (remove <i18n> blocks, update useI18n)
npm run i18n:migrate

# Preview migration without changes  
npm run i18n:migrate:dry
```

## Configuration

### Vite (vite.config.ts)

```typescript
VueI18nPlugin({
  include: [
    path.resolve(__dirname, "./src/locales/**/*.json"),
  ],
})
```

### i18n Instance (src/locales/setup.ts)

- Composition API mode (`legacy: false`)
- Global injection enabled (`globalInjection: true`)
- Default locale: `pl`
- Fallback locale: `en`