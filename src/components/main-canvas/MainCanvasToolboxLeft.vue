<template>
  <v-row class="flex-column" no-gutters>
    <v-col class="pa-0" cols="auto">

      <div class="d-flex flex-column elevation-2 rounded">
        <v-btn-toggle
          v-model="mainCanvas.mainCanvasMode.value"
          class="d-flex flex-column"
          mandatory
          style="height: 90px">
          <v-btn size="30" value="BUILDER">
            <v-icon size="small">mdi-application-edit-outline</v-icon>
          </v-btn>
          <v-btn size="30" value="CODE">
            <v-icon size="small">mdi-code-tags</v-icon>
          </v-btn>
          <v-btn size="30" value="DEMO">
            <v-icon size="small">mdi-play-circle-outline</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
      <div class="d-flex flex-column elevation-2 rounded my-4">
        <v-btn-toggle
          v-model="canvas.canvasMode.value"
          class="d-flex flex-column"
          style="height: 90px">
          <v-btn size="30" value="MOBILE">
            <v-icon size="small">mdi-cellphone</v-icon>
          </v-btn>
          <v-btn size="30" value="TABLET">
            <v-icon size="small">mdi-tablet</v-icon>
          </v-btn>
          <v-btn size="30" value="DESKTOP">
            <v-icon size="small">mdi-monitor</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>


    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="auto">
      <v-btn
        size="30"
        @click="drawers.elementsDrawer.value = !drawers.elementsDrawer.value"
      >
        <v-icon size="small">{{
            drawers.elementsDrawer.value
              ? "mdi-arrow-collapse-left"
              : "mdi-arrow-collapse-right"
          }}
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import {useCanvas} from "@/composables/useCanvas";
import {useDrawers} from "@/composables/useDrawers";
import {useMainCanvas} from "@/composables/useMainCanvas";

const mainCanvas = useMainCanvas()
const canvas = useCanvas()
const drawers = useDrawers();

</script>

<style lang="scss" scoped></style>
<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
