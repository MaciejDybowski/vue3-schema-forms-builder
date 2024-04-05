import {defineStore} from "pinia";
import {computed, Ref, ref} from "vue";
import {cloneDeep} from "lodash";


export const useBuilderState = defineStore("useBuilderState", () => {
  // draggable model for builder
  const draggableModel: Ref<Array<object>> = ref([])
  const getDraggableModel = computed(() => draggableModel.value)

  function updateDraggableModel(value: Array<object>) {
    draggableModel.value = value
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
  function setConfiguredField(field:any){
    configuredField.value = field
  }



  // memento pattern
  const history: Ref<Array<any>> = ref([])
  const isRevertAvailable = computed(() => history.value.length > 0)

  function saveState() {
    history.value.push(cloneDeep(draggableModel.value))
  }

  function revert() {
    draggableModel.value = history.value.pop()
  }


  return {
    getDraggableModel,
    updateDraggableModel,
    deleteItem,
    cloneItem,
    saveState,
    revert,
    isRevertAvailable,
    getConfiguredField,
    getConfiguredFieldKey,
    setConfiguredField
  }
})

export interface ToolbarEvent {
  key: string
}
