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
import {useBuilderLocale} from "@/composables/useBuilderLocale";

const {t} = useBuilderLocale();
const modelValue = defineModel();
</script>

<style lang="scss" scoped>
</style>
