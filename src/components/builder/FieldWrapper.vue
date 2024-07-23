<template>
  <div
    :style="calcWidth(element)"
    class="mb-3"
  >
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <field-wrapper-item
          :is-hovering="isHovering"
          :element="element"
          v-bind="props"
        />
      </template>
    </v-hover>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import FieldWrapperItem from "./FieldWrapperItem.vue";
import {SchemaField} from "vue3-schema-forms/dist/vocabulary/schema/elements";
import {useCanvas} from "@/composables/useCanvas";

const props = defineProps<{
  element: any,
}>()

const {canvasMode} = useCanvas()

function calcWidth(element: SchemaField) {
  const isOffsetExist = !!element.layout?.offset;
  const offset = isOffsetExist ? (element.layout?.offset as number) : 0;
  const cols: number = getColSize(element);
  const fillRow = !!element.layout?.fillRow && cols < 12

  if (fillRow) {
    const paddingRight = (12 - (offset + cols)) / 12 * 100
    return `min-width:100%; padding-right: ${paddingRight}%!important;`
  }

  return `min-width: ${(offset + cols) / 12 * 100}%;`
}

function getColSize(element: SchemaField): number {
  switch (canvasMode.value) {
    case "DESKTOP":
      return element.layout.cols.xxl
    case "MOBILE":
      return element.layout.cols.xs
    case "TABLET":
      return element.layout.cols.md
    default:
      return 12
  }
}
</script>

<style scoped lang="scss">

</style>
