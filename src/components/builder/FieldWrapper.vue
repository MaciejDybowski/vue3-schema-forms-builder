<template>

  <div :style="calcWidth(element)">
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
import FieldWrapperItem from "@/components/builder/FieldWrapperItem.vue";
import {SchemaField} from "vue3-schema-forms/dist/vocabulary/schema/elements";

const props = defineProps<{
  element: any,
}>()


function calcWidth(element: SchemaField) {
  const isOffsetExist = !!element.layout?.offset;
  const offset = isOffsetExist ? (element.layout?.offset as number) : 0;
  const fillRow = !!element.layout?.fillRow && element.layout?.cols < 12
  const cols: number = element.layout?.cols as number
  if (fillRow) {
    const t = (12 - (offset + cols)) / 12 * 100
    return `min-width:100%; padding-right: ${t}%!important;`
  }

  return `min-width: ${(offset + cols) / 12 * 100}%;`
}
</script>

<style scoped lang="scss">

</style>
