<template>
  <text-property-wrapper
    :label="t('falseValueMapping')"
    :model-value="modelValue"
    @update:model-value="parseValue"
  />

</template>

<script lang="ts" setup>
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";

const modelValue = defineModel()

const {t} = useBuilderLocale()
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
