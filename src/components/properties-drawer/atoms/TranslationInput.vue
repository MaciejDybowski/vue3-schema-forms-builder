<template>
  <v-list-item>
    <v-select
      v-model="locale"
      :items="locales"
      :label="t('selectLang')"
      hide-details
      item-title="value"
      v-bind="style.inputStyle.value"
      class="mt-2"
    />
    <v-textarea
      v-model="model[locale][inputKey]"
      class="mt-2"
      v-bind="{ ...style.inputStyle.value, ...attrs }"
      @change="emit('change')"
      @update:model-value="updateModelValue"
      :label="t('translation')"
      :auto-grow="true"
      rows="2"
    />
  </v-list-item>
</template>

<script lang="ts" setup>
import {computed, defineEmits, onBeforeMount, useAttrs} from "vue";
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";

const {t, locale} = useI18n();
const style = useStyle();
const model = defineModel<Record<string, string>>({
  default: {en: {}, pl: {}, de: {}}
});
const props = defineProps<{
  inputKey: string;
}>();
const emit = defineEmits(["update:modelValue", "change"]);
const attrs = useAttrs();

const locales = computed(() => ["en", "pl", "de"].map(value => ({value})));

function updateModelValue() {
  const updatedModel = {...model.value};
  updatedModel[locale.value][props.inputKey] = model.value[locale.value][props.inputKey];
  emit("update:modelValue", updatedModel);
}

function ensureModelDefaults() {
  const updatedModel = {...model.value};
  ["en", "pl", "de"].forEach(lang => {
    if (!updatedModel[lang]) {
      // @ts-ignore
      updatedModel[lang] = {};
    }

    if (updatedModel[lang][props.inputKey] === undefined) {
      updatedModel[lang][props.inputKey] = ""; // Tworzy pustą wartość dla inputKey
    }
  });

  model.value = updatedModel;
}
onBeforeMount(() => {
  ensureModelDefaults();
});

</script>

<style lang="scss" scoped></style>

<i18n lang="json">
{
  "pl": {
    "selectLang": "Język",
    "translation": "Tłumaczenie"
  },
  "en": {
    "selectLang": "Language",
    "translation": "Translation"
  },
  "ru": {
    "selectLang": "Язык",
    "translation": "Translation"
  }
}
</i18n>
