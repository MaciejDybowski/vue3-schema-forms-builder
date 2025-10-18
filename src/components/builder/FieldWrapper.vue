<template>
  <v-col
    :class="['px-0', `offset-${offsetSize(element)}`, `pb-0`]"

    :cols="cols"
    v-bind="attrs"
  >
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <field-wrapper-item
          :element="element"
          :is-hovering="isHovering as boolean"
          v-bind="props"
        />
      </template>
    </v-hover>
  </v-col>
  <div v-if="fillRow" class="fill-row"/>
</template>

<script lang="ts" setup>
import FieldWrapperItem from "./FieldWrapperItem.vue";
import {useColSizeMapper} from "@/composables/useColSizeMapper";
import {computed, useAttrs} from "vue";
import {useOffsetSizeMapper} from "@/composables/useOffsetSizeMapper";

const props = defineProps<{
  element: any,
}>()
const attrs = useAttrs()

const {colSize} = useColSizeMapper()
const {offsetSize} = useOffsetSizeMapper()

const fillRow = computed(() => {
  return !!props.element.layout?.fillRow && colSize(props.element) < 12
})
const cols = computed(() => {
  return colSize(props.element) //+ offsetSize(props.element)
})
</script>

<style lang="scss" scoped>

.fill-row {
  flex-basis: 100%;
  height: 0;
}

</style>
