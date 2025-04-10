<template>
  <div :style="`width: ${cols/12*100}%`">
    <div>
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <field-wrapper-item
            :element="element"
            :is-hovering="isHovering as boolean"
            v-bind="props"
          />
        </template>
      </v-hover>
    </div>
    <div v-if="fillRow" class="fill-row"/>
  </div>
</template>

<script lang="ts" setup>
import FieldWrapperItem from "./FieldWrapperItem.vue";
import {useColSizeMapper} from "@/composables/useColSizeMapper";
import {computed} from "vue";

const props = defineProps<{
  element: any,
}>()

const {colSize} = useColSizeMapper()

const fillRow = computed(() => {
  return !!props.element.layout?.fillRow && colSize(props.element) < 12
})
const cols = computed(() => {
  return colSize(props.element)
})
</script>

<style lang="scss" scoped>

.fill-row {
  flex-basis: 100%;
  height: 0;
}

</style>
