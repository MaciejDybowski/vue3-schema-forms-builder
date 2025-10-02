<template>
  <v-list-item>
    <v-select
      v-model="modelValue"
      :items="attrs.items"
      :label="label"
      class="pt-2"
      clearable
      v-bind="{...style.inputStyle.value, ...props, ...attrs}"
      v-on="attrs"
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
