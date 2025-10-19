<template>
  <boolean-checkbox-property-wrapper
    v-model="modelValue"
    :label="modelValue ? t('hide') : t('visible')"
  >
    <template #append>
      <v-tooltip location="left" width="280">
        <template #activator="{ props }">
          <v-icon v-bind="props">mdi-information-outline</v-icon>
        </template>
        <span>{{ t('hideInfo') }}</span>
      </v-tooltip>
    </template>
  </boolean-checkbox-property-wrapper>
</template>

<script lang="ts" setup>
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
const modelValue = defineModel();
</script>

<style lang="scss" scoped>
</style>

<i18n lang="json">
{
  "en": {
    "hide": "Field hidden",
    "visible": "Field hvisible",
    "hideInfo": "If checked, the form field will be hidden (not visible to the user) but expressions, calculations, or other auxiliary operations will still be executed."
  },
  "pl": {
    "hide": "Pole ukryte",
    "visible": "Pole widoczne",
    "hideInfo": "Jeśli zaznaczone, pole formularza będzie ukryte (niewidoczne dla użytkownika) ale wykonają się wyrażenia, kalkulacje lub inne pomocnicze operacje."
  }
}
</i18n>
