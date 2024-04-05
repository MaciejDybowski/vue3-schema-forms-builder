<template>
  <field-wrapper-toolbar-label
    :elementKey="element.key"
  />

  <field-wrapper-toolbar-btn
    v-if="element.layout.component === 'duplicated-section'"
    icon="mdi-cog"
    class="config-field-btn"
    @click="configControl"
  />

  <field-wrapper-toolbar-btn
    v-if="element.layout.component !== 'duplicated-section'"
    icon="mdi-content-copy"
    class="clone-field-btn"
    @click="cloneControl"
  />

  <field-wrapper-toolbar-btn
    icon="mdi-trash-can-outline"
    class="delete-field-btn"
    @click="deleteControl"
  />
</template>

<script setup lang="ts">

import FieldWrapperToolbarLabel from "@/components/builder/FieldWrapperToolbarLabel.vue";
import FieldWrapperToolbarBtn from "@/components/builder/FieldWrapperToolbarBtn.vue";
import {useDrawers} from "@/composables/useDrawers";

import {useBuilderState} from "@/pinia/stores/useBuilderState";

const props = defineProps<{
  element: any
}>()

const drawers = useDrawers();
const useBuilderStateStore = useBuilderState()

function configControl() {
  useBuilderStateStore.setConfiguredField(props.element)
  drawers.propertiesDrawer.value = true
}


function deleteControl() {
  useBuilderStateStore.deleteItem({key: props.element.key})
}

function cloneControl() {
  useBuilderStateStore.cloneItem({key: props.element.key})
}


</script>

<style scoped lang="scss">
.delete-field-btn {
  position: absolute;
  top: -1.25rem;
  right: -0.05rem;
  font-size: 0.8rem;
  height: 20px;
}

.clone-field-btn {
  position: absolute;
  top: -1.25rem;
  right: 1.5rem;
  font-size: 0.8rem;
  height: 20px;
}

.config-field-btn {
  position: absolute;
  top: -1.25rem;
  right: 1.5rem;
  font-size: 0.8rem;
  height: 20px;
}

</style>
