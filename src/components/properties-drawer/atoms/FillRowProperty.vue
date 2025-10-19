<template>
  <boolean-checkbox-property-wrapper
    v-model="modelValue"
    :label="t('fillRowProperty')"
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
        <span>{{ t('fillRowInfo') }}</span>
      </v-tooltip>
    </template>
  </boolean-checkbox-property-wrapper>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";

const modelValue = defineModel()

const {t} = useI18n()
</script>

<style lang="scss" scoped>
</style>

<i18n lang="json">
{
  "en": {
    "fillRowProperty": "Fill entire row",
    "fillRowInfo": "If checked, the element will fill the entire available space in the row. The next element will be moved to a new row."
  },
  "pl": {
    "fillRowProperty": "Wypełnij cały wiersz",
    "fillRowInfo": "Jeśli zaznaczone, element wypełni całą dostępną przestrzeń w wierszu. Kolejny element zostanie przeniesiony do nowego wiersza."
  }
}
</i18n>
