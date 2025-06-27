<template>
  <v-list-item>
    <v-checkbox
      v-model="modelValue"
      :label="label"
      class="mx-2"
      hide-details="auto"
      v-bind="style.inputStyle.value"
    />
  </v-list-item>
</template>

<script lang="ts" setup>
import {useStyle} from "@/main";

const modelValue = defineModel()
const props = defineProps<{
  label: string
}>()
const style = useStyle()

</script>

<style lang="scss" scoped>
</style>
