<template>
  <div>
    <component
      :is='`node-${element.layout.component}`'
      v-if="element.layout.component !== 'duplicated-section'
      && element.layout.component !== 'fields-group'
      && element.layout.component !== 'expansion-panels'
"
      :key="renderKey"
      :class="['disabled-builder-field']"
      :model='{}'
      :schema='preparedElement'
      v-bind="{readonly:true, hide:false}"
    />

    <div v-if="element.layout.component == 'duplicated-section'">
      <draggable-area
        :key="element.tempItems.length"
        v-model="element.tempItems"
        :empty-insert-threshold="100"
        :section-key="element.key"
        :style="element.tempItems?.length === 0 ? duplicatedSectionStyle : undefined"
      />
      <v-divider
        v-if="element.layout.options.showDivider"
        class="mb-2 mx-4"
      />
      <v-btn
        v-if="element.editable && element.showElements"
        :color="color"
        :rounded="true"
        class="mx-4"
        prepend-icon='mdi-plus'
        size="small"
        variant="flat"
      >
        {{ element.layout.options.addBtnText }}
      </v-btn>
    </div>

    <div v-if="element.layout.component == 'fields-group'">
      <draggable-area
        :key="element.tempItems.length"
        v-model="element.tempItems"
        :empty-insert-threshold="100"
        :section-key="element.key"
        :style="element.tempItems?.length === 0 ? duplicatedSectionStyle : undefined"
        class="pt-6"
      />
    </div>

    <div v-if="element.layout.component == 'expansion-panels'">
      <v-expansion-panels
        v-model="activePanels"
        elevation="0"
        flat
        multiple
        variant="accordion"
      >
        <v-expansion-panel
          v-for="(panel, index) in element.panels"
          :key="index"
        >

          <v-expansion-panel-title>
            <v-icon
              v-if="panel.titleIcon"
              :size="panel.titleIconSize ? panel.titleIconSize : 18"
              class="mr-2"
            >
              {{ panel.titleIcon }}
            </v-icon>

            <div
              :class="panel.titleCssDecorator ? [panel.titleCssDecorator] : ''"
              v-html="panel.title"
            />
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <draggable-area
              :key="element.tempItems?.length"
              v-model="panel.tempItems"
              :empty-insert-threshold="100"
              :style="panel.tempItems?.length === 0 ? duplicatedSectionStyle : undefined"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

  </div>
</template>

<script lang="ts" setup>

import DraggableArea from "./DraggableArea.vue";
import {computed, onMounted, ref, watch} from "vue";
import {useVTheme} from "@/composables/useVTheme";
import {cloneDeep} from "lodash";
import {useStyle} from "@/main";


const props = defineProps<{
  element: any
}>()

const style = useStyle()

const activePanels = ref<number[]>([]);

onMounted(() => {
  if (props.element.layout.component === 'expansion-panels') {

    activePanels.value = props.element.panels.map((_, i) => i);
  }
})


const preparedElement = computed(() => {
  const temp = cloneDeep(props.element)
  // remove props for mock because engine modify this to null after set to model
  delete temp.defaultValue
  delete temp.layout.props.hide
  delete temp.layout.props.readonly

  temp.options = {
    ...temp.options,
    fieldProps: style.inputStyle.value,
    buttonProps: style.buttonStyle.value
  }
  temp.on = {
    input: (e: any) => {
    },
  }
  return temp
})

const theme = useVTheme()
const color = theme.isDarkTheme.value ? "white" : "primary";

const duplicatedSectionStyle = computed(() => {
  if (theme.isLightTheme.value) {
    return 'min-height:50px; outline: 1px #1b243a solid; background-color:#E1F5FE; border-bottom: 0px; margin: 0 0'
  } else {
    return 'min-height:50px; outline: 1px #777777 solid; background-color:#a5a5a5; border-bottom: 0px; margin: 0 0'
  }
})

// Potrzebne do odświezania na żywo podglądu formularza gdy zmienia się propertisy w prawym modelu (szczególne te na podstawie których nic się nie dzieje)
const renderKey = ref(0)
watch(props.element, () => {
  renderKey.value += 1
}, {deep: true})


</script>

<style lang="scss">
.disabled-builder-field {
  pointer-events: none; /* Disable all pointer events */
}
</style>

<style lang="scss" scoped>
:deep(.v-expansion-panel) {
  position: relative;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  border-bottom: 1px solid rgba(var(--v-theme-primary), 0.1);

  &:last-child {
    border-bottom: none;
  }

  /* Pasek po lewej dla wszystkich paneli */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background-color: rgba(var(--v-theme-primary), 0.3); // domyślny pasek
    transition: background-color 0.2s ease;
  }

  /* Panel zamknięty */
  &:not(.v-expansion-panel--active) {
    background-color: rgba(var(--v-theme-primary), 0.05);

    &:hover {
      background-color: rgba(var(--v-theme-primary), 0.1);
      cursor: pointer;

      &::before {
        background-color: rgba(var(--v-theme-primary), 0.5); // intensywniejszy pasek przy hover
      }
    }
  }

  /* Panel rozwinięty */
  &.v-expansion-panel--active {
    background-color: transparent; // brak tła dla rozwiniętego panelu
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);

    &::before {
      background-color: rgb(var(--v-theme-primary)); // pełny pasek
    }
  }
}

/* Minimalna wysokość tytułu panelu */
.v-expansion-panel--active > .v-expansion-panel-title:not(.v-expansion-panel-title--static) {
  min-height: 48px;
}

:deep(.v-expansion-panel-title) {
  justify-content: flex-start;
}
</style>
