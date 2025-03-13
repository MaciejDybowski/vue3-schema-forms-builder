<template>
  <field-wrapper-toolbar-label
    :elementKey="element.key"
  />


  <field-wrapper-toolbar-btn
    v-if="!element.ref && ( element .layout.component === 'duplicated-section' || element.layout.component === 'fields-group')"
    class="config-field-btn"
    icon="mdi-cog"
    @click="configControl"
  />

  <field-wrapper-toolbar-btn
    v-if="!element.ref && (element.layout.component !== 'duplicated-section' && element.layout.component !== 'fields-group')"
    class="clone-field-btn"
    icon="mdi-content-copy"
    @click="cloneControl"
  />

  <field-wrapper-toolbar-btn
    class="delete-field-btn"
    icon="mdi-trash-can-outline"
    @click="deleteControl"
  />
</template>

<script lang="ts" setup>

import FieldWrapperToolbarLabel from "./FieldWrapperToolbarLabel.vue";
import FieldWrapperToolbarBtn from "./FieldWrapperToolbarBtn.vue";
import {useDrawers} from "../../composables/useDrawers";

import {useBuilderState} from "../../pinia/stores/useBuilderState";

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
  useBuilderStateStore.deleteItem({key: props.element.key, sectionKey: props.element.sectionKey})
  useBuilderStateStore.setConfiguredField(null)
  drawers.propertiesDrawer.value = false
}

function cloneControl() {
  useBuilderStateStore.cloneItem({key: props.element.key, sectionKey: props.element.sectionKey})
}


</script>

<style lang="scss" scoped>
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
