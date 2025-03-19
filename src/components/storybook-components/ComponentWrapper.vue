<template>

  <label-property v-model="modelValue"/>
  <props-viewer :json-data="modelValue"/>
</template>

<script lang="ts" setup>


import TranslationInput from "@/components/properties-drawer/atoms/TranslationInput.vue";
import PropsViewer from "@/components/storybook-components/PropsViewer.vue";
import {getCurrentInstance} from "vue";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";

const instance = getCurrentInstance();
instance?.appContext.app.component("TranslationInput", TranslationInput)

const modelValue = defineModel()

</script>

<style lang="scss" scoped>

</style>
