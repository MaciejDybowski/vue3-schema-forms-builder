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
import {useColSizeMapper} from "@/composables/useColSizeMapper";
import {SchemaField} from "vue3-schema-forms";

const props = defineProps<{
  element: any,
}>()

const {colSize} = useColSizeMapper()

function calcWidth(element: SchemaField) {
  const isOffsetExist = !!element.layout?.offset;
  const offset = isOffsetExist ? (element.layout?.offset as number) : 0;
  const cols: number = colSize(element);
  const fillRow = !!element.layout?.fillRow && cols < 12

  if (fillRow) {
    const paddingRight = (12 - (offset + cols)) / 12 * 100
    return `min-width:100%; padding-right: ${paddingRight}%!important;`
  }

  return `min-width: ${(offset + cols) / 12 * 100}%;`
}
</script>

<style scoped lang="scss">

</style>
