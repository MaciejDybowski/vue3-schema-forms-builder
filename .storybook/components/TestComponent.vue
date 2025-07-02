<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3>Lista 1</h3>
        <draggable
          :fallback-tolerance="0"
          :force-fallback="true"
          :group="{name: 'people', pull: 'clone', put: false}"
          :list="list1"
          :sort="false"
          chosen-class="sortable-chosen-left"
          class="list-group left-list"
          drag-class="sortable-drag"
          fallback-class="sortable-fallback"
          ghost-class="sortable-ghost-left"
          itemKey="id"
          @change="log"
          @end="onDragEnd"
          @start="onDragStart"

        >
          <template #item="{ element, index }">
            <div class="list-group-item">
              {{ element.name }} ({{ index }})
            </div>
          </template>
        </draggable>
      </div>

      <div class="col">
        <h3>Lista 2</h3>
        <draggable
          :fallback-tolerance="0"
          :force-fallback="true"
          :list="list2"
          chosen-class="sortable-chosen-right"
          class="list-group right-list"
          drag-class="sortable-drag"
          fallback-class="sortable-fallback"
          ghost-class="sortable-ghost"
          group="people"
          itemKey="id"
          @change="log"
          @end="onDragEnd"
          @start="onDragStart"
        >
          <template #item="{ element, index }">
            <div class="list-group-item">
              {{ element.name }} ({{ index }})
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from "@/vuedraggable/vuedraggable.js";
import FormElements from "@/components/elements-drawer/FormElements.vue";

export default {
  name: 'TwoListsExample',
  components: {FormElements, Draggable},
  data() {
    return {
      list1: [
        {name: "Jan", id: 1},
        {name: "Anna", id: 2},
        {name: "Piotr", id: 3},
        {name: "Maria", id: 4}
      ],
      list2: [
        {name: "Tomasz", id: 5},
        {name: "Katarzyna", id: 6},
        {name: "Michał", id: 7}
      ],
      dragFromLeft: false
    }
  },
  methods: {
    log(evt) {
      console.log('Zmiana w liście:', evt)
    },
    onDragStart(evt) {
      // Sprawdź czy przeciąganie rozpoczyna się z lewej listy
      this.dragFromLeft = evt.from.classList.contains('left-list');
    },
    onDragEnd(evt) {
      this.dragFromLeft = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.row {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.col {
  flex: 1;
}

.list-group {
  min-height: 200px;
  padding: 10px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  position: relative;
}

.list-group-item {
  padding: 12px 16px;
  margin-bottom: 8px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: move;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}


/* Usunięcie efektu przekoszenia i pozostawienie subtelnych efektów */
.sortable-chosen {
  opacity: 0.8;
  z-index: 1000;
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
  padding: 0 !important;
  margin: 8px 0 !important;
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


/* Usunięcie domyślnego niebieskiego elementu fallback */
.sortable-fallback {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
}


/* Animacja pulsowania tylko dla prawej listy */
@keyframes pulse-green {
  0%, 100% {
    box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
  }
  50% {
    box-shadow: 0 0 16px rgba(34, 197, 94, 0.6);
  }
}

.sortable-ghost::before {
  animation: pulse-green 1.5s infinite;
}

/* Dodatkowe style dla lepszego UX - tylko dla prawej listy */
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
