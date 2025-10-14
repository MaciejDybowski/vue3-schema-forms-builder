<template>
  <text-property-wrapper
    v-model="modelValue"
    :grow-enabled="false"
    :label="t('ifProperty')"
    :rows="3"
    append-inner-icon="mdi-cog"
    @click:append-inner="openAdvancedDialog"
  />

  <tcn-au-dialog
    v-if="showAdvancedDialog"
    v-model="showAdvancedDialog"
    :acceptColor="style.primaryWhite.value"
    :acceptText="t('save')"
    persistent
    scrollable
    width="800px"
    @acceptButton="save"
    @closeButton="cancel"
  >
    <template #title>
      <v-card-title>
        {{ t('advancedConfiguration') }}
      </v-card-title>
    </template>
    <v-card-text class="px-0">

      <tcn-code-editor
        v-model="modelInDialog"
        :codemirrorOptions="{}"
        height="300px"
        language="text"
      />
    </v-card-text>
  </tcn-au-dialog>

</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";
import {ref} from "vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";

const showAdvancedDialog = ref(false)

function openAdvancedDialog() {
  modelInDialog.value =  modelValue.value
  showAdvancedDialog.value = true
}

const modelValue = defineModel()
const style = useStyle()
const modelInDialog = ref<any>(null)
const {t} = useI18n()

function cancel() {
  showAdvancedDialog.value = false
}

function save() {
  modelValue.value = modelInDialog.value
  showAdvancedDialog.value = false
}
</script>

<style lang="scss" scoped>
</style>

<i18n lang="json">
{
  "en": {
    "ifProperty": "Conditional rendering",
    "advancedConfiguration": "Advanced configuration",
    "save": "Save"
  },
  "pl": {
    "advancedConfiguration": "Konfiguracja zaawansowana",
    "ifProperty": "Warunek widoczności",
    "save": "Zapisz"
  }
}
</i18n>
