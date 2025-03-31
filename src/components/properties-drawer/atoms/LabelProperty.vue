<template>
  <div>
    <textfield-general
      v-model="inputValue"
      :label="t('label')"
      :prefix="isReference? prefix: ''"
      @update:model-value="value => updateLabel(value)"
    />
    <v-switch
      v-model="isReference"
      class="mx-4"
      color="green"
      hide-details="auto"
      label="Use Reference"
      @change="referenceChanged"
    />


    <translation-input
      v-if="isReference && modelValue.i18n"
      :key="inputValue"
      v-model="modelValue.i18n"
      :input-key="i18nInputKey"
    />
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import {computed, onMounted, ref} from "vue";
import TranslationInput from "@/components/properties-drawer/atoms/TranslationInput.vue";

const modelValue = defineModel<any>();
const {t} = useI18n();

const i18nInputKey = ref("")
const isReference = ref(typeof modelValue.value.label === "object");
const prefix = `#/i18n/~$locale~/`


const inputValue = computed({
  get: () => {
    if (typeof modelValue.value.label === 'string') {
      return modelValue.value.label
    } else {
      const value = modelValue.value.label.$ref.replace(prefix, '')
      i18nInputKey.value = value
      return value
    }
  },
  set: (value: string) => {
    if (value == null) {
      modelValue.value.label = ""
    }
    modelValue.value.label = isReference.value ? {$ref: prefix + value.trim()} : value;
  },
});

function updateLabel(value: string) {
  if (isReference.value) {
    const oldKey = i18nInputKey.value;
    const newKey = value.replace(prefix, '');
    updateI18nKey(oldKey, newKey);
    i18nInputKey.value = newKey;
  } else {
    i18nInputKey.value = modelValue.value.label
  }
}

function updateI18nKey(oldKey: string, newKey: string) {
  if (!modelValue.value.i18n || !isReference.value || oldKey === newKey) return;

  for (const lang in modelValue.value.i18n) {
    if (modelValue.value.i18n[lang]?.[oldKey] !== undefined) {
      modelValue.value.i18n[lang][newKey] = modelValue.value.i18n[lang][oldKey];
      delete modelValue.value.i18n[lang][oldKey];
    }
  }
}

function referenceChanged() {
  if (isReference.value) {
    i18nInputKey.value = toCamelCase(inputValue.value)
    modelValue.value.label = {$ref: prefix + toCamelCase(inputValue.value)}
    modelValue.value.i18n = i18nDefault.value
  } else {
    modelValue.value.label = modelValue.value.label.$ref.replace(prefix, '')
    i18nInputKey.value = modelValue.value.label
    delete modelValue.value.i18n
  }
}

function toCamelCase(text) {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
}

const i18nDefault = computed(() => {
  return {
    "pl": {
      [i18nInputKey.value]: ""
    },
    "en": {
      [i18nInputKey.value]: ""
    },
  }
})


onMounted(() => {
  if (!modelValue.value.i18n && isReference.value) {
    modelValue.value.i18n = i18nDefault.value
  }
})
</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "label": "Label"
  },
  "pl": {
    "label": "Etykieta"
  }
}
</i18n>
