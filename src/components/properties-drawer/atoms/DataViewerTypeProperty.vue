<template>
  <v-list-item>
    <v-select
      v-model="modelValue"
      :items="items"
      :label="t('typeProperty')"
      :return-object="false"
      class="pt-2"
      clearable
      v-bind="style.inputStyle.value"
    />
  </v-list-item>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {useStyle} from "@/main";

const modelValue = defineModel()
const style = useStyle()

const {t} = useI18n()

const items = ref([
  {value: "text", title: t('typeOptions.text')},
  {value: "number", title: t('typeOptions.number')},
  {value: "phone", title: t('typeOptions.phone')},
  {value: "date", title: t('typeOptions.date')},
  {value: "date-time", title: t('typeOptions.date-time')},
  {value: "dictionary", title: t('typeOptions.dictionary')},
])
</script>

<style lang="scss" scoped>

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
      "date-time": "Datetime",
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
      "date-time": "Data i czas",
      "dictionary": "Wartość słownikowa"
    }
  }
}
</i18n>
