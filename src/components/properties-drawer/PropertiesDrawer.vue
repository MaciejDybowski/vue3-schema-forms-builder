<template>
  <v-navigation-drawer
    v-model="drawers.propertiesDrawer.value"
    :style="!storybook ? `top: 65px; min-height: calc(100vh - 65px)` : ``"
    location="right"
    order="3"
    permament
    scrim="transparent"
    width="350"
  >
    <v-list v-if="useBuilderStateStore.getConfiguredField !== null">
      <ref-properties v-if="model.ref"/>
      <template v-else-if="model.layout">
        <component :is='controlsProperties[component]'/>
      </template>
    </v-list>

  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import {useDrawers} from "@/composables/useDrawers";
import {computed} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import RefProperties from "@/components/properties-drawer/controls/RefProperties.vue";
import {controlsProperties} from "@/components/properties-drawer/controls";

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

const component = computed(() => {
    const postfix = "-properties";
    if (model.value.layout.component == 'combobox') {
      return "dictionary" + postfix
    }
    if (optionsComponent.value) {
      return "select-radio-checkbox" + postfix
    }
    return model.value.layout.component + postfix
  }
)

const optionsComponent = computed(() => {
  return model.value.layout.component == 'select' ||
    model.value.layout.component == 'radio-button' ||
    model.value.layout.component == 'checkbox'
})

const storybook = computed(() => {
  const host = window.location.hostname
  const port = window.location.port
  return host === 'localhost' && port === "6006"
})


</script>

<style lang="scss" scoped>

.v-expansion-panel--active:not(:first-child), .v-expansion-panel--active + .v-expansion-panel {
  margin-top: 0;
}

.v-expansion-panel--active > .v-expansion-panel-title:not(.v-expansion-panel-title--static) {
  min-height: 48px;
}

.v-expansion-panel {
  border-radius: 0;
}

.json-ai-layout {
  height: 100vh; /* lub 100% jeśli kontener nadrzędny odpowiada za wysokość */
}

.json-panel {
  min-height: 0 !important; /* kluczowe by overflow działało prawidłowo */
}

.overflow-y-auto {
  overflow-y: auto;
}

.ai-input-bar {

}

</style>
