<template>
  <ElementsDrawer />
  <v-row no-gutters justify="center">
    <v-col :cols="canvasColumns">
      <v-row style="height: 95vh" dense>
        <v-col cols="auto" class="main-container">
          <MainCanvasToolboxLeft class="stretch" />
        </v-col>
        <v-col cols="" class="main-container">
          <MainCanvas class="stretch" />
        </v-col>
        <v-col cols="auto" class="main-container">
          <MainCanvasToolboxRight class="stretch" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <PropertiesDrawer />
</template>

<script setup lang="ts">
import ElementsDrawer from "@/components/elements-drawer/ElementsDrawer.vue";
import PropertiesDrawer from "@/components/properties-drawer/PropertiesDrawer.vue";
import MainCanvas from "@/components/main-canvas/MainCanvas.vue";
import MainCanvasToolboxLeft from "@/components/main-canvas/MainCanvasToolboxLeft.vue";
import MainCanvasToolboxRight from "@/components/main-canvas/MainCanvasToolboxRight.vue";
import { useCanvas } from "@/composables/useCanvas";
import { computed } from "vue";

const canvas = useCanvas();

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
