<template>
  <!--    style="min-height: calc(100vh - 130px)"-->
  <v-card
    class="pa-4 px-6"
    elevation="2"
  >
    <draggable-area
      v-if="mainCanvas.mainCanvasMode.value === 'BUILDER'"
      :key="key"
      v-model="controls"
      class="py-2"
    />

    <json-schema-form-representation
      v-if="mainCanvas.mainCanvasMode.value === 'CODE'"
      :schema="modelValue"
      @manual-update-schema="updateSchema"
    />

    <demo-form
      v-if="mainCanvas.mainCanvasMode.value === 'DEMO'"
      :schema="modelValue"
    />

  </v-card>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref, watch} from "vue";

import DraggableArea from "../builder/DraggableArea.vue";

import {useBuilderState} from "../../pinia/useBuilderState";
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
import {copyObject} from "@/utils/copy";


const key = ref(1)
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
const formOptions: FormOptions = {
  fieldProps: style.inputStyle.value,
  buttonProps: style.buttonStyle.value
}

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
  modelValue.value = mapDraggableToSchema(copyObject(controls.value))
  key.value++

}, {deep: true})


onMounted(() => {
  useBuilderStateStore.resetState()
  controls.value = mapSchemaToDraggable(copyObject(modelValue.value), formOptions)
})

function updateSchema(schema: string) {
  useBuilderStateStore.resetState()
  controls.value = mapSchemaToDraggable(copyObject(JSON.parse(schema)), formOptions)
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
