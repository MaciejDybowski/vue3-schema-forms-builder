<template>
  <div class="d-flex align-center">
    <h2>{{ t('titleFormDemo') }}</h2>
    <span v-if="!showForm && schemaContainDictionary"
          class="mx-4 v-list-item-subtitle text-decoration-underline"
          style="cursor: pointer;"
          v-bind="style.buttonStyle"
          @click="showForm=true"
    >
      {{ t('changeWorkspaceId') }}: {{ workspaceId }}
    </span>
  </div>
  <v-divider class="mb-4"/>

  <v-row v-if="showForm" dense>
    <v-col cols="12">
      <span class="v-list-item-subtitle">{{ t('workspaceDescription') }}</span>
    </v-col>
    <v-col cols="4">
      <v-text-field
        v-model="workspaceId"
        :label="t('workspaceId')"
        class="pt-2"
        v-bind="style.inputStyle.value"
      />
    </v-col>
    <v-col cols="12">
      <v-btn
        color="primary"
        rounded
        size="small"
        v-bind="style.buttonStyle"
        @click="setWorkspaceIdHeader"
      >
        {{ t('save') }}
      </v-btn>
    </v-col>
  </v-row>

  <vue-schema-forms
    v-else
    ref="myForm"
    v-model="model"
    :default-form-actions="true"
    :options="options"
    :schema="schema"
    :validation-behaviour="'messages'"
  />
</template>

<script lang="ts" setup>

import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {useStyle} from "@/main";
import {useDrawers} from "@/composables/useDrawers";
import {useI18n} from "vue-i18n";
import {useBuilderState} from "@/pinia/useBuilderState";
import axios from "axios";

const {t} = useI18n()
const model = ref({});
const props = defineProps<{
  schema: object
}>()

const style = useStyle()
const options = ref({
  fieldProps: style.inputStyle,
  buttonProps: style.buttonStyle
})
const drawers = useDrawers();

const useBuilderStateStore = useBuilderState()
const showForm = ref(false)
const schemaContainDictionary = ref(false)
const workspaceId = computed({
  get() {
    console.debug(useBuilderStateStore.getWorkspaceId)
    return useBuilderStateStore.getWorkspaceId
  },
  set(value: string) {
    useBuilderStateStore.setWorkspaceId(value)
  }
})

function setWorkspaceIdHeader() {
  //@ts-ignore
  axios.defaults.headers.common['Workspace-Id'] = workspaceId.value;
  showForm.value = false
}

onMounted(() => {
  drawers.propertiesDrawer.value = false
  drawers.elementsDrawer.value = false

  showForm.value = workspaceId.value == ""

  schemaContainDictionary.value = ["dictionary", "combobox", "table", "user"].some(type =>
    JSON.stringify(props.schema).includes(type)
  )

  if (schemaContainDictionary.value && workspaceId.value) {
    showForm.value = false
  }
})

onBeforeUnmount(() => {
  drawers.elementsDrawer.value = true
})


</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "titleFormDemo": "Live demo",
    "workspaceId": "Workspace Id",
    "workspaceDescription": "Enter the workspace ID from the Aurea environment for the correct operation of the form demo.",
    "save": "Save",
    "changeWorkspaceId": "Change workspace"
  },
  "pl": {
    "titleFormDemo": "Live demo",
    "workspaceId": "Workspace Id",
    "workspaceDescription": "Wprowadź identyfikator obszaru roboczego ze środowiska Aurea w celu poprawnego działania demo formularza.",
    "save": "Zapisz",
    "changeWorkspaceId": "Zmień obszar roboczy"
  }
}
</i18n>
