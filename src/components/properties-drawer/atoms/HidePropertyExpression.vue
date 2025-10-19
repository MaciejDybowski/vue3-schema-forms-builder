<template>
  <text-property-wrapper
    v-model="modelValue"
    :label="modelValue ? t('hide') : t('visible')"
  >
    <template #append-inner>
      <v-tooltip location="left" width="280">
        <template #activator="{ props }">
          <v-icon v-bind="props">mdi-information-outline</v-icon>
        </template>
        <span>{{ t('hideInfoExpression') }}</span>
      </v-tooltip>
    </template>
  </text-property-wrapper>
</template>

<script lang="ts" setup>
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import {useI18n} from "vue-i18n";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";

const {t} = useI18n();
const modelValue = defineModel();
</script>

<style lang="scss" scoped>
</style>

<i18n lang="json">
{
  "en": {
    "hide": "Field hidden (expression)",
    "visible": "Field visible (expression)",
    "hideInfoExpression": "Use an expression to determine when the form field should be hidden (not visible to the user). The expression should return a true or false value"
  },
  "pl": {
    "hide": "Pole ukryte (wyrażenie)",
    "visible": "Pole widoczne (wyrażenie)",
    "hideInfoExpression": "Użyj wyrażenia, aby określić, kiedy pole formularza ma być ukryte (niewidoczne dla użytkownika). Wyrażenie powinno zwracać wartość true lub false"
  }
}
</i18n>
