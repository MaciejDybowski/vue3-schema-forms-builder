<template>
  <div>
    <ElementsDrawer/>
    <v-row class="my-4" dense justify="center">
      <v-col
        :cols="canvasColumns"
        :style="`max-width: ${canvasColumnsMaxWidth}`"
      >
        <v-row dense>
          <v-col class="main-container ma-2" cols="auto">
            <MainCanvasToolboxLeft class="stretch"/>
          </v-col>
          <v-col class="main-container" cols="">
            <MainCanvas v-model="modelValue"
                        class="stretch"/>
          </v-col>
          <v-col class="main-container ma-2" cols="auto">
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
import {computed, FunctionPlugin, getCurrentInstance, onBeforeUnmount} from "vue";
import {FormSchema} from "@/models/FormSchema";


//import {createVueSchemaForms} from "../../../aurea-forms";
//import "../../../aurea-forms/dist/style.css"
import {createVueSchemaForms} from "vue3-schema-forms";
import "vue3-schema-forms/dist/style.css"
import {useBuilderState} from "@/pinia/stores/useBuilderState";

const instance = getCurrentInstance();


const vueSchemaForms = createVueSchemaForms({
  installFormControls: true
}) as unknown as FunctionPlugin
instance?.appContext.app.use(vueSchemaForms)


const canvas = useCanvas();
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
