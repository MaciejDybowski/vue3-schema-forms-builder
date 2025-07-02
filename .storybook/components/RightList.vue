<template>
  <div class="right-container">
    <h3>Lista 2</h3>
    <draggable
      :fallback-tolerance="0"
      :force-fallback="true"
      :list="list"
      chosen-class="sortable-chosen-right"
      class="list-group right-list"
      drag-class="sortable-drag"
      fallback-class="sortable-fallback"
      ghost-class="sortable-ghost"
      :group="{name: 'people', pull: true, put: true}"
      itemKey="id"
      @change="onChange"
      @start="onDragStart"
      @end="onDragEnd"
    >
      <template #item="{ element, index }">
        <div class="list-group-item">
          {{ element.name }} ({{ index }})
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts" setup>


import Draggable from "@/vuedraggable/vuedraggable";
import {useDragDrop} from "./useDragDrop";

interface ListItem {
  id: number;
  name: string;
}

interface DragEvent {
  from: HTMLElement;
  to: HTMLElement;
  item: HTMLElement;
  oldIndex?: number;
  newIndex?: number;
}

interface ChangeEvent {
  added?: { element: ListItem; newIndex: number };
  removed?: { element: ListItem; oldIndex: number };
  moved?: { element: ListItem; oldIndex: number; newIndex: number };
}

interface Props {
  list: ListItem[];
}

interface Emits {
  (e: 'change', event: ChangeEvent): void;
  (e: 'drag-start', event: DragEvent): void;
  (e: 'drag-end', event: DragEvent): void;
}

withDefaults(defineProps<Props>(), {
  list: () => []
});



const { onChange, onDragStart, onDragEnd } = useDragDrop();
</script>

<style lang="scss">
.right-container {
  flex: 1;
}

/* Style dla prawej listy */
.sortable-chosen-right {
  opacity: 0.8;
  z-index: 1000;

  &::before,
  &::after {
    display: none !important;
  }
}

.sortable-drag {
  opacity: 0.9;
}

/* Ghost element dla prawej listy - pełny efekt "Drag it here" */
.sortable-ghost {
  opacity: 1 !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 1px !important;
  margin: 4px 0 !important;
  height: 4px !important;
  position: relative !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  visibility: visible !important;
}

.sortable-ghost * {
  display: none !important;
}

.sortable-ghost::before {
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
  display: block !important;
  animation: pulse-green 1.5s infinite;
}

.sortable-ghost::after {
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
  z-index: 10;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
  border: 2px solid white;
  display: block !important;
}

.sortable-fallback {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
}

/* Animacja pulsowania */
@keyframes pulse-green {
  0%, 100% {
    box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
  }
  50% {
    box-shadow: 0 0 16px rgba(34, 197, 94, 0.6);
  }
}

/* Dodatkowe style dla lepszego UX */
.right-list:has(.sortable-ghost) {
  border-color: #22c55e;
  background-color: #f0fdf4;
}

/* Fallback dla starsze przeglądarki bez :has() */
.right-list.drag-over {
  border-color: #22c55e;
  background-color: #f0fdf4;
}
</style>
