<template>
  <v-list-item density="compact">
    <span>{{ t('simpleSource.title') }}</span>
  </v-list-item>
  <v-list-item
    v-for="item in modelValue.items"
    density="compact"
  >
    <div class="d-flex py-2 align-center justify-center">
      <v-text-field
        :label="t('simpleSource.value')"
        v-bind="fieldProps"
        v-model="item.value"
        density="compact"
        :hide-details="true"
        class="pr-2"
      />
      <v-text-field
        :label="t('simpleSource.label')"
        v-bind="fieldProps"
        v-model="item.title"
        density="compact"
        :hide-details="true"
        class="pl-2"
      />
      <v-btn
        class="mx-2"
        icon="mdi-delete"
        density="compact"
        size="small"
        flat
      >
      </v-btn>
    </div>
  </v-list-item>
  <v-list-item density="compact">
    <v-btn
      prepend-icon="mdi-plus"
      color="primary"
      size="small"
    >Dodaj
    </v-btn>
  </v-list-item>
</template>

<script setup lang="ts">
import {useFieldStyle} from "@/composables/useFieldStyle";
import {useI18n} from "vue-i18n";
import {VTextField} from "vuetify/components";

const {fieldProps} = useFieldStyle();
const {t} = useI18n()
const modelValue = defineModel()


</script>



<style scoped lang="scss">

</style>
<i18n lang="json">
{
  "en": {
    "simpleSource": {
      "title": "Options config",
      "value": "Value",
      "label": "Title",
      "addButton": "Add option"
    }
  },
  "pl": {
    "simpleSource": {
      "title": "Konfiguracja opcji",
      "value": "ID",
      "label": "Etykieta",
      "addButton": "Dodaj opcję"
    }
  }
}
</i18n>

