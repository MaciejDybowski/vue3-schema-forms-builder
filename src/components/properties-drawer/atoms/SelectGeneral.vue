<template>
  <v-list-item>
    <v-select
      v-model="modelValue"
      :label="label"
      class="pt-2"
      v-on="attrs"
      v-bind="{...style.inputStyle.value, ...props}"
      :items="attrs.items"
    />
  </v-list-item>
</template>

<script lang="ts" setup>
import {useStyle} from "@/main";
import {onMounted, useAttrs} from "vue";

const attrs = useAttrs()
const modelValue = defineModel()
const style = useStyle()
const props = defineProps<{
  label: string
}>()



</script>

<style lang="scss" scoped>

</style>
