<template>
  <!--    style="top: 65px; height: 100%"-->
  <v-navigation-drawer
    v-model="drawers.elementsDrawer.value"
    class="element-drawer"
    order="3"
    permament
    scrim="transparent"
    width="300"
  >
    <!--    style="top: 65px; min-height: calc(100vh - 65px)"-->
    <v-list>
      <v-list-item density="compact">
        <v-list-item-title>Elementy statyczne</v-list-item-title>
      </v-list-item>
      <draggable
        :clone="cloneStatic"
        :group="{ name: 'controls', pull: 'clone', put: false }"
        :list="staticContent"
        item-key="label"
      >
        <template #item="{element}">

          <v-list-item link>
            <template #prepend>
              <v-icon>{{ element.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ element.label }}</v-list-item-title>
          </v-list-item>
        </template>
      </draggable>

      <v-list-item density="compact">
        <v-divider/>
      </v-list-item>
      <v-list-item density="compact">
        <v-list-item-title>Pola formularza</v-list-item-title>
      </v-list-item>
      <draggable
        :clone="cloneControls"
        :group="{ name: 'controls', pull: 'clone', put: false }"
        :list="controls"
        item-key="label"
      >
        <template #item="{element}">
          <v-list-item link>
            <template #prepend>
              <v-icon>{{ element.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ element.label }}</v-list-item-title>
          </v-list-item>
        </template>
      </draggable>

      <v-list-item density="compact">
        <v-divider/>
      </v-list-item>
      <v-list-item density="compact">
        <v-list-item-title>Elementy układu</v-list-item-title>
      </v-list-item>
      <draggable
        :clone="cloneControls"
        :group="{ name: 'controls', pull: 'clone', put: false }"
        :list="layoutElements"
        item-key="label"
      >
        <template #item="{element}">
          <v-list-item link>
            <template #prepend>
              <v-icon>{{ element.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ element.label }}</v-list-item-title>
          </v-list-item>
        </template>
      </draggable>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'
import {useDrawers} from "@/composables/useDrawers";
import {useStyle} from "@/main";

import {Ref, ref} from "vue";
import {ElementDrawerFromElement} from "@/models/ElementDrawerFromElement";

const drawers = useDrawers();
const style = useStyle()

const staticContent: Ref<ElementDrawerFromElement[]> = ref([
  {
    icon: "mdi-format-header-1",
    label: "Nagłowek 1",
    component: "static-content",
    tag: "h1",
  },
  {
    icon: "mdi-format-header-2",
    label: "Nagłowek 2",
    component: "static-content",
    tag: "h2",
  },
  {
    icon: "mdi-format-header-3",
    label: "Nagłowek 3",
    component: "static-content",
    tag: "h3",
  },
  {
    icon: "mdi-format-paragraph",
    label: "Paragraf",
    component: "static-content",
    tag: "p",
  },
  {
    icon: "mdi-minus",
    label: "Rozdzielacz",
    component: "divider"
  },
  {
    icon: "mdi-read",
    label: "Pole odczytu",
    component: "data-viewer"
  },
  {
    icon: "mdi-card-outline",
    label: "Przycisk",
    component: "button"
  }
])
const controls: Ref<ElementDrawerFromElement[]> = ref([
  {
    icon: "mdi-format-letter-matches",
    label: "Pole tekstowe",
    component: "text-field"
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
    label: "Pole wyboru (radio)",
    component: "radio-button"
  },
  {
    icon: "mdi-order-bool-descending-variant",
    label: "Pole wyboru (checkbox)",
    component: "checkbox"
  },
  {
    icon: "mdi-order-alphabetical-ascending",
    label: "Pole wyboru (select)",
    component: "select"
  },
  {
    icon: "mdi-order-alphabetical-ascending",
    label: "Pole słownikowe (autocomplete)",
    component: "dictionary"
  },
  {
    icon: "mdi-order-alphabetical-ascending",
    label: "Pole słownikowe (combobox)",
    component: "combobox"
  },
  {
    icon: "mdi-toggle-switch-off-outline",
    label: "Przełącznik",
    component: "switch"
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
    icon: "mdi-map-marker",
    label: "Lokalizacja",
    component: "location"
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
  }
])
const layoutElements: Ref<ElementDrawerFromElement[]> = ref([
  {
    icon: "mdi-content-copy",
    label: "Sekcja powielana",
    component: "duplicated-section"
  }
])


function cloneControls(item: ElementDrawerFromElement) {
  const id = generateKey(item.component)
  const schemaElement = {
    formId: '333',
    key: id,
    label: "Item-" + id,
    layout: {
      cols: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
        xxl: 12
      },
      offset: 0,
      fillRow: false,
      component: item.component,
      props: {}
    },
    on: {
      input: (e: any) => {
      },
    },
    options: {
      fieldProps: style.inputStyle,
      buttonProps: style.buttonStyle
    }
  }

  switch (item.component) {
    case "text-field":
    case "text-area":
    case "location":
    case "date-picker":
    case "date-time-picker":
    case "address":
    case "switch":
    case "phone": {
      return schemaElement
    }
    case "checkbox":
      const temp = {...schemaElement}
      temp.layout.props["multiple"] = true
      return {
        ...temp,
        source: {
          items: [
            {value: 1, title: "Option 1"},
            {value: 2, title: "Option 2"},
            {value: 3, title: "Option 3"},
          ],
        },
      }
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
      }
    }
    case "duplicated-section": {
      return {
        key: id,
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
          schema: {
            type: "object",
            properties: {},
          },
          options: {
            addBtnText: "Add element",
            showDivider: false,
            ordinalNumberInModel: false,
          },
          editable: true,
          showElements: true,
        },
        options: {
          fieldProps: style.inputStyle,
          buttonProps: style.buttonStyle
        }
      }
    }
    case "dictionary":
    case "combobox": {
      return {
        ...schemaElement,
        source: {
          url: "",
          title: "label",
          value: "id",
        }
      }
    }
    case "user-input":
      return {
        ...schemaElement,
        source: {
          url: "" // TODO - przerobić kontrolkę po stronie vueShared
        }
      }
    case "number-field":
      return {
        ...schemaElement,
        type: "int"
      }
  }
}


function cloneStatic(item: ElementDrawerFromElement) {
  const id = generateKey(item.component)

  switch (item.component) {
    case "static-content": {
      return {
        key: id,
        content: "Change it",
        layout: {
          component: item.component,
          tag: item.tag,
          cols: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
            xxl: 12
          },
        }
      }
    }
    case "data-viewer": {
      return {
        key: id,
        label: "Item-" + id,
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
        }
      }
    }
    case "button": {
      return {
        key: id,
        label: "Click me",
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
        },
        options: {
          buttonProps: style.buttonStyle
        }
      }
    }
    case "divider": {
      return  {
        key: id,
        layout: {
          component: "divider",
          cols: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
            xxl: 12
          },
        },
      }
    }

  }
}

function generateKey(name: string): string {
  return name.toLowerCase().split(" ").join("-") + "-" + Math.random().toString().substring(2, 5)
}

</script>

<style lang="scss" scoped></style>
<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
