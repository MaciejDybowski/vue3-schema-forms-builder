<template>
  <v-expansion-panels
    v-model="panels"
    elevation="0"
    multiple
  >
    <conversion-panel :active="panels.includes('conversion')">
      <select-general
        v-model="model.layout.component"
        :clearable="false"
        :items="[
          {value: 'table-view', title: t('conversion.tableView')},
          {value: 'table-internal', title: t('conversion.tableInternal')}
       ]"
        :label="t('conversion.label')"
        :return-object="false"
      />
    </conversion-panel>

    <expansion-panel
      :active="panels.includes('general')"
      title="General"
      value="general"
    >
      <key-property v-model="model.key"/>
      <text-property-wrapper
        v-model="model.ref"
        :label="t('useReference')"
      />
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('layout')"
      title="Layout"
      value="layout"
    >
      <col-property v-model="model.layout.cols"/>
    </expansion-panel>

    <expansion-panel
      :active="panels.includes('logic')"
      title="Logic"
      value="logic"
    >
      <if-property v-model="model.layout.if"/>
    </expansion-panel>

    <expansion-panel
      v-if="model.layout.component.includes('view')"
      :active="panels.includes('source')"
      title="Source"
      value="source"
    >
      <text-property-wrapper
        v-model="model.source.data"
        label="Data URL"/>
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('headers')"
      title="Headers"
      value="headers"
    >
      <draggable
        v-model="headers"
        :emptyInsertThreshold="100"
        :sort="true"
        class="d-flex flex-wrap"
        handle=".draggable-icon"
        item-key="key"
        v-bind="dragOptions"
        @change="updateHeaders"
      >
        <template #item="{element, index}">
          <div class="draggable-wrapper d-flex align-center justify-center">
            <v-icon class="px-1 mx-0 draggable-icon cursor-grab"> mdi-drag-vertical</v-icon>
            <text-property-wrapper
              v-if="typeof element.title == 'string'"
              v-model="element.title"
              :label="t('title')"
              class="px-1 mx-0"
            />
            <text-property-wrapper
              v-else
              v-model="element.title.$ref"
              :disabled="true"
              :label="t('title')"
              class="px-1 mx-0"
            />
            <v-btn
              class="mx-1"
              icon="mdi-cog"
              size="x-small"
              @click="configHeader(element)"
            />

            <v-btn
              :disabled="index==0"
              class="mx-1"
              icon="mdi-delete"
              size="x-small"
              @click="removeHeader(index)"
            />
          </div>
        </template>
      </draggable>

      <v-btn
        class="mx-4 my-2"
        color="primary"
        density="compact"
        text="Dodaj"
        @click="headers.push({title:''})"
      />

      <tcn-au-dialog
        v-if="configHeaderDialog"
        v-model="configHeaderDialog"
        :acceptColor="style.primaryWhite.value"
        :acceptText="t('save')"
        persistent
        scrollable
        width="800px"
        @acceptButton="closeConfigHeaderDialog"
        @closeButton="closeConfigHeaderDialog"
      >
        <template #title>
          <v-card-title>
            {{ t('dialogHeader', {val: currentConfiguredHeader.title}) }}
          </v-card-title>
        </template>

        <v-card-text class="px-0">
          <text-property-wrapper
            v-model="dynamicHeaderTitle"
            :label="t('title')"
            :prefix="currentConfiguredHeader.isReference? prefix: ''"
          />

          <v-switch
            v-model="currentConfiguredHeader.isReference"
            :label="t('useReference')"
            class="mx-4"
            color="green"
            hide-details="auto"
            @change="referenceChangedHeaderTitle"
          />

          <translation-input
            v-if="currentConfiguredHeader.isReference && model.i18n"
            :key="dynamicHeaderTitle"
            v-model="model.i18n"
            :input-key="currentConfiguredHeader.i18nInputKey"
          />


          <text-property-wrapper
            v-model="currentConfiguredHeader.key"
            :label="t('key')"/>

          <text-property-wrapper
            v-model="currentConfiguredHeader.valueMapping"
            :label="t('valueMapping')"
          />
          <text-property-wrapper
            v-model="currentConfiguredHeader.footerMapping"
            :label="t('footerMapping')"/>
          <text-property-wrapper
            v-model="currentConfiguredHeader.color"
            :label="t('color')"/>
          <select-general
            v-model="currentConfiguredHeader.type"
            :items="[{value: 'TEXT', title: 'Text'}, {value: 'TEXTAREA', title: 'Textarea'}, {value: 'NUMBER', title: 'Number'}, {value: 'ICON', title: 'Icon'}, {value: 'IMAGE', title: 'Image'}, {value: 'ALERT', title: 'Alert'}, {value: 'COLLECTION', title: 'Collection'}]"
            :label="t('fieldType')"
            :return-object="false"
            clearable
          />
          <boolean-switch-property-wrapper
            v-if="currentConfiguredHeader.type=='TEXT' || currentConfiguredHeader.type=='NUMBER' || currentConfiguredHeader.type=='TEXTAREA'"
            v-model="currentConfiguredHeader.editable"
            :label="t('editable')"
          />

          <div v-if="currentConfiguredHeader.type == 'COLLECTION'">

            <v-card class="mx-4 my-2">
              <v-card-title>{{ t('collectionItemsDefinition') }}</v-card-title>
              <v-card-text>
                <tcn-code-editor
                  :model-value="JSON.stringify(currentConfiguredHeader.editable, null, 2)"
                  height="150px"
                  language="json"
                  @update:model-value="value => tryParseAsJsonItemsInCollection(value, currentConfiguredHeader)"
                />
              </v-card-text>
            </v-card>
          </div>

          <v-card v-if="currentConfiguredHeader.key != 'actions'"
                  class="mx-4 my-2"
                  height="200px"
          >
            <v-card-title>{{ t('headerProperties') }}</v-card-title>
            <v-card-text>
              <tcn-code-editor
                :model-value="JSON.stringify(currentConfiguredHeader.properties, null, 2)"
                height="200px"
                language="json"
                @update:model-value="value => tryParseAsJsonHeaderProperties(value, currentConfiguredHeader)"
              />
            </v-card-text>
          </v-card>


          <div v-if="currentConfiguredHeader.key == 'actions'">
            <div v-for="(headerAction,index) in currentConfiguredHeader.actions">
              <v-card class="mx-4 my-2">
                <v-card-text>
                  <tcn-code-editor
                    :model-value="JSON.stringify(headerAction, null, 2)"
                    height="150px"
                    language="json"
                    @update:model-value="value => tryParseAsJson(value, currentConfiguredHeader, index)"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    :text="t('deleteAction')"
                    color="error"
                    density="compact"
                    variant="elevated"
                    @click="currentConfiguredHeader.actions = currentConfiguredHeader.actions.filter((item, i) => i !== index)"
                  />
                </v-card-actions>
              </v-card>


            </div>
            <v-btn
              :text="t('addAction')"
              class="mx-4"
              color="primary"
              density="compact"
              variant="elevated"
              @click="() => 'actions' in currentConfiguredHeader? currentConfiguredHeader.actions.push({}): currentConfiguredHeader['actions'] = [{}]"
            />
          </div>
        </v-card-text>
      </tcn-au-dialog>

    </expansion-panel>

    <expansion-panel
      :active="panels.includes('buttons')"
      title="Buttons"
      value="buttons"
    >
      <div v-for="(button, index) in buttons"
           class="d-flex align-center my-1">
        <text-property-wrapper
          v-if="typeof button.label == 'string'"
          v-model="button.label"
          :label="t('label')"
        />

        <text-property-wrapper
          v-else
          v-model="button.label.$ref"
          :disabled="true"
          :label="t('label')"
          class="px-1 mx-0"
        />

        <v-btn
          class="mx-1"
          icon="mdi-cog"
          size="x-small"
          @click="configButton(button)"
        />

        <v-btn
          class="mx-1"
          icon="mdi-delete"
          size="x-small"
          @click="buttons = buttons.filter((item, i) => i !== index)"
        />

        <v-divider class="mt-2 mx-4"/>
      </div>

      <tcn-au-dialog
        v-if="configButtonDialog"
        v-model="configButtonDialog"
        :acceptColor="style.primaryWhite.value"
        :acceptText="t('save')"
        persistent
        scrollable
        width="800px"
        @acceptButton="closeConfigButtonDialog"
        @closeButton="closeConfigButtonDialog"
      >

        <template #title>
          <v-card-title>
            {{ t("dialogHeaderAction", {val: currentConfiguredButton.label}) }}
          </v-card-title>
        </template>

        <text-property-wrapper
          v-model="dynamicButtonLabel"
          :label="t('label')"
          :prefix="currentConfiguredButton.isReference? prefix: ''"
        />

        <v-switch
          v-model="currentConfiguredButton.isReference"
          :label="t('useReference')"
          class="mx-4"
          color="green"
          hide-details="auto"
          @change="referenceChangedButtonLabel"
        />

        <translation-input
          v-if="currentConfiguredButton.isReference && model.i18n"
          :key="dynamicButtonLabel"
          v-model="model.i18n"
          :input-key="currentConfiguredButton.i18nInputKey"
        />


        <select-general
          v-model="currentConfiguredButton.mode"
          :items="[{value: 'action', title: 'Action'}]"
          :label="t('mode')"
          :return-object="false"
          clearable
        />

        <v-card class="mx-4 my-2">
          <v-card-title>Button configuration</v-card-title>
          <v-card-text>
            <tcn-code-editor
              :label="t('config')"
              :model-value="JSON.stringify(currentConfiguredButton.config, null, 2)"
              height="300px"
              language="json"
              @update:model-value="value => tryParseAsJsonButtonConfig(value, currentConfiguredButton,)"
            />
          </v-card-text>
        </v-card>

        <v-card class="mx-4 my-2">
          <v-card-title>Button properties (Vuetify)</v-card-title>
          <v-card-text>
            <tcn-code-editor
              :label="t('props')"
              :model-value="JSON.stringify(currentConfiguredButton.btnProps, null, 2)"
              height="300px"
              language="json"
              @update:model-value="value => tryParseAsJsonButtonProps(value, currentConfiguredButton,)"
            />
          </v-card-text>
        </v-card>
      </tcn-au-dialog>

      <v-btn
        :text="t('add')"
        class="mx-4 my-2"
        color="primary"
        density="compact"
        @click="buttons.push({label: '', mode: null})"
      />
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('actions')"
      title="Actions"
      value="actions"
    >
      <tcn-code-editor
        :label="t('jsonObjectWithActions')"
        :model-value="JSON.stringify(model.actions, null, 2)"
        height="200px"
        language="json"
        @update:model-value="value => tryParseAsJsonActions(value)"
      />


    </expansion-panel>

  </v-expansion-panels>
</template>

<script lang="ts" setup>

import ColProperty from "@/components/properties-drawer/atoms/cols/ColProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import {computed, onMounted, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";

import {useStyle} from "@/main";

import draggable from "../../../vuedraggable/vuedraggable";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import {useTranslateInput} from "@/composables/useTranslateInput";
import TranslationInput from "@/components/properties-drawer/atoms/TranslationInput.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import BooleanSwitchPropertyWrapper from "@/components/properties-drawer/atoms/BooleanSwitchPropertyWrapper.vue";
import {useI18n} from "vue-i18n";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import ConversionPanel from "@/components/properties-drawer/panels/ConversionPanel.vue";

const {t} = useI18n()
const style = useStyle()
const panels = ref<string[]>(["general", 'source', 'logic', 'headers'])
const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const headers = ref<any[]>([])
const headerAction = ref<any>(null)
const buttons = ref<any[]>([])

function updateHeaders(val) {
  model.value.source.headers = headers.value
}

const dragOptions = {
  animation: 250,
  group: "table-headers",
  ghostClass: "ghost"
};

function removeHeader(index: number) {
  headers.value = headers.value.filter((item, i) => i !== index)
  model.value.source.headers = headers.value
}

const configHeaderDialog = ref(false)
const currentConfiguredHeader = ref<any>(null)


const configButtonDialog = ref(false)
const currentConfiguredButton = ref<any>(null)

function configHeader(header: any) {
  currentConfiguredHeader.value = header
  const localIsReference = typeof currentConfiguredHeader.value.title != "string"
  currentConfiguredHeader.value.isReference = localIsReference
  currentConfiguredHeader.value.i18nInputKey = !localIsReference ? toCamelCase(header.title) : currentConfiguredHeader.value.title.$ref.split("/").pop()
  configHeaderDialog.value = true
}

function configButton(button: any) {
  currentConfiguredButton.value = button
  const localIsReference = typeof currentConfiguredButton.value.label != "string"
  currentConfiguredButton.value.isReference = localIsReference
  currentConfiguredButton.value.i18nInputKey = !localIsReference ? toCamelCase(currentConfiguredButton.value.label) : currentConfiguredButton.value.label.$ref.split("/").pop()
  configButtonDialog.value = true
}

function tryParseAsJsonItemsInCollection(value: string, currentConfiguredHeader) {
  try {
    const temp = JSON.parse(value)
    currentConfiguredHeader.editable = temp
  } catch (e) {
    console.warn("Parsing error")
  }
}

function tryParseAsJsonHeaderProperties(value: string, currentConfiguredHeader) {
  try {
    const temp = JSON.parse(value)
    currentConfiguredHeader.properties = temp
  } catch (e) {
    console.warn("Parsing error")
  }
}

function tryParseAsJsonActions(value: string) {
  try {
    const temp = JSON.parse(value)
    model.value.actions = temp
  } catch (e) {
    console.warn("Parsing error")
  }
}

function tryParseAsJson(value: string, currentConfiguredHeader, index) {
  try {
    const temp = JSON.parse(value)
    currentConfiguredHeader.actions[index] = temp
  } catch (e) {
    console.warn("Parsing error")
  }
}

function tryParseAsJsonButtonProps(value: string, currentConfiguredButton) {
  try {
    const temp = JSON.parse(value)
    currentConfiguredButton.btnProps = temp
  } catch (e) {
    console.warn("Parsing error")
  }
}

function tryParseAsJsonButtonConfig(value: string, currentConfiguredButton) {
  try {
    const temp = JSON.parse(value)
    currentConfiguredButton.config = temp
  } catch (e) {
    console.warn("Parsing error")
  }
}

function closeConfigHeaderDialog() {
  configHeaderDialog.value = false
  delete currentConfiguredHeader.value.isReference
  delete currentConfiguredHeader.value.i18nInputKey
  currentConfiguredHeader.value = null
}

function closeConfigButtonDialog() {
  configButtonDialog.value = false
  delete currentConfiguredButton.value.isReference
  delete currentConfiguredButton.value.i18nInputKey
  currentConfiguredButton.value = null
}

onMounted(() => {
  headers.value = model.value.source.headers
  headerAction.value = headers.value.filter((item) => item.key == "action")
  buttons.value = model.value.source.buttons
})

const {
  prefix,
  toCamelCase
} = useTranslateInput()

function referenceChangedHeaderTitle() {
  if (currentConfiguredHeader.value.isReference) {
    currentConfiguredHeader.value.title = {$ref: prefix + toCamelCase(currentConfiguredHeader.value.title)}
  } else {
    currentConfiguredHeader.value.title = currentConfiguredHeader.value.title.$ref.replace(prefix, '')
  }
}


const dynamicHeaderTitle = computed({
  get: () => {
    if (typeof currentConfiguredHeader.value.title === 'string') {
      return currentConfiguredHeader.value.title;
    } else {
      const value = currentConfiguredHeader.value.title.$ref.replace(prefix, '');
      currentConfiguredHeader.value.i18nInputKey = value;
      return value;
    }
  },
  set: (value: string) => {
    if (value == null) {
      currentConfiguredHeader.value.title = "";
    }
    currentConfiguredHeader.value.title = currentConfiguredHeader.value.isReference ? {$ref: prefix + value.trim()} : value;
  }
});

const dynamicButtonLabel = computed({
  get: () => {
    if (typeof currentConfiguredButton.value.label === 'string') {
      return currentConfiguredButton.value.label;
    } else {
      const value = currentConfiguredButton.value.label.$ref.replace(prefix, '');
      currentConfiguredButton.value.i18nInputKey = value;
      return value;
    }
  },
  set: (value: string) => {
    if (value == null) {
      currentConfiguredButton.value.label = "";
    }
    currentConfiguredButton.value.label = currentConfiguredButton.value.isReference ? {$ref: prefix + value.trim()} : value;
  }
});

function referenceChangedButtonLabel() {
  if (currentConfiguredButton.value.isReference) {
    currentConfiguredButton.value.label = {$ref: prefix + toCamelCase(currentConfiguredButton.value.label)}
  } else {
    currentConfiguredButton.value.label = currentConfiguredButton.value.label.$ref.replace(prefix, '')
  }
}
</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "conversion": {
      "tableView": "Table: source API",
      "tableInternal": "Table: source model"
    },
    "dialogHeader": "Table header to configure: {val}",
    "dialogHeaderAction": "Table action to configure: {val}",
    "general": "General",
    "layout": "Layout",
    "logic": "Logic",
    "source": "Source",
    "headers": "Headers",
    "buttons": "Buttons",
    "actions": "Actions",
    "save": "Save",
    "add": "Add",
    "title": "Title",
    "key": "Key",
    "valueMapping": "Value mapping",
    "footerMapping": "Footer mapping",
    "color": "Color",
    "fieldType": "Field type",
    "editable": "Editable",
    "collectionItemsDefinition": "Collection items definition",
    "headerProperties": "Header properties",
    "headerActions": "Header actions",
    "label": "Label",
    "mode": "Mode",
    "buttonConfiguration": "Button configuration",
    "buttonPropertiesVuetify": "Button properties (Vuetify)",
    "jsonObjectWithActions": "JSON Object with actions",
    "dataURL": "Data URL",
    "useReference": "Use Reference",
    "deleteAction": "Delete action",
    "addAction": "Add action"
  },
  "pl": {
    "conversion": {
      "tableView": "Tabela: źródło API",
      "tableInternal": "Tabela: źródło model"
    },
    "dialogHeader": "Nagłówek tabeli do konfiguracji: {val}",
    "dialogHeaderAction": "Akcja tabeli do konfiguracji: {val}",
    "general": "Ogólne",
    "layout": "Układ",
    "logic": "Logika",
    "source": "Źródło",
    "headers": "Nagłówki",
    "buttons": "Przyciski",
    "actions": "Akcje",
    "save": "Zapisz",
    "add": "Dodaj",
    "title": "Tytuł",
    "key": "Klucz",
    "valueMapping": "Mapowanie wartości",
    "footerMapping": "Mapowanie stopki",
    "color": "Kolor",
    "fieldType": "Typ pola",
    "editable": "Edycyjne",
    "collectionItemsDefinition": "Definicja elementów kolekcji",
    "headerProperties": "Właściwości nagłówka",
    "headerActions": "Akcje nagłówka",
    "label": "Etykieta",
    "mode": "Tryb",
    "buttonConfiguration": "Konfiguracja przycisku",
    "buttonPropertiesVuetify": "Właściwości przycisku (Vuetify)",
    "jsonObjectWithActions": "Obiekt JSON z akcjami",
    "dataURL": "URL danych",
    "useReference": "Użyj referencji",
    "deleteAction": "Usuń akcję",
    "addAction": "Dodaj akcję"
  }
}
</i18n>
