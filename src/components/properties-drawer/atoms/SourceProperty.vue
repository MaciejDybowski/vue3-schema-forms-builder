<template>
  <text-property-wrapper
    v-model="modelValue.builder_url"
    :label="t('urlKey')"
  />

  <template class="d-flex align-center">
    <boolean-checkbox-property-wrapper
      v-model="modelValue.returnObject"
      :label="t('returnObject')"
      class="pr-2"
    />
    <v-tooltip
      :text="t('returnObjectTooltip')"
      location="start"
      width="300"
    >
      <template v-slot:activator="{ props }">
        <v-icon v-bind="props">
          mdi-information-outline
        </v-icon>
      </template>
    </v-tooltip>
  </template>


  <template class="d-flex align-center">
    <boolean-checkbox-property-wrapper
      v-model="modelValue.singleOptionAutoSelect"
      :label="t('singleOptionAutoSelect')"
      class="pr-2"
    />
    <v-tooltip
      :text="t('autoSelectTooltip')"
      location="start"
      width="300"
    >
      <template v-slot:activator="{ props }">
        <v-icon v-bind="props">
          mdi-information-outline
        </v-icon>
      </template>
    </v-tooltip>
  </template>

  <template class="d-flex align-center">
    <boolean-checkbox-property-wrapper
      v-model="modelValue.multiple"
      :label="t('multiple')"
      class="pr-2"
    />
    <v-tooltip
      :text="t('multipleTooltip')"
      location="start"
      width="300"
    >
      <template v-slot:activator="{ props }">
        <v-icon v-bind="props">
          mdi-information-outline
        </v-icon>
      </template>
    </v-tooltip>
  </template>


  <number-property-wrapper
    v-if="modelValue.multiple"
    v-model="modelValue.maxSelection"
    :label="t('maxSelection')"
  />

  <boolean-checkbox-property-wrapper
    v-model="showAdvancedConfiguration"
    :label="t('advancedConfiguration')"
  />

  <text-property-wrapper
    v-if="showAdvancedConfiguration"
    v-model="modelValue['value']"
    :label="t('value')"
  />


  <text-property-wrapper
    v-if="showAdvancedConfiguration"
    v-model="modelValue.title"
    :label="t('title')"
  />


  <text-property-wrapper
    v-if="showAdvancedConfiguration"
    v-model="modelValue.description"
    :label="t('description')"
  />

  <boolean-checkbox-property-wrapper
    v-if="showAdvancedConfiguration"
    v-model="modelValue.lazy"
    :label="t('lazyLoading')"
  />

</template>

<script lang="ts" setup>


import {useI18n} from "vue-i18n";
import NumberPropertyWrapper from "@/components/properties-drawer/atoms/NumberPropertyWrapper.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import {ref} from "vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";

const modelValue = defineModel<any>({
  default: () => {
  }
})

const showAdvancedConfiguration = ref(false)


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
    "value": "Value mapping",
    "title": "Title mapping",
    "description": "Description mapping",
    "returnObject": "Save object",
    "lazyLoading": "Lazy loading",
    "singleOptionAutoSelect": "Auto select value",
    "urlErrorMessage": "The address you entered is incorrect",
    "multiple": "Allow multiple values",
    "maxSelection": "Limit for multiple values",
    "returnObjectTooltip": "If this option is enabled, the entire object will be saved in the form model, containing for example the identifier and label. If the option is disabled, only the valueMapping defined in the dictionary URL will be saved.",
    "autoSelectTooltip": "If this option is enabled, the system activates the automatic value selection mechanism for dictionary fields in the form. When the returned list of elements contains only one item, the field will be auto-filled with that value. Enabling this option is recommended to accelerate filtering and searching capabilities in the form",
    "multipleTooltip": "If this option is enabled, the system saves an array of values in the form.",
    "advancedConfiguration": "Advanced configuration"
  },
  "pl": {
    "configLabel": "Konfiguracja słownika",
    "workspaceId": "Workspace Id (builder purpose)",
    "propertyDescription": "Konfiguracja słownika",
    "urlKey": "Adres URL słownika",
    "value": "Mapowanie Id",
    "title": "Mapowanie Etykiety",
    "description": "Mapowanie opisu",
    "returnObject": "Zapisz obiekt",
    "lazyLoading": "Stronicowanie wyników",
    "singleOptionAutoSelect": "Automatyczny wybór wartości",
    "urlErrorMessage": "Podany adres jest nieprawidłowy",
    "multiple": "Zezwalaj na wiele wartości",
    "maxSelection": "Limit na wiele wartości",
    "returnObjectTooltip": "Jeżeli opcja jest włączona, w modelu formularza zapisywany będzie cały obiekt, zawierający na przykład identyfikator oraz etykietę. Gdy opcja jest wyłączona, w modelu zapisywane będzie wyłącznie valueMapping zdefiniowane w adresie URL słownika",
    "autoSelectTooltip": "Jeżeli opcja jest włączona, działa mechanizm automatycznego wyboru wartości słownika w polu formularza, gdy lista zwróconych elementów zawiera tylko jedną pozycję. Zaleca się aktywację tej opcji, aby przyspieszyć filtrowanie oraz wyszukiwanie w formularzach",
    "multipleTooltip": "Jeżeli opcja jest włączona, w modelu formularza zapisywana jest tablica wartości",
    "advancedConfiguration": "Konfiguracja zaawansowana"
  }
}
</i18n>
