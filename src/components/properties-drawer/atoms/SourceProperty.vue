<template>
  <v-list-item density="compact">
    <span>Konfiguracja słownika</span>
  </v-list-item>
  <v-list-item>
    <v-text-field
      class="pt-2"
      :disabled="true"
      :label="t('urlKey') + '#TODO'"
      v-model="modelValue.url"
      @update:model-value="setUrl"
      v-bind="fieldProps"
    />
  </v-list-item>
  <v-list-item>
    <v-text-field
      class="pt-2"
      :label="t('title')"
      v-model="modelValue.title"
      @update:model-value="setTitle"
      v-bind="fieldProps"
    />
  </v-list-item>
  <v-list-item>
    <v-text-field
      class="pt-2"
      :label="t('value')"
      v-model="modelValue['value']"
      @update:model-value="setValue"
      v-bind="fieldProps"
    />
  </v-list-item>
  <v-list-item>
    <v-text-field
      class="pt-2"
      :label="t('description')"
      v-model="modelValue.description"
      @update:model-value="setDescription"
      v-bind="fieldProps"
    />
  </v-list-item>
  <v-list-item  density="compact">
    <v-switch
      class="mx-2"
      :label="t('returnObject')"
      v-model="modelValue.returnObject"
      @update:model-value="setReturnObject"
      v-bind="fieldProps"
      density="compact"
    />
  </v-list-item>
  <v-list-item density="compact">
    <v-switch
      class="mx-2"
      :label="t('lazyLoading')"
      v-model="modelValue.lazy"
      @update:model-value="setLazyLoading"
      v-bind="fieldProps"
      density="compact"
    />

  </v-list-item>
  <v-list-item density="compact">
    <v-switch
      class="mx-2"
      :label="t('singleOptionAutoSelect')"
      v-model="modelValue.singleOptionAutoSelect"
      @update:model-value="setSingleOptionAutoSelect"
      v-bind="fieldProps"
      density="compact"
    />
  </v-list-item>
</template>

<script setup lang="ts">

import {useFieldStyle} from "@/composables/useFieldStyle";
import {useI18n} from "vue-i18n";
import {VTextField} from "vuetify/components";
import {computed} from "vue";
import {DictionarySource, SimpleSource} from "vue3-schema-forms/dist/vocabulary/schema/elements";
import {useBuilderState} from "@/pinia/stores/useBuilderState";

const modelValue = defineModel<DictionarySource>({
  default: () => {}
})

const {fieldProps} = useFieldStyle();
const {t} = useI18n()
const useBuilderStateStore = useBuilderState()

function setUrl(val:string){
  useBuilderStateStore.setKeyInConfiguredField("source.url", val)
}

function setDescription(val:string){
  useBuilderStateStore.setKeyInConfiguredField("source.description", val)
}

function setTitle(val:string){
  useBuilderStateStore.setKeyInConfiguredField("source.title", val)
}

function setValue(val:string){
  useBuilderStateStore.setKeyInConfiguredField("source.value", val)
}

function setReturnObject(val){
  useBuilderStateStore.setKeyInConfiguredField("source.returnObject", val)
}
function setLazyLoading(val){
  useBuilderStateStore.setKeyInConfiguredField("source.lazy", val)
}
function setSingleOptionAutoSelect(val){
  useBuilderStateStore.setKeyInConfiguredField("source.singleOptionAutoSelect", val)
}

</script>

<style scoped lang="scss">

</style>

<i18n lang="json">
{
  "en": {
    "propertyDescription": "Dictionary configuration",
    "urlKey": "URL",
    "value": "Value",
    "title": "Title",
    "description": "Description",
    "returnObject": "Return object",
    "lazyLoading": "Lazy loading",
    "singleOptionAutoSelect": "Auto select when single"
  },
  "pl": {
    "propertyDescription": "Konfiguracja słownika",
    "urlKey": "URL",
    "value": "Id",
    "title": "Tytuł",
    "description": "Opis dodatkowy",
    "returnObject": "Zwracaj obiekt",
    "lazyLoading": "Stronicowanie wyników",
    "singleOptionAutoSelect": "Auto wybieranie, gdy pojedyncza wartość"
  }
}
</i18n>
