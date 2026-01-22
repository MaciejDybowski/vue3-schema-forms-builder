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
        <select-general
          v-model="model.contentType"
          :clearable="false"
          :items="[
            { value: 'html', title: t('htmlType') },
            { value: 'json', title: t('jsonType') },
          ]"
          :label="t('contentType')"
          :return-object="false"
        />
      </template>

    </general-panel>


    <text-editor-props-panel
      v-model="model"
      :active="panels.includes('textEditorProps')"
    />

    <layout-panel
      v-model="model"
      :active="panels.includes('layout')"
    />

    <logic-panel
      v-model="model"
      :active="panels.includes('logic')"
    />
    <validations-panel
      v-model="model"
      :active="panels.includes('validations')"
    />
    <event-configruation-panel
      :active="panels.includes('events')"
    />
  </v-expansion-panels>
</template>

<script lang="ts" setup>
import {useBuilderState} from "@/pinia/useBuilderState";
import {computed, ref} from "vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import {useI18n} from "vue-i18n";
import ValidationsPanel from "@/components/properties-drawer/panels/ValidationsPanel.vue";
import TextEditorPropsPanel from "@/components/properties-drawer/panels/TextEditorPropsPanel.vue";
import EventConfigruationPanel from "@/components/properties-drawer/panels/EventConfigruationPanel.vue";

;

const panels = ref<string[]>(["general", "layout"])
const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const {t} = useI18n()
</script>


<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "contentType": "Content saved type",
    "htmlType": "HTML",
    "jsonType": "JSON"
  },
  "pl": {
    "contentType": "Typ zapisywanej treści",
    "htmlType": "HTML",
    "jsonType": "JSON"
  }
}
</i18n>
