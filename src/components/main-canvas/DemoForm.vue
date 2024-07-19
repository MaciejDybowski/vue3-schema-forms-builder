<template>
  <div class="d-flex align-center">
    <h2>{{ t('titleFormDemo') }}</h2>
    <span v-bind="style.buttonStyle"
          @click="showForm=false"
          class="mx-4 v-list-item-subtitle text-decoration-underline"
          v-if="showForm && schemaContainDictionary"
          style="cursor: pointer;"
    >
      {{ t('changeWorkspaceId') }}: {{ workspaceId}}
    </span>
  </div>
  <v-divider class="mb-4"/>

  <v-row v-if="!showForm" dense>
    <v-col cols="12">
      <span class="v-list-item-subtitle">{{ t('workspaceDescription') }}</span>
    </v-col>
    <v-col cols="4">
      <v-text-field
        class="pt-2"
        :label="t('workspaceId')"
        v-model="workspaceId"
        v-bind="style.inputStyle.value"
      />
    </v-col>
    <v-col cols="12">
      <v-btn
        v-bind="style.buttonStyle"
        color="primary"
        rounded
        size="small"
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
    :schema="schema"
    :options="options"
    :default-form-actions="true"
    :validation-behaviour="'messages'"
  />
</template>

<script setup lang="ts">

import {computed, getCurrentInstance, onBeforeUnmount, onMounted, ref} from "vue";
import {useStyle} from "@/main";
import {useDrawers} from "@/composables/useDrawers";
import {useI18n} from "vue-i18n";
import {createVueSchemaForms} from "vue3-schema-forms";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import axios from "axios";


const vue3SchemaForms = createVueSchemaForms({
    formUpdateLogger: true
  }
)
const instance = getCurrentInstance();
instance?.appContext.app.use(vue3SchemaForms)

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
    return useBuilderStateStore.getWorkspaceId
  },
  set(value: string) {
    useBuilderStateStore.setWorkspaceId(value)
  }
})

function setWorkspaceIdHeader() {
  //@ts-ignore
  axios.defaults.headers.common['Workspace-Id'] = workspaceId.value;
  showForm.value = true
}

onMounted(() => {
  drawers.propertiesDrawer.value = false
  drawers.elementsDrawer.value = false

  showForm.value = !JSON.stringify(props.schema).includes("dictionary")
  schemaContainDictionary.value = !showForm.value

  if (schemaContainDictionary.value && workspaceId.value) {
    showForm.value = true
  }
})

onBeforeUnmount(() => {
  drawers.elementsDrawer.value = true
})


</script>

<style scoped lang="scss">

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
