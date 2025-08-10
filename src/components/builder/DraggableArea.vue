<template>
  <draggable
    v-model="modelValue"
    :animation="400"
    :drag-threshold="5"
    :empty-insert-threshold="200"
    :fallback-tolerance="0"
    :force-fallback="true"
    :group="{name: 'controls'}"
    :sort="true"
    :swap-threshold="0.6"
    chosen-class="sortable-chosen-right"
    class="d-flex flex-wrap v-row draggable-area"
    drag-class="sortable-drag"
    fallback-class="sortable-fallback"
    ghost-class="sortable-ghost"
    itemKey="key"
    @change="onChange"
    @end="onDragEnd"
    @start="onDragStart"
  >
    <template #item="{element}">
      <field-wrapper :element="element"/>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from "../../vuedraggable/vuedraggable";
import FieldWrapper from "../builder/FieldWrapper.vue";
import {watch} from "vue";
import {useDragDrop} from "../../../.storybook/components/useDragDrop";

const {onChange, onDragStart, onDragEnd} = useDragDrop();

const modelValue = defineModel<any[]>();

const props = withDefaults(defineProps<{
  emptyInsertThreshold?: number,
  sectionKey?: string | null
}>(), {
  emptyInsertThreshold: 100,
  sectionKey: null
});

if (props.sectionKey) {
  watch(() => modelValue.value, (value) => {
    modelValue.value?.forEach(it => {
      it['sectionKey'] = props.sectionKey;
    });
  }, {deep: true});
}
</script>

<style lang="scss" scoped>
.draggable-area {
  min-height: 100px;
  padding: 10px;
  position: relative;
}

.draggable-area > * {
  margin-bottom: 16px; /* większy odstęp między elementami */
  //background-color: lightgrey;
}


:deep(.sortable-ghost) {
  opacity: 1 !important;
  background: none !important;
  border: 1px dashed  !important;
  box-sizing: border-box !important;
  margin: 8px 0 !important;
  height: 40px !important; /* większy ghost => łatwiej trafić */
  width: 100% !important;
  position: relative !important;
  display: block !important;
  border-radius: 6px !important;
}

:deep(.sortable-ghost *) {
  display: none !important;
}

/* Uproszczone stany */
:deep(.sortable-chosen-right) {
  opacity: 0.8;
}

:deep(.sortable-drag) {
  opacity: 0.9;
}

:deep(.sortable-fallback) {
  display: none !important;
}
</style>

