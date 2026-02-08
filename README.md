<img src="./public/logo-builder.png" alt="Vue3 Schema Forms Builder" width="320" />

# Vue3 Schema Forms Builder

Extensible visual builder for the [`vue3-schema-forms`](https://github.com/MaciejDybowski/vue3-schema-forms) library.


## Key features

- Intuitive form editor (drag & drop)
- Form schema generation (JSON / JSON Schema)
- Integration with [`vue3-schema-forms`](https://github.com/MaciejDybowski/vue3-schema-forms)
- i18n support (composition API `useBuilderLocale`)

---

## Installation

This repository is an example builder package. If you want to publish it as an npm package, the assumed name is `vue3-schema-forms-builder`.

Install (example):

```bash
npm install vue3-schema-forms-builder
```

Required peer-dependencies (example):

```bash
npm install vue@^3.5 vuetify@^3.8 vue-i18n@^9.0 vuedraggable@^4.1
```

---

## Quick start

Example of adding the builder to a Vue 3 (TypeScript) application:

```ts
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createVueSchemaFromBuilder } from 'vue3-schema-forms-builder'
import App from './App.vue'

const app = createApp(App)

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  legacy: false,
  messages: {
    en: {},
    pl: {}
  }
})

app.use(i18n)
app.use(createVueSchemaFromBuilder())
app.mount('#app')
```

Using the component in an SFC:

```vue
<template>
  <div>
    <VueSchemaFormsBuilder v-model="jsonForm"/>
  </div>
</template>

<script setup lang="ts">
  import {VueSchemaFormsBuilder} from 'vue3-schema-forms-builder'
  import {ref} from "vue";

  const jsonForm = ref({
    properties: {},
    i18n: {},
    options: {},
  });
</script>
```


## i18n and locales

The builder is prepared to work with `vue-i18n` and provides:

- `useBuilderLocale` which inherits the app locale,
- built-in translations (pl / en),

---

## Tests / Storybook

Run tests and Storybook (if available):

```bash
npm install
npm test
npm run storybook
npm run vitest-storybook
```

---

## Contributing

Thanks for your contribution! A few steps to get started:

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-feature`
3. Make commits and push
4. Open a Pull Request

Please add tests / stories for new features and update the changelog.

---

## Contact

Have questions? Open an Issue or get in touch.

Related runtime: https://github.com/MaciejDybowski/vue3-schema-forms
