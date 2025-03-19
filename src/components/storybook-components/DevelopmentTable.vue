<template>
  <div v-if="!loading">
    <VueSchemaFormsBuilder
      v-model="modelValue"
    />
    <PropsViewer
      :json-data="modelValue"
    />
  </div>
  <loading-view v-else/>
</template>

<script lang='ts' setup>
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

<style lang='scss' scoped>

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
