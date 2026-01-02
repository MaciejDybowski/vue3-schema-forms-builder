<template>
  <expansion-panel
    :active="active"
    :title="t('textEditorProps.title')"
    value="textEditorProps"
  >
    <v-list-item class="mb-0 pb-0">
      <span>
      {{ t('textEditorProps.limitFeatures') }}
    </span>
    </v-list-item>

    <v-list-item
      v-for="feature in features"
      :key="feature"
    >
      <v-checkbox
        v-model="model.editorFeatures"
        :label="t(feature)"
        :value="feature"
        density="compact"
        hide-details
      />
    </v-list-item>
  </expansion-panel>
</template>

<script lang="ts" setup>
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import {useI18n} from "vue-i18n";
import {onMounted} from "vue";


const {t} = useI18n();

defineProps<{
  active: boolean;
}>();

const model = defineModel<any>()


const features = [
  'bold',
  'italic',
  'strike',
  'heading1',
  'heading2',
  'heading3',
  'bulletList',
  'orderedList',
  'code',
  'blockquote',
  'insertTable',
  'addColumnBefore',
  'addColumnAfter',
  'addRowBefore',
  'addRowAfter',
  'deleteRow',
  'deleteColumn',
  'deleteTable',
  'source',
] as const;

onMounted(() => {
  if (!model.value.editorFeatures) {
    model.value.editorFeatures = [];
  }
})
</script>


<i18n lang="json">
{
  "en": {
    "textEditorProps": {
      "title": "Text Editor Properties",
      "limitFeatures": "Limit available features to:"
    },
    "bold": "Bold",
    "italic": "Italic",
    "strike": "Strike",
    "heading1": "Heading 1",
    "heading2": "Heading 2",
    "heading3": "Heading 3",
    "bulletList": "Bullet list",
    "orderedList": "Ordered list",
    "code": "Inline code",
    "blockquote": "Blockquote",
    "insertTable": "Insert table",
    "addColumnBefore": "Add column before",
    "addColumnAfter": "Add column after",
    "addRowBefore": "Add row before",
    "addRowAfter": "Add row after",
    "deleteRow": "Delete row",
    "deleteColumn": "Delete column",
    "deleteTable": "Delete table",
    "source": "Source code"
  },
  "pl": {
    "textEditorProps": {
      "title": "Właściwości edytora tekstu",
      "limitFeatures": "Ogranicz dostępne funkcje do:"
    },
    "bold": "Pogrubienie",
    "italic": "Kursywa",
    "strike": "Przekreślenie",
    "heading1": "Nagłówek 1",
    "heading2": "Nagłówek 2",
    "heading3": "Nagłówek 3",
    "bulletList": "Lista punktowana",
    "orderedList": "Lista numerowana",
    "code": "Kod liniowy",
    "blockquote": "Cytat",
    "insertTable": "Wstaw tabelę",
    "addColumnBefore": "Dodaj kolumnę przed",
    "addColumnAfter": "Dodaj kolumnę po",
    "addRowBefore": "Dodaj wiersz przed",
    "addRowAfter": "Dodaj wiersz po",
    "deleteRow": "Usuń wiersz",
    "deleteColumn": "Usuń kolumnę",
    "deleteTable": "Usuń tabelę",
    "source": "Kod źródłowy"
  }
}
</i18n>

