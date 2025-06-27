<template>
  <draggable
    :clone="cloneStatic"
    :group="{ name: 'controls', pull: 'clone', put: false }"
    :list="filteredStaticContent"
    item-key="label"
    :sort="false"
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
</template>

<script lang="ts" setup>
import draggable from "../../vuedraggable/vuedraggable";
import {useStyle} from "@/main";
import {ElementDrawerFromElement} from "@/models/ElementDrawerFromElement";
import {computed, ComputedRef, ref, Ref} from "vue";

const style = useStyle()

const props = defineProps<{
  query: string
}>()

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
    icon: "mdi-format-text",
    label: "Zwykły tekst",
    component: "static-content",
    tag: "span",
  },
  {
    icon: "mdi-alert-box-outline",
    label: "Alert",
    component: "alert",
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
  },
  {
    icon: "mdi-list-box-outline",
    label: "Lista klucz-wartość",
    component: "key-value-list"
  }
])

const filteredStaticContent: ComputedRef<ElementDrawerFromElement[]> = computed(() => {
  return staticContent.value.filter((item: ElementDrawerFromElement) => {
    if (props.query) {
      return item.label.toLowerCase().includes(props.query.toLowerCase())
    } else {
      return item
    }
  })
})


function cloneStatic(item: ElementDrawerFromElement) {
  const id = generateKey(item.component)

  const base = {
    layout: {
      tag: item.tag,
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
      props: {},
    },
  }

  switch (item.component) {
    case "alert": {
      return {
        key: id,
        memorable: false,
        content: "Change it",
        layout: base.layout
      }
    }
    case "static-content": {
      return {
        key: id,
        content: "Change it",
        layout: base.layout
      }
    }
    case "data-viewer": {
      return {
        key: id,
        label: "Item-" + id,
        layout: base.layout
      }
    }
    case "button": {
      return {
        key: id,
        label: "Click me",
        layout: base.layout,
        options: {
          buttonProps: style.buttonStyle
        },
        mode: "",
        config: {}
      }
    }
    case "divider": {
      return {
        key: id,
        layout: base.layout
      }
    }
    case "key-value-list": {
      return {
        key: id,
        label: "",
        config: [
          {title: "Key", valueMapping: "Key"},
          {title: "Value", valueMapping: "Value"}
        ],
        layout: base.layout
      }
    }
  }
}

function generateKey(name: string): string {
  return name.toLowerCase().split(" ").join("-") + "-" + Math.random().toString().substring(2, 5)
}


</script>


<style lang="scss" scoped>

</style>
