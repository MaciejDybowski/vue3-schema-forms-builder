<template>

  <div>
    <text-property-wrapper
      v-model="model"
      :label="t('expression')"
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
      @acceptButton="() => {}"
      @closeButton="() => {}"
    >
      <template #title>
        <v-card-title>
          {{ t('advancedConfiguration') }}
        </v-card-title>
      </template>
      <v-card-text class="px-0">

        <tcn-code-editor
          v-model="model"
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

function openAdvancedDialog() {
  showAdvancedDialog.value = true
}

</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "advancedConfiguration": "Advanced configuration",
    "expression": "Expression",
    "save": "Save"
  },
  "pl": {
    "advancedConfiguration": "Konfiguracja zaawansowana",
    "expression": "Wyrażenie",
    "save": "Zapisz"
  }
}
</i18n>
