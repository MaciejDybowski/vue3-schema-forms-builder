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
    :swap-threshold="0.4"
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


/* Ghost - linia z napisem */
:deep(.sortable-ghost) {
  opacity: 1 !important;
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  margin: 8px 0 !important;
  height: 32px !important;
  width: 100% !important;
  position: relative !important;
  display: block !important;
}

:deep(.sortable-ghost *) {
  display: none !important;
}

/* Linia */
:deep(.sortable-ghost::before) {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(26, 25, 115, 0.8);
  transform: translateY(-50%);
  margin: 0 4px
}

/* Napis */
:deep(.sortable-ghost::after) {
  content: 'Drag it here';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(26, 25, 115, 1);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;

}

@keyframes pulse-blue {
  0%, 100% {
    background: rgba(26, 25, 115, 0.8);
    box-shadow: 0 0 8px rgba(26, 25, 115, 0.4);
  }
  50% {
    background: rgba(26, 25, 115, 1);
    box-shadow: 0 0 12px rgba(26, 25, 115, 0.6);
  }
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

