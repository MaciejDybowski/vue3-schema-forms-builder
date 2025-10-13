<template>
  <component :is="wrapperTag">
    <v-textarea
      v-model="modelValue"
      :auto-grow="growEnabled"
      :label="label"
      :prefix="prefix"
      :rows="rows"
      class="pt-2"
      v-bind="{...style.inputStyle.value, ...props, ...attrs}"

    />
  </component>
</template>

<script lang="ts" setup>
import {useStyle} from "@/main";
import {useAttrs} from "vue";

/*const emits = defineEmits<{
  (e: "click:append-inner")
}>();*/

const modelValue = defineModel()
const style = useStyle()
const props = withDefaults(defineProps<{
  label: string
  rows?: number
  prefix?: string | undefined
  wrapperTag?: string | undefined
  growEnabled?: boolean | undefined


}>(), {
  rows: 1,
  prefix: undefined,
  wrapperTag: "v-list-item",
  growEnabled: true,
})

const attrs = useAttrs()
</script>

<style lang="scss" scoped>

</style>
