<template>
  <boolean-checkbox-property-wrapper
    v-model="modelValue"
    :label="t('readOnlyProperty')"
  />
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
    "readOnlyProperty": "Read-only property"
  },
  "pl": {
    "readOnlyProperty": "Pole tylko do odczytu"
  }
}
</i18n>
