<template>
  <draggable
    v-model="modelValue"
    :fallback-tolerance="0"
    :force-fallback="true"
    :sort="true"
    chosen-class="sortable-chosen-right"
    class="d-flex flex-wrap v-row draggable-area"
    drag-class="sortable-drag"
    fallback-class="sortable-fallback"
    ghost-class="sortable-ghost"
    itemKey="key"
    @change="onChange"
    @end="onDragEnd"
    @start="onDragStart"
    :group="{name: 'controls'}"
    :animation="150"
  >
    <template #item="{element}">
      <field-wrapper :element="element"/>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from "../../vuedraggable/vuedraggable";
import FieldWrapper from "../builder/FieldWrapper.vue";
import { watch } from "vue";
import { useDragDrop } from "../../../.storybook/components/useDragDrop";

const { onChange, onDragStart, onDragEnd } = useDragDrop();

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
  }, { deep: true });
}
</script>

<style lang="scss" scoped>
.draggable-area {
  min-height: 100px;
  padding: 10px;
  position: relative;
}

/* Ghost element - zwiększona wysokość dla napisu */
:deep(.sortable-ghost) {
  opacity: 1 !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin: 8px 0 !important;
  height: 32px !important;  /* Zwiększona wysokość */
  min-height: 32px !important;
  width: 100% !important;
  position: relative !important;
  display: block !important;
  flex: none !important;
  overflow: visible !important;

  content: 'Drag it here' !important;
}

:deep(.sortable-ghost *) {
  display: none !important;
}

:deep(.sortable-ghost::before) {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #22c55e, #16a34a);
  border-radius: 1px;
  transform: translateY(-50%);
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
  animation: pulse-green 1.5s infinite;
}

:deep(.sortable-ghost::after) {
  content: 'Drag it here';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #22c55e;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  z-index: 20;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
  border: 2px solid white;
  display: block !important;
}

@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 8px rgba(34, 197, 94, 0.4); }
  50% { box-shadow: 0 0 16px rgba(34, 197, 94, 0.6); }
}

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
