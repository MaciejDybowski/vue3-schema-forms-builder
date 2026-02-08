<template>
  <expansion-panel
    :active="active"
    :title="t('layout.title')"
    value="layout"
  >
    <col-property v-model="model.layout.cols"/>
    <boolean-checkbox-property-wrapper
      v-model="showOffset"
      :label="t('layout.offsetConfiguration')"
      @change="resetOffset(showOffset)"
    >
      <template #append>
        <v-tooltip
          location="left"
          width="300"
        >
          <template #activator="{ props }">
            <v-icon
              v-bind="props">
              mdi-information-outline
            </v-icon>
          </template>
          <span>{{ t('layout.showOffsetInfo') }}</span>
        </v-tooltip>
      </template>
    </boolean-checkbox-property-wrapper>

    <offset-property
      v-if="showOffset"
      v-model="model.layout.offset"
    />
    <fill-row-property v-model="model.layout.fillRow"/>
    <css-class-property v-model="model"/>
  </expansion-panel>
</template>

<script lang="ts" setup>
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import OffsetProperty from "@/components/properties-drawer/atoms/offset/OffsetProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/cols/ColProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import {onMounted, ref} from "vue";
import CssClassProperty from "@/components/properties-drawer/atoms/CssClassProperty.vue";

const {t} = useBuilderLocale();
const {active} = defineProps<{
  active: boolean;
}>()
const model = defineModel<any>()
const defaultOffset = {xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0};
const showOffset = ref(false)

function resetOffset(val: boolean) {
  if (!val) {
    model.value.layout = {
      ...model.value.layout,
      offset: {...defaultOffset}
    }
  }
}

onMounted(() => {
  showOffset.value = Object.keys(defaultOffset).some(
    key => model.value.layout?.offset?.[key] !== defaultOffset[key]
  );
})
</script>

<style lang="scss" scoped>
</style>
