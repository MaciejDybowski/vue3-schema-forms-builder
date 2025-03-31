<template>
  <v-list-item>
    <v-text-field
      class="mt-2"
      v-model="model[locale][inputKey]"
      v-bind="{ ...style.inputStyle.value, ...attrs }"
      @change="emit('change')"
      @update:model-value="updateModelValue"
    >
      <template v-slot:prepend>
        <v-select
          v-model="locale"
          :items="locales"
          :label="t('selectLang')"
          hide-details
          item-title="value"
          v-bind="style.inputStyle.value"
        />
      </template>
    </v-text-field>
  </v-list-item>
</template>

<script lang="ts" setup>
import {computed, defineEmits, onMounted, useAttrs} from "vue";
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";

const {t, locale} = useI18n();
const style = useStyle();
const model = defineModel<Record<string, string>>({
  default: {en: {}, pl: {}}
});
const props = defineProps<{
  inputKey: string;
}>();
const emit = defineEmits(["update:modelValue", "change"]);
const attrs = useAttrs();

const locales = computed(() => ["en", "pl"].map(value => ({value})));

function updateModelValue() {
  const updatedModel = {...model.value};
  updatedModel[locale.value][props.inputKey] = model.value[locale.value][props.inputKey];
  emit("update:modelValue", updatedModel);
}
</script>

<style lang="scss" scoped></style>

<i18n lang="json">
{
  "pl": {
    "selectLang": "Język"
  },
  "en": {
    "selectLang": "Language"
  },
  "ru": {
    "selectLang": "Язык"
  }
}
</i18n>
