<template>
  <div>
    <ElementsDrawer/>
    <v-row class="my-4" dense justify="center">
      <v-col
        :cols="canvasColumns"
        :style="`max-width: ${canvasColumnsMaxWidth}`"
      >
        <v-row dense>
          <v-col class="main-container" cols="1">
            <MainCanvasToolboxLeft class="stretch"/>
          </v-col>
          <v-col class="main-container" cols="10">
            <chat-with-a-i
              :schema="modelValue"
              @accept="accept"
              @preview="previewAi"
              @reject="reject"
            />
            <MainCanvas
              ref="mainCanvasRef"
              v-model="modelValue"
              class="stretch"
            />
          </v-col>
          <v-col class="main-container" cols="1">
            <MainCanvasToolboxRight class="stretch"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <PropertiesDrawer/>
  </div>
</template>

<script lang="ts" setup>
import ElementsDrawer from "./elements-drawer/ElementsDrawer.vue";
import PropertiesDrawer from "./properties-drawer/PropertiesDrawer.vue";
import MainCanvas from "./main-canvas/MainCanvas.vue";
import MainCanvasToolboxLeft from "./main-canvas/MainCanvasToolboxLeft.vue";
import MainCanvasToolboxRight from "./main-canvas/MainCanvasToolboxRight.vue";
import {useCanvas} from "@/composables/useCanvas";
import {computed, FunctionPlugin, getCurrentInstance, onBeforeUnmount, ref} from "vue";
import {FormSchema} from "@/models/FormSchema";


//import {createVueSchemaForms, provideFormModel, provideGeneratorCache} from "../../../aurea-forms";
//import "../../../aurea-forms/dist/style.css"
import {createVueSchemaForms, provideFormModel, provideGeneratorCache} from "vue3-schema-forms";
import "vue3-schema-forms/dist/style.css"
import {useBuilderState} from "@/pinia/useBuilderState";
import ChatWithAI from "@/components/builder/ChatWithAI.vue";
import {useMainCanvas} from "@/composables/useMainCanvas";

const instance = getCurrentInstance();

const form = provideFormModel();
const cache = provideGeneratorCache()

const vueSchemaForms = createVueSchemaForms({
  installFormControls: true
}) as unknown as FunctionPlugin
instance?.appContext.app.use(vueSchemaForms)


const canvas = useCanvas();
const mainCanvas = useMainCanvas()
let modelValue = defineModel<FormSchema>()


const useBuilderStateStore = useBuilderState()
onBeforeUnmount(() => {
  useBuilderStateStore.setConfiguredField(null)
  useBuilderStateStore.updateDraggableModel([])
})

const canvasColumns = computed(() => {
  switch (canvas.canvasMode.value) {
    case "DESKTOP":
      return 12;
    case "TABLET":
      return 6;
    case "MOBILE":
      return 4;
  }
});
const canvasColumnsMaxWidth = computed(() => {
  switch (canvas.canvasMode.value) {
    case "DESKTOP":
      return "1850px";
    case "TABLET":
      return "800px";
    case "MOBILE":
      return "400px";
  }
});

const mainCanvasRef = ref<any>();

const lastUserJsonModel = ref<any>(null)

function previewAi(val: any) {
  lastUserJsonModel.value = modelValue.value
  modelValue.value = val

}

function accept() {
  lastUserJsonModel.value = null
}

function reject() {
  modelValue.value = lastUserJsonModel.value
  lastUserJsonModel.value = null
}


const codeEditor = ref(null);

function undo() {
  if (mainCanvas.mainCanvasMode.value === 'BUILDER') {
    useBuilderStateStore.undo()
  } else if (mainCanvas.mainCanvasMode.value === 'CODE') {
    mainCanvasRef.value?.undo();
  }

}

function redo() {
  if (mainCanvas.mainCanvasMode.value === 'BUILDER') {
    useBuilderStateStore.redo()
  } else if (mainCanvas.mainCanvasMode.value === 'CODE') {
    mainCanvasRef.value?.redo();
  }
}

defineExpose({
  undo,
  redo
});
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
}

.stretch {
  flex: 1;
}
</style>

<style lang="scss">
.v-textarea textarea::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.v-textarea textarea {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
</style>
