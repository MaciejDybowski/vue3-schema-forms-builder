<template>
  <div class="d-flex align-center">
    <h2>{{ t('titleFormDemo') }}</h2>
    <span v-if="!showForm && schemaContainUrlElements"
          class="mx-2 v-list-item-subtitle text-decoration-underline"
          style="cursor: pointer;"
          v-bind="style.buttonStyle"
          @click="showForm=true"
    >
      {{ t('changeWorkspaceId') }}: {{ workspaceId }}
    </span>
  </div>
  <v-divider class="mb-1"/>

  <div v-if="showForm && schemaContainUrlElements">
    <p class="mb-2">
      <span class="v-list-item-subtitle">{{ t('workspaceDescription') }}</span>
    </p>
    <div style="width: 300px"  class="mb-4">
      <v-text-field
        v-model="workspaceId"
        :label="t('workspaceId')"
        class="pt-2"
        v-bind="style.inputStyle.value"
      />
    </div>
    <div  class="mb-4">
      <v-btn
        color="primary"
        rounded
        size="small"
        v-bind="style.buttonStyle"
        @click="setWorkspaceIdHeader"
      >
        {{ t('save') }}
      </v-btn>
    </div>
  </div>

  <template
    v-else>
    <vue-schema-forms
      :key="rerenderKey"
      ref="myForm"
      v-model="model"
      :default-form-actions="true"
      :options="options"
      :schema="schema"
      :validation-behaviour="'messages'"
    />

    <div class="d-flex align-center justify-start mt-4">
      <v-btn
        color="primary"
        @click="showModelPayload = !showModelPayload"
      >
        Show payload
      </v-btn>

      <v-btn
        class="mx-2"
        density="compact"
        icon="mdi-content-copy"
        variant="text"
        @click="copy"
      />

    </div>


    <tcn-code-editor
      v-if="showModelPayload"
      :codemirrorOptions="{}"
      :model-value="JSON.stringify(model, null, 2)"
      class="mt-1"
      height="300px"
      language="text"
    />
  </template>

</template>

<script lang="ts" setup>

import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {useStyle} from "@/main";
import {useDrawers} from "@/composables/useDrawers";
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import {useBuilderState} from "@/pinia/useBuilderState";
import axios from "axios";
import {toast} from "vue3-toastify";

const showModelPayload = ref(false);
const {t} = useBuilderLocale()
const model = ref({});
const props = defineProps<{
  schema: object
}>()

const style = useStyle()
const rerenderKey = ref(0)

const options = ref({
  fieldProps: {
    ...style.inputStyle.value,
    readonly: false,
  },
  buttonProps: style.buttonStyle
})
const drawers = useDrawers();

const useBuilderStateStore = useBuilderState()
const showForm = ref(false)
const schemaContainUrlElements = ref(false)
const workspaceId = computed({
  get() {
    return useBuilderStateStore.getWorkspaceId
  },
  set(value: string) {
    useBuilderStateStore.setWorkspaceId(value)
  }
})

function copy() {
  navigator.clipboard.writeText(JSON.stringify(model.value, null, 2));
  toast.success("Copied")
}

function setWorkspaceIdHeader() {
  //@ts-ignore
  axios.defaults.headers.common['Workspace-Id'] = workspaceId.value;
  showForm.value = false
}

onMounted(() => {
  drawers.propertiesDrawer.value = false
  drawers.elementsDrawer.value = false

  showForm.value = workspaceId.value == ""

  schemaContainUrlElements.value = ["dictionary", "combobox", "table", "user"].some(type =>
    JSON.stringify(props.schema).includes(type)
  )

  if (schemaContainUrlElements.value && workspaceId.value) {
    showForm.value = false
  }
})

onBeforeUnmount(() => {
  drawers.elementsDrawer.value = true
})


</script>

<style lang="scss" scoped>

</style>
