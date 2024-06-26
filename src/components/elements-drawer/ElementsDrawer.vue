<template>
  <v-navigation-drawer
    v-model="drawers.elementsDrawer.value"
    width="300"
    permament
    order="3"
    scrim="transparent"
    class="element-drawer"
    style="top: 65px; height: 100%"

  >
    <v-list>
      <v-list-item density="compact">
        <v-list-item-title>Elementy statyczne</v-list-item-title>
      </v-list-item>
      <draggable
        :list="staticContent"
        :group="{ name: 'controls', pull: 'clone', put: false }"
        item-key="label"
        :clone="cloneStatic"
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
        :list="controls"
        :group="{ name: 'controls', pull: 'clone', put: false }"
        item-key="label"
        :clone="cloneControls"
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
        :list="layoutElements"
        :group="{ name: 'controls', pull: 'clone', put: false }"
        item-key="label"
        :clone="cloneControls"
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

<script setup lang="ts">
import draggable from 'vuedraggable'
import {useDrawers} from "../../composables/useDrawers";
import {ref} from "vue";

const drawers = useDrawers();

const staticContent = ref([
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
    icon: "mdi-read",
    label: "Pole odczytu",
    component: "data-viewer"
  }
])

interface Controls {
  label: string,
  component: "text-field" | "duplicated-section" | "static-content" | "data-viewer" | 'text-area' | 'radio-button'
    | 'checkbox' | "select" | "location" | "date-picker" | "phone" | "address" | "dictionary",
  tag?: string
}

const controls = ref([
  {
    icon: "mdi-format-letter-matches",
    label: "Pole tekstowe",
    component: "text-field"
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
    label: "Pole wyboru (słownik API)",
    component: "dictionary"
  },
  {
    icon: "mdi-calendar-blank",
    label: "Data",
    component: "date-picker"
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
])

const layoutElements = ref([
  {
    icon: "mdi-content-copy",
    label: "Sekcja powielana",
    component: "duplicated-section"
  }
])


function cloneControls(item: Controls) {
  const id = generateKey(item.component)
  const schemaElement = {
    formId: '333',
    key: id,
    label: "Item-" + id,
    layout: {
      cols: 12,
      offset: 0,
      fillRow: false,
      component: item.component,
    },
    on: {
      input: (e: any) => {
      },
    },
  }

  switch (item.component) {
    case "text-field":
    case "text-area":
    case "location":
    case "date-picker":
    case "address":
    case "phone": {
      return schemaElement
    }
    case "checkbox":
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
          cols: 12,
          schema: {
            type: "object",
            properties: {}
          },
        }
      }
    }
    case "dictionary": {
        return  {
          ...schemaElement,
          source: {
            url: "",
            title: "label",
            value: "id",
          }
        }
    }
  }
}


function cloneStatic(item: Controls) {
  const id = generateKey(item.component)

  switch (item.component) {
    case "static-content": {
      return {
        key: id,
        content: "Your text",
        layout: {
          component: item.component,
          tag: item.tag,
          cols: 12,
        }
      }
    }
    case "data-viewer": {
      return {
        key: id,
        label: "Item-" + id,
        layout: {
          component: item.component,
          cols: 12,
        }
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
