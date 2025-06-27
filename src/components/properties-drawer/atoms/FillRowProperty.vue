<template>
  <boolean-switch-property-wrapper
    v-model="modelValue"
    :label="t('fillRowProperty')"
  />
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import BooleanSwitchPropertyWrapper from "@/components/properties-drawer/atoms/BooleanSwitchPropertyWrapper.vue";

const modelValue = defineModel()

const {t} = useI18n()
</script>

<style lang="scss" scoped>
</style>

<i18n lang="json">
{
  "en": {
    "fillRowProperty": "Fill row to the end"
  },
  "pl": {
    "fillRowProperty": "Wypełnij do końca wiersza"
  }
}
</i18n>
