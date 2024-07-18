<template>
  <h2>{{ t('titleFormDemo') }}</h2>
  <v-divider class="mb-4"/>
  <vue-schema-forms
    ref="myForm"
    v-model="model"
    :schema="schema"
    :options="options"
    :default-form-actions="true"
    :validation-behaviour="'messages'"
  />
</template>

<script setup lang="ts">

import {getCurrentInstance, onBeforeUnmount, onMounted, ref} from "vue";
import {useStyle} from "@/main";
import {useDrawers} from "@/composables/useDrawers";
import {useI18n} from "vue-i18n";
import {createVueSchemaForms} from "vue3-schema-forms";


const vue3SchemaForms = createVueSchemaForms({
    formUpdateLogger: true
  }
)
const instance = getCurrentInstance();
instance?.appContext.app.use(vue3SchemaForms)

const {t} = useI18n()
const model = ref({});
const props = defineProps<{
  schema: object
}>()

const style = useStyle()
const options = ref({
  fieldProps: style.inputStyle,
  buttonProps: style.buttonStyle
})
const drawers = useDrawers();

onMounted(() => {
  drawers.propertiesDrawer.value = false
  drawers.elementsDrawer.value = false
})

onBeforeUnmount(() => {
  drawers.elementsDrawer.value = true
})


</script>

<style scoped lang="scss">

</style>

<i18n lang="json">
{
  "en": {
    "titleFormDemo": "Live demo"
  },
  "pl": {
    "titleFormDemo": "Live demo"
  }
}
</i18n>
