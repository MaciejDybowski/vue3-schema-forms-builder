<template>
  <draggable
    :clone="cloneStatic"
    :force-fallback="true"
    :group="{ name: 'controls', pull: 'clone', put: false }"
    :list="filteredStaticContent"
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
      </v-list-item>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from "../../vuedraggable/vuedraggable";
import {useStyle} from "@/main";
import {ElementDrawerFromElement} from "@/models/ElementDrawerFromElement";
import {computed, ref} from "vue";
import {useDragDrop} from "../../../.storybook/components/useDragDrop";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
const style = useStyle();
const {onDragStart, onDragEnd} = useDragDrop();

const props = defineProps<{ query: string }>();

const staticContent = ref<ElementDrawerFromElement[]>([
  {icon: "mdi-format-header-1", label: "static.h1", component: "static-content", tag: "h1"},
  {icon: "mdi-format-header-2", label: "static.h2", component: "static-content", tag: "h2"},
  {icon: "mdi-format-header-3", label: "static.h3", component: "static-content", tag: "h3"},
  {icon: "mdi-format-paragraph", label: "static.paragraph", component: "static-content", tag: "p"},
  {icon: "mdi-format-text", label: "static.text", component: "static-content", tag: "span"},
  {icon: "mdi-alert-box-outline", label: "static.alert", component: "alert"},
  {icon: "mdi-minus", label: "static.divider", component: "divider"},
  {icon: "mdi-read", label: "static.dataViewer", component: "data-viewer"},
  {icon: "mdi-card-outline", label: "static.button", component: "button"},
  {icon: "mdi-list-box-outline", label: "static.keyValueList", component: "key-value-list"},
  {icon: "mdi-alert-circle-outline", label: "static.validationMessagesViewer", component: "validation-messages-viewer"}
]);

const filteredStaticContent = computed(() =>
  staticContent.value.filter((item) =>
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

function makeCols(value = 12) {
  return Object.fromEntries(["xs", "sm", "md", "lg", "xl", "xxl"].map((k) => [k, value]));
}

function cloneStatic(item: ElementDrawerFromElement) {
  const id = generateKey(item.component);

  const baseLayout = {
    tag: item.tag,
    component: item.component,
    cols: makeCols(12),
    offset: makeCols(0),
    props: {}
  };

  switch (item.component) {
    case "alert":
      return {
        key: id,
        memorable: false,
        content: t("common.changeIt"),
        layout: baseLayout
      };

    case "static-content":
      return {
        key: id,
        content: t("common.changeIt"),
        layout: baseLayout
      };

    case "data-viewer":
      return {
        key: id,
        label: `Item-${id}`,
        layout: baseLayout
      };

    case "button":
      return {
        key: id,
        label: t("common.clickMe"),
        layout: {
          ...baseLayout,
          cols: makeCols(6),
          fillRow: true
        },
        options: {
          buttonProps: style.buttonStyle
        },
        mode: "action",
        config: {}
      };

    case "divider":
      return {key: id, thickness: 5, layout: baseLayout};

    case "key-value-list":
      return {
        key: id,
        label: "",
        config: [
          {title: t("static.key"), valueMapping: "Key"},
          {title: t("static.value"), valueMapping: "Value"}
        ],
        layout: baseLayout
      };

    case "validation-messages-viewer":
      return {
        key:id,
        layout: {
          component: item.component,
          cols: makeCols(12),
          offset: makeCols(0),
          props: {}
        }
      }
  }
}
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
    "static": {
      "h1": "Nagłówek 1",
      "h2": "Nagłówek 2",
      "h3": "Nagłówek 3",
      "paragraph": "Paragraf",
      "text": "Zwykły tekst",
      "alert": "Alert",
      "divider": "Rozdzielacz",
      "dataViewer": "Pole odczytu",
      "button": "Przycisk",
      "keyValueList": "Lista klucz-wartość",
      "key": "Klucz",
      "value": "Wartość",
      "validationMessagesViewer": "Komunikaty walidacyjne"
    },
    "common": {
      "changeIt": "Zmień to",
      "clickMe": "Kliknij mnie"
    }
  },
  "en": {
    "static": {
      "h1": "Header 1",
      "h2": "Header 2",
      "h3": "Header 3",
      "paragraph": "Paragraph",
      "text": "Plain text",
      "alert": "Alert",
      "divider": "Divider",
      "dataViewer": "Read-only field",
      "button": "Button",
      "keyValueList": "Key-value list",
      "key": "Key",
      "value": "Value",
      "validationMessagesViewer": "Validation messages"
    },
    "common": {
      "changeIt": "Change it",
      "clickMe": "Click me"
    }
  }
}
</i18n>
