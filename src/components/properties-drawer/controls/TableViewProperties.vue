<template>
  <v-expansion-panels
    v-model="panels"
    elevation="0"
    multiple
  >
    <expansion-panel
      :active="panels.includes('general')"
      title="General"
      value="general"
    >
      <key-property v-model="model.key"/>
      <textfield-general
        v-model="model.ref"
        label="Reference"/>
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
      :active="panels.includes('source')"
      title="Source"
      value="source"
    >
      <textfield-general
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
            <textfield-general
              v-if="typeof element.title == 'string'"
              v-model="element.title"
              class="px-1 mx-0"
              label="Title"
            />
            <textfield-general
              v-else
              v-model="element.title.$ref"
              :disabled="true"
              class="px-1 mx-0"
              label="Title"/>

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
        acceptText="Save"
        persistent
        scrollable
        width="800px"
        @acceptButton="closeConfigHeaderDialog"
        @closeButton="closeConfigHeaderDialog"
      >
        <template #title>
          <v-card-title>
            Table header to configure: {{ currentConfiguredHeader.title }}
          </v-card-title>
        </template>

        <v-card-text>
          <textfield-general
            v-model="dynamicHeaderTitle"
            :prefix="currentConfiguredHeader.isReference? prefix: ''"
            label="Title"
          />

          <v-switch
            v-model="currentConfiguredHeader.isReference"
            class="mx-4"
            color="green"
            hide-details="auto"
            label="Use Reference"
            @change="referenceChangedHeaderTitle"
          />

          <translation-input
            v-if="currentConfiguredHeader.isReference && model.i18n"
            :key="dynamicHeaderTitle"
            v-model="model.i18n"
            :input-key="currentConfiguredHeader.i18nInputKey"
          />


          <textfield-general
            v-model="currentConfiguredHeader.key"
            label="Key"/>
          <textfield-general
            v-model="currentConfiguredHeader.valueMapping"
            label="Value mapping"/>
          <textfield-general
            v-model="currentConfiguredHeader.footerMapping"
            label="Footer mapping"/>
          <textfield-general
            v-model="currentConfiguredHeader.color"
            label="Color"/>
          <select-general
            v-model="currentConfiguredHeader.type"
            :items="[{value: 'TEXT', title: 'Text'}, {value: 'NUMBER', title: 'Number'}, {value: 'ICON', title: 'Icon'}, {value: 'IMAGE', title: 'Image'}, {value: 'ALERT', title: 'Alert'}, {value: 'COLLECTION', title: 'Collection'}]"
            :return-object="false"
            clearable
            label="Field type"
          />
          <switch-general
            v-if="currentConfiguredHeader.type=='TEXT' || currentConfiguredHeader.type=='NUMBER'"
            v-model="currentConfiguredHeader.editable"
            label="Editable"
          />

          <div v-if="currentConfiguredHeader.type == 'COLLECTION'">

            <v-card class="mx-4 my-2">
              <v-card-title>Collection items definition</v-card-title>
              <v-card-text>
                <tcn-code-editor
                  :model-value="JSON.stringify(currentConfiguredHeader.items, null, 2)"
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
            <v-card-title>Header properties</v-card-title>
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
                    color="error"
                    density="compact"
                    text="Delete action"
                    variant="elevated"
                    @click="currentConfiguredHeader.actions = currentConfiguredHeader.actions.filter((item, i) => i !== index)"
                  />
                </v-card-actions>
              </v-card>


            </div>
            <v-btn
              class="mx-4"
              color="primary"
              density="compact"
              text="Add action"
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
        <textfield-general
          v-if="typeof button.label == 'string'"
          v-model="button.label"
          label="Label"/>

        <textfield-general
          v-else
          v-model="button.label.$ref"
          :disabled="true"
          class="px-1 mx-0"
          label="Label"/>

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
        acceptText="Save"
        persistent
        scrollable
        width="800px"
        @acceptButton="closeConfigButtonDialog"
        @closeButton="closeConfigButtonDialog"
      >

        <template #title>
          <v-card-title>
            Table action to configure: {{ currentConfiguredButton.label }}
          </v-card-title>
        </template>

        <textfield-general
          v-model="dynamicButtonLabel"
          :prefix="currentConfiguredButton.isReference? prefix: ''"
          label="Title"
        />

        <v-switch
          v-model="currentConfiguredButton.isReference"
          class="mx-4"
          color="green"
          hide-details="auto"
          label="Use Reference"
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
          :return-object="false"
          clearable
          label="Mode"
        />

        <v-card class="mx-4 my-2">
          <v-card-title>Button configuration</v-card-title>
          <v-card-text>
            <tcn-code-editor
              :model-value="JSON.stringify(currentConfiguredButton.config, null, 2)"
              height="300px"
              label="Config"
              language="json"
              @update:model-value="value => tryParseAsJsonButtonConfig(value, currentConfiguredButton,)"
            />
          </v-card-text>
        </v-card>

        <v-card class="mx-4 my-2">
          <v-card-title>Button properties (Vuetify)</v-card-title>
          <v-card-text>
            <tcn-code-editor
              :model-value="JSON.stringify(currentConfiguredButton.btnProps, null, 2)"
              height="300px"
              label="Props"
              language="json"
              @update:model-value="value => tryParseAsJsonButtonProps(value, currentConfiguredButton,)"
            />
          </v-card-text>
        </v-card>
      </tcn-au-dialog>

      <v-btn
        class="mx-4 my-2"
        color="primary"
        density="compact"
        text="Add"
        @click="buttons.push({label: '', mode: null})"
      />
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('actions')"
      title="Actions"
      value="actions"
    >
      <tcn-code-editor
        :model-value="JSON.stringify(model.actions, null, 2)"
        height="200px"
        label="JSON Object with actions"
        language="json"
        @update:model-value="value => tryParseAsJsonActions(value)"
      />


    </expansion-panel>

  </v-expansion-panels>
</template>

<script lang="ts" setup>

import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import {computed, onMounted, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import {useStyle} from "@/main";
import SwitchGeneral from "@/components/properties-drawer/atoms/SwitchGeneral.vue";
import draggable from "../../../vuedraggable/vuedraggable";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import {useTranslateInput} from "@/composables/useTranslateInput";
import TranslationInput from "@/components/properties-drawer/atoms/TranslationInput.vue";

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
  group: "controls",
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
    currentConfiguredHeader.items = temp
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
