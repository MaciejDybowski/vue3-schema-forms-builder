<template>
  <v-list-item v-bind="attrs">
    <v-switch
      v-model="modelValue"
      :false-value="false"
      :true-value="true"
      class="mx-2"
      color="primary"
      density="compact"
      hide-details="auto"
      v-bind="props"
    />
  </v-list-item>
</template>

<script lang="ts" setup>
import {useStyle} from "@/main";
import {useAttrs} from "vue";

const attrs = useAttrs()
const modelValue = defineModel()
const style = useStyle()
const props = defineProps<{
  label: string
}>()

</script>

<style lang="scss" scoped>

</style>
