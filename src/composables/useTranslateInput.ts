import {computed, Ref, ref} from "vue";
import {k} from "vite/dist/node/types.d-aGj9QkWt";


export function useTranslateInput() {

  const i18nInputKey = ref("")
  const isReference = ref(false);
  const prefix = `#/i18n/~$locale~/`

  const i18nDefault = computed(() => {
    return {
      "pl": {
        [i18nInputKey.value]: ""
      },
      "en": {
        [i18nInputKey.value]: ""
      },
      "de": {
        [i18nInputKey.value]: ""
      }
    }
  })

  function toCamelCase(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
  }

  function init(modelValue: Ref<any>, key: string) {
    isReference.value = typeof modelValue.value[key] === "object"
    if (!modelValue.value.i18n && isReference.value) {
      modelValue.value.i18n = i18nDefault.value
    }
  }

  function referenceChanged(modelValue: Ref<any>, inputValue: Ref<string>, key) {
    if (isReference.value) {
      i18nInputKey.value = toCamelCase(inputValue.value)
      modelValue.value[key] = {$ref: prefix + toCamelCase(inputValue.value)}
      modelValue.value.i18n = i18nDefault.value
    } else {
      modelValue.value[key] = modelValue.value[key].$ref.replace(prefix, '')
      i18nInputKey.value = modelValue.value[key]
      delete modelValue.value.i18n
    }
  }

  function updateI18nKey(oldKey: string, newKey: string, modelValue: Ref<any>) {
    if (!modelValue.value.i18n || !isReference.value || oldKey === newKey) return;
    for (const lang in modelValue.value.i18n) {
      if (modelValue.value.i18n[lang]?.[oldKey] !== undefined) {
        modelValue.value.i18n[lang][newKey] = modelValue.value.i18n[lang][oldKey];
        delete modelValue.value.i18n[lang][oldKey];
      }
    }
  }

  function updateProperty(value: string, modelValue: Ref<any>, key: string) {
    if (isReference.value) {
      const oldKey = i18nInputKey.value;
      const newKey = value.replace(prefix, '');
      updateI18nKey(oldKey, newKey, modelValue);
      i18nInputKey.value = newKey;
    } else {
      i18nInputKey.value = modelValue.value[key]
    }
  }

  const useDynamicInputValue = (key: string, modelValue: Ref<any>) => computed({
    get: () => {
      if (typeof modelValue.value[key] === 'string') {
        return modelValue.value[key];
      } else {
        const value = modelValue.value[key].$ref.replace(prefix, '');
        i18nInputKey.value = value;
        return value;
      }
    },
    set: (value: string) => {
      if (value == null) {
        modelValue.value[key] = "";
      }
      modelValue.value[key] = isReference.value ? {$ref: prefix + value.trim()} : value;
    }
  });

  return {
    useDynamicInputValue,
    updateProperty,
    i18nInputKey,
    prefix,
    isReference,
    init,
    referenceChanged,
  }
}
