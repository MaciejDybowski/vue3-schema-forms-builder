<template>
  <!--    style="min-height: calc(100vh - 130px)"-->
  <v-card
    elevation="2"
    class="pa-4 px-6"
  >
    <draggable-area
      v-if="mainCanvas.mainCanvasMode.value === 'BUILDER'"
      v-model="controls"
      class="py-2"
    />

    <json-schema-form-representation
      v-if="mainCanvas.mainCanvasMode.value === 'CODE'"
      :schema="modelValue"
    />

    <demo-form
      v-if="mainCanvas.mainCanvasMode.value === 'DEMO'"
      :schema="modelValue"
    />

  </v-card>
</template>

<script setup lang="ts">
import {computed, getCurrentInstance, onMounted, watch} from "vue";

import {formControls, schemaFormModelStoreInit} from "vue3-schema-forms"

import DraggableArea from "../builder/DraggableArea.vue";

import {useBuilderState} from "../../pinia/stores/useBuilderState";
import {useMainCanvas} from "../../composables/useMainCanvas";
import "vue-json-pretty/lib/styles.css";
import "vue3-schema-forms/dist/style.css"

import {useSchemaMapper} from "@/composables/useSchemaMapper";
import {FormSchema} from "@/models/FormSchema";
import {useDraggableMapper} from "@/composables/useDraggableMapper";
import {useStyle} from "@/main";
import {FormOptions} from "@/models/FormOptions";
import DemoForm from "@/components/main-canvas/DemoForm.vue";
import JsonSchemaFormRepresentation from "@/components/main-canvas/JsonSchemaFormRepresentation.vue";

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


let modelValue = defineModel<FormSchema>({
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
      },
      required: []
    }
  }
})

const style = useStyle()


const useBuilderStateStore = useBuilderState()
const mainCanvas = useMainCanvas()
const {mapDraggableToSchema} = useSchemaMapper()
const {mapSchemaToDraggable} = useDraggableMapper()

const controls = computed({
  get(): any[] {
    return useBuilderStateStore.getDraggableModel
  },
  set(val) {
    useBuilderStateStore.updateDraggableModel(val)
  }
})


watch(controls, () => {
  modelValue.value = mapDraggableToSchema(controls.value)
}, {deep: true})

onMounted(() => {
  useBuilderStateStore.resetState()

  const formOptions: FormOptions = {
    fieldProps: style.inputStyle.value,
    buttonProps: style.buttonStyle.value
  }

  controls.value = mapSchemaToDraggable(modelValue.value, formOptions)
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
