<template>
  <v-expansion-panels
    v-model="panels"
    elevation="0"
    multiple
  >

    <general-panel
      v-model="model"
      :active="panels.includes('general')"
    >
      <template #afterKey>
        <label-property v-model="model"/>

        <select-general
          v-model="model.mode"
          :items="[
            { value: 'action', title: t('modeAction') },
            { value: 'copy', title: t('modeCopy') },
            { value: 'form-and-action', title: t('modeFormAndAction') },
            { value: 'api-call', title: t('modeApiCall') }
          ]"
          :label="t('buttonMode')"
          :return-object="false"
          clearable
        />

        <v-btn
          :text="t('configuration')"
          append-icon="mdi-cog"
          class="mx-4 my-4"
          color="primary"
          size="small"
          @click="configButtonDialog = true"
        />

        <tcn-au-dialog
          v-if="configButtonDialog"
          v-model="configButtonDialog"
          :acceptText="t('save')"
          scrollable
          width="800px"
          @acceptButton="configButtonDialog = false"
          @closeButton="configButtonDialog = false"
        >
          <v-card class="mx-4 my-2" elevation="0">
            <v-card-title>{{ t('buttonConfiguration') }}</v-card-title>
            <v-card-text>
              <tcn-code-editor
                :model-value="JSON.stringify(model.config, null, 2)"
                height="300px"
                language="json"
                @update:model-value="value => tryParseAsJsonButtonConfig(value)"
              />
            </v-card-text>
          </v-card>
        </tcn-au-dialog>

        <v-btn
          v-if="model.mode === 'form-and-action'"
          :text="t('dialogSchema')"
          append-icon="mdi-cog"
          class="mx-4 my-4"
          @click="configButtonDialogSchema = true"
        />

        <tcn-au-dialog
          v-if="configButtonDialogSchema"
          v-model="configButtonDialogSchema"
          :acceptText="t('save')"
          scrollable
          width="800px"
          @acceptButton="configButtonDialogSchema = false"
          @closeButton="configButtonDialogSchema = false"
        >
          <v-card class="mx-4 my-2" elevation="0">
            <v-card-title>{{ t('internalJsonSchema') }}</v-card-title>
            <v-card-text>
              <tcn-code-editor
                :model-value="JSON.stringify(model.schema, null, 2)"
                height="300px"
                language="json"
                @update:model-value="value => tryParseAsButtonSchema(value)"
              />
            </v-card-text>
          </v-card>
        </tcn-au-dialog>
      </template>
    </general-panel>

    <layout-panel
      v-model="model"
      :active="panels.includes('layout')"
    />

    <logic-panel
      v-model="model"
      :active="panels.includes('logic')"
    />
  </v-expansion-panels>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useBuilderState} from "@/pinia/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";

const {t} = useI18n({ useScope: 'global' });

const panels = ref<string[]>(["general"]);
const useBuilderStateStore = useBuilderState();

const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField;
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val);
  }
});

const configButtonDialog = ref(false);
const configButtonDialogSchema = ref(false);

function tryParseAsJsonButtonConfig(value: string) {
  try {
    const temp = JSON.parse(value);
    // @ts-ignore
    model.value.config = temp;
  } catch (e) {
    console.warn("Parsing error");
  }
}

function tryParseAsButtonSchema(value: string) {
  try {
    const temp = JSON.parse(value);
    // @ts-ignore
    model.value.schema = temp;
  } catch (e) {
    console.warn("Parsing error");
  }
}
</script>

<style lang="scss" scoped></style>
