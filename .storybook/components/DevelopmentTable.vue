<template>
  <div v-if="!loading">
    <VueSchemaFormsBuilder
      v-model="modelValue"
    />
    <PropsViewer
      :draggable="useBuilderStateStore.getDraggableModel"
      :json-data="modelValue"
    />

  </div>
  <loading-view v-else/>
</template>

<script lang='ts' setup>
import {onBeforeMount, ref} from 'vue';
import {fetchToken} from "../keycloak_auth";
import LoadingView from "./LoadingView.vue";
import VueSchemaFormsBuilder from "@/components/VueSchemaFormsBuilder.vue";
import PropsViewer from "./PropsViewer.vue";
import {FormSchema} from "@/models/FormSchema";
import {useBuilderState} from "@/pinia/useBuilderState";


const useBuilderStateStore = useBuilderState()

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
