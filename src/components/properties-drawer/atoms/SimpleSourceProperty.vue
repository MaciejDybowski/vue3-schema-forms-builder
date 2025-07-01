<template>
  <boolean-switch-property-wrapper
    v-model="modelValue.returnObject"
    :label="t('simpleSource.returnObject')"
  />


  <draggable
    v-model="computedItems"
    :sort="true"
    class="d-flex flex-wrap v-row pl-3"
    handle=".draggable-icon"
    item-key=""
    v-bind="dragOptions">
    <template #item="{element}">
      <div>

        <v-row class="pa-0 ma-0 align-center" dense>

          <v-col class="pa-0 ma-0" cols="4">
            <text-property-wrapper
              :grow-enabled="false"
              :label="t('simpleSource.value')"
              :model-value="element.value"
              class="pr-1"
              @update:model-value="(val) => parseValue(element, val)"
            />
          </v-col>
          <v-col class="pa-0 ma-0" cols="5">
            <text-property-wrapper
              v-if="typeof element.title === 'string'"
              v-model="element.title"
              :grow-enabled="false"
              :label="t('simpleSource.label')"
              class="pl-1 pr-1"
            />
            <text-property-wrapper
              v-else
              v-model="element.title.$ref"
              :disabled="true"
              :grow-enabled="false"
              :label="t('simpleSource.label')"
              class="pl-1 pr-1"
            />
          </v-col>
          <v-col class="pa-0 ma-0" cols="3">
            <v-btn
              density="compact"
              flat
              icon="mdi-cog"
              size="small"
              @click="configOption(element)"
            />
            <v-btn
              density="compact"
              flat
              icon="mdi-delete"
              size="small"
              @click="deleteOption(element)"
            />
            <v-icon
              class="draggable-icon cursor-grab"
              size="small"
            >
              mdi-drag-vertical
            </v-icon>
          </v-col>
        </v-row>

        <v-row
          v-if="field.layout.component === 'checkbox'"
          class="pa-0 ma-0"
          dense
        >
          <v-col class="pa-0 ma-0" cols="12">
            <v-card-subtitle
              v-if="element.disabledCondition == null || element.disabledCondition == undefined"
              class="link cursor-pointer"
              @click="element.disabledCondition = 'changeMe'"
            >Click and define a disabled condition
            </v-card-subtitle>
            <text-property-wrapper
              v-else
              v-model="element.disabledCondition"
              class="mt-1 mr-4"
              label="Disabled condition"
            />
          </v-col>
        </v-row>
      </div>
    </template>
  </draggable>


  <v-list-item>
    <v-btn
      class="mt-4"
      color="primary"
      prepend-icon="mdi-plus"
      size="small"
      @click="addOption"
    >
      {{ t('simpleSource.addButton') }}
    </v-btn>
  </v-list-item>


  <tcn-au-dialog
    v-if="configOptionDialog"
    v-model="configOptionDialog"
    :acceptColor="style.primaryWhite.value"
    :acceptText="t('common.save', 'Save')"
    persistent
    scrollable
    width="800px"
    @acceptButton="closeConfigItemDialog"
    @closeButton="closeConfigItemDialog"
  >
    <template #title>
      <v-card-title>
        {{ t('simpleSource.title') }}
      </v-card-title>
    </template>
    <v-card-text>
      <text-property-wrapper
        :label="t('simpleSource.value')"
        :model-value="currentConfiguredOption.value"
        @update:model-value="(val) => parseValue(currentConfiguredOption, val)"
      />
      <text-property-wrapper
        v-model="dynamicItemTitle"
        :label="t('simpleSource.label')"
        :prefix="currentConfiguredOption.isReference ? prefix : ''"
      />
      <boolean-switch-property-wrapper
        v-model="currentConfiguredOption.isReference"
        color="green"
        label="Use Reference"
        @change="referenceChangedItemTitle"
      />
      <v-row
        v-if="field.layout.component === 'checkbox'"
        class="pa-0 ma-0"
        dense
      >
        <v-col class="pa-0 ma-0" cols="12">
          <v-card-subtitle
            v-if="currentConfiguredOption.disabledCondition == null || currentConfiguredOption.disabledCondition == undefined"
            class="link cursor-pointer"
            @click="currentConfiguredOption.disabledCondition = 'changeMe'"
          >Click and define a disabled condition
          </v-card-subtitle>
          <text-property-wrapper
            v-else
            v-model="currentConfiguredOption.disabledCondition"
            class="mt-1"
            label="Disabled condition"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </tcn-au-dialog>
</template>


<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";
import {computed, ref} from "vue";

import {useTranslateInput} from "@/composables/useTranslateInput";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import BooleanSwitchPropertyWrapper from "@/components/properties-drawer/atoms/BooleanSwitchPropertyWrapper.vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import Draggable from "@/vuedraggable/vuedraggable";

const style = useStyle()
const {t} = useI18n()

const computedItems = computed({
  get() {
    return modelValue.value.items
  },
  set(val) {
    modelValue.value.items = val
  }
})
const dragOptions = {
  animation: 250,
  group: "controls",
  ghostClass: "ghost"
};


const useBuilderStateStore = useBuilderState()
const field = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})


const modelValue = defineModel<{
  items: Array<any>,
  returnObject: boolean
}>({
    default: () => {
      return {
        items: [],
        returnObject: false,
      }
    }
  }
)

function addOption() {
  modelValue.value.items.push({
    value: "changeMe",
    title: "changeMe"
  })
}

function parseValue(item, val: any) {
  if (val === "true" || val === "false") {
    item.value = val === "true"
  } else {
    item.value = val
  }
}

function deleteOption(obj: any) {
  computedItems.value = computedItems.value.filter((item) => item.value !== obj.value)
}


const {
  prefix,
  toCamelCase
} = useTranslateInput()
const currentConfiguredOption = ref<any>(null)
const configOptionDialog = ref(false)

function configOption(option: any) {
  currentConfiguredOption.value = option
  currentConfiguredOption.value.isReference = typeof currentConfiguredOption.value.title != "string"
  configOptionDialog.value = true
}

function closeConfigItemDialog() {
  configOptionDialog.value = false
  delete currentConfiguredOption.value.isReference
  currentConfiguredOption.value = null
}

const dynamicItemTitle = computed({
  get: () => {
    if (typeof currentConfiguredOption.value.title === 'string') {
      return currentConfiguredOption.value.title;
    } else {
      return currentConfiguredOption.value.title.$ref.replace(prefix, '');
    }
  },
  set: (value: string) => {
    if (value == null) {
      currentConfiguredOption.value.title = "";
    }
    currentConfiguredOption.value.title = currentConfiguredOption.value.isReference ? {$ref: prefix + value.trim()} : value;
  }
});

function referenceChangedItemTitle() {
  if (currentConfiguredOption.value.isReference) {
    currentConfiguredOption.value.title = {$ref: prefix + toCamelCase(currentConfiguredOption.value.title)}
  } else {
    currentConfiguredOption.value.title = currentConfiguredOption.value.title.$ref.replace(prefix, '')
  }
}

</script>

<style lang="css" scoped>

</style>


<i18n lang="json">
{
  "en": {
    "simpleSource": {
      "title": "Options config",
      "value": "Value",
      "label": "Title",
      "addButton": "Add option",
      "returnObject": "Return object"
    }
  },
  "pl": {
    "simpleSource": {
      "title": "Konfiguracja opcji",
      "value": "ID",
      "label": "Etykieta",
      "addButton": "Dodaj opcję",
      "returnObject": "Zwracaj obiekt"
    }
  }
}
</i18n>

