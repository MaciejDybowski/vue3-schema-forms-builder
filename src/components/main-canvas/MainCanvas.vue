<template>
  <v-card
    height="100%"
    elevation="2"
    class="pa-4"
  >
    <draggable-area
      v-model="controls"
      class="py-8"
    />

    <props-viewer
      :draggable="controls"
      :schema="schema"
    />
  </v-card>
</template>

<script setup lang="ts">
import {computed, getCurrentInstance, onMounted, ref, watch} from "vue";


import {formControls} from "vue3-schema-forms"
import DraggableArea from "@/components/builder/DraggableArea.vue";
import PropsViewer from "@/components/main-canvas/PropsViewer.vue";

import {cloneDeep} from "lodash";

import {useBuilderState} from "@/pinia/stores/useBuilderState";

const instance = getCurrentInstance();
for (const [name, comp] of Object.entries(formControls)) {
  //@ts-ignore
  if (!instance?.appContext.app.component(`node-${name}`)) {
    //@ts-ignore
    console.debug(`add component = node-${name}`)
    instance?.appContext.app.component(`node-${name}`, comp);
  }
}
const useBuilderStateStore = useBuilderState()

const controls = computed({
  get(): any[] {
    return useBuilderStateStore.getDraggableModel
  },
  set(val) {
    useBuilderStateStore.updateDraggableModel(val)
  }
})

const schema = ref({
  type: "object",
  properties: {},
})

watch(controls, () => {
  schema.value.properties = {}
  mapToSchema()
}, {deep: true})

onMounted(() => {
  schema.value.properties = {}
  mapToSchema()
})

function mapToSchema() {
  controls.value.forEach((control: any) => {
    mapField(schema.value, control)
  })
}

function mapField(schema: any, control: any) {
  if (Array.isArray(control)) {
    // obsługa sekcji powielanej TODO ###################################
  } else {
    if (control.key.includes(".")) {

      const keys = control.key.split(".")
      const nestedRootKey = keys[0]

      // jeśli nie ma jeszcze klucza nested root [basicData] to dodaj
      if (schema.properties[nestedRootKey] === undefined) {
        schema.properties[nestedRootKey] = {properties: {}}
      }

      const obj = {...control}
      keys.shift()
      obj.key = keys.join(".") // usunięcie nested root key i wywołanie ponownie
      mapField(schema.properties[nestedRootKey], obj)

    } else {
      // TODO == obsługa różnego rodzaju pól w tym sekcji powielanej
      const clone = cloneDeep(control)
      const k = clone.key
      delete clone.key
      delete clone.on
      schema.properties[k] = clone

    }
  }
}

</script>

<style lang="scss">


.main-plain {
  flex: 1;
}


</style>
<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
