<template>
  <v-list-item>
    <v-select
      class="pt-2"
      :label="t('typeProperty')"
      :items="items"
      v-bind="style.inputStyle.value"
      v-model="modelValue"
      :return-object="false"
      clearable
    />
  </v-list-item>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {useStyle} from "@/composables/useStyle";

const modelValue = defineModel()
const style = useStyle()

const {t} = useI18n()

const items = ref([
  {value: "text", title: t('typeOptions.text')},
  {value: "number", title: t('typeOptions.number')},
  {value: "phone", title: t('typeOptions.phone')},
  {value: "date", title: t('typeOptions.date')},
  {value: "dictionary", title: t('typeOptions.dictionary')},
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
      "date": "Date",
      "dictionary": "Dictionary"
    }
  },
  "pl": {
    "typeProperty": "Typ danych",
    "typeOptions": {
      "text": "Tekst",
      "number": "Liczba",
      "phone": "Telefon",
      "date": "Data",
      "dictionary": "Wartość słownikowa"
    }
  }
}
</i18n>
