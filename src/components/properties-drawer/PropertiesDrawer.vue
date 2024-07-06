<template>
  <v-navigation-drawer
    v-model="drawers.propertiesDrawer.value"
    width="350"
    permament
    order="3"
    location="right"
    scrim="transparent"
    style="top: 65px; height: 100%"

  >
    <v-list v-if="useBuilderStateStore.getConfiguredField !== null">
      <text-field-properties v-if="model.layout.component == 'text-field'"/>
      <static-content-properties v-if="model.layout.component == 'static-content'"/>
      <data-viewer-properties v-if="model.layout.component == 'data-viewer'"/>
    </v-list>

  </v-navigation-drawer>
</template>

<script setup lang="ts">
import {useDrawers} from "../../composables/useDrawers";
import {computed} from "vue";
import {useBuilderState} from "../../pinia/stores/useBuilderState";
import TextFieldProperties from "@/components/properties-drawer/controls/TextFieldProperties.vue";
import StaticContentProperties from "@/components/properties-drawer/controls/StaticContentProperties.vue";
import DataViewerProperties from "@/components/properties-drawer/controls/DataViewerProperties.vue";

const fieldProps: any/*Partial<VTextField>*/ = {
  density: "comfortable",
  variant: "outlined",
  hideDetails: "auto",
}

const drawers = useDrawers();
const useBuilderStateStore = useBuilderState()

const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})
</script>

<style lang="scss" scoped></style>
<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
