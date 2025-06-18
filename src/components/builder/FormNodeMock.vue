<template>
  <div :class="[]">
    <component
      :is='`node-${element.layout.component}`'
      v-if="element.layout.component !== 'duplicated-section' && element.layout.component !== 'fields-group'"
      :key="renderKey"
      :class="['disabled-field', calcOffset(element)]"
      :model='{}'
      :schema='preparedElement'
      v-bind="{readonly:true}"
    />

    <div v-if="element.layout.component == 'duplicated-section'">
      <draggable-area
        v-model="element.tempItems"
        :empty-insert-threshold="30"
        :section-key="element.key"
        :style="element.tempItems?.length === 0 ? duplicatedSectionStyle : undefined"
        class="pt-6"
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
        v-model="element.tempItems"
        :empty-insert-threshold="30"
        :section-key="element.key"
        :style="element.tempItems?.length === 0 ? duplicatedSectionStyle : undefined"
        class="pt-6"
      />
    </div>

  </div>
</template>

<script lang="ts" setup>

import DraggableArea from "./DraggableArea.vue";
import {computed, ref, watch} from "vue";
import {useVTheme} from "@/composables/useVTheme";
import {useColSizeMapper} from "@/composables/useColSizeMapper";
import {cloneDeep} from "lodash";
import {useStyle} from "@/main";
import {useOffsetSizeMapper} from "@/composables/useOffsetSizeMapper";


const props = defineProps<{
  element: any
}>()

const style = useStyle()

const preparedElement = computed(() => {
  const temp = cloneDeep(props.element)
  // remove props for mock because engine modify this to null after set to model
  delete temp.defaultValue

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
    return 'min-height:50px; outline: 1px #1b243a solid; background-color:#E1F5FE; border-bottom: 0px'
  } else {
    return 'min-height:50px; outline: 1px #777777 solid; background-color:#a5a5a5; border-bottom: 0px'
  }
})

// Potrzebne do odświezania na żywo podglądu formularza gdy zmienia się propertisy w prawym modelu (szczególne te na podstawie których nic się nie dzieje)
const renderKey = ref(0)
watch(props.element, () => {
  renderKey.value += 1
}, {deep: true})

const {colSize} = useColSizeMapper()
const {offsetSize} = useOffsetSizeMapper()

function calcOffset(element: any) {
  const isOffsetExist = !!element.layout?.offset;
  const offset = isOffsetExist ? offsetSize(element) : 0;
  const cols = colSize(element) as number

  let cssString = '';
  if (isOffsetExist) {
    cssString += `offset-${offset}`;
  }
  return cssString;
}

</script>

<style lang="scss" scoped>
.disabled-field {
  pointer-events: none; /* Disable all pointer events */
}
</style>
