<template>
  <v-list-item>
    <v-switch
      class="mx-2"
      v-model="modelValue"
      :false-value="false"
      :true-value="true"
      hide-details="auto"
      color="primary"
      v-bind="props"
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
