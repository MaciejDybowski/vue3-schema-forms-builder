<template>
  <expansion-panel
    :active="active"
    :title="t('textEditorProps.title')"
    value="textEditorProps"
  >
    <v-list-item class="mb-0 pb-0">
      <span>
      {{ t('textEditorProps.limitFeatures') }}
    </span>
    </v-list-item>

    <v-list-item
      v-for="feature in features"
      :key="feature"
    >
      <v-checkbox
        v-model="model.editorFeatures"
        :label="t(feature)"
        :value="feature"
        density="compact"
        hide-details
      />
    </v-list-item>
  </expansion-panel>
</template>

<script lang="ts" setup>
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import {onMounted} from "vue";


const {t} = useBuilderLocale();

defineProps<{
  active: boolean;
}>();

const model = defineModel<any>()


const features = [
  'bold',
  'italic',
  'strike',
  'heading1',
  'heading2',
  'heading3',
  'bulletList',
  'orderedList',
  'code',
  'blockquote',
  'insertTable',
  'addColumnBefore',
  'addColumnAfter',
  'addRowBefore',
  'addRowAfter',
  'deleteRow',
  'deleteColumn',
  'deleteTable',
  'source',
] as const;

onMounted(() => {
  if (!model.value.editorFeatures) {
    model.value.editorFeatures = [];
  }
})
</script>
