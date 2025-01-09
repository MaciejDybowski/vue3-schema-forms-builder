<template>
  <draggable
    :clone="cloneStatic"
    :group="{ name: 'controls', pull: 'clone', put: false }"
    :list="filteredStaticContent"
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
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
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
    icon: "mdi-alert-box-outline",
    label: "Alert",
    component: "static-content",
    tag: "v-alert",
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
          props: {},
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
      return {
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



<style scoped lang="scss">

</style>
