import {defineStore} from "pinia";
import {computed, Ref, ref, toRaw} from "vue";
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

  function updateDraggableModel(value: DraggableFormElement[], saveToHistory = true) {
    draggableModel.value = value//cloneDeep(toRaw(value)) // TODO MaxRecursive on MainCanvas
    if (saveToHistory) pushHistory()
  }

  function deleteItem(event: ToolbarEvent, model: any[] | null = null) {
    const source = model ? model : draggableModel.value;

    draggableModel.value = source.filter((c: any) => {
      // jeśli element ma pola tymczasowe
      if ("tempItems" in c && Array.isArray(c.tempItems)) {
        if (c.key === event.sectionKey) {
          c.tempItems = c.tempItems.filter((nc: any) => nc.key !== event.key);
        } else {
          deleteItem(event, c.tempItems);
        }
      }

      // jeśli element jest expansion-panels
      if (c.layout?.component === "expansion-panels" && Array.isArray(c.panels)) {
        for (const panel of c.panels) {
          // obsługa tempItems w panelu
          if (Array.isArray(panel.tempItems)) {
            panel.tempItems = panel.tempItems.filter((nc: any) => nc.key !== event.key);
            deleteItem(event, panel.tempItems);
          }

          // obsługa schema.properties w panelu
          if (panel.schema?.properties) {
            for (const [propKey, propVal] of Object.entries(panel.schema?.properties) as [string, any][]) {
              if (propKey === event.key) {
                delete panel.schema.properties[propKey];
              } else if (propVal.tempItems) {
                deleteItem(event, propVal.tempItems);
              }
            }
          }
        }
      }

      return c.key !== event.key;
    });
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


  function findAndCloneRecursive(
    items: any[],
    event: ToolbarEvent,
    parentKey: string | null = null
  ): { clonedControl: any; parentKey: string | null; index: number } | null {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.key === event.key) {
        return {
          clonedControl: deepCloneWithNewKeys(item),
          parentKey,
          index: i,
        };
      }

      // standardowe tempItems
      if (Array.isArray(item.tempItems)) {
        const result = findAndCloneRecursive(item.tempItems, event, item.key);
        if (result) return result;
      }

      // --- NOWE: obsługa expansion-panels ---
      if (item.layout?.component === "expansion-panels") {
        for (const [index, {tempItems}] of item.panels?.entries() || []) {
          if (!Array.isArray(tempItems)) continue;
          const result = findAndCloneRecursive(tempItems, event, `${item.key}::panel-${index}`);
          if (result) return result;
        }
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

      // standardowa ścieżka
      if (item.key === parentKey && Array.isArray(item.tempItems)) {
        item.tempItems.splice(index + 1, 0, clonedControl);
        return true;
      }

      // rekurencja po zwykłych tempItems
      if (Array.isArray(item.tempItems)) {
        const inserted = insertClonedItemRecursive(item.tempItems, parentKey, clonedControl, index);
        if (inserted) return true;
      }

      // --- NOWE: obsługa expansion-panels ---
      if (item.layout?.component === "expansion-panels" && Array.isArray(item.panels)) {
        for (let p = 0; p < item.panels.length; p++) {
          const panel = item.panels[p];
          const virtualParentKey = item.key + "::panel-" + p;

          if (virtualParentKey === parentKey && Array.isArray(panel.tempItems)) {
            panel.tempItems.splice(index + 1, 0, clonedControl);
            return true;
          }

          // schodzimy rekurencyjnie niżej
          if (Array.isArray(panel.tempItems)) {
            const inserted = insertClonedItemRecursive(panel.tempItems, parentKey, clonedControl, index);
            if (inserted) return true;
          }
        }
      }
    }

    return false;
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
    if (!isUndoAvailable.value) return
    historyPointer.value--
    draggableModel.value = cloneDeep(history.value[historyPointer.value])
  }

  function redo() {
    if (!isRedoAvailable.value) return
    historyPointer.value++
    draggableModel.value = cloneDeep(history.value[historyPointer.value])
  }

  function pushHistory() {
    if (historyPointer.value + 1 < history.value.length) {
      history.value.splice(historyPointer.value + 1)
    }
    history.value.push(cloneDeep(toRaw(draggableModel.value)))
    historyPointer.value++

    const HISTORY_LIMIT = 50
    if (history.value.length > HISTORY_LIMIT) {
      history.value.shift()
      historyPointer.value--
    }
  }

  function findPath(
    items: any[],
    targetKey: string,
    currentPath: string[] = []
  ): string[] | null {
    for (const item of items) {
      // Jeśli to właściwe pole
      if (item.key === targetKey) {
        return [...currentPath, item.key];
      }

      // Jeśli ma dzieci
      if (item.tempItems?.length) {
        let newPath = [...currentPath];

        const component = item.layout?.component;

        if (component === "duplicated-section") {
          // Sekcje powtarzalne → dodajemy "[]"
          newPath.push(`${item.key}[]`);
        } else if (
          component !== "fields-group" &&
          component !== "expansion-panels"
        ) {
          // Normalne sekcje → dodajemy nazwę do ścieżki
          newPath.push(item.key);
        }
        // rekurencja
        const found = findPath(item.tempItems, targetKey, newPath);
        if (found) return found;
      }

      // Dodatkowo: obsługa layoutu "expansion-panels" z kluczem "panels"
      if (item.layout?.component === "expansion-panels" && item.panels?.length) {
        for (const panel of item.panels) {
          if (panel.schema?.properties) {
            const panelItems = Object.entries(panel.schema.properties).map(
              ([key, val]: [string, any]) => ({
                key,
                layout: val.layout,
                tempItems: val.tempItems || [],
              })
            );
            const found = findPath(panelItems, targetKey, currentPath);
            if (found) return found;
          }

          if (panel.tempItems?.length) {
            const found = findPath(panel.tempItems, targetKey, currentPath);
            if (found) return found;
          }
        }
      }
    }

    return null;
  }


  const getConfiguredFieldPath = computed(() => {
    if (!configuredField.value) return null;
    const targetKey = configuredField.value.key;
    const pathArray = findPath(draggableModel.value, targetKey);
    return pathArray ? pathArray.join('.') : null;
  });


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
    findPath,
    getConfiguredFieldPath
  }
})

export interface ToolbarEvent {
  key: string
  sectionKey?: string
}
