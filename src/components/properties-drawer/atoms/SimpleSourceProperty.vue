<template>
  <v-list-item density="compact">
    <span>{{ t('simpleSource.title') }}</span>
  </v-list-item>

  <boolean-switch-property-wrapper
    v-model="modelValue.returnObject"
    :label="t('simpleSource.returnObject')"
  />
  <v-list
    v-for="(item, key) in modelValue.items"
    density="compact"
  >
    <div class="d-flex align-center justify-center">
      <text-property-wrapper
        :label="t('simpleSource.value')"
        :model-value="item.value"
        class="pa-0 ma-0 px-1"
        style="max-width: 100px"
        @update:model-value="(val) => parseValue(item, val)"
      />

      <text-property-wrapper
        v-if="typeof item.title == 'string'"
        v-model="item.title"
        :label="t('simpleSource.label')"
        class="pa-0 ma-0 px-1"
        style="max-width: 160px"
      />
      <text-property-wrapper
        v-else
        v-model="item.title.$ref"
        :disabled="true"
        :label="t('simpleSource.label')"
        style="max-width: 160px"
      />

      <v-btn
        class="mx-1 pa-0"
        density="compact"
        flat
        icon="mdi-delete"
        size="small"
        @click="deleteOption(key)"
      >
      </v-btn>
      <v-btn
        class="mx-1 pa-0"
        density="compact"
        flat
        icon="mdi-cog"
        size="small"
        @click="configOption(item)"
      >
      </v-btn>

    </div>
    <text-property-wrapper
      v-if="field.layout.component=='checkbox'"
      class="mx-1"
      v-model="item.disabledCondition"
      label="Disabled condition"
    />
  </v-list>
  <v-list-item density="compact">
    <v-btn
      color="primary"
      prepend-icon="mdi-plus"
      size="small"
      @click="addOption"
    >Dodaj
    </v-btn>
  </v-list-item>


  <tcn-au-dialog
    v-if="configOptionDialog"
    v-model="configOptionDialog"
    :acceptColor="style.primaryWhite.value"
    acceptText="Save"
    persistent
    scrollable
    width="800px"
    @acceptButton="closeConfigItemDialog"
    @closeButton="closeConfigItemDialog"
  >
    <template #title>
      <v-card-title>
        Item configuration
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
        :prefix="currentConfiguredOption.isReference? prefix: ''"
        label="Title"
      />

      <boolean-switch-property-wrapper
        v-model="currentConfiguredOption.isReference"
        color="green"
        label="Use Reference"
        @change="referenceChangedItemTitle"
      />
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

const style = useStyle()
const {t} = useI18n()


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

function deleteOption(key: number) {
  modelValue.value.items = modelValue.value.items.filter((n, t) => t !== key)
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

<style lang="scss" scoped>

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

