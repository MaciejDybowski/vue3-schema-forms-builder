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

    <div class="d-flex flex-column px-2">
      <div class="d-flex align-center">
        <span class="v-card-title ml-0 pl-0">JSON</span>
        <div>
          <v-btn
            density="compact"
            icon="mdi-content-copy"
            variant="text"
            @click="() => {}"
          />
        </div>
      </div>
      <div style="height: 60%; overflow-y: auto;">
        <vue-json-pretty :data="jsonSchema"/>
      </div>
      <v-divider class="mt-2 px-0 mx-0"/>

      <v-textarea
        v-model="aiRequest"
        clearable
        label="Put your prompt here..."
        rows="2"
        variant="outlined"
      />
      <v-btn text="Ask AI"
             @click="sentRequestToAIModel"
      >

      </v-btn>
    </div>


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
import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import RefProperties from "@/components/properties-drawer/controls/RefProperties.vue";
import {controlsProperties} from "@/components/properties-drawer/controls";
import VueJsonPretty from "vue-json-pretty";
import {useGenAI} from "@/composables/useGenAI";

const drawers = useDrawers();
const useBuilderStateStore = useBuilderState()

const aiRequest = ref("")
const {askAI} = useGenAI()

const {schema} = withDefaults(defineProps<{
  schema: any
}>(), {
  schema: {}
})

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

const jsonSchema = computed(() => {
  return schema
})

async function sentRequestToAIModel(){
  const prefix = JSON.stringify(schema) + "  Polecenie:"
  console.debug(prefix)

  //const newSchema = await askAI(prefix + aiRequest + " Oczekiwany resultat: Zwróć strukturę JSON tylko i wyłącznie tak abym na zwróconym tekście wykonać JSON.parse(wynik)")
  //console.debug(JSON.parse(newSchema))
}


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


</style>
