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

<!--    <div v-else class="json-ai-layout fill-height d-flex flex-column">
      <div class="json-panel flex-grow-1 d-flex flex-column px-2 overflow-y-auto">
        <div class="d-flex align-center">
          <span class="v-card-title ml-0 pl-0">JSON Schema</span>
          <v-spacer/>
          <v-btn
            class="mx-4"
            density="compact"
            icon="mdi-content-copy"
            variant="text"
            @click="() => {}"
          />
        </div>
        <v-divider class="my-1"/>
        <vue-json-pretty :data="modelValue as any"/>
      </div>

      <div class="ai-input-bar px-2 pb-2 pt-1">
        <v-textarea
          v-model="aiRequest"
          :disabled="aiLoading"
          :rows="4"
          label="Put your prompt here..."
          no-resize
          variant="outlined"
        >
          <template #append-inner>
            <v-btn
              :loading="aiLoading"
              aria-label="Wyślij wiadomość do modelu AI"
              class="mt-auto mb-1"
              color="primary"
              icon
              size="small"
              @click="sentRequestToAIModel"
            >
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </template>
        </v-textarea>
      </div>
    </div>-->
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
import {FormSchema} from "@/models/FormSchema";

const drawers = useDrawers();
const useBuilderStateStore = useBuilderState()

const aiRequest = ref("")
const {askAI} = useGenAI()

let modelValue = defineModel<FormSchema>()


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


const aiLoading = ref(false);

async function sentRequestToAIModel() {
  aiLoading.value = true
  const currentModel = JSON.stringify(modelValue.value)

  const prompt = `
  You are given an initial JSON Schema object.
  Your task is to extend this schema by adding only the new fields explicitly requested in my instruction, selecting them from the provided reference set of field definitions.
  Important rules:
  1. Do not invent new field definitions — only use the ones provided in the reference JSON string below.
  2. Keep all existing fields from the input schema unchanged.
  3. Add the new requested fields using the exact structure (labels, layout, source, type) from the reference JSON.
  4. The result must be a valid JSON string (not surrounded by code fences) so that JSON.parse(result) works without errors.
  5. Return only the JSON string — no explanations or extra text.

  Reference set of fields (copy-paste base):
  {"type":"object","properties":{"textField":{"label":"Text Field","layout":{"component":"text-field"}},"textArea":{"label":"Text Area","layout":{"component":"text-area"}},"numberField":{"label":"Number Field","layout":{"component":"number-field"},"type":"int"},"datePicker":{"label":"Date picker","layout":{"component":"date-picker"}},"dateTimePicker":{"label":"Date-time picker","layout":{"component":"date-time-picker"}},"switch":{"label":"Switch Field","layout":{"component":"switch"}},"radioButton":{"label":"Radio Button Field","layout":{"component":"radio-button"},"source":{"items":[{"value":1,"title":"Option 1"},{"value":2,"title":"Option 2"},{"value":3,"title":"Option 3"}]}},"select":{"label":"Select Field","layout":{"component":"select"},"source":{"items":[{"value":1,"title":"Option 1"},{"value":2,"title":"Option 2"},{"value":3,"title":"Option 3"}]}},"userInput":{"label":"User Input Field","layout":{"component":"user-input"},"source":{"url":""}}}}

  Input you will get:
  1. JSON Schema object (string) with the current form definition.
  2. My instruction that tells you which new fields to add in Polish.

  Ad1. Current model as JSON string: ${currentModel}
  Ad2. Instruction: ${aiRequest.value},
  `

  const newSchema = await askAI(prompt)
  console.debug(`AI response`, JSON.parse(newSchema as string))

  modelValue.value = JSON.parse(newSchema as string)
  aiLoading.value = false
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
