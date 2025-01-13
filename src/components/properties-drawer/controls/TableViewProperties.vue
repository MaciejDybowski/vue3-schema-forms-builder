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
        <v-row dense>
          <v-col cols="10">
            <select-general
              v-model="header.type"
              :items="[{value: 'TEXT', title: 'TEXT'}]"
              :return-object="false"
              clearable
              label="Typ pola"
            />
          </v-col>
          <v-col class="d-flex align-center justify-center"
                 cols="2"
          >
            <v-btn
              class="mx-0"
              color="error"
              density="compact"
              icon="mdi-delete"
              @click="headers = headers.filter((item, i) => i !== index)"
            />
          </v-col>

        </v-row>
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
  </v-expansion-panels>
</template>

<script lang="ts" setup>

import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";

const panels = ref<string[]>(["general", 'headers'])
const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const headers = ref<any[]>(model.value.source.headers)
</script>

<style lang="scss" scoped>

</style>
