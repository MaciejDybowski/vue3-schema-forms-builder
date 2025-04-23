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
      <label-property v-model="model"/>

      <select-general
        v-model="model.mode"
        :items="[{value: 'copy', title: `Copy`}, {value:'form-and-action', title: 'Form and action'}, {value:'api-call', title: 'API Call'}]"
        :return-object="false"
        clearable
        label="Btn mode"
      />
      <v-btn
        class="mx-4 my-4"
        color="primary"
        append-icon="mdi-cog"
        size="small"
        text="Configuration"
        @click="configButtonDialog = true"
      />

      <tcn-au-dialog
        v-if="configButtonDialog"
        v-model="configButtonDialog"
        acceptText="Save"
        scrollable
        width="800px"
        @acceptButton="configButtonDialog = false"
        @closeButton="configButtonDialog = false"
      >
        <v-card class="mx-4 my-2">
          <v-card-title>Button configuration</v-card-title>
          <v-card-text>
            <tcn-code-editor
              :model-value="JSON.stringify(model.config, null, 2)"
              height="300px"
              label="Config"
              language="json"
              @update:model-value="value => tryParseAsJsonButtonConfig(value)"
            />
          </v-card-text>
        </v-card>
      </tcn-au-dialog>


      <v-btn
        v-if="model.mode=='form-and-action'"
        class="mx-4 my-4"
        color="primary"
        append-icon="mdi-cog"
        size="small"
        text="Dialog schema"
        @click="configButtonDialogSchema = true"
      />

      <tcn-au-dialog
        v-if="configButtonDialogSchema"
        v-model="configButtonDialogSchema"
        acceptText="Save"
        scrollable
        width="800px"
        @acceptButton="configButtonDialogSchema = false"
        @closeButton="configButtonDialogSchema = false"
      >
        <v-card class="mx-4 my-2">
          <v-card-title>Internal JSON Schema</v-card-title>
          <v-card-text>
            <tcn-code-editor
              :model-value="JSON.stringify(model.schema, null, 2)"
              height="300px"
              label="JSON Schema"
              language="json"
              @update:model-value="value => tryParseAsButtonSchema(value)"
            />
          </v-card-text>
        </v-card>
      </tcn-au-dialog>


    </expansion-panel>
    <expansion-panel
      :active="panels.includes('layout')"
      title="Layout"
      value="layout"
    >
      <col-property v-model="model.layout.cols"/>
      <fill-row-property v-model="model.layout.fillRow"/>

    </expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";

const panels = ref<string[]>(["general"])
const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const configButtonDialog = ref(false)
const configButtonDialogSchema = ref(false)

function tryParseAsJsonButtonConfig(value: string) {
  try {
    const temp = JSON.parse(value)
    //@ts-ignore
    model.value.config = temp
  } catch (e) {
    console.warn("Parsing error")
  }
}

function tryParseAsButtonSchema(value: string) {
  try {
    const temp = JSON.parse(value)
    //@ts-ignore
    model.value.schema = temp
  } catch (e) {
    console.warn("Parsing error")
  }
}

</script>


<style lang="scss" scoped>

</style>
