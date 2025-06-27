<template>
  <text-property-wrapper
    v-model="modelValue"
    :label="t('modelKey')"
  />
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";

const modelValue = defineModel()
const style = useStyle()

const {t} = useI18n();

</script>

<style lang="scss" scoped>
</style>

<i18n lang="json">
{
  "en": {
    "modelKey": "Model reference"
  },
  "pl": {
    "modelKey": "Klucz w modelu"
  }
}
</i18n>
