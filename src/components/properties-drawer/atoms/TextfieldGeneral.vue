<template>
  <v-list-item>
    <v-text-field
      v-model="modelValue"
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

</script>

<style lang="scss" scoped>

</style>
