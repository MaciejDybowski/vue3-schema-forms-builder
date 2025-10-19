<template>
  <expansion-panel
    :active="active"
    :title="t('dependencies.title')"
    value="dependencies"
  >
    <!-- Source Path -->
    <text-property-wrapper
      v-model="model.sourcePath"
      :label="t('dependencies.sourcePath.label')"
    >
      <template #append-inner>
        <v-tooltip location="left" width="280">
          <template #activator="{ props }">
            <v-icon v-bind="props">mdi-information-outline</v-icon>
          </template>
          <span>{{ t('dependencies.sourcePath.tooltip') }}</span>
        </v-tooltip>
      </template>
    </text-property-wrapper>

    <!-- Update Triggers -->
    <text-property-wrapper
      :label="t('dependencies.updateTriggers.label')"
      :model-value="model.updateTriggers"
      @update:model-value="updateTriggers"
    >
      <template #append-inner>
        <v-tooltip location="left" width="280">
          <template #activator="{ props }">
            <v-icon v-bind="props">mdi-information-outline</v-icon>
          </template>
          <span>{{ t('dependencies.updateTriggers.tooltip') }}</span>
        </v-tooltip>
      </template>
    </text-property-wrapper>
  </expansion-panel>
</template>

<script lang="ts" setup>
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const {active} = defineProps<{
  active: boolean;
}>();

const model = defineModel<any>();

function updateTriggers(val) {
  model.value.updateTriggers = val.split(",")
}
</script>

<style lang="scss" scoped>
.append-inner-column {
  display: flex;
  align-items: center;
  gap: 4px;
}

.v-icon.clickable {
  cursor: pointer;
}
</style>

<i18n lang="json">
{
  "en": {
    "dependencies": {
      "title": "Dependencies",
      "sourcePath": {
        "label": "Source path (dependencies)",
        "tooltip": "Path to another field or data source this field depends on."
      },
      "updateTriggers": {
        "label": "Update triggers (syntax string)",
        "tooltip": "Specify which fields or events should trigger an update. Use syntax: field1,field2,..."
      }
    }
  },
  "pl": {
    "dependencies": {
      "title": "Zależności",
      "sourcePath": {
        "label": "Ścieżka źródłowa (zależności)",
        "tooltip": "Ścieżka do innego pola lub źródła danych, od którego zależy to pole."
      },
      "updateTriggers": {
        "label": "Wyzwalacze aktualizacji (ciąg składniowy)",
        "tooltip": "Określ pola lub zdarzenia, które mają wywołać aktualizację. Użyj składni: pole1,pole2,..."
      }
    }
  }
}
</i18n>
