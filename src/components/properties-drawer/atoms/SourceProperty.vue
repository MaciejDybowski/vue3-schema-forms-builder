<template>
  <v-list-item density="compact">
    <span>{{ t('configLabel') }}</span>
  </v-list-item>
  <text-property-wrapper
    v-model="modelValue.builder_url"
    :label="t('urlKey')"
  />

  <text-property-wrapper
    v-model="modelValue.title"
    :label="t('title')"
  />

  <text-property-wrapper
    v-model="modelValue['value']"
    :label="t('value')"
  />

  <text-property-wrapper
    v-model="modelValue.description"
    :label="t('description')"
  />

  <boolean-switch-property-wrapper
    v-model="modelValue.returnObject"
    :label="t('returnObject')"
  />

  <boolean-switch-property-wrapper
    v-model="modelValue.lazy"
    :label="t('lazyLoading')"
  />

  <boolean-switch-property-wrapper
    v-model="modelValue.singleOptionAutoSelect"
    :label="t('singleOptionAutoSelect')"
  />

  <boolean-switch-property-wrapper
    v-model="modelValue.multiple"
    :label="t('multiple')"
  />

  <number-property-wrapper
    v-if="modelValue.multiple"
    v-model="modelValue.maxSelection"
    :label="t('maxSelection')"
  />

</template>

<script lang="ts" setup>


import {useI18n} from "vue-i18n";
import NumberPropertyWrapper from "@/components/properties-drawer/atoms/NumberPropertyWrapper.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import BooleanSwitchPropertyWrapper from "@/components/properties-drawer/atoms/BooleanSwitchPropertyWrapper.vue";

const modelValue = defineModel<any>({
  default: () => {
  }
})

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
    "urlErrorMessage": "The address you entered is incorrect",
    "multiple": "Multiple values",
    "maxSelection": "Limit for multiple values"
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
    "urlErrorMessage": "Podany adres jest nieprawidłowy",
    "multiple": "Wiele wartości",
    "maxSelection": "Limit na wiele wartości"
  }
}
</i18n>
