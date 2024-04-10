<template>
  <v-card
    style="min-height: calc(100vh - 65px)"
    elevation="2"
    class="pa-4"
  >
    <draggable-area
      v-if="mainCanvas.mainCanvasMode.value === 'BUILDER'"
      v-model="controls"
      class="py-8"
    />

    <v-row  v-if="mainCanvas.mainCanvasMode.value === 'CODE'">
      <v-col cols="12">
        <div class="d-flex align-center">
          <span class="v-card-title ml-0 pl-0">Model formularza</span>
          <div>
            <v-btn
              icon="mdi-content-copy"
              variant="text"
              density="compact"
              @click="contextCopy()"
            />
          </div>
        </div>
        <vue-json-pretty :data="modelValue"/>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import {computed, getCurrentInstance, onMounted, watch} from "vue";

import {formControls, schemaFormModelStoreInit} from "vue3-schema-forms"

import DraggableArea from "../builder/DraggableArea.vue";
import {cloneDeep} from "lodash";

import {useBuilderState} from "../../pinia/stores/useBuilderState";
import {useMainCanvas} from "../../composables/useMainCanvas";

import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

schemaFormModelStoreInit.useFormModelStore("333")
const instance = getCurrentInstance();
for (const [name, comp] of Object.entries(formControls)) {
  //@ts-ignore
  if (!instance?.appContext.app.component(`node-${name}`)) {
    //@ts-ignore
    console.debug(`add component = node-${name}`)
    instance?.appContext.app.component(`node-${name}`, comp);
  }
}

let modelValue = defineModel<{
  type: "object",
  properties: any
}>()


const useBuilderStateStore = useBuilderState()
const mainCanvas = useMainCanvas()

const controls = computed({
  get(): any[] {
    return useBuilderStateStore.getDraggableModel
  },
  set(val) {
    useBuilderStateStore.updateDraggableModel(val)
  }
})

watch(controls, () => {
  modelValue.value.properties = {}
  mapToSchema()
}, {deep: true})


function mapToSchema() {
  controls.value.forEach((control: any) => {
    mapField(modelValue.value, control)
  })
}

function mapToDraggable(model: any): Array<any> {
  let localControls = [] as Array<any>
  for (const [key, value] of Object.entries(model.properties)) {
    localControls.push(
      {
        formId: '333',
        key: key,
        ...value,
        "on": {
          "input": (e) => {
          }
        }
      }
    )
  }
  return localControls;
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
      delete clone.formId
      delete clone.key
      delete clone.on
      schema.properties[k] = clone

    }
  }
}

function contextCopy() {
  navigator.clipboard.writeText(JSON.stringify(modelValue.value));
}

onMounted(() => {
  useBuilderStateStore.resetState()
  controls.value = mapToDraggable(modelValue.value)
})

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
