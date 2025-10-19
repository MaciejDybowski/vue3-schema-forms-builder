<template>
  <text-property-wrapper
    v-model="modelValue"
    :grow-enabled="false"
    :label="t('ifProperty')"
    :rows="3"
  >
    <!-- Ikony w append-inner ustawione pionowo -->
    <template #append-inner>
      <div class="append-inner-column">
        <v-tooltip
          location="left"
          width="280"
        >
          <template #activator="{ props }">
            <v-icon v-bind="props">
              mdi-information-outline
            </v-icon>
          </template>
          <span>{{ t('ifPropertyInfo') }}</span>
        </v-tooltip>

        <v-icon
          class="clickable"
          @click="openAdvancedDialog"
        >
          mdi-cog
        </v-icon>
      </div>
    </template>
  </text-property-wrapper>

  <tcn-au-dialog
    v-if="showAdvancedDialog"
    v-model="showAdvancedDialog"
    :acceptColor="style.primaryWhite.value"
    :acceptText="t('save')"
    persistent
    scrollable
    width="800px"
    @acceptButton="save"
    @closeButton="cancel"
  >
    <template #title>
      <v-card-title>
        {{ t('advancedConfiguration') }}
      </v-card-title>
    </template>
    <v-card-text class="px-0">
      <tcn-code-editor
        v-model="modelInDialog"
        :codemirrorOptions="{}"
        height="300px"
        language="text"
      />
    </v-card-text>
  </tcn-au-dialog>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";
import {ref} from "vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";

const showAdvancedDialog = ref(false);

function openAdvancedDialog() {
  modelInDialog.value = modelValue.value;
  showAdvancedDialog.value = true;
}

const modelValue = defineModel();
const style = useStyle();
const modelInDialog = ref<any>(null);
const {t} = useI18n();

function cancel() {
  showAdvancedDialog.value = false;
}

function save() {
  modelValue.value = modelInDialog.value;
  showAdvancedDialog.value = false;
}
</script>

<style lang="scss" scoped>
.append-inner-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.append-inner-column .clickable {
  cursor: pointer;
}
</style>


<i18n lang="json">
{
  "en": {
    "ifProperty": "Display condition",
    "ifPropertyInfo": "You can define a JSONATA condition that controls the visibility (rendering) of this element or open the advanced editor for more complex expressions.",
    "advancedConfiguration": "Advanced configuration",
    "save": "Save"
  },
  "pl": {
    "ifProperty": "Warunek wyświetlania",
    "ifPropertyInfo": "Możesz zdefiniować warunek JSONATA, który kontroluje widoczność (renderowanie) tego elementu lub otwórz zaawansowany edytor dla bardziej złożonych wyrażeń.",
    "advancedConfiguration": "Konfiguracja zaawansowana",
    "save": "Zapisz"
  }
}
</i18n>
