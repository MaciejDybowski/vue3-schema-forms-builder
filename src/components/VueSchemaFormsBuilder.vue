<template>
  <div>
    <ElementsDrawer/>
    <v-row dense justify="center" class="my-4">
      <v-col :cols="canvasColumns">
        <v-row dense>
          <v-col cols="auto" class="main-container ma-2">
            <MainCanvasToolboxLeft class="stretch"/>
          </v-col>
          <v-col cols="" class="main-container">
            <MainCanvas v-model="modelValue"
                        class="stretch"/>
          </v-col>
          <v-col cols="auto" class="main-container ma-2">
            <MainCanvasToolboxRight class="stretch"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <PropertiesDrawer/>
  </div>
</template>

<script setup lang="ts">
import ElementsDrawer from "./elements-drawer/ElementsDrawer.vue";
import PropertiesDrawer from "./properties-drawer/PropertiesDrawer.vue";
import MainCanvas from "./main-canvas/MainCanvas.vue";
import MainCanvasToolboxLeft from "./main-canvas/MainCanvasToolboxLeft.vue";
import MainCanvasToolboxRight from "./main-canvas/MainCanvasToolboxRight.vue";
import {useCanvas} from "@/composables/useCanvas";
import {computed, FunctionPlugin, getCurrentInstance} from "vue";
import {FormSchema} from "@/models/FormSchema";


// Do usunięcia jeżeli nie będzie kłopotów ze storem :D
// import {schemaFormModelStoreInit} from "vue3-schema-forms";
// schemaFormModelStoreInit.useFormModelStore("builder-tecna-id")
// import {createVueSchemaForms} from "../../../vue3-schema-forms";
// import "../../../vue3-schema-forms/dist/style.css"
import {Components, createVueSchemaForms} from "vue3-schema-forms";
import "vue3-schema-forms/dist/style.css"

const instance = getCurrentInstance();
const userInputComponent = instance?.appContext.app.component("TcnSchemaUserInput")

const customComponents = {
  "user-input": userInputComponent
} as Components

const vueSchemaForms = createVueSchemaForms({
  customComponents: customComponents,
  installFormControls: true
}) as unknown as FunctionPlugin
instance?.appContext.app.use(vueSchemaForms)


const canvas = useCanvas();
let modelValue = defineModel<FormSchema>()

const canvasColumns = computed(() => {
  switch (canvas.canvasMode.value) {
    case "DESKTOP":
      return 12;
    case "TABLET":
      return 8;
    case "MOBILE":
      return 6;
  }
});
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
}

.stretch {
  flex: 1;
}
</style>
