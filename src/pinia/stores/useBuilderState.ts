import {defineStore} from "pinia";
import {computed, Ref, ref} from "vue";
import {cloneDeep} from "lodash";


export const useBuilderState = defineStore("useBuilderState", () => {
  // draggable model for builder
  const draggableModel: Ref<Array<object>> = ref([])
  const getDraggableModel = computed(() => draggableModel.value)

  function updateDraggableModel(value: Array<object>, stackInvoker: boolean = false) {
    draggableModel.value = value


    if (!stackInvoker) {
      history.value.push(cloneDeep(draggableModel.value))
      historyPointer.value++
      // console.debug("stan stosu", history.value)
      // console.debug("wskaznik = ", historyPointer.value)
    }
  }

  // TODO - refactoring na rekurencyjne
  function deleteItem(event: ToolbarEvent) {
    draggableModel.value = draggableModel.value.filter((c: any) => {
      if ("tempItems" in c) {
        c.tempItems = c.tempItems.filter((nc: any) => nc.key !== event.key)
      }
      return c.key !== event.key
    })
  }

  // TODO - refactoring na rekurencyjne
  function cloneItem(event: ToolbarEvent) {
    let clonedIndex = 0;
    let clonedControl: any = {}
    let clonedParent = ""
    draggableModel.value.forEach((c: any, index: number) => {
      if ("tempItems" in c) {
        c.tempItems.forEach((nc: any, index: number) => {
          if (nc.key === event.key) {
            clonedIndex = index
            clonedControl = cloneDeep(nc)
            clonedParent = c.key
          }
        })
      }

      if (c.key === event.key) {
        clonedIndex = index
        clonedControl = cloneDeep(c)
      }
    })

    clonedControl.key = clonedControl.key + Math.random().toString().substring(2, 5) + "_cloned"
    clonedControl.label = clonedControl.key


    if (clonedParent) {
      const duplicatedSection: any = draggableModel.value.filter((c: any) => c.key == clonedParent)[0]
      duplicatedSection.tempItems.splice(clonedIndex + 1, 0, clonedControl)

    } else {
      draggableModel.value.splice(clonedIndex + 1, 0, clonedControl)
    }
  }


  // configured field
  const configuredField: Ref<any> = ref(null)
  const getConfiguredField = computed(() => configuredField.value)
  const getConfiguredFieldKey = computed(() => configuredField.value?.key)
  function setConfiguredField(field: any) {
    configuredField.value = field
  }


  // memento pattern
  const history: Ref<Array<any>> = ref([])
  const historyPointer = ref(-1);
  const isUndoAvailable = computed(() => history.value.length > 1 && historyPointer.value > 0)
  const isRendoAvailable = computed(() => historyPointer.value + 1 < history.value.length)

  function saveState(value) {
    history.value.push(value)
    historyPointer.value++
    // console.debug("stan stosu", history.value)
    // console.debug("wskaznik = ", historyPointer.value)
  }

  function undo() {
    historyPointer.value--
    updateDraggableModel(history.value[historyPointer.value], true)
    // console.debug("stan stosu", history.value)
    // console.debug("wskaznik = ", historyPointer.value)
  }

  function rendo() {
    historyPointer.value++
    updateDraggableModel(history.value[historyPointer.value], true)
    // console.debug("stan stosu", history.value)
    // console.debug("wskaznik = ", historyPointer.value)
  }


  return {
    getDraggableModel,
    updateDraggableModel,
    deleteItem,
    cloneItem,
    saveState,
    undo,
    rendo,
    isRendoAvailable,
    isUndoAvailable,
    getConfiguredField,
    getConfiguredFieldKey,
    setConfiguredField
  }
})

export interface ToolbarEvent {
  key: string
}
