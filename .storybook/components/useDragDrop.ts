import { ref, readonly } from 'vue';

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

const dragFromLeft = ref<boolean>(false);
const dragState = ref<'idle' | 'dragging' | 'dropping'>('idle');

export const useDragDrop = () => {
  const onChange = (evt: ChangeEvent): void => {
    console.log('Zmiana w liście:', evt);

    // Dodatkowa logika na podstawie typu zmiany
    if (evt.added) {
      console.log('Element dodany:', evt.added.element, 'na pozycji:', evt.added.newIndex);
    }
    if (evt.removed) {
      console.log('Element usunięty:', evt.removed.element, 'z pozycji:', evt.removed.oldIndex);
    }
    if (evt.moved) {
      console.log('Element przeniesiony:', evt.moved.element, 'z', evt.moved.oldIndex, 'na', evt.moved.newIndex);
    }
  };

  const onDragStart = (evt: DragEvent): void => {
    dragFromLeft.value = evt.from.classList.contains('left-list');
    dragState.value = 'dragging';
    console.log('Drag started from left:', dragFromLeft.value);
  };

  const onDragEnd = (evt: DragEvent): void => {
    dragFromLeft.value = false;
    dragState.value = 'idle';
    console.log('Drag ended');
  };

  const onDragEnter = (): void => {
    if (dragState.value === 'dragging') {
      dragState.value = 'dropping';
    }
  };

  const onDragLeave = (): void => {
    if (dragState.value === 'dropping') {
      dragState.value = 'dragging';
    }
  };

  return {
    dragFromLeft: readonly(dragFromLeft),
    dragState: readonly(dragState),
    onChange,  // Dodane onChange
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragLeave
  };
};
