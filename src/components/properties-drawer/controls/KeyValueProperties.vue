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

    </expansion-panel>
    <expansion-panel
      :active="panels.includes('layout')"
      title="Layout"
      value="layout"
    >
      <col-property v-model="model.layout.cols"/>
      <fill-row-property v-model="model.layout.fillRow"/>
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('logic')"
      title="Logic"
      value="logic"
    >
      <if-property v-model="model.layout.if"/>
      <switch-general
        v-model="model.layout.hide"
        :label="model.layout.hide ? t('hide') : t('visible')"
      />
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
              @click="headers = headers.filter((item, i) => i !== index)"
            />
          </div>
        </template>
      </draggable>

      <v-btn
        class="mx-4 my-2"
        color="primary"
        density="compact"
        text="Dodaj"
        @click="headers.push({title:'change it', valueMapping:'change it'})"
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
            @update:model-value="value => updatePropertyHeaderTitle(value)"
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
            v-if="currentConfiguredHeader.isReference && model.i18n &&currentConfiguredHeader.i18nInputKey"
            :key="dynamicHeaderTitle"
            v-model="model.i18n"
            :input-key="currentConfiguredHeader.i18nInputKey"
          />

          <textfield-general
            v-model="currentConfiguredHeader.valueMapping"
            label="Value mapping"/>

        </v-card-text>
      </tcn-au-dialog>

    </expansion-panel>
  </v-expansion-panels>


</template>

<script lang="ts" setup>

import {computed, onMounted, ref} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import {useI18n} from "vue-i18n";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import SwitchGeneral from "@/components/properties-drawer/atoms/SwitchGeneral.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import draggable from "../../../vuedraggable/vuedraggable";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import TranslationInput from "@/components/properties-drawer/atoms/TranslationInput.vue";
import {useTranslateInput} from "@/composables/useTranslateInput";
import {useStyle} from "@/main";

const dragOptions = {
  animation: 250,
  group: "controls",
  ghostClass: "ghost"
};

const panels = ref<string[]>(["general", "logic", "headers"])
const style = useStyle()
const useBuilderStateStore = useBuilderState()
const {
  prefix,
  updateI18nKey,
  i18nDefault,
  toCamelCase
} = useTranslateInput()

const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const {t} = useI18n()
const headers = ref<any[]>([])
const currentConfiguredHeader = ref<any>(null)
const configHeaderDialog = ref(false)

function updateHeaders() {
  model.value.config = headers.value
}

function configHeader(header: any) {
  currentConfiguredHeader.value = header
  const localIsReference = typeof currentConfiguredHeader.value.title != "string"
  currentConfiguredHeader.value.isReference = localIsReference
  currentConfiguredHeader.value.i18nInputKey = !localIsReference ? toCamelCase(header.title) : currentConfiguredHeader.value.title.$ref.split("/").pop()
  configHeaderDialog.value = true
}

function closeConfigHeaderDialog() {
  configHeaderDialog.value = false
  delete currentConfiguredHeader.value.isReference
  delete currentConfiguredHeader.value.i18nInputKey
  currentConfiguredHeader.value = null
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

function referenceChangedHeaderTitle() {
  if (currentConfiguredHeader.value.isReference) {
    currentConfiguredHeader.value.i18nInputKey = toCamelCase(currentConfiguredHeader.value.title)
    currentConfiguredHeader.value.title = {$ref: prefix + toCamelCase(currentConfiguredHeader.value.title)}

    if (!model.value.i18n) {
      model.value.i18n = i18nDefault.value
    }
    ['pl', 'en', 'de'].forEach(lang => {
      if (!model.value.i18n[lang]) {
        model.value.i18n[lang] = {};
      }
      model.value.i18n[lang][currentConfiguredHeader.value.i18nInputKey] = "";
    });

  } else {
    currentConfiguredHeader.value.title = currentConfiguredHeader.value.title.$ref.replace(prefix, '')
    currentConfiguredHeader.value.i18nInputKey = currentConfiguredHeader.value.title

    if (model.value.i18n) {
      Object.keys(model.value.i18n).forEach(lang => {
        if (model.value.i18n[lang]) {
          delete model.value.i18n[lang][currentConfiguredHeader.value.i18nInputKey];
        }
      });
    }
  }
}

function updatePropertyHeaderTitle(value: string) {
  if (currentConfiguredHeader.value.isReference) {
    const oldKey = currentConfiguredHeader.value.i18nInputKey
    const newKey = value.replace(prefix, '');
    updateI18nKey(oldKey, newKey, model);
    currentConfiguredHeader.value.i18nInputKey = newKey;
  } else {
    currentConfiguredHeader.value.i18nInputKey = currentConfiguredHeader.value.title
  }
}

onMounted(() => {
  headers.value = model.value.config
})

</script>

<style lang="scss" scoped>
:deep(.v-expansion-panel-text__wrapper) {
  padding: 8px 2px;
}
</style>

<i18n lang="json">
{
  "en": {
    "calculation": "Calculation",
    "hint": "Hint",
    "persistentHint": "Is the hint always visible?",
    "persistentHintIfExpression": "Hint expression",
    "hide": "Hide",
    "visible": "Visible",
    "expression": "Expression",
    "validations": "Validations",
    "counter": "Counter of letters",
    "eventType": "Event type",
    "events": "Events",
    "onChangeLabel": "On value change"
  },
  "pl": {
    "calculation": "Obliczenia",
    "hint": "Podpowiedź",
    "persistentHint": "Czy hint zawsze widoczny?",
    "persistentHintIfExpression": "Podpowiedź warunek",
    "hide": "Ukryte",
    "visible": "Widoczne",
    "expression": "Wyrażenie",
    "validations": "Walidacje",
    "counter": "Licznik liter",
    "eventType": "Rodzaj zdarzenia",
    "events": "Zdarzenia",
    "onChangeLabel": "Zmiana wartości"
  }
}
</i18n>
