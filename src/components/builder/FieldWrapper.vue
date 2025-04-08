<template>
  <v-col
    ref="colRef"
    :cols="cols"
    :style="width"
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
import {computed, onMounted, ref} from "vue";

const props = defineProps<{
  element: any,
}>()

const {colSize} = useColSizeMapper()
const cols = computed(() => colSize(props.element))
const fillRow = computed(() => !!props.element.layout?.fillRow && cols.value < 12)

const width = computed(() => {
  const isOffsetExist = !!props.element.layout?.offset;
  const offset = isOffsetExist ? (props.element.layout?.offset as number) : 0;

  if (fillRow.value) {
    calculate()
    return `min-width: ${(offset + cols) / 12 * 100}%; margin-right: ${(fillToEnd.value / 12) * 100}%!important;`
  }
  return `min-width: ${(offset + cols) / 12 * 100}%;`
})

const colRef = ref<HTMLElement | null>(null);
const fillToEnd = ref(0)

function calculate() {
  const parentRow = colRef.value.$el.closest('.v-row'); // szukamy <v-row> po DOM
  if (!parentRow) {
    console.warn('Nie znaleziono v-row');
    return;
  }

  const cols = Array.from(parentRow.querySelectorAll('.v-col'));

  const index = cols.findIndex(c => c.contains(colRef.value?.$el));
  //console.log('Mój index:', index);

  let position = 0;
  const structure = cols.map(col => {
    const match = col.getAttribute('class')?.match(/col-(\d+)/);
    const colSize = match ? parseInt(match[1], 10) : 12;
    const start = position;
    const end = position + colSize - 1;
    position += colSize;
    return {col, start, end};
  });

  const myStructure = structure[index];
  //console.log('Moje start-end:', myStructure);

  const hasBefore = index > 0;
  const hasAfter = structure.length > index + 1;
  fillToEnd.value = 11 - myStructure.end;

  /*console.log('Mam coś przed sobą?', hasBefore);
  console.log('Mam coś za sobą?', hasAfter);
  console.log('Ile wolnego miejsca do końca wiersza:', fillToEnd.value);*/
}


onMounted(() => {
  calculate()
});
</script>

<style lang="scss" scoped>

</style>
