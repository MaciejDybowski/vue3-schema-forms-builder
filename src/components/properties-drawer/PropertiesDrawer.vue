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

    <div v-else class="json-ai-layout fill-height d-flex flex-column">
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
    </div>
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
  const prefix = JSON.stringify(modelValue.value) + "  Polecenie:"

  //const preExamples = " Podaję Ci gotowy json string zawierający poprawne definicje różynch pól formularza. Wybieraj odpowiednie z tego zestawu dodając z polecenia kolejne pola: "
  //const examples = `{\\"type\\":\\"object\\",\\"properties\\":{\\"textField\\":{\\"label\\":\\"Pole tekstowe\\",\\"layout\\":{\\"component\\":\\"text-field\\"}},\\"textArea\\":{\\"label\\":\\"Obszar tekstowy\\",\\"layout\\":{\\"component\\":\\"text-area\\"}},\\"numberField\\":{\\"label\\":\\"Pole liczbowe\\",\\"layout\\":{\\"component\\":\\"number-field\\"},\\"type\\":\\"int\\"},\\"datePicker\\":{\\"label\\":\\"Date picker\\",\\"layout\\":{\\"component\\":\\"date-picker\\"}},\\"dateTimePicker\\":{\\"label\\":\\"Date-time picker\\",\\"layout\\":{\\"component\\":\\"date-time-picker\\"}},\\"switch\\":{\\"label\\":\\"Pole przełącznik\\",\\"layout\\":{\\"component\\":\\"switch\\"}},\\"radioButton\\":{\\"label\\":\\"Pole typu radio\\",\\"layout\\":{\\"component\\":\\"radio-button\\"},\\"source\\":{\\"items\\":[{\\"value\\":1,\\"title\\":\\"Option 1\\"},{\\"value\\":2,\\"title\\":\\"Option 2\\"},{\\"value\\":3,\\"title\\":\\"Option 3\\"}]}},\\"select\\":{\\"label\\":\\"Pole wyboru\\",\\"layout\\":{\\"component\\":\\"select\\"},\\"source\\":{\\"items\\":[{\\"value\\":1,\\"title\\":\\"Option 1\\"},{\\"value\\":2,\\"title\\":\\"Option 2\\"},{\\"value\\":3,\\"title\\":\\"Option 3\\"}]}},\\"userInput\\":{\\"label\\":\\"Pole użytkownik\\",\\"layout\\":{\\"component\\":\\"user-input\\"},\\"source\\":{\\"url\\":\\"\\"}}}}`
  //const request = `Oczekiwany resultat: Zwróć surową rozszerzoną o nowe pola struktrę strukturę JSON tylko i wyłącznie tak abym na zwróconym tekście wykonać JSON.parse(wynik) i nie zwracało ono żadnego błędu. Tj. nie opakowywuj jsona w \`\`\` ani nic. Sam tekst. Dodatkowo dołączam ci zbiór poprawnych pól w JSON schema`
  const request2 = `Oczekiwany rezultant: Zgodnie z poleceniem zwróć rozszerzoną strukturę JSON Schema o nowe pola (korzystaj z przykładów podanych poniżej jako json string). Odpowiedź powinna być stringiem tak abym na zwróconym tekście wykonać JSON.parse(wynik) i nie zwracało ono żadnego błędu. Nie opakowywuj jsona w \`\`\`json  \`\`\``

  //console.debug("Full request")
  //console.debug(prefix + aiRequest + request2)

  const newSchema = await askAI(prefix + aiRequest + request2)
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
