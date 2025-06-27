<template>
  <text-property-wrapper
      :label="t('trueValueMapping')"
      :model-value="modelValue"
      @update:model-value="parseValue"
  />
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";

const modelValue = defineModel()

const {t} = useI18n()
const emit = defineEmits<{
  (e: "update:modelValue", val: any): boolean | string;
}>();

function parseValue(val: string) {
  if (val === "") {
    emit("update:modelValue", null)
    return;
  }
  if (val === "true" || val === "false") {
    emit("update:modelValue", val === "true")
  } else {
    emit("update:modelValue", val)
  }
}
</script>

<style lang="scss" scoped>
</style>

<i18n lang="json">
{
  "en": {
    "trueValueMapping": "True value"
  },
  "pl": {
    "trueValueMapping": "Wartość dla prawda"
  }
}
</i18n>
