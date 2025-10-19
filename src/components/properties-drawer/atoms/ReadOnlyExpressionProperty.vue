<template>
  <div>
    <text-property-wrapper
      v-model="model"
      :grow-enabled="false"
      :label="t('readonlyExpression')"
      :rows="3"
    >
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
            <span>{{ t('readonlyExpressionInfo') }}</span>
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
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import {ref} from "vue";
import {useStyle} from "@/main";

const {t} = useI18n();
const model = defineModel();
const style = useStyle();

const showAdvancedDialog = ref(false);
const modelInDialog = ref<any>(null);

function openAdvancedDialog() {
  modelInDialog.value = model.value;
  showAdvancedDialog.value = true;
}

function cancel() {
  showAdvancedDialog.value = false;
}

function save() {
  model.value = modelInDialog.value;
  showAdvancedDialog.value = false;
}
</script>

<style lang="scss" scoped>
.append-inner-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px; /* odstęp między ikonami */
}

.append-inner-column .clickable {
  cursor: pointer;
}
</style>

<i18n lang="json">
{
  "en": {
    "advancedConfiguration": "Advanced configuration",
    "readonlyExpression": "Readonly expression",
    "readonlyExpressionInfo": "You can define a JSONATA expression for the readonly property that controls whether this field is editable. Open the advanced editor for more complex expressions.",
    "save": "Save"
  },
  "pl": {
    "advancedConfiguration": "Konfiguracja zaawansowana",
    "readonlyExpression": "Wyrażenie readonly",
    "readonlyExpressionInfo": "Możesz zdefiniować wyrażenie JSONATA dla właściwości readonly, które kontroluje, czy to pole jest edytowalne. Otwórz zaawansowany edytor dla bardziej złożonych wyrażeń.",
    "save": "Zapisz"
  }
}
</i18n>
