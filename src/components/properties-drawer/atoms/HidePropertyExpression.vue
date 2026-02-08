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
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";

const {t} = useBuilderLocale();
const modelValue = defineModel();
</script>

<style lang="scss" scoped>
</style>
