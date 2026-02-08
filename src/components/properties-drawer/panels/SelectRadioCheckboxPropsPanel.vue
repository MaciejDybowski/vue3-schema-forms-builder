<template>
  <expansion-panel
    v-if="component !== 'select'"
    :active="active"
    :title="t('fieldProperties')"
    value="fieldProps"
  >
    <boolean-checkbox-property-wrapper
      v-if="component === 'checkbox' || component === 'radio-button'"
      v-model="model.layout.props.inline"
      :label="t('horizontalLayout')"
    />

    <boolean-checkbox-property-wrapper
      v-if="component === 'checkbox'"
      v-model="model.layout.props.multiple"
      :label="t('multipleProps')"
    />

    <text-property-wrapper
      v-if="component === 'bookmark'"
      v-model="model['bg-color']"
      :label="t('bookmarkBgColor')"
    >
      <template #append-inner>
        <v-menu
          v-model="bgColorMenu"
          :close-on-content-click="false"
          location="bottom"
        >
          <template #activator="{ props: menuProps }">
            <v-btn
              flat
              icon="mdi-eyedropper"
              v-bind="{...menuProps, ...style.buttonStyle.value}"
            />
          </template>
          <v-color-picker
            v-model="model['bg-color']"
            hide-canvas
            hide-inputs
          />
        </v-menu>
      </template>
    </text-property-wrapper>

    <text-property-wrapper
      v-if="component === 'bookmark'"
      v-model="model.color"
      :label="t('bookmarkColor')"
    >
      <template #append-inner>
        <v-menu
          v-model="colorMenu"
          :close-on-content-click="false"
          location="bottom"
        >
          <template #activator="{ props: menuProps }">
            <v-btn
              flat
              icon="mdi-eyedropper"
              v-bind="{...menuProps, ...style.buttonStyle.value}"/>
          </template>
          <v-color-picker
            v-model="model.color"
            hide-canvas
            hide-inputs
          />
        </v-menu>
      </template>
    </text-property-wrapper>

    <select-general
      v-if="component === 'bookmark'"
      v-model="model.direction"
      :clearable="false"
      :items="[
        { value: 'vertical', title: t('verticalLayout') },
        { value: 'horizontal', title: t('horizontalLayoutAlt') }
      ]"
      :label="t('layoutDirection')"
      :return-object="false"
    />
  </expansion-panel>
</template>

<script lang="ts" setup>


import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import {useStyle} from "@/main";
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import {ref} from "vue";

withDefaults(defineProps<{
  active?: boolean
  component: string
}>(), {
  active: false
})

const style = useStyle()
const model = defineModel<any>()
const {t} = useBuilderLocale()

const bgColorMenu = ref(false);
const colorMenu = ref(false);

</script>

<style lang="scss" scoped>
</style>
