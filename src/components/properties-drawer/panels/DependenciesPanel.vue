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
import {useBuilderLocale} from "@/composables/useBuilderLocale";

const {t} = useBuilderLocale();

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
