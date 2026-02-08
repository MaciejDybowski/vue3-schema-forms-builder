<template>
  <expansion-panel
    :active="active"
    :title="t('title')"
    value="fieldProps"
  >
    <div
      v-for="(panel, index) in panels"
      :key="index"
      class="d-flex align-center"
    >
      <div style="width: 85%">


        <text-property-wrapper
          v-model="panel.title"
          :label="t('section.title')"
        />


        <text-property-wrapper
          v-model="panel.titleIcon"
          :label="t('section.icon')"
        />
        <number-property-wrapper
          v-model="panel.titleIconSize"
          :label="t('section.iconSize')"
        />

        <combobox-general
          v-model="panel.titleCssDecorator"
          :items="[
            {value: 'au-text-h1', title: t('header1')},
            {value: 'au-text-h2', title: t('header2')},
            {value: 'au-text-h3', title: t('header3')},
            {value: 'au-text-h4', title: t('header4')},
          ]"
          :label="t('componentLabel')"
          :return-object="false"
        />


      </div>
      <v-btn
        color="error"
        icon="mdi-delete-outline"
        size="small"
        variant="text"
        @click="removePanel(index)"
      />
    </div>

    <v-btn
      class="mt-2 mx-2"
      color="primary"
      prepend-icon="mdi-plus"
      size="small"
      width="355px"
      @click="addPanel"
    >
      {{ t('section.add') }}
    </v-btn>
  </expansion-panel>
</template>

<script lang="ts" setup>
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import NumberPropertyWrapper from "@/components/properties-drawer/atoms/NumberPropertyWrapper.vue";
import ComboboxGeneral from "@/components/properties-drawer/atoms/ComboboxGeneral.vue";

export interface Panel {
  title?: string;
  titleIcon?: string;
  titleIconSize?: number;
  titleCssDecorator?: string;
  schema: any;
  tempItems: any;
}

const props = defineProps<{
  active: boolean;
  panels: Panel[];
}>();

const emit = defineEmits<{
  (e: "update:panels", panels: Panel[]): void;
}>();

const {t} = useBuilderLocale();


function addPanel() {
  const newPanel: Panel = {
    title: t("section.newTitle"),
    schema: {
      properties: {}
    },
    tempItems: [],
  };
  emit("update:panels", [...props.panels, newPanel]);
}

function removePanel(index: number) {
  const updated = props.panels.filter((_, i) => i !== index);
  emit("update:panels", updated);
}
</script>

<style lang="scss">

.au-text-h1 {
  font-weight: 400;
  font-size: 2.125rem !important;
  letter-spacing: 0.0073529412em !important;
}

.au-text-h2 {
  font-weight: 400;
  font-size: 1.5rem !important;
  letter-spacing: normal;

}

.au-text-h3 {
  font-weight: 400;
  font-size: 1.25rem !important;
  letter-spacing: 0.0125em;

}

.au-text-h4 {
  font-weight: 400;
  font-size: 1.125rem !important;
  letter-spacing: 0.0125em;
}


</style>
