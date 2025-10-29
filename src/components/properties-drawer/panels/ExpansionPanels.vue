<template>
  <expansion-panel
    :active="active"
    title="Ustawienia sekcji"
    value="fieldProps"
  >
    <div
      v-for="(panel, index) in panels"
      :key="index"
      class="d-flex align-center"
    >
      <text-property-wrapper
        v-model="panel.title"
        :label="t('section.title')"
      />
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

export interface Panel {
  title?: string;
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

// --- USUWANIE SEKcji ---
function removePanel(index: number) {
  const updated = props.panels.filter((_, i) => i !== index);
  emit("update:panels", updated);
}
</script>

<style lang="scss" scoped></style>

<i18n lang="json">
{
  "en": {
    "section": {
      "title": "Tytuł sekcji",
      "add": "Dodaj sekcję",
      "newTitle": "Nowa sekcja"
    }
  },
  "pl": {
    "section": {
      "title": "Section title",
      "add": "Add section",
      "newTitle": "New section"
    }
  }
}
</i18n>
