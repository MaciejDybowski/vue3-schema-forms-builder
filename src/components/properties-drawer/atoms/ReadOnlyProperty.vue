<template>
  <boolean-checkbox-property-wrapper
    v-model="modelValue"
    :label="t('readOnlyProperty')"
  />
</template>

<script lang="ts" setup>
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";

const modelValue = defineModel()

const {t} = useBuilderLocale()

</script>

<style lang="scss" scoped>
</style>
