<template>
  <v-list-item>
    <v-checkbox
      v-model="localModel"
      :label="t('horizontalLayout')"
      class="mx-2"
      hide-details="auto"
      v-bind="style.inputStyle.value"
    />
  </v-list-item>
</template>

<script lang="ts" setup>
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

<style lang="scss" scoped>
</style>

<i18n lang="json">
{
  "en": {
    "horizontalLayout": "Set horizontal"
  },
  "pl": {
    "horizontalLayout": "Ułóż horyzontalnie"
  }
}
</i18n>
