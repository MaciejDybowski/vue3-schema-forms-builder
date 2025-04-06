<template>
  <v-col
    ref="colRef"
    :cols="colSize(element)"
    :style="calcWidth(element)"
    class="pa-0 ma-0 mb-3 "
  >
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <field-wrapper-item
          :element="element"
          :is-hovering="isHovering"
          v-bind="props"
        />
      </template>
    </v-hover>
  </v-col>
</template>

<script lang="ts" setup>
// @ts-nocheck
import FieldWrapperItem from "./FieldWrapperItem.vue";
import {useColSizeMapper} from "@/composables/useColSizeMapper";
import {SchemaField} from "vue3-schema-forms";
import {nextTick, onMounted, ref} from "vue";

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
    return `min-width:${(offset + cols) / 12 * 100}%; margin-right: ${(remainingSpace.value / 12) * 100}%!important;`
  }
  return `min-width: ${(offset + cols) / 12 * 100}%;`
}

const isLastInRow = ref(false);
const remainingSpace = ref(0);
const colRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  await nextTick(() => {
    if (colRef.value) {
      //@ts-ignore
      const el = colRef.value.$el as HTMLElement;
      let parentRow = el.closest(".v-row");
      if (!parentRow) return;

      let siblings = Array.from(parentRow.children) as HTMLElement[];
      let totalCols = 0;

      for (let i = 0; i < siblings.length; i++) {
        let sibling = siblings[i];
        let match = sibling.className.match(/col-(\d+)/);
        let offsetMatch = sibling.className.match(/offset-(\d+)/);
        let siblingCols = match ? parseInt(match[1]) : 0;
        let siblingOffset = offsetMatch ? parseInt(offsetMatch[1]) : 0;

        if (totalCols + siblingCols + siblingOffset > 12) {
          totalCols = 0;
        }
        totalCols += siblingCols + siblingOffset;
        if (sibling === el) {
          isLastInRow.value = totalCols === 12;
          remainingSpace.value = 12 - totalCols;
          break;
        }
      }
    }
  });
});
</script>

<style lang="scss" scoped>

</style>
