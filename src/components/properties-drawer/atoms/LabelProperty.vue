<template>
  <text-property-wrapper
    v-model="labelValue"
    :label="t('label')"
    :prefix="isReference ? prefix : ''"
  />

  <boolean-checkbox-property-wrapper
    v-model="isReference"
    :label="t('useReference')"
    @change="referenceChangedTrigger"
  >
    <template #append>
      <v-tooltip
        location="left"
        width="300"
      >
        <template #activator="{ props }">
          <v-icon
            v-bind="props">
            mdi-information-outline
          </v-icon>
        </template>
        <span>{{ t('useReferenceInfo') }}</span>
      </v-tooltip>
    </template>
  </boolean-checkbox-property-wrapper>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useTranslateInput} from "@/composables/useTranslateInput";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";

const modelValue = defineModel<any>();
const {t} = useI18n();
const {prefix, isReference, referenceChanged, getValueForInput} = useTranslateInput();

const labelValue = getValueForInput('label', modelValue);

function referenceChangedTrigger() {
  referenceChanged(modelValue, "label", labelValue.value);
}
</script>

<style lang="scss" scoped></style>

<i18n lang="json">
{
  "en": {
    "label": "Label",
    "useReference": "Use Reference for translation",
    "useReferenceInfo": "This option allows to use the reference mechanism for translating form fields. These translations should be prepared accordingly on the service side that handles the given form."
  },
  "pl": {
    "label": "Etykieta",
    "useReference": "Użyj referencji do tłumaczenia",
    "useReferenceInfo": "Opcja ta umożliwia na użycie mechanizmu referencji to tłumaczeń pól formularza. Tłumaczenia te powinny zostać przygotowane w odpowiedni sposób po stronie usługi, która obsługuje dany formularz."
  }
}
</i18n>
