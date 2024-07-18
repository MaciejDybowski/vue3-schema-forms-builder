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
import {useCanvas} from "../composables/useCanvas";
import {computed, getCurrentInstance} from "vue";
import {FormSchema} from "@/models/FormSchema";
import {createVueSchemaForms, formControls, schemaFormModelStoreInit} from "vue3-schema-forms";

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
