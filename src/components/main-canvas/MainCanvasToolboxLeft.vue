<template>
  <v-row no-gutters class="flex-column">
    <v-col cols="auto" class="pa-0">
      <!-- TODO Rfactor -->
      <div class="d-flex flex-column elevation-2 rounded">
        <v-btn-toggle v-model="canvas.canvasMode.value" class="d-flex flex-column" style="height: 90px">
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

      <div class="d-flex flex-column elevation-2 rounded my-4">
        <v-btn size="30">
          <v-icon
            @click="useBuilderStateStore.saveState()"
            size="small">mdi-content-save-all-outline
          </v-icon>
        </v-btn>
        <v-btn size="30"
               :disabled="!useBuilderStateStore.isUndoAvailable"
        >
          <v-icon
            @click="useBuilderStateStore.undo()"
            size="small">mdi-arrow-u-left-top
          </v-icon>
        </v-btn>
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

<script setup lang="ts">
import {useCanvas} from "../../composables/useCanvas";
import {useDrawers} from "../../composables/useDrawers";
import {useBuilderState} from "../../pinia/stores/useBuilderState";


const canvas = useCanvas()
const drawers = useDrawers();
const useBuilderStateStore = useBuilderState()

</script>

<style lang="scss" scoped></style>
<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
