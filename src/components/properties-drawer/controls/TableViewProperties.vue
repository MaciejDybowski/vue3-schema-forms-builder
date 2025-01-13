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
          v-model="header.title"
          label="Title"/>
        <textfield-general
          v-model="header.key"
          label="Key"/>
        <select-general
          v-model="header.type"
          :items="[{value: 'TEXT', title: 'TEXT'}]"
          :return-object="false"
          clearable
          label="Typ pola"
        />
        <v-btn
          class="mx-4"
          color="error"
          density="compact"
          text="Usuń"
          @click="removeHeader(index)"
        />


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
      :active="panels.includes('actions')"
      title="Actions"
      value="actions"
    >
      <div v-for="(action, index) in actions">
        <textfield-general
          v-model="action.key"
          label="Path to attribute"/>
        <textfield-general
          v-model="action.value"
          label="Action code"/>
        <v-btn
          class="mx-4"
          color="error"
          density="compact"
          text="Usuń"
          @click="removeAction(index)"
        />
        <v-divider class="mt-2 mx-4"/>
      </div>
      <v-btn
        class="mx-4 my-2"
        color="primary"
        density="compact"
        text="Dodaj"
        @click="actions.push({key: null, value: null})"
      />
    </expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts" setup>

import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import {computed, onMounted, ref, watch} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";

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
const actions = ref<any[]>([])

function removeHeader(index: number) {
  headers.value = headers.value.filter((item, i) => i !== index)
  model.value.source.headers = headers.value
}

function removeAction(index: number) {
  actions.value = actions.value.filter((item, i) => i !== index)
}

watch(actions, () => {
  console.debug(actions.value)
  const result = actions.value.reduce((acc, {key, value}) => {
    acc[key] = value; // Use the `key` as the object's key and `value` as its value
    return acc;
  }, {});

  model.value.actions = result
}, {deep: true})

onMounted(() => {
  headers.value = model.value.source.headers


  actions.value = Object.entries(model.value.actions)
    .filter(([key, value]) => value !== null && value !== undefined)
    .map(([key, value]) => ({[key]: value}));
})
</script>

<style lang="scss" scoped>

</style>
