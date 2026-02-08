<template>
  <source-url-configurator
    v-model="modelValue.builder_url"
    :label="t('urlKey')"
    :grow-enabled="false"
    :rows="2"
    append-inner-icon="mdi-cog"
  />


  <boolean-checkbox-property-wrapper
    v-model="modelValue.returnObject"
    :label="t('returnObject')"
  >
    <template #append>
      <v-tooltip
        :text="t('returnObjectTooltip')"
        location="start"
        width="300"
      >
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props">
            mdi-information-outline
          </v-icon>
        </template>
      </v-tooltip>
    </template>
  </boolean-checkbox-property-wrapper>


  <boolean-checkbox-property-wrapper
    v-model="modelValue.singleOptionAutoSelect"
    :label="t('singleOptionAutoSelect')"
  >
    <template #append>
      <v-tooltip
        :text="t('autoSelectTooltip')"
        location="start"
        width="300"
      >
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props">
            mdi-information-outline
          </v-icon>
        </template>
      </v-tooltip>
    </template>
  </boolean-checkbox-property-wrapper>


  <boolean-checkbox-property-wrapper
    v-model="modelValue.multiple"
    :label="t('multiple')"
  >
    <template #append>
      <v-tooltip
        :text="t('multipleTooltip')"
        location="start"
        width="300"
      >
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props">
            mdi-information-outline
          </v-icon>
        </template>
      </v-tooltip>
    </template>
  </boolean-checkbox-property-wrapper>


  <number-property-wrapper
    v-if="modelValue.multiple"
    v-model="modelValue.maxSelection"
    :label="t('maxSelection')"
  />

  <boolean-checkbox-property-wrapper
    v-model="showAdvancedConfiguration"
    :label="t('advancedConfiguration')"
  />

  <text-property-wrapper
    v-if="showAdvancedConfiguration"
    v-model="modelValue['value']"
    :label="t('value')"
  />


  <text-property-wrapper
    v-if="showAdvancedConfiguration"
    v-model="modelValue.title"
    :label="t('title')"
  />


  <text-property-wrapper
    v-if="showAdvancedConfiguration"
    v-model="modelValue.description"
    :label="t('description')"
  />

  <boolean-checkbox-property-wrapper
    v-if="showAdvancedConfiguration"
    v-model="modelValue.lazy"
    :label="t('lazyLoading')"
  />

</template>

<script lang="ts" setup>


import {useI18n} from "vue-i18n";
import NumberPropertyWrapper from "@/components/properties-drawer/atoms/NumberPropertyWrapper.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import {onMounted, ref} from "vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import SourceUrlConfigurator from "@/components/properties-drawer/atoms/urlSourceInput/SourceUrlConfigurator.vue";

const modelValue = defineModel<any>({
  default: () => {
  }
})

const showAdvancedConfiguration = ref(false)

onMounted(() => {


  if (modelValue.value.title !== "label" || modelValue.value.value !== "id" || modelValue.value.description !== "description") {
    showAdvancedConfiguration.value = true;
  }
})

const {t} = useI18n({ useScope: 'global' })

</script>

<style lang="scss" scoped>

</style>
