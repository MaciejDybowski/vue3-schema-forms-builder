<template>
  <v-list-item v-bind="attrs">
    <v-checkbox
      class="mr-3"
      v-model="modelValue"
      :label="label"
      v-bind="style.inputStyle.value"
    >
      <template #append>
        <slot name="append"></slot>
      </template>
    </v-checkbox>
  </v-list-item>
</template>

<script lang="ts" setup>
import {useStyle} from "@/main";
import {useAttrs} from "vue";

const attrs = useAttrs()

const modelValue = defineModel()
const props = defineProps<{
  label: string
}>()
const style = useStyle()

</script>

<style lang="scss" scoped>
</style>
