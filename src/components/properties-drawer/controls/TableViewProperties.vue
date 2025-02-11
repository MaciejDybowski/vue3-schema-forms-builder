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
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('layout')"
      title="Layout"
      value="layout"
    >
      <col-property v-model="model.layout.cols"/>
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

      <div v-for="(header, index) in headers"
           class="d-flex align-center my-1"
      >
        <textfield-general
          v-model="header.title"
          label="Title"/>

        <v-btn
          class="mx-1"
          icon="mdi-cog"
          size="x-small"
          @click="configHeader(header)"
        />

        <v-btn
          class="mx-1"
          icon="mdi-delete"
          size="x-small"
          @click="removeHeader(index)"
        />
      </div>
      <v-btn
        class="mx-4 my-2"
        color="primary"
        density="compact"
        text="Dodaj"
        @click="headers.push({})"
      />

      <tcn-au-dialog
        v-if="configHeaderDialog"
        v-model="configHeaderDialog"
        :acceptColor="style.primaryWhite.value"
        acceptText="Save"
        scrollable
        width="800px"
        @acceptButton="configHeaderDialog = false"
        @closeButton="configHeaderDialog = false"
      >
        <template #title>
          <v-card-title>
            Table header to configure: {{ currentConfiguredHeader.title }}
          </v-card-title>
        </template>

        <v-card-text>
          <textfield-general
            v-model="currentConfiguredHeader.key"
            label="Key"/>
          <textfield-general
            v-model="currentConfiguredHeader.valueMapping"
            label="Value mapping"/>
          <select-general
            v-model="currentConfiguredHeader.type"
            :items="[{value: 'TEXT', title: 'Text'}, {value: 'NUMBER', title: 'Number'}, {value: 'ICON', title: 'Icon'}, {value: 'IMAGE', title: 'Image'}]"
            :return-object="false"
            clearable
            label="Typ pola"
          />
          <switch-general
            v-if="currentConfiguredHeader.type=='TEXT' || currentConfiguredHeader.type=='NUMBER'"
            v-model="currentConfiguredHeader.editable"
            label="Editable"
          />

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
          v-model="button.label"
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
        scrollable
        width="800px"
        @acceptButton="configButtonDialog = false"
        @closeButton="configButtonDialog = false"
      >

        <template #title>
          <v-card-title>
            Table action to configure: {{ currentConfiguredButton.label }}
          </v-card-title>
        </template>

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
        @click="buttons.push({label: null, mode: null})"
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
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import {useStyle} from "@/main";
import SwitchGeneral from "@/components/properties-drawer/atoms/SwitchGeneral.vue";

const style = useStyle()
const panels = ref<string[]>(["general", 'source', 'headers'])
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
  configHeaderDialog.value = true
}

function configButton(button: any) {
  currentConfiguredButton.value = button
  configButtonDialog.value = true
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

onMounted(() => {
  headers.value = model.value.source.headers
  headerAction.value = headers.value.filter((item) => item.key == "action")
  buttons.value = model.value.source.buttons
})
</script>

<style lang="scss" scoped>

</style>
