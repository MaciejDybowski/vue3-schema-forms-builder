<template>
  <expansion-panel
    :active="active"
    :title="t('headers.title')"
    value="headers"
  >
    <draggable
      v-model="headers"
      :emptyInsertThreshold="100"
      :sort="true"
      class="d-flex flex-wrap"
      handle=".draggable-icon"
      item-key="key"
      v-bind="dragOptions"
      @change="updateHeaders"
    >
      <template #item="{ element, index }">
        <div class="draggable-wrapper d-flex align-center justify-center">
          <v-icon class="px-1 mx-0 draggable-icon cursor-grab">mdi-drag-vertical</v-icon>

          <text-property-wrapper
            v-if="typeof element.title === 'string'"
            v-model="element.title"
            :label="t('headers.titleLabel')"
            class="px-1 mx-0"
          />
          <text-property-wrapper
            v-else
            v-model="element.title.$ref"
            :disabled="true"
            :label="t('headers.titleLabel')"
            class="px-1 mx-0"
          />

          <v-btn
            class="mx-1"
            icon="mdi-cog"
            size="x-small"
            @click="configHeader(element)"
          />

          <v-btn
            :disabled="index === 0"
            class="mx-1"
            icon="mdi-delete"
            size="x-small"
            @click="headers = headers.filter((_, i) => i !== index)"
          />
        </div>
      </template>
    </draggable>

    <v-btn
      :text="t('headers.addButton')"
      class="mx-4 my-2"
      color="primary"
      density="compact"
      @click="headers.push({ title: t('headers.defaultTitle'), valueMapping: '' })"
    />

    <!-- Dialog konfiguracji -->
    <tcn-au-dialog
      v-if="configHeaderDialog"
      v-model="configHeaderDialog"
      :acceptColor="style.primaryWhite.value"
      :acceptText="t('headers.save')"
      persistent
      scrollable
      width="800px"
      @acceptButton="closeConfigHeaderDialog"
      @closeButton="closeConfigHeaderDialog"
    >
      <template #title>
        <v-card-title>
          {{ t('headers.configTitle') }}: {{ currentConfiguredHeader?.title?.$ref || currentConfiguredHeader?.title }}
        </v-card-title>
      </template>

      <v-card-text class="px-0">
        <text-property-wrapper
          v-model="dynamicHeaderTitle"
          :label="t('headers.titleLabel')"
          :prefix="currentConfiguredHeader.isReference ? prefix : ''"
        >
          <template #append-inner>
            <v-tooltip location="left" width="300">
              <template #activator="{ props }">
                <v-icon v-bind="props">mdi-information-outline</v-icon>
              </template>
              <span>{{ t('headers.titleInfo') }}</span>
            </v-tooltip>
          </template>
        </text-property-wrapper>

        <boolean-checkbox-property-wrapper
          v-model="currentConfiguredHeader.isReference"
          :label="t('headers.useReference')"
          @change="referenceChangedHeaderTitle"
        >
          <template #append>
            <v-tooltip location="left" width="300">
              <template #activator="{ props }">
                <v-icon v-bind="props">mdi-information-outline</v-icon>
              </template>
              <span>{{ t('headers.useReferenceInfo') }}</span>
            </v-tooltip>
          </template>
        </boolean-checkbox-property-wrapper>


        <text-property-wrapper
          v-model="currentConfiguredHeader.valueMapping"
          :label="t('headers.valueMapping')"
        >
          <template #append-inner>
            <v-tooltip location="left" width="300">
              <template #activator="{ props }">
                <v-icon v-bind="props">mdi-information-outline</v-icon>
              </template>
              <span>{{ t('headers.valueMappingInfo') }}</span>
            </v-tooltip>
          </template>
        </text-property-wrapper>
      </v-card-text>
    </tcn-au-dialog>
  </expansion-panel>
</template>

<script lang="ts" setup>
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import {useI18n} from "vue-i18n";
import {computed, onMounted, ref} from "vue";
import {useStyle} from "@/main";
import {useTranslateInput} from "@/composables/useTranslateInput";
import Draggable from "@/vuedraggable/vuedraggable";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";

const {active} = defineProps<{ active: boolean }>();
const model = defineModel<any>();

const style = useStyle();
const {prefix, toCamelCase} = useTranslateInput();
const {t} = useI18n({ useScope: 'global' });

const dragOptions = {
  animation: 250,
  group: "key-value-list-headers",
  ghostClass: "ghost"
};

const headers = ref<any[]>([]);
const currentConfiguredHeader = ref<any>(null);
const configHeaderDialog = ref(false);

function updateHeaders() {
  model.value.config = headers.value;
}

function configHeader(header: any) {
  currentConfiguredHeader.value = header;
  currentConfiguredHeader.value.isReference = typeof header.title !== "string";
  configHeaderDialog.value = true;
}

function closeConfigHeaderDialog() {
  configHeaderDialog.value = false;
  delete currentConfiguredHeader.value.isReference;
  currentConfiguredHeader.value = null;
}

const dynamicHeaderTitle = computed({
  get: () => {
    const title = currentConfiguredHeader.value?.title;
    if (!title) return "";
    return typeof title === "string" ? title : title.$ref.replace(prefix, "");
  },
  set: (value: string) => {
    if (!currentConfiguredHeader.value) return;
    const val = value?.trim() || "";
    currentConfiguredHeader.value.title = currentConfiguredHeader.value.isReference
      ? {$ref: prefix + val}
      : val;
  }
});

function referenceChangedHeaderTitle() {
  if (!currentConfiguredHeader.value) return;
  if (currentConfiguredHeader.value.isReference) {
    currentConfiguredHeader.value.title = {$ref: prefix + toCamelCase(currentConfiguredHeader.value.title)};
  } else {
    currentConfiguredHeader.value.title = currentConfiguredHeader.value.title.$ref.replace(prefix, "");
  }
}

onMounted(() => {
  headers.value = model.value.config || [];
});
</script>

<style lang="scss" scoped>
.draggable-wrapper {
  width: 100%;
  padding: 4px 0;
}

:deep(.v-expansion-panel-text__wrapper) {
  padding: 8px 2px;
}
</style>
