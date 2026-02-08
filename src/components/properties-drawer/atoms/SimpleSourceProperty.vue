<template>


  <boolean-checkbox-property-wrapper
    v-if="field.layout.component === 'select'"
    v-model="modelValue.multiple"
    :label="t('simpleSource.multiple')"
  >

  </boolean-checkbox-property-wrapper>


  <boolean-checkbox-property-wrapper
    v-model="modelValue.returnObject"
    :label="t('simpleSource.returnObject')"
  >
    <template #append>
      <v-tooltip
        :text="t('simpleSource.returnObjectTooltip')"
        location="start"
        width="300"
      >
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props">
            mdi-information-outline
          </v-icon>
        </template>
      </v-tooltip>
    </template>
  </boolean-checkbox-property-wrapper>

  <v-btn
    class="mt-2 mx-2"
    color="primary"
    prepend-icon="mdi-tune"
    size="small"
    width="355px"
    @click="openOptionEditor"
  >
    {{ t("simpleSource.openOptionEditor") }}
  </v-btn>


  <div class="d-flex flex-column ga-2 mt-2 mx-2" style="max-width: 355px">
    <div
      v-for="(item, index) in computedItems"
      :key="index"
      class="option-row py-2 px-1"
    >
      <div class="d-flex justify-space-between align-center mb-1">
        <strong class="option-title">{{ t('simpleSource.option') }} {{ index + 1 }}</strong>


        <!-- Menu akcji -->
        <v-menu location="bottom end" transition="scale-transition">
          <template #activator="{ props }">
            <v-btn density="compact" icon="mdi-dots-vertical" size="small" v-bind="props" variant="text"/>
          </template>
          <v-list density="compact">
            <v-list-item :disabled="index === 0" @click="moveItem(index, index - 1)">
              <template #prepend>
                <v-icon size="small">mdi-chevron-up</v-icon>
              </template>
              <v-list-item-title>{{ t('moveUp') }}</v-list-item-title>
            </v-list-item>
            <v-list-item :disabled="index === computedItems.length - 1" @click="moveItem(index, index + 1)">
              <template #prepend>
                <v-icon size="small">mdi-chevron-down</v-icon>
              </template>
              <v-list-item-title>{{ t('moveDown') }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="deleteOption(item)">
              <template #prepend>
                <v-icon color="error" size="small">mdi-delete-outline</v-icon>
              </template>
              <v-list-item-title class="text-error">{{ t("delete") }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-text-field
        v-model="item.value"
        :label="t('simpleSource.value')"
        class="mb-2"
        density="compact"
        hide-details
        variant="outlined"
        @update:model-value="(val) => parseValue(item, val)"
      />

      <v-text-field
        v-if="typeof item.title === 'string'"
        v-model="item.title"
        :label="t('simpleSource.label')"
        density="compact"
        hide-details
        variant="outlined"
      />
      <v-text-field
        v-else
        v-model="dynamicTitle(item).value"
        :label="t('simpleSource.label')"
        :prefix="isReference(item) ? prefix : undefined"
        class="tiny-label"
        density="compact"
        hide-details
        variant="outlined"
      />

      <v-combobox
        v-if="field.layout.component === 'bookmark'"
        v-model="item.icon"
        :items="mdiIcons"
        :label="t('simpleSource.icon')"
        class="tiny-label mt-2"
        clearable
        density="compact"
        hide-details
        variant="outlined"
      >
        <template #prepend-inner>
          <v-icon v-if="item.icon" size="small">{{ item.icon }}</v-icon>
        </template>
        <template #item="{ props, item: iconItem }">
          <v-list-item v-bind="props">
            <template #prepend>
              <v-icon size="small">{{ iconItem.value }}</v-icon>
            </template>
          </v-list-item>
        </template>
      </v-combobox>
    </div>
  </div>


  <v-btn
    class="mt-2 mx-2"
    color="primary"
    prepend-icon="mdi-plus"
    size="small"
    width="355px"
    @click="addOption"
  >
    {{ t("simpleSource.addButton") }}
  </v-btn>

  <tcn-au-dialog
    v-if="advancedConfigDialog"
    v-model="advancedConfigDialog"
    :acceptColor="style.primaryWhite.value"
    :acceptText="t('save')"
    :cancelText="t('close')"
    persistent
    scrollable
    width="1000px"
    @acceptButton="saveConfigAndClose"
    @cancelButton="cancelConfigAndClose"
  >
    <template #title>
      <v-card-title>{{ t("simpleSource.advancedConfigTitle") }}</v-card-title>
    </template>

    <v-card-text class="px-4 pt-0">
      <v-row dense no-gutters>
        <v-col class="px-0" cols="3">
          <boolean-checkbox-property-wrapper
            v-model="isReferenceForAll"
            :label="t('simpleSource.useReference')"
            class="tiny-label px-0"
            @change="() => handleReferenceChangeForAll()"
          />
        </v-col>
      </v-row>
      <div class="d-flex flex-column">
        <div
          v-for="(item, index) in tempItems"
          :key="index"
          class="pa-1 text-sm"
        >
          <v-row align="center">
            <v-col cols="2">
              <v-text-field
                v-model="item.value"
                :label="t('simpleSource.value')"
                class="tiny-label"
                density="compact"
                hide-details
                variant="outlined"
                @update:model-value="(val) => parseValue(item, val)"
              />
            </v-col>

            <v-col :cols="field.layout.component === 'bookmark' ? 5: 8">
              <v-text-field
                v-if="typeof item.title === 'string'"
                v-model="item.title"
                :label="t('simpleSource.label')"
                class="tiny-label"
                density="compact"
                hide-details
                variant="outlined"
              />
              <v-text-field
                v-else
                v-model="dynamicTitle(item).value"
                :label="t('simpleSource.label')"
                :prefix="isReference(item) ? prefix : undefined"
                class="tiny-label"
                density="compact"
                hide-details
                variant="outlined"
              />
            </v-col>


            <v-col v-if="field.layout.component === 'bookmark'" cols="3">
              <v-combobox
                v-model="item.icon"
                :items="mdiIcons"
                :label="t('simpleSource.icon')"
                clearable
                density="compact"
                hide-details
                variant="outlined"
              >
                <template #selection="{ item }">
                  <v-icon size="small">{{ item.title }}</v-icon>
                </template>
                <template #item="{ props, item: iconItem }">
                  <v-list-item v-bind="props">
                    <template #prepend>
                      <v-icon size="small">{{ iconItem.value }}</v-icon>
                    </template>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>

            <v-col class="d-flex justify-end ga-1" cols="2">
              <v-btn
                :disabled="index === 0"
                icon="mdi-chevron-up"
                size="small"
                variant="text"
                @click="moveItemInDialog(index, index - 1)"
              />
              <v-btn
                :disabled="index === computedItems.length - 1"
                icon="mdi-chevron-down"
                size="small"
                variant="text"
                @click="moveItemInDialog(index, index + 1)"
              />
              <v-btn
                color="error"
                icon="mdi-delete-outline"
                size="small"
                variant="text"
                @click="deleteOptionInDialog(item)"
              />
            </v-col>
          </v-row>

          <div
            v-if="field.layout.component === 'checkbox'"
            class="mt-1"
          >
            <v-card-subtitle
              v-if="!item.disabledCondition"
              class="link cursor-pointer text-primary text-sm pa-0 ma-0"
              @click="item.disabledCondition = 'changeMe'"
            >
              {{ t('simpleSource.addDisabledCondition') }}
            </v-card-subtitle>

            <text-property-wrapper
              v-else
              v-model="item.disabledCondition"
              :label="t('simpleSource.disabledCondition')"
              class="tiny-label pa-0 ma-0"
            />
          </div>
        </div>
      </div>

      <v-btn
        block
        class="mt-4"
        color="primary"
        prepend-icon="mdi-plus"
        size="small"
        @click="addOptionInDialog"
      >
        {{ t('simpleSource.addButton') }}
      </v-btn>
    </v-card-text>


  </tcn-au-dialog>

</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";
import {useBuilderState} from "@/pinia/useBuilderState";
import {useTranslateInput} from "@/composables/useTranslateInput";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";

const {t} = useI18n({ useScope: 'global' });
const style = useStyle();
const {prefix, toCamelCase} = useTranslateInput();
const advancedConfigDialog = ref(false);

const useBuilderStateStore = useBuilderState();
const field = computed({
  get: () => useBuilderStateStore.getConfiguredField,
  set: (val) => useBuilderStateStore.setConfiguredField(val),
});

const modelValue = defineModel<{
  items: Array<any>;
  returnObject: boolean;
  multiple: boolean;
}>({
  default: () => ({
    items: [],
    returnObject: false,
    multiple: false
  }),
});

const computedItems = computed({
  get: () => modelValue.value.items,
  set: (val) => (modelValue.value.items = val),
});

const tempItems = ref<any[]>([]);
const isReferenceForAll = ref(false);

// 🔹 dynamiczne sprawdzenie, czy item ma referencję
function isReference(item: any) {
  return typeof item.title === "object" && !!item.title.$ref;
}

// 🔹 getter/setter dynamiczny dla title
function dynamicTitle(item: any) {
  return computed({
    get: () => {
      if (typeof item.title === "string") {
        return item.title;
      } else if (item.title?.$ref) {
        return item.title.$ref.replace(prefix, "");
      } else {
        return "";
      }
    },
    set: (val: string) => {
      if (isReference(item)) {
        item.title = {$ref: prefix + toCamelCase(val.trim())};
      } else {
        item.title = val;
      }
    },
  });
}

function addOption() {
  modelValue.value.items.push({
    value: "changeMe",
    title: isReferenceForAll.value
      ? {$ref: prefix + toCamelCase("changeMe")}
      : "changeMe",
  });
}

function addOptionInDialog() {
  tempItems.value.push({
    value: "changeMe",
    title: isReferenceForAll.value
      ? {$ref: prefix + toCamelCase("changeMe")}
      : "changeMe",
  });
}

function parseValue(item, val: any) {
  if (val === "true" || val === "false") item.value = val === "true";
  else item.value = val;
}

function moveItem(from: number, to: number) {
  const items = [...computedItems.value];
  const item = items.splice(from, 1)[0];
  items.splice(to, 0, item);
  computedItems.value = items;
}

function moveItemInDialog(from: number, to: number) {
  const items = [...tempItems.value];
  const item = items.splice(from, 1)[0];
  items.splice(to, 0, item);
  tempItems.value = items;
}

function deleteOption(obj: any) {
  computedItems.value = computedItems.value.filter(
    (item) => item.value !== obj.value
  );
}

function deleteOptionInDialog(obj: any) {
  tempItems.value = tempItems.value.filter((item) => item.value !== obj.value);
}

function handleReferenceChangeForAll() {
  tempItems.value.forEach((item) => handleReferenceChange(item, isReferenceForAll.value));
}

function handleReferenceChange(item: any, makeRef: boolean) {
  if (makeRef) {
    if (typeof item.title === "string") {
      item.title = {$ref: prefix + toCamelCase(item.title.trim())};
    }
  } else {
    if (typeof item.title === "object" && item.title?.$ref) {
      item.title = item.title.$ref.replace(prefix, "");
    }
  }
}

function openOptionEditor() {
  tempItems.value = JSON.parse(JSON.stringify(computedItems.value));
  isReferenceForAll.value = tempItems.value.every(isReference);
  advancedConfigDialog.value = true;
}

function saveConfigAndClose() {
  computedItems.value = JSON.parse(JSON.stringify(tempItems.value));
  advancedConfigDialog.value = false;
}

function cancelConfigAndClose() {
  advancedConfigDialog.value = false;
}

const mdiIcons = ref([
  'mdi-home',
  'mdi-account',
  'mdi-star',
  'mdi-heart',
  'mdi-bookmark',
  'mdi-bookmark-outline',
  'mdi-settings',
  'mdi-cog',
  'mdi-bell',
  'mdi-email',
  'mdi-phone',
  'mdi-calendar',
  'mdi-clock',
  'mdi-map-marker',
  'mdi-file',
  'mdi-folder',
  'mdi-image',
  'mdi-video',
  'mdi-music',
  'mdi-cart',
  'mdi-shopping',
  'mdi-credit-card',
  'mdi-wallet',
  'mdi-chart-line',
  'mdi-chart-bar',
  'mdi-database',
  'mdi-server',
  'mdi-cloud',
  'mdi-download',
  'mdi-upload',
  'mdi-share',
  'mdi-link',
  'mdi-paperclip',
  'mdi-printer',
  'mdi-delete',
  'mdi-trash-can',
  'mdi-pencil',
  'mdi-pen',
  'mdi-plus',
  'mdi-minus',
  'mdi-check',
  'mdi-close',
  'mdi-alert',
  'mdi-information',
  'mdi-help',
  'mdi-magnify',
  'mdi-filter',
  'mdi-menu',
  'mdi-dots-vertical',
  'mdi-dots-horizontal',
  'mdi-chevron-up',
  'mdi-chevron-down',
  'mdi-chevron-left',
  'mdi-chevron-right',
  'mdi-arrow-up',
  'mdi-arrow-down',
  'mdi-arrow-left',
  'mdi-arrow-right',
  'mdi-lock',
  'mdi-lock-open',
  'mdi-eye',
  'mdi-eye-off',
  'mdi-thumb-up',
  'mdi-thumb-down',
]);

</script>

<style scoped>
.tiny-label :deep(.v-label) {
  font-size: 0.75rem !important;
  line-height: 1.1 !important;
}

.tiny-label :deep(input),
.tiny-label :deep(textarea) {
  font-size: 0.8rem !important;
}

.text-sm {
  font-size: 0.85rem;
}

.pa-0 {
  padding: 0 !important;
}

.ma-0 {
  margin: 0 !important;
}


.option-title {
  font-size: 0.9rem;
  font-weight: 500;
}

.option-row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  &:last-child {
    border-bottom: none;
  }
}

</style>
