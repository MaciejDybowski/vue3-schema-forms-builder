<template>
  <div v-if="!loading">
    <VueSchemaFormsBuilder
      v-model="modelValue"
    />
    <PropsViewer
      :model="{}"
      :schema="modelValue"
    />
  </div>
  <loading-view v-else/>
</template>

<script setup lang='ts'>
import {onBeforeMount, ref} from 'vue';
import {fetchToken} from "../../../.storybook/keycloak_auth";
import LoadingView from "@/components/storybook-components/LoadingView.vue";
import VueSchemaFormsBuilder from "@/components/VueSchemaFormsBuilder.vue";
import PropsViewer from "@/components/storybook-components/PropsViewer.vue";
import {FormSchema} from "@/models/FormSchema";

const modelValue = defineModel<FormSchema>()

const props = defineProps<{
  workspaceId: string,
}>();

let loading = ref(true)

onBeforeMount(async () => {
  await fetchToken(props.workspaceId)
  loading.value = false
})


</script>

<style scoped lang='scss'>

</style>

<i18n lang='json'>
{
  "en": {
    "test": "EN"
  },
  "pl": {
    "test": "PL"
  }
}
</i18n>
