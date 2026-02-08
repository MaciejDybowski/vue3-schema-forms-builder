<template>
  <expansion-panel
    :active="active"
    :title="t('fieldProps.title')"
    value="fieldProps"
  >
    <text-property-wrapper
      v-model="model.layout.options.rowVisibilityCondition"
      :label="t('rowVisibilityCondition')"
      :hint="t('rowVisibilityConditionHint')"
    />


    <duplicated-section-button-property v-model="model.layout.options"/>

    <select-general
      v-model="model.layout.options.addBtnMode"
      :items="[
        { value: 'add', title: t('addClearNode') },
        { value: 'copy', title: t('copyNode') },
        { value: 'action', title: t('actionCall') }
      ]"
      :label="t('addBtnMode')"
      :return-object="false"
      clearable
    >
      <template #append-inner>
        <v-tooltip location="left" width="280">
          <template #activator="{ props }">
            <v-icon v-bind="props">mdi-information-outline</v-icon>
          </template>
          <span>{{ t('addBtnModeInfo') }}</span>
        </v-tooltip>
      </template>
    </select-general>

    <!-- Action code -->
    <text-property-wrapper
      v-if="model.layout.options.addBtnMode === 'action'"
      v-model="actionCode"
      :label="t('actionCodeLabel')"
      @update:model-value="updateActionCode"
    >
      <template #append-inner>
        <v-tooltip location="left" width="280">
          <template #activator="{ props }">
            <v-icon v-bind="props">mdi-information-outline</v-icon>
          </template>
          <span>{{ t('actionCodeInfo') }}</span>
        </v-tooltip>
      </template>
    </text-property-wrapper>

    <!-- Divider toggle -->
    <boolean-checkbox-property-wrapper
      v-model="model.layout.options.showDivider"
      :label="t('duplicatedSectionShowDivider')"
    />

    <!-- Editable -->
    <boolean-checkbox-property-wrapper
      v-model="model.editable"
      :label="t('editable')"
    />

    <!-- Show elements -->
    <boolean-checkbox-property-wrapper
      v-model="model.showElements"
      :label="t('showElements')"
    >
      <template #append>
        <v-tooltip location="left" width="280">
          <template #activator="{ props }">
            <v-icon v-bind="props">mdi-information-outline</v-icon>
          </template>
          <span>{{ t('showElementsInfo') }}</span>
        </v-tooltip>
      </template>
    </boolean-checkbox-property-wrapper>

    <!-- Ordinal number -->
    <boolean-checkbox-property-wrapper
      v-model="model.layout.options.ordinalNumberInModel"
      :label="t('ordinalNumberInModel')"
    >
      <template #append>
        <v-tooltip location="left" width="280">
          <template #activator="{ props }">
            <v-icon v-bind="props">mdi-information-outline</v-icon>
          </template>
          <span>{{ t('ordinalNumberInModelInfo') }}</span>
        </v-tooltip>
      </template>
    </boolean-checkbox-property-wrapper>

    <!-- Show first row -->
    <boolean-checkbox-property-wrapper
      v-model="model.layout.options.showFirstInitRow"
      :label="t('showFirstInitRow')"
    >
      <template #append>
        <v-tooltip location="left" width="280">
          <template #activator="{ props }">
            <v-icon v-bind="props">mdi-information-outline</v-icon>
          </template>
          <span>{{ t('showFirstInitRowInfo') }}</span>
        </v-tooltip>
      </template>
    </boolean-checkbox-property-wrapper>
  </expansion-panel>
</template>


<script lang="ts" setup>
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import BooleanSwitchPropertyWrapper from "@/components/properties-drawer/atoms/BooleanSwitchPropertyWrapper.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import DuplicatedSectionButtonProperty from "@/components/properties-drawer/atoms/DuplicatedSectionButtonProperty.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import {onMounted, ref} from "vue";
import {useBuilderLocale} from "@/composables/useBuilderLocale";

const {t} = useBuilderLocale();
const model = defineModel<any>();
const {active} = defineProps<{
  active: boolean;
}>();

const actionCode = ref<string | null>(null);

function updateActionCode(val: string) {
  if (!model.value.layout.options.action) {
    model.value.layout.options.action = {};
  }
  model.value.layout.options.action.code = val;
}

onMounted(() => {
  if (model.value.layout.options.addBtnMode === "action") {
    actionCode.value = model.value.layout.options.action?.code ?? "";
  }
});
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
