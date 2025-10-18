<template>
  <draggable
    v-model="modelValue"
    :animation="400"
    :empty-insert-threshold="200"
    :force-fallback="true"
    :group="{name: 'controls'}"
    :sort="true"
    class="d-flex flex-wrap v-row draggable-area"
    itemKey="key"
    @change="onChange"
    @end="onDragEnd"
    @start="onDragStart"
  >
    <template #item="{element}">
      <field-wrapper :element="element"/>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from "../../vuedraggable/vuedraggable";
import FieldWrapper from "../builder/FieldWrapper.vue";
import {watch} from "vue";
import {useDragDrop} from "../../../.storybook/components/useDragDrop";

const {onChange, onDragStart, onDragEnd} = useDragDrop();

const modelValue = defineModel<any[]>();

const props = withDefaults(defineProps<{
  emptyInsertThreshold?: number,
  sectionKey?: string | null
}>(), {
  emptyInsertThreshold: 100,
  sectionKey: null
});

watch(() => modelValue.value, () => {
  modelValue.value?.forEach(it => {
    it['sectionKey'] = props.sectionKey;
  });
}, {immediate: true, deep: true});

if (props.sectionKey) {
  watch(() => modelValue.value, (value) => {
    modelValue.value?.forEach(it => {
      it['sectionKey'] = props.sectionKey;
    });
  }, {deep: true});
}
</script>

<style lang="scss" scoped>
.draggable-area {
  min-height: 100px;
  padding: 10px;
  position: relative;
}

:deep(.sortable-ghost) {
  opacity: 1 !important;
  background: none !important;
  border: 1px dashed !important;
  box-sizing: border-box !important;
  margin: 20px 0 !important;
  height: 40px !important; /* większy ghost => łatwiej trafić */
  width: 100% !important;
  position: relative !important;
  display: block !important;
  border-radius: 6px !important;
}

:deep(.sortable-ghost *) {
  display: none !important;
}

:deep(.sortable-chosen-right) {
  opacity: 0.8;
}

:deep(.sortable-drag) {
  opacity: 0.9;
}

:deep(.sortable-fallback) {
  display: none !important;
}
</style>

