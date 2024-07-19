<template>
  <v-list-item density="compact">
    <span>{{ t('configLabel') }}</span>
  </v-list-item>
  <v-list-item>
    <v-text-field
      class="pt-2"
      :label="t('urlKey')"
      v-model="modelValue.builder_url"
      v-bind="style.inputStyle.value"
    />
  </v-list-item>
  <v-list-item>
    <v-text-field
      class="pt-2"
      :label="t('title')"
      v-model="modelValue.title"

      v-bind="style.inputStyle.value"
    />
  </v-list-item>
  <v-list-item>
    <v-text-field
      class="pt-2"
      :label="t('value')"
      v-model="modelValue['value']"

      v-bind="style.inputStyle.value"
    />
  </v-list-item>
  <v-list-item>
    <v-text-field
      class="pt-2"
      :label="t('description')"
      v-model="modelValue.description"

      v-bind="style.inputStyle.value"
    />
  </v-list-item>
  <v-list-item>
    <v-switch
      class="mx-2"
      :label="t('returnObject')"
      v-model="modelValue.returnObject"

      v-bind="style.inputStyle.value"
      hide-details="auto"
    />
  </v-list-item>
  <v-list-item>
    <v-switch
      class="mx-2"
      :label="t('lazyLoading')"
      v-model="modelValue.lazy"

      v-bind="style.inputStyle.value"
      hide-details="auto"
    />

  </v-list-item>
  <v-list-item>
    <v-switch
      class="mx-2"
      :label="t('singleOptionAutoSelect')"
      v-model="modelValue.singleOptionAutoSelect"

      v-bind="style.inputStyle.value"
      hide-details="auto"
    />
  </v-list-item>
</template>

<script setup lang="ts">


import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";

const modelValue = defineModel<any>({
  default: () => {
  }
})

const style = useStyle()
const {t} = useI18n()

</script>

<style scoped lang="scss">

</style>

<i18n lang="json">
{
  "en": {
    "configLabel": "Dictionary configuration",
    "workspaceId": "Workspace Id (builder purpose)",
    "propertyDescription": "Dictionary configuration",
    "urlKey": "URL address dictionary",
    "value": "Value",
    "title": "Title",
    "description": "Description",
    "returnObject": "Return object",
    "lazyLoading": "Lazy loading",
    "singleOptionAutoSelect": "Auto select when single",
    "urlErrorMessage": "The address you entered is incorrect"
  },
  "pl": {
    "configLabel": "Konfiguracja słownika",
    "workspaceId": "Workspace Id (builder purpose)",
    "propertyDescription": "Konfiguracja słownika",
    "urlKey": "Adres URL słownika",
    "value": "Id",
    "title": "Tytuł",
    "description": "Opis dodatkowy",
    "returnObject": "Zwracaj obiekt",
    "lazyLoading": "Stronicowanie wyników",
    "singleOptionAutoSelect": "Auto wybieranie, gdy pojedyncza wartość",
    "urlErrorMessage": "Podany adres jest nieprawidłowy"
  }
}
</i18n>
