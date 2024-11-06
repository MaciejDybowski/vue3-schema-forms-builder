<template>
  <v-list-item density="compact">
    <span>{{ t('configLabel') }}</span>
  </v-list-item>
  <v-list-item>
    <v-textarea
      v-model="modelValue.builder_url"
      :label="t('urlKey')"
      class="pt-2"
      v-bind="style.inputStyle.value"
      rows="1"
      :auto-grow="true"
    />
  </v-list-item>
  <v-list-item>
    <v-text-field
      v-model="modelValue.title"
      :label="t('title')"
      class="pt-2"

      v-bind="style.inputStyle.value"
    />
  </v-list-item>
  <v-list-item>
    <v-text-field
      v-model="modelValue['value']"
      :label="t('value')"
      class="pt-2"

      v-bind="style.inputStyle.value"
    />
  </v-list-item>
  <v-list-item>
    <v-text-field
      v-model="modelValue.description"
      :label="t('description')"
      class="pt-2"

      v-bind="style.inputStyle.value"
    />
  </v-list-item>
  <v-list-item>
    <v-switch
      v-model="modelValue.returnObject"
      :label="t('returnObject')"
      class="mx-2"

      hide-details="auto"
      v-bind="style.inputStyle.value"
    />
  </v-list-item>
  <v-list-item>
    <v-switch
      v-model="modelValue.lazy"
      :label="t('lazyLoading')"
      class="mx-2"

      hide-details="auto"
      v-bind="style.inputStyle.value"
    />

  </v-list-item>
  <v-list-item>
    <v-switch
      v-model="modelValue.singleOptionAutoSelect"
      :label="t('singleOptionAutoSelect')"
      class="mx-2"

      hide-details="auto"
      v-bind="style.inputStyle.value"
    />
  </v-list-item>
</template>

<script lang="ts" setup>


import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";

const modelValue = defineModel<any>({
  default: () => {
  }
})

const style = useStyle()
const {t} = useI18n()

</script>

<style lang="scss" scoped>

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
