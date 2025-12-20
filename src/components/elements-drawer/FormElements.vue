<template>
  <draggable
    :clone="cloneControls"

    :force-fallback="true"
    :group="{ name: 'controls', pull: 'clone', put: false }"
    :list="filteredControls"
    :sort="false"
    itemKey="id"
    @end="onDragEnd"
    @start="onDragStart"
  >
    <template #item="{ element }">
      <v-list-item link>
        <template #prepend>
          <v-icon>{{ element.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ t(element.label) }}</v-list-item-title>
        <v-list-item-subtitle v-if="element.subtitle">
          {{ t(element.subtitle) }}
        </v-list-item-subtitle>
      </v-list-item>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from "../../vuedraggable/vuedraggable";
import {ElementDrawerFromElement} from "@/models/ElementDrawerFromElement";
import {computed, ref} from "vue";
import {useDragDrop} from "../../../.storybook/components/useDragDrop";
import {useI18n} from "vue-i18n";

const props = defineProps<{ query: string }>();
const {t} = useI18n();

const controls = ref<ElementDrawerFromElement[]>([
  {icon: "mdi-format-letter-matches", label: "controls.text", component: "text-field"},
  {icon: "mdi-numeric-1-box-outline", label: "controls.number", component: "number-field"},
  {
    icon: "mdi-format-letter-ends-with",
    label: "controls.textarea",
    component: "text-area",
    subtitle: "controls.textareaSubtitle"
  },
  {
    icon: "mdi-order-alphabetical-ascending",
    label: "controls.select",
    subtitle: "controls.selectSubtitle",
    component: "select"
  },
  {
    icon: "mdi-order-alphabetical-ascending",
    label: "controls.dictionary",
    subtitle: "controls.dictionarySubtitle",
    component: "dictionary"
  },
  {icon: "mdi-account", label: "controls.user", component: "user-input"},
  {icon: "mdi-toggle-switch-off-outline", label: "controls.switch", component: "switch"},
  {icon: "mdi-file", label: "controls.file", component: "file-field"},
  {icon: "mdi-calendar-blank", label: "controls.date", component: "date-picker"},
  {icon: "mdi-calendar-clock", label: "controls.datetime", component: "date-time-picker"},
  {icon: "mdi-content-copy", label: "controls.duplicatedSection", component: "duplicated-section"},
  {
    icon: "mdi-format-list-group",
    label: "controls.fieldsGroup",
    subtitle: "controls.fieldsGroupSubtitle",
    component: "fields-group"
  },
  {icon: "mdi-calendar-filter", label: "controls.year", component: "year-picker"},
  {icon: "mdi-phone", label: "controls.phone", component: "phone"},
  {icon: "mdi-home", label: "controls.address", component: "address"},
  {icon: "mdi-image", label: "controls.image", component: "image"},
  {
    icon: "mdi-text-box-edit-outline",
    label: "controls.textSwitch",
    subtitle: "controls.textSwitchSubtitle",
    component: "text-switch-field"
  },
  {icon: "mdi-table", label: "controls.table", subtitle: "controls.tableSubtitle", component: "table-view"},
  {
    icon: "mdi-language-markdown-outline",
    label: "controls.markdown",
    subtitle: "controls.markdownSubtitle",
    component: "markdown"
  },
  {
    icon: "mdi-file-document-outline",
    label: "controls.textEditor",
    subtitle: "controls.textEditorSubtitle",
    component: "text-editor"
  },
  {icon: "mdi-format-list-numbered", label: "controls.orderedList", component: "ordered-multi-select"},
  {icon: "mdi-translate-variant", label: "controls.multiLang", component: "multi-language-control"},
  {icon: "mdi-chevron-triple-down", label: "controls.expansionPanels", component: "expansion-panels"},
  {icon: "mdi-timetable", label: "controls.schedulerGrid", component: "scheduler-grid"}
]);

const filteredControls = computed(() =>
  controls.value.filter((item) =>
    props.query ? t(item.label).toLowerCase().includes(props.query.toLowerCase()) : true
  )
);

function generateKey(name: string): string {
  const camelCase = name
    .toLowerCase()
    .split(/[\s-]+/)
    .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join("");
  return `${camelCase}${Math.random().toString().substring(2, 5)}`;
}

function cloneControls(item: ElementDrawerFromElement) {
  const id = generateKey(item.component);
  const schemaElement = {
    key: id,
    label: "Item-" + id,
    layout: {
      cols: {xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4},
      offset: {xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0},
      fillRow: true,
      component: item.component,
      props: {}
    }
  };

  switch (item.component) {
    case "text-field":
    case "text-area":
    case "markdown":
    case "date-picker":
    case "date-time-picker":
    case "year-picker":
    case "address":
    case "switch":
    case "file-field":
    case "phone":
      return schemaElement;

    case "text-switch-field":
      return {...schemaElement, content: "Change me"};

    case "checkbox":
    case "select":
    case "radio-button":
      return {
        ...schemaElement,
        source: {
          items: [
            {value: 1, title: "Option 1"},
            {value: 2, title: "Option 2"},
            {value: 3, title: "Option 3"}
          ]
        }
      };

    case "duplicated-section":
      return {
        key: id,
        sectionKey: id,
        tempItems: [],
        layout: {
          component: item.component,
          cols: Object.fromEntries(["xs", "sm", "md", "lg", "xl", "xxl"].map((k) => [k, 12])),
          offset: Object.fromEntries(["xs", "sm", "md", "lg", "xl", "xxl"].map((k) => [k, 0])),
          schema: {type: "object", properties: {}},
          options: {
            addBtnText: "Add element",
            showDivider: false,
            ordinalNumberInModel: false,
            showFirstInitRow: true
          }
        },
        editable: true,
        showElements: true
      };

    case "expansion-panels":
      return {
        key: id,
        layout: {
          component: item.component,
          cols: Object.fromEntries(["xs", "sm", "md", "lg", "xl", "xxl"].map((k) => [k, 12])),
          offset: Object.fromEntries(["xs", "sm", "md", "lg", "xl", "xxl"].map((k) => [k, 0])),
          props: {}
        },
        panels: [
          {
            title: "Change me",
            titleIcon: "mdi-home",
            titleIconSize: 20,
            schema: {
              properties: {}
            },
            tempItems: []
          }
        ]
      };

    case "fields-group":
      return {
        key: id,
        sectionKey: id,
        tempItems: [],
        layout: {
          component: item.component,
          cols: Object.fromEntries(["xs", "sm", "md", "lg", "xl", "xxl"].map((k) => [k, 12])),
          offset: Object.fromEntries(["xs", "sm", "md", "lg", "xl", "xxl"].map((k) => [k, 0])),
          schema: {type: "object", properties: {}},
          props: {}
        }
      };

    case "text-editor":
      return {
        key: id,
        contentType: 'html',
        layout: {
          component: item.component,
          cols: Object.fromEntries(["xs", "sm", "md", "lg", "xl", "xxl"].map((k) => [k, 12])),
          offset: Object.fromEntries(["xs", "sm", "md", "lg", "xl", "xxl"].map((k) => [k, 0])),
          props: {}
        }
      };

    case "dictionary":
      return {
        ...schemaElement,
        source: {
          url: "",
          title: "label",
          value: "id",
          description: "description",
          returnObject: false,
          lazy: true,
          singleOptionAutoSelect: false,
          multiple: false,
          maxSelection: 0
        }
      };

    case "ordered-multi-select":
      return {
        ...schemaElement,
        variant: "list",
        source: {url: "", title: "label", value: "id"}
      };

    case "user-input":
      return {...schemaElement, source: {url: ""}};

    case "number-field":
      return {...schemaElement, type: "int"};

    case "image":
      return {
        ...schemaElement,
        layout: {
          ...schemaElement.layout,
          props: {"aspect-ratio": 1, width: "300", height: "295", cover: true}
        },
        src: "/api/v1/features/{context.menuFeatureId}/images/{id}?Workspace-Id={context.workspaceId}&dataId={dataId}&width={width}&height={height}&lastModifiedAt="
      };

    case "table-view":
      return {
        key: id,
        layout: {
          component: item.component,
          cols: Object.fromEntries(["xs", "sm", "md", "lg", "xl", "xxl"].map((k) => [k, 12])),
          offset: Object.fromEntries(["xs", "sm", "md", "lg", "xl", "xxl"].map((k) => [k, 0])),
          fillRow: false,
          props: {}
        },
        source: {
          data: "",
          headers: [...Array(3)].map(() => ({title: "Change me"})),
          buttons: []
        },
        actions: {}
      };

    case "multi-language-control":
      return {
        ...schemaElement,
        options: {availableLocales: [{code: "en-GB", name: "English"}]}
      };

    case "scheduler-grid":
      return {
        ...schemaElement,
        layout: {
          cols: {xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12},
          offset: {xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0},
          fillRow: true,
          component: item.component,
          props: {}
        },
        legend: [
          {
            statusKey: 'PRESENT',
            label: 'In Office',
            colors: {light: '#C8E6C9', dark: '#1B5E20'},
          },
          {
            statusKey: 'WFH',
            label: 'Work From Home',
            colors: {light: '#BBDEFB', dark: '#0D47A1'},
          },
          {
            statusKey: 'PTO',
            label: 'Paid Time Off',
            colors: {light: '#FFE082', dark: '#E65100'},
          },
          {
            statusKey: 'SICK',
            label: 'Sick Leave',
            colors: {light: '#FFCDD2', dark: '#B71C1C'},
          },
          {
            statusKey: 'WEEKEND',
            label: 'Weekend',
            colors: {light: '#EEEEEE', dark: '#121212'},
          },
          {
            statusKey: 'HOLIDAY',
            label: 'Public Holiday',
            colors: {light: '#E1BEE7', dark: '#4A148C'},
          },
          {
            statusKey: 'HALF_DAY',
            label: 'Part Time',
            colors: {light: '#FFCC80', dark: '#BF360C'},
          },
        ],
      };
  }
}

const {onDragStart, onDragEnd} = useDragDrop();
</script>

<style lang="scss" scoped>
.elements-list {
  min-height: 100px;
  position: relative;
}

:deep(.sortable-chosen-left) {
  opacity: 0.8;
}

:deep(.sortable-drag) {
  opacity: 0.9;
}

:deep(.sortable-fallback) {
  display: none !important;
}
</style>

<i18n lang="json">
{
  "pl": {
    "controls": {
      "text": "Pole tekstowe",
      "number": "Pole liczbowe",
      "textarea": "Obszar tekstowy",
      "textareaSubtitle": "Textarea",
      "select": "Pole wyboru",
      "selectSubtitle": "Select / Radio / Checkbox / Zakładka",
      "dictionary": "Pole słownikowe",
      "dictionarySubtitle": "Autocomplete / Combobox",
      "user": "Użytkownik",
      "switch": "Przełącznik",
      "file": "Plik",
      "date": "Data",
      "datetime": "Data i czas",
      "duplicatedSection": "Sekcja powielana",
      "fieldsGroup": "Grupa pól",
      "fieldsGroupSubtitle": "Wizualne grupowanie pól",
      "year": "Rok",
      "phone": "Telefon",
      "address": "Pole adresowe",
      "image": "Zdjęcie",
      "textSwitch": "Pole tekst ➞ input",
      "textSwitchSubtitle": "Naciśnij tekst, aby edytować",
      "table": "Tabela",
      "tableSubtitle": "Dane zew. z edycją poj. wiersza",
      "markdown": "Markdown",
      "markdownSubtitle": "Pole Markdown",
      "textEditor": "Edytor tekstu",
      "textEditorSubtitle": "Zapis w HTML / JSON",
      "orderedList": "Lista uporządkowana",
      "multiLang": "Pole wielojęzyczne",
      "expansionPanels": "Sekcje zwijalne",
      "schedulerGrid": "Haromonogram"
    }
  },
  "en": {
    "controls": {
      "text": "Text field",
      "number": "Number field",
      "textarea": "Text area",
      "textareaSubtitle": "Textarea",
      "select": "Select field",
      "selectSubtitle": "Select / Radio / Checkbox / Bookmark",
      "dictionary": "Dictionary field",
      "dictionarySubtitle": "Autocomplete / Combobox",
      "user": "User",
      "switch": "Switch",
      "file": "File",
      "date": "Date",
      "datetime": "Date & time",
      "duplicatedSection": "Duplicated section",
      "fieldsGroup": "Fields group",
      "fieldsGroupSubtitle": "Visual field grouping",
      "year": "Year",
      "phone": "Phone",
      "address": "Address field",
      "image": "Image",
      "textSwitch": "Text ➞ input field",
      "textSwitchSubtitle": "Click text to edit",
      "table": "Table",
      "tableSubtitle": "External data with row editing",
      "markdown": "Markdown",
      "markdownSubtitle": "Markdown field",
      "textEditor": "Text editor",
      "textEditorSubtitle": "Saved as HTML / JSON",
      "orderedList": "Ordered list",
      "multiLang": "Multi-language field",
      "expansionPanels": "Expansion panels",
      "schedulerGrid": "Scheduler"
    }
  }
}
</i18n>
