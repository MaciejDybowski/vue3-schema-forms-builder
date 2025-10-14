<template>

  <div>
    <text-property-wrapper
      v-model="model"
      :label="t('readonlyExpression')"
      append-inner-icon="mdi-cog"
      @click:append-inner="openAdvancedDialog"
      :grow-enabled="false"
      :rows="3"
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
  </div>

</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import {ref} from "vue";
import {useStyle} from "@/main";

const {t} = useI18n()
const model = defineModel()
const style = useStyle()

const showAdvancedDialog = ref(false)
const modelInDialog = ref<any>(null)

function openAdvancedDialog() {
  modelInDialog.value = model.value
  showAdvancedDialog.value = true
}
function cancel() {
  showAdvancedDialog.value = false
}

function save() {
  model.value = modelInDialog.value
  showAdvancedDialog.value = false
}
</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "advancedConfiguration": "Advanced configuration",
    "readonlyExpression": "Readonly expression",
    "save": "Save"
  },
  "pl": {
    "advancedConfiguration": "Konfiguracja zaawansowana",
    "readonlyExpression": "Wyrażenie readonly",
    "save": "Zapisz"
  }
}
</i18n>
