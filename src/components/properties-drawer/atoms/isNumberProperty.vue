<template>
  <v-list-item>
    <v-checkbox
      class="mx-2"
      :label="t('readOnlyProperty')"
      v-model="localModel"
      v-bind="style.inputStyle.value"
      hide-details="auto"
    />
  </v-list-item>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";
import {computed} from "vue";

const modelValue = defineModel()
const style = useStyle()
const {t} = useI18n()

const localModel = computed({
  get() {
    return modelValue.value == "number"
  },
  set(val) {
    modelValue.value = val ? "number" : "text"
  }
})

</script>

<style scoped lang="scss">
</style>

<i18n lang="json">
{
  "en": {
    "readOnlyProperty": "Number"
  },
  "pl": {
    "readOnlyProperty": "Liczba"
  }
}
</i18n>
