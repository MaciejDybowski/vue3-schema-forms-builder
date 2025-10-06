import {defineStore} from "pinia";
import {computed, Ref, ref} from "vue";
import {cloneDeep} from "lodash";
import set from 'lodash/set';
import {DraggableFormElement} from "@/models/DraggableFormElement";

export const useBuilderState = defineStore("useBuilderState", () => {
  // workspaceId for dictionary config
  const workspaceId: Ref<string> = ref("")
  const getWorkspaceId = computed(() => workspaceId.value)

  function setWorkspaceId(value: string) {
    workspaceId.value = value
  }

  // draggable model for builder
  const draggableModel: Ref<DraggableFormElement[]> = ref([])
  const getDraggableModel = computed(() => draggableModel.value)

  function updateDraggableModel(value: DraggableFormElement[], stackInvoker: boolean = false) {
    draggableModel.value = value


    if (!stackInvoker) {
      history.value.push(cloneDeep(draggableModel.value))
      historyPointer.value++
      // console.debug("stan stosu", history.value)
      // console.debug("wskaznik = ", historyPointer.value)
    }
  }

  function deleteItem(event: ToolbarEvent, model = null) {
    const source = model ? model : draggableModel.value
    draggableModel.value = source.filter((c: any) => {
      if ("tempItems" in c) {
        if (c.key == event.sectionKey) {
          c.tempItems = c.tempItems.filter((nc: any) => nc.key !== event.key)
        } else {
          deleteItem(event, c.tempItems)
        }
      }
      return c.key !== event.key
    })
  }


  function generateClonedKey(originalKey: string): string {
    return `${originalKey}${Math.random().toString().substring(2, 5)}Clone`;
  }

  function deepCloneWithNewKeys(control: any): any {
    const cloned = cloneDeep(control);
    cloned.key = generateClonedKey(control.key);
    cloned.label = cloned.key;

    if (Array.isArray(cloned.tempItems)) {
      cloned.tempItems = cloned.tempItems.map((item: any) => deepCloneWithNewKeys(item));
    }

    return cloned;
  }

  function findAndCloneRecursive(
    items: any[],
    event: ToolbarEvent,
    parentKey: string | null = null
  ): { clonedControl: any, parentKey: string | null, index: number } | null {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.key === event.key) {
        return {
          clonedControl: deepCloneWithNewKeys(item),
          parentKey,
          index: i
        };
      }

      if (Array.isArray(item.tempItems)) {
        const result = findAndCloneRecursive(item.tempItems, event, item.key);
        if (result) return result;
      }
    }

    return null;
  }

  function insertClonedItemRecursive(
    items: any[],
    parentKey: string,
    clonedControl: any,
    index: number
  ): boolean {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.key === parentKey && Array.isArray(item.tempItems)) {
        item.tempItems.splice(index + 1, 0, clonedControl);
        return true;
      }

      if (Array.isArray(item.tempItems)) {
        const inserted = insertClonedItemRecursive(item.tempItems, parentKey, clonedControl, index);
        if (inserted) return true;
      }
    }

    return false;
  }

  function cloneItem(event: ToolbarEvent) {
    const result = findAndCloneRecursive(draggableModel.value, event);

    if (result) {
      const {clonedControl, parentKey, index} = result;

      if (parentKey) {
        const inserted = insertClonedItemRecursive(draggableModel.value, parentKey, clonedControl, index);
        if (!inserted) {
          console.warn("Nie znaleziono miejsca do wstawienia zduplikowanego elementu.");
        }
      } else {
        draggableModel.value.splice(index + 1, 0, clonedControl);
      }
    } else {
      console.warn("Nie znaleziono elementu do sklonowania.");
    }
  }

  // configured field
  const configuredField: Ref<any> = ref(null)
  const getConfiguredField = computed(() => configuredField.value)
  const getConfiguredFieldKey = computed(() => configuredField.value?.key)

  function setConfiguredField(field: any) {
    configuredField.value = field
  }

  function setKeyInConfiguredField(key: string, value: string | number | object) {
    set(configuredField.value, key, value);
  }


  // memento pattern
  const history: Ref<Array<any>> = ref([])
  const historyPointer = ref(-1);
  const isUndoAvailable = computed(() => history.value.length > 1 && historyPointer.value > 0)
  const isRedoAvailable = computed(() => historyPointer.value + 1 < history.value.length)

  function saveState(value) {
    history.value.push(value)
    historyPointer.value++
    // console.debug("stan stosu", history.value)
    // console.debug("wskaznik = ", historyPointer.value)
  }

  function resetState() {
    history.value = []
    historyPointer.value = -1;
  }

  function undo() {
    historyPointer.value--
    updateDraggableModel(history.value[historyPointer.value], true)
    // console.debug("stan stosu", history.value)
    // console.debug("wskaznik = ", historyPointer.value)
  }

  function redo() {
    historyPointer.value++
    updateDraggableModel(history.value[historyPointer.value], true)
  }


  return {
    getDraggableModel,
    updateDraggableModel,
    deleteItem,
    cloneItem,
    saveState,
    undo,
    redo,
    isRedoAvailable,
    resetState,
    isUndoAvailable,
    getConfiguredField,
    getConfiguredFieldKey,
    setConfiguredField,
    setKeyInConfiguredField,
    getWorkspaceId,
    setWorkspaceId,
  }
})

export interface ToolbarEvent {
  key: string
  sectionKey?: string
}
