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
            @click.stop="openAdvancedDialog(model)"
          >
            mdi-cog
          </v-icon>

        </div>
      </template>
    </text-property-wrapper>

    <CodeEditorDialog
      v-model="modelInDialog"
      v-model:show="showAdvancedDialog"
      :codemirrorOptions="{}"
      @close="closeDialog"
      @save="() => model = saveContent()"
    />
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import {useCodeEditorDialog} from "@/composables/useCodeEditorDialog";
import CodeEditorDialog from "@/components/properties-drawer/atoms/CodeEditorDialog.vue";

const {t} = useI18n();
const model = defineModel();

const {
  modelInDialog,
  showAdvancedDialog,
  openAdvancedDialog,
  saveContent,
  closeDialog
} = useCodeEditorDialog()

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
    "readonlyExpression": "Readonly field (expression)",
    "readonlyExpressionInfo": "You can define a JSONATA expression for the readonly property that controls whether this field is editable. Open the advanced editor for more complex expressions."
  },
  "pl": {
    "readonlyExpression": "Pole tylko do odczytu (wyrażenie)",
    "readonlyExpressionInfo": "Możesz zdefiniować wyrażenie JSONATA dla właściwości readonly, które kontroluje, czy to pole jest edytowalne. Otwórz zaawansowany edytor dla bardziej złożonych wyrażeń."
  }
}
</i18n>
