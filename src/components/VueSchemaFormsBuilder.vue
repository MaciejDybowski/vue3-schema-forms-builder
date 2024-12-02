<template>
  <div>
    <ElementsDrawer/>
    <v-row class="my-4" dense justify="center">
      <v-col :cols="canvasColumns">
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
import {computed, FunctionPlugin, getCurrentInstance} from "vue";
import {FormSchema} from "@/models/FormSchema";


// Do usunięcia jeżeli nie będzie kłopotów ze storem :D
// import {schemaFormModelStoreInit} from "vue3-schema-forms";
// schemaFormModelStoreInit.useFormModelStore("builder-tecna-id")
// import {createVueSchemaForms} from "../../../vue3-schema-forms";
// import "../../../vue3-schema-forms/dist/style.css"
import {createVueSchemaForms} from "vue3-schema-forms";
import "vue3-schema-forms/dist/style.css"
import {customSchemaComponents} from "tecna-vue-shared"

const instance = getCurrentInstance();


const vueSchemaForms = createVueSchemaForms({
  customComponents: {...customSchemaComponents},
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

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
}

.stretch {
  flex: 1;
}
</style>
