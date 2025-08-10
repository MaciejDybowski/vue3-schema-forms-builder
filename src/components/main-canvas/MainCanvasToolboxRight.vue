<template>
  <v-row class="flex-column" no-gutters>

    <v-col cols="auto">
      <v-btn
        size="30"
        @click="
          showAiPrompt
        "
      >
        <v-icon size="small">mdi-auto-fix</v-icon>
      </v-btn>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="auto">
      <v-btn
        size="30"
        @click="
          drawers.propertiesDrawer.value = !drawers.propertiesDrawer.value
        "
      >
        <v-icon size="small">{{
            drawers.propertiesDrawer.value
              ? "mdi-arrow-collapse-right"
              : "mdi-arrow-collapse-left"
          }}
        </v-icon>
      </v-btn>
    </v-col>

  </v-row>
</template>

<script lang="ts" setup>
import {useDrawers} from "../../composables/useDrawers";
import {useBuilderState} from "@/pinia/useBuilderState";

const drawers = useDrawers();

const useBuilderStateStore = useBuilderState()

function showAiPrompt() {
  useBuilderStateStore.setConfiguredField(null)
  if(!drawers.propertiesDrawer.value){
    drawers.propertiesDrawer.value = !drawers.propertiesDrawer.value
  }


}

</script>

<style lang="scss" scoped></style>
<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
