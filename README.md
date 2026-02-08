### Vue3-schema-forms-builder

```shell
npm login --registry=https://nexus3.tecna.pl/repository/npm-private/
```

## Installation

```ts
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createVueSchemaFromBuilder } from 'vue3-schema-forms-builder'
import App from './App.vue'

const app = createApp(App)

// 1. Install vue-i18n (required for locale reactivity)
const i18n = createI18n({
  locale: 'pl',
  fallbackLocale: 'en',
  legacy: false,
  messages: {
    en: { /* your app translations */ },
    pl: { /* your app translations */ },
  }
})
app.use(i18n)

// 2. Install the builder - NO i18n configuration needed!
// Builder translations are self-contained via useBuilderLocale composable
app.use(createVueSchemaFromBuilder())

app.mount('#app')
```

## i18n - Zero Configuration

The builder uses a **self-contained i18n composable** (`useBuilderLocale`) that includes all translations inline. This means:

- ✅ **No configuration required** in the host application
- ✅ **No message merging** - builder translations don't pollute your app's i18n messages
- ✅ **Automatic locale sync** - inherits locale from your app's i18n instance
- ✅ **Works out of the box** after installing the plugin

### How it works

All builder components use the `useBuilderLocale` composable internally:

```ts
// Inside builder components
import { useBuilderLocale } from '@/composables/useBuilderLocale'

const { t, locale } = useBuilderLocale()
// t('label') -> "Label" (en) or "Etykieta" (pl)
```

The composable uses vue-i18n's `useScope: 'local'` with `inheritLocale: true`, so it:
1. Has its own isolated message scope (doesn't conflict with your app)
2. Automatically follows your app's current locale

### Using in your own components

If you need builder translations in your own components:

```ts
import { useBuilderLocale } from 'vue3-schema-forms-builder'

const { t } = useBuilderLocale()
console.log(t('label')) // -> "Label" or "Etykieta"
```

## Supported Locales

- English (`en`)
- Polish (`pl`)


