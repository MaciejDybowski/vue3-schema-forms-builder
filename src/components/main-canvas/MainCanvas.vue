<template>
  <!--  style="min-height: calc(100vh - 65px)"-->
  <v-card
    elevation="2"
    class="pa-4"
    style="min-height: calc(100vh - 130px)"
  >
    <draggable-area
      v-if="mainCanvas.mainCanvasMode.value === 'BUILDER'"
      v-model="controls"
      class="py-2"
    />

    <v-row v-if="mainCanvas.mainCanvasMode.value === 'CODE'">
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
import "vue3-schema-forms/dist/style.css"
import {useVTheme} from "@/composables/useVTheme";

schemaFormModelStoreInit.useFormModelStore("builder-tecna-id")
const instance = getCurrentInstance();
for (const [name, comp] of Object.entries(formControls)) {
  //@ts-ignore
  if (!instance?.appContext.app.component(`node-${name}`)) {
    //@ts-ignore
    console.debug(`add component = node-${name}`)
    instance?.appContext.app.component(`node-${name}`, comp);
  }
}

const theme = useVTheme()
const color = theme.isLightTheme.value ? "white" : "primary";

let modelValue = defineModel<{
  type: "object",
  properties: any,
  options: any,
}>({
  default: () => {
    return {
      type: "object",
      properties: {},
      options: {
        fieldProps: {
          variant: "outlined",
          density: "compact",
          color: "primary",
          clearIcon: "mdi-close"
        }
      }
    }
  }
})


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
  Object.entries(model.properties).forEach(([key, value]) => {

    // TEMPORARY for all existed schema will be transformed
    // @ts-ignore
    if (!value.layout.props) {
      // @ts-ignore
      value.layout.props = {}
    }

    // TODO - sprawdzenie czy zawiera schemę i jak tak to trzeba to przemapować
    // @ts-ignore
    if (value.layout.schema) {
      // @ts-ignore
      value.layout.schema.options = model.options
      // @ts-ignore
      value.tempItems = mapToDraggable(value.layout.schema)
    }

    localControls.push(
      {
        formId: 'builder-tecna-id',
        key: key,
        ...value as object,
        "on": {
          "input": (e) => {
          }
        },
        options: model.options,
        required: model.required?.includes(key),
      }
    )
  })

  return localControls;
}

function mapField(schema: any, control: any) {


  if (Array.isArray(control.tempItems)) {
    // obsługa sekcji powielanej TODO ###################################

    const clone = cloneDeep(control)
    const k = clone.key
    clone.tempItems.forEach(element => {
      mapField(clone.layout.schema, element)
    })
    removeDraggableFields(clone)
    schema.properties[k] = clone


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
      requiredMapping(schema, clone)
      removeDraggableFields(clone)
      schema.properties[k] = clone

    }
  }
}

function removeDraggableFields(control) {

  delete control.formId
  delete control.key
  delete control.on
  delete control.options

  if (control.tempItems) {
    delete control.tempItems
    delete control.required
  }
}

function requiredMapping(schema: any, item: any) {
  if (!schema.required) {
    schema.required = []
  }
  if (item.required) {
    if (!schema.required.includes(item.key)) {
      schema.required.push(item.key)
    }
  } else {
    schema.required = schema.required.filter(k => k !== item.key)
  }
  delete item.required
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
