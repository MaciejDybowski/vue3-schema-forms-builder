<template>
  <field-wrapper-toolbar-label
    :elementKey="element.key"
  />


  <field-wrapper-toolbar-btn
    v-if="!element.ref && showCog"
    class="config-field-btn"
    icon="mdi-cog"
    @click="configControl"
  />

  <field-wrapper-toolbar-btn
    v-if="!element.ref && showContentCopy"
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
import {useDrawers} from "@/composables/useDrawers";

import {useBuilderState} from "@/pinia/useBuilderState";
import {computed} from "vue";

const props = defineProps<{
  element: any
}>()

const showContentCopy = computed(() => {
  return props.element.layout.component !== 'duplicated-section' && props.element.layout.component !== 'fields-group'
    && props.element.layout.component !== 'expansion-panels';
})

const showCog = computed(() => {
  return props.element.layout.component === 'duplicated-section' || props.element.layout.component === 'fields-group' || props.element.layout.component === 'expansion-panels';
})

const drawers = useDrawers();
const useBuilderStateStore = useBuilderState()

function configControl() {
  useBuilderStateStore.setConfiguredField(props.element)
  drawers.propertiesDrawer.value = true
}


async function deleteControl() {
  useBuilderStateStore.deleteItem({key: props.element.key, sectionKey: props.element.sectionKey})
  useBuilderStateStore.setConfiguredField(null)
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
