<template>
  <v-list-item>
    <v-select
      class="pt-2"
      :label="t('typeProperty')"
      :items="items"
      v-bind="fieldProps"
      v-model="modelValue"
      clearable
    />
  </v-list-item>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useFieldStyle} from "@/composables/useFieldStyle";
import {ref} from "vue";

const modelValue = defineModel()
const {fieldProps} = useFieldStyle();

const {t} = useI18n()

const items = ref([
  {id: "text", title: t('typeOptions.text')},
  {id: "number", title: t('typeOptions.number')},
  {id: "phone", title: t('typeOptions.phone')},
  {id: "date", title: t('typeOptions.date')},
])
</script>

<style scoped lang="scss">

</style>

<i18n lang="json">
{
  "en": {
    "typeProperty": "Type of data",
    "typeOptions": {
      "text": "Text",
      "number": "Number",
      "phone": "Phone",
      "date": "Date"
    }
  },
  "pl": {
    "typeProperty": "Typ danych",
    "typeOptions": {
      "text": "Tekst",
      "number": "Liczba",
      "phone": "Telefon",
      "date": "Data"
    }
  }
}
</i18n>
