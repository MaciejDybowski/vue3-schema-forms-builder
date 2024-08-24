<template>
  <v-list-item>
    <v-text-field
      :model-value="modelValue"
      @update:model-value="parseValue"
      :label="t('trueValueMapping')"
      class="pt-2"
      v-bind="style.inputStyle.value"
    />
  </v-list-item>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";

const modelValue = defineModel()
const style = useStyle()

const {t} = useI18n()
const emit = defineEmits<{
  (e: "update:modelValue", val: any): boolean | string;
}>();
function parseValue(val: string) {
  if(val === ""){
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
