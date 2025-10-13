<template>
  <v-list-item v-bind="attrs">
    <v-checkbox
      v-model="modelValue"
      :label="label"
      hide-details="auto"
      v-bind="style.inputStyle.value"
    />
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
