<template>
  <v-list-item>
    <v-text-field
      :model-value="modelValue"
      @update:model-value="parseValue"
      :label="label"
      class="pt-2"
      v-bind="style.inputStyle.value"
    />
  </v-list-item>
</template>

<script lang="ts" setup>
import {useStyle} from "@/main";

const modelValue = defineModel()
const style = useStyle()
const props = defineProps<{
  label: string
}>()
const emit = defineEmits<{
  (e: "update:modelValue", val: number|null): number;
}>();

function parseValue(val: string) {
  emit("update:modelValue", isNaN(parseInt(val)) ? null : parseInt(val))
}

</script>

<style lang="scss" scoped>

</style>
