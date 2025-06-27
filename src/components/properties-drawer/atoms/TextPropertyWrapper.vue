<template>
  <v-list-item>
    <v-textarea
      v-model="modelValue"
      :auto-grow="true"
      :label="label"
      :prefix="prefix"
      :rows="rows"
      class="pt-2"
      v-bind="{...style.inputStyle.value}"
    />
  </v-list-item>
</template>

<script lang="ts" setup>
import {useStyle} from "@/main";
import {useAttrs} from "vue";

const modelValue = defineModel()
const style = useStyle()
const props = withDefaults(defineProps<{
  label: string
  rows?: number
  prefix?: string | undefined
}>(), {
  rows: 1,
  prefix: undefined
})

const attrs = useAttrs()
</script>

<style lang="scss" scoped>

</style>
