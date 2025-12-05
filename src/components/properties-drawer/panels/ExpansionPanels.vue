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
import {useI18n} from "vue-i18n";
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

const {t} = useI18n();


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
<i18n lang="json">
{
  "pl": {
    "title": "Ustawienia sekcji",
    "section": {
      "title": "Tytuł sekcji",
      "icon": "Ikona sekcji",
      "iconSize": "Rozmiar ikony",
      "add": "Dodaj sekcję",
      "newTitle": "Nowa sekcja"
    },
    "componentLabel": "Nagłówek",
    "header1": "Nagłówek 1",
    "header2": "Nagłówek 2",
    "header3": "Nagłówek 3",
    "header4": "Nagłówek 4",
    "header5": "Nagłówek 5",
    "header6": "Nagłówek 6"
  },
  "en": {
    "title": "Section properties",
    "section": {
      "title": "Section title",
      "icon": "Section icon",
      "iconSize": "Icon size",
      "add": "Add section",
      "newTitle": "New section"
    },
    "componentLabel": "Header",
    "header1": "Header 1",
    "header2": "Header 2",
    "header3": "Header 3",
    "header4": "Header 4",
    "header5": "Header 5",
    "header6": "Header 6"
  }
}
</i18n>
