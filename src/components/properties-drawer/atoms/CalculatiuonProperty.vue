<template>
  <div>
    <text-property-wrapper
      v-model="modelValue"
      :label="t('calculationProperty')"
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
          v-model="modelValue"
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
import {useStyle} from "@/main";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import {ref} from "vue";


const modelValue = defineModel()
const style = useStyle();

const showAdvancedDialog = ref(false)

function openAdvancedDialog() {
  showAdvancedDialog.value = true
}

const {t} = useI18n()
</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "advancedConfiguration": "Advanced configuration",
    "calculationProperty": "Calculation",
    "save": "Save"
  },
  "pl": {
    "advancedConfiguration": "Konfiguracja zaawansowana",
    "calculationProperty": "Obliczenia",
    "save": "Zapisz"
  }
}
</i18n>
