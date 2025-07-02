<template>
  <div class="left-container">
    <h3>Lista 1</h3>
    <draggable
      :fallback-tolerance="0"
      :force-fallback="true"
      :group="{name: 'people', pull: 'clone', put: false}"
      :list="list"
      :sort="false"
      chosen-class="sortable-chosen-left"
      class="list-group left-list"
      drag-class="sortable-drag"
      fallback-class="sortable-fallback"
      ghost-class="sortable-ghost-left"
      itemKey="id"
      @end="onDragEnd"
      @start="onDragStart"
    >
      <template #item="{element}">
        <div class="list-group-item">
          {{ element.name }}
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

interface Props {
  list: ListItem[];
}


withDefaults(defineProps<Props>(), {
  list: () => []
});

const { onDragStart, onDragEnd } = useDragDrop();
</script>

<style lang="scss">
.left-container {
  flex: 1;
}

/* Style dla lewej listy - subtelne efekty */
.sortable-chosen-left {
  opacity: 0.9;
  transform: scale(0.98);
  z-index: 1000;

  &::before,
  &::after {
    display: none !important;
  }
}

.sortable-drag {
  opacity: 0.9;
}

.sortable-fallback {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
}
</style>
