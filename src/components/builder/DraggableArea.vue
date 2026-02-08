<template>
  <draggable
    v-model="modelValue"
    :animation="400"
    :empty-insert-threshold="props.emptyInsertThreshold"
    :force-fallback="true"
    :group="{name: 'controls'}"
    :sort="true"
    :class="[
      'd-flex flex-wrap v-row draggable-area align-content-start',
      {
        'draggable-area--root': !props.sectionKey,
        'draggable-area--nested': props.sectionKey,
        'draggable-area--empty': !modelValue?.length
      }
    ]"
    handle=".handle"
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

watch(() => modelValue.value, () => {
  modelValue.value?.forEach(it => {
    it['sectionKey'] = props.sectionKey;
  });
}, {immediate: true, deep: true});

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
  border-radius: 8px;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  box-sizing: border-box;
  width: 100%;
}

// Główny obszar (root) - wypełnia wysokość rodzica
.draggable-area--root {
  flex: 1;
  min-height: 100%;
  height: 100%;
}

// Zagnieżdżony obszar - większy padding aby pomieścić toolbar elementów
.draggable-area--nested {
  min-height: 50px;
  padding: 20px 6px 6px 6px; // górny padding na toolbar (20px)
  margin: 0 !important; // reset ujemnych marginesów v-row
}

// === PUSTE OBSZARY - wizualne wskazówki ===

// Pusty root
.draggable-area--root.draggable-area--empty {
  border: 2px dashed rgba(var(--v-theme-primary), 0.3);
  background: rgba(var(--v-theme-primary), 0.02);

  &::before {
    content: 'Przeciągnij elementy tutaj';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgba(var(--v-theme-on-surface), 0.4);
    font-size: 14px;
    font-weight: 500;
    pointer-events: none;
    white-space: nowrap;
  }

  &:hover {
    border-color: rgba(var(--v-theme-primary), 0.5);
    background: rgba(var(--v-theme-primary), 0.04);
  }
}

// Pusty nested
.draggable-area--nested.draggable-area--empty {
  border: 2px dashed rgba(var(--v-theme-primary), 0.25);
  background: rgba(var(--v-theme-primary), 0.02);
  min-height: 40px;
  padding: 6px;

  &::before {
    content: 'Upuść element tutaj';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgba(var(--v-theme-on-surface), 0.35);
    font-size: 12px;
    font-weight: 400;
    pointer-events: none;
    white-space: nowrap;
  }

  &:hover {
    border-color: rgba(var(--v-theme-primary), 0.4);
    background: rgba(var(--v-theme-primary), 0.04);
  }
}

// === OBSZARY Z ELEMENTAMI - brak dodatkowych styli ===

// Root z elementami - brak obramowania, brak tła
.draggable-area--root:not(.draggable-area--empty) {
  border: none;
  background: transparent;
}

// Nested z elementami - subtelne tło aby odróżnić od rodzica
.draggable-area--nested:not(.draggable-area--empty) {
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
  background: rgba(var(--v-theme-primary), 0.01);
}

.draggable-area > * {
  margin-bottom: 3px;
  margin-top: 3px;
}



:deep(.sortable-ghost) {
  opacity: 1 !important;
  background: none !important;
  border: 1px dashed !important;
  box-sizing: border-box !important;
  margin: 20px 0 !important;
  height: 40px !important; /* większy ghost => łatwiej trafić */
  width: 100% !important;
  position: relative !important;
  display: block !important;
  border-radius: 6px !important;
}

:deep(.sortable-ghost *) {
  display: none !important;
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

