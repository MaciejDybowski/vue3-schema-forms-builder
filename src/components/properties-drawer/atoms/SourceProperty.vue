<template>
  <v-list-item>
    <v-text-field
      class="pt-2"
      :label="t('urlKey')"
      v-model="source.url"
      v-bind="fieldProps"
    />
  </v-list-item>
</template>

<script setup lang="ts">

import {useFieldStyle} from "@/composables/useFieldStyle";
import {useI18n} from "vue-i18n";
import {VTextField} from "vuetify/components";
import {computed} from "vue";
import {SimpleSource} from "vue3-schema-forms/dist/vocabulary/schema/elements";

const modelValue = defineModel<SimpleSource>()

const source = computed(() => {
  if (!modelValue.value) {
    modelValue.value = {}
  }
  return modelValue as SimpleSource;
})

const {fieldProps} = useFieldStyle();

const {t} = useI18n()
</script>

<style scoped lang="scss">

</style>

<i18n lang="json">
{
  "en": {
    "urlKey": "URL"
  },
  "pl": {
    "urlKey": "URL"
  }
}
</i18n>
