<template>
  <text-property-wrapper
    v-model="model.layout.cellClass"
    :label="t('cellClassProperty')"
  >
    <template #append-inner>
      <v-tooltip
        location="left"
        width="300"
      >
        <template #activator="{ props }">
          <v-icon v-bind="props">
            mdi-information-outline
          </v-icon>
        </template>
        <span>{{ t('cellClassInfo') }}</span>
      </v-tooltip>
    </template>
  </text-property-wrapper>
</template>

<script lang="ts" setup>
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
const model = defineModel<any>();
</script>

<style lang="scss" scoped>
</style>

<i18n lang="json">
{
  "en": {
    "cellClassProperty": "CSS Style Classes for the field",
    "cellClassInfo": "For each field, you can pass additional CSS classes from the Vuetify library. Classes should be space-separated."
  },
  "pl": {
    "cellClassProperty": "Klasy styli CSS dla pola",
    "cellClassInfo": "Dla każdego pola można przekazać dodatkowe klasy CSS z biblioteki Vuetify. Klasy powinny być oddzielone spacją."
  }
}
</i18n>
