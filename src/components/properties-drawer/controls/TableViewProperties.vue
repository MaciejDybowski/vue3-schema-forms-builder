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

      <div v-for="(header, index) in headers">
        <textfield-general
          v-if="header.key !== 'actions'"
          v-model="header.title"
          label="Title"/>
        <textfield-general
          v-model="header.key"
          label="Key"/>
        <textfield-general
          v-if="header.key !== 'actions'"
          v-model="header.valueMapping"
          label="Value mapping"/>
        <select-general
          v-if="header.key !== 'actions'"
          v-model="header.type"
          :items="[{value: 'TEXT', title: 'Text'}, {value: 'NUMBER', title: 'Number'}, {value: 'ICON', title: 'Icon'}, {value: 'IMAGE', title: 'Image'}]"
          :return-object="false"
          clearable
          label="Typ pola"
        />
        <switch-general
          v-if="header.type=='TEXT' || header.type=='NUMBER'"
          v-model="header.editable"
          label="Editable"
        />
        <v-btn
          class="mx-4"
          color="error"
          density="compact"
          text="Usuń"
          @click="removeHeader(index)"
        />


        <!-- actions config -->
        <div v-for="(headerAction,index) in header.actions">
          <textfield-general
            :model-value="JSON.stringify(headerAction, undefined,4)"
            label=""
            @update:model-value="value => header.actions[index] = JSON.parse(value)"
          />
          <v-btn
            class="mx-4"
            color="error"
            density="compact"
            text="Delete action"
            @click="header.actions = header.actions.filter((item, i) => i !== index)"
          />
          <v-btn
            class="mx-4 my-2"
            color="primary"
            density="compact"
            text="Add action"
            @click="header.actions.push({})"
          />
        </div>


        <v-divider class="mt-2 mx-4"/>
      </div>
      <v-btn
        class="mx-4 my-2"
        color="primary"
        density="compact"
        text="Dodaj"
        @click="headers.push({})"
      />

    </expansion-panel>

    <expansion-panel
      :active="panels.includes('buttons')"
      title="Buttons"
      value="buttons"
    >
      <div v-for="(button, index) in buttons">
        <textfield-general
          v-model="button.label"
          label="Label"/>
        <select-general
          v-model="button.mode"
          :items="[{value: 'action', title: 'Action'}]"
          :return-object="false"
          clearable
          label="Mode"
        />
        <textfield-general
          :model-value="JSON.stringify(button.btnProps, undefined, 4)"
          label="Props"
          @update:model-value="value => button.btnProps = JSON.parse(value)"
        />
        <textfield-general
          :model-value="JSON.stringify(button.config, undefined, 4)"
          label="Config"
          @update:model-value="value => button.config = JSON.parse(value)"
        />

        <v-btn
          class="mx-4"
          color="error"
          density="compact"
          text="Delete"
          @click="buttons = buttons.filter((item, i) => i !== index)"
        />
        <v-divider class="mt-2 mx-4"/>
      </div>
      <v-btn
        class="mx-4 my-2"
        color="primary"
        density="compact"
        text="Dodaj"
        @click="buttons.push({label: null, mode: null})"
      />
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('actions')"
      title="Actions"
      value="actions"
    >
      <textfield-general
        :model-value="JSON.stringify(model.actions, undefined, 4)"
        label="JSON Object with actions"
        @update:model-value="value => mapDefaultValue(value, model.actions)"
      />

    </expansion-panel>

  </v-expansion-panels>
</template>

<script lang="ts" setup>

import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import {computed, onMounted, Ref, ref} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import SwitchGeneral from "@/components/properties-drawer/atoms/SwitchGeneral.vue";

function mapDefaultValue(val: any, refValue: Ref<any>) {

  try {
    refValue.value = JSON.parse(val);
  } catch (e) {
    refValue.value = null
  }
}

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


onMounted(() => {
  headers.value = model.value.source.headers
  headerAction.value = headers.value.filter((item) => item.key == "action")
  buttons.value = model.value.source.buttons
})
</script>

<style lang="scss" scoped>

</style>
