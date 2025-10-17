<template>
  <draggable
    :clone="cloneControls"
    :fallback-tolerance="0"
    :force-fallback="true"
    :group="{name: 'controls', pull: 'clone', put: false}"
    :list="filteredControls"
    :sort="false"
    chosen-class="sortable-chosen-left"
    class="elements-list"
    drag-class="sortable-drag"
    fallback-class="sortable-fallback"
    ghost-class="sortable-ghost"
    itemKey="id"
    @end="onDragEnd"
    @start="onDragStart"
  >
    <template #item="{element}">
      <div>
        <v-list-item link>
          <template #prepend>
            <v-icon>{{ element.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ element.label }}</v-list-item-title>
          <v-list-item-subtitle v-if="element.subtitle">{{ element.subtitle }}</v-list-item-subtitle>
        </v-list-item>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from "../../vuedraggable/vuedraggable";
import {ElementDrawerFromElement} from "@/models/ElementDrawerFromElement";
import {computed, ComputedRef, ref, Ref} from "vue";
import {useDragDrop} from "../../../.storybook/components/useDragDrop";

const props = defineProps<{
  query: string
}>();

const controls: Ref<ElementDrawerFromElement[]> = ref([
  {
    icon: "mdi-format-letter-matches",
    label: "Pole tekstowe",
    component: "text-field"
  },
  {
    icon: "mdi-text-box-edit-outline",
    label: "Pole tekstowe [text->input]",
    component: "text-switch-field"
  },
  {
    icon: "mdi-numeric-1-box-outline",
    label: "Pole liczbowe",
    component: "number-field"
  },
  {
    icon: "mdi-format-letter-ends-with",
    label: "Obszar tekstowy",
    component: "text-area"
  },
  {
    icon: "mdi-order-bool-descending",
    label: "Pole wyboru (R)",
    subtitle: "Radio",
    component: "radio-button"
  },
  {
    icon: "mdi-order-bool-descending-variant",
    label: "Pole wyboru (C)",
    subtitle: "Checkbox",
    component: "checkbox"
  },
  {
    icon: "mdi-order-alphabetical-ascending",
    label: "Pole wyboru (S)",
    subtitle: "Select",
    component: "select"
  },
  {
    icon: "mdi-order-alphabetical-ascending",
    label: "Pole słownikowe (A)",
    subtitle: "Autocomplete",
    component: "dictionary"
  },
  {
    icon: "mdi-order-alphabetical-ascending",
    label: "Pole słownikowe (C)",
    subtitle: "Combobox",
    component: "combobox"
  },
  {
    icon: "mdi-toggle-switch-off-outline",
    label: "Przełącznik",
    component: "switch"
  },
  {
    icon: "mdi-file",
    label: "Plik",
    component: "file-field"
  },
  {
    icon: "mdi-calendar-blank",
    label: "Data",
    component: "date-picker"
  },
  {
    icon: "mdi-calendar-clock",
    label: "Data i czas",
    component: "date-time-picker"
  },
  {
    icon: "mdi-calendar-filter",
    label: "Rok",
    component: "year-picker"
  },
  {
    icon: "mdi-phone",
    label: "Telefon",
    component: "phone"
  },
  {
    icon: "mdi-home",
    label: "Pole adresowe",
    component: "address"
  },
  {
    icon: "mdi-account",
    label: "Użytkownik",
    component: "user-input"
  },
  {
    icon: "mdi-image",
    label: "Zdjęcie",
    component: "image"
  },
  {
    icon: "mdi-content-copy",
    label: "Sekcja powielana",
    component: "duplicated-section"
  },
  {
    icon: "mdi-format-list-group",
    label: "Grupa pól",
    subtitle: "Wizualne grupowanie pól",
    component: "fields-group"
  },
  {
    icon: "mdi-table",
    label: "Tabela",
    subtitle: "Dane zew. z edycją poj. wiersza",
    component: "table-view"
  },
  {
    icon: "mdi-language-markdown-outline",
    label: "Markdown",
    subtitle: "Pole markdown",
    component: "markdown"
  },
  {
    icon: "mdi-format-list-numbered",
    label: "Lista uporządkowana",
    component: "ordered-multi-select"
  },
  {
    icon: "mdi-translate-variant",
    label: "Multi Language Field",
    component: "multi-language-control"
  }
]);

const filteredControls: ComputedRef<ElementDrawerFromElement[]> = computed(() => {
  return controls.value.filter((item: ElementDrawerFromElement) => {
    if (props.query) {
      return item.label.toLowerCase().includes(props.query.toLowerCase());
    } else {
      return item;
    }
  });
});

function cloneControls(item: ElementDrawerFromElement) {
  const id = generateKey(item.component);
  const schemaElement = {
    key: id,
    label: "Item-" + id,
    layout: {
      cols: {
        xs: 12,
        sm: 6,
        md: 6,
        lg: 4,
        xl: 4,
        xxl: 4
      },
      offset: {
        xs: 0,
        sm: 0,
        md: 0,
        lg: 0,
        xl: 0,
        xxl: 0
      },
      fillRow: true,
      component: item.component,
      props: {}
    },
  };

  switch (item.component) {
    case "markdown":
    case "text-field":
    case "text-area":
    case "location":
    case "date-picker":
    case "date-time-picker":
    case "year-picker":
    case "address":
    case "switch":
    case "file-field":
    case "phone": {
      return schemaElement;
    }
    case "text-switch-field": {
      return {
        content: "Change me",
        ...schemaElement,
      }
    }
    case "checkbox":
      const temp = {...schemaElement};
      temp.layout.props["multiple"] = true;
      return {
        ...temp,
        source: {
          items: [
            {value: 1, title: "Option 1"},
            {value: 2, title: "Option 2"},
            {value: 3, title: "Option 3"},
          ],
        },
      };
    case "select":
    case "radio-button": {
      return {
        ...schemaElement,
        source: {
          items: [
            {value: 1, title: "Option 1"},
            {value: 2, title: "Option 2"},
            {value: 3, title: "Option 3"},
          ],
        },
      };
    }
    case "duplicated-section": {
      return {
        key: id,
        sectionKey: id,
        tempItems: [],
        layout: {
          component: item.component,
          cols: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
            xxl: 12
          },
          offset: {
            xs: 0,
            sm: 0,
            md: 0,
            lg: 0,
            xl: 0,
            xxl: 0
          },
          schema: {
            type: "object",
            properties: {},
          },
          options: {
            addBtnText: "Add element",
            showDivider: false,
            ordinalNumberInModel: false,
            showFirstInitRow: true
          },
        },
        editable: true,
        showElements: true,
      };
    }
    case "fields-group": {
      return {
        key: id,
        sectionKey: id,
        tempItems: [],
        layout: {
          component: item.component,
          cols: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
            xxl: 12
          },
          offset: {
            xs: 0,
            sm: 0,
            md: 0,
            lg: 0,
            xl: 0,
            xxl: 0
          },
          schema: {
            type: "object",
            properties: {},
          },
        },
      };
    }
    case "dictionary":
    case "combobox": {
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
    }
    case "ordered-multi-select": {
      return {
        variant: "list",
        ...schemaElement,
        source: {
          url: "",
          title: "label",
          value: "id",
        }
      };
    }
    case "user-input":
      return {
        ...schemaElement,
        source: {
          url: ""
        }
      };
    case "number-field":
      return {
        ...schemaElement,
        type: "int"
      };
    case "image":
      return {
        ...schemaElement,
        layout: {
          ...schemaElement.layout,
          props: {
            "aspect-ratio": 1,
            width: "300",
            height: "295",
            cover: true,
          },
        },
        src: "/api/v1/features/{context.menuFeatureId}/images/{id}?Workspace-Id={context.workspaceId}&dataId={dataId}&width={width}&height={height}&lastModifiedAt="
      };
    case "table-view":
      return {
        key: id,
        layout: {
          cols: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
            xxl: 12
          },
          offset: {
            xs: 0,
            sm: 0,
            md: 0,
            lg: 0,
            xl: 0,
            xxl: 0
          },
          fillRow: false,
          component: item.component,
          props: {}
        },
        source: {
          data: "",
          headers: [
            {title: "Change me"},
            {title: "Change me"},
            {title: "Change me"}
          ],
          buttons: []
        },
        actions: {}
      };
    case "multi-language-control": {
      return {
        ...schemaElement,
        options: {
          availableLocales: [{code: "en-GB", name: "English"}]
        }
      };
    }
  }
}

function generateKey(name: string): string {
  const camelCaseName = name
    .toLowerCase()
    .split(" ")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("")
    .split("-")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
  return camelCaseName + Math.random().toString().substring(2, 5);
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
