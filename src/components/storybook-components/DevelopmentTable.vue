<template>
  <v-container>
    <vue-schema-forms
      v-if="!loading"
      ref='myForm'
      v-model='model'
      :schema='schema'
      :options='options'
      :default-form-actions='showButtons'
      :validation-behaviour="'scroll'"
    >
      <template #formActions>
        <v-row>
          <v-col>
            <v-btn
              color='primary'
              @click='validate'
            >
              Zapisz
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </vue-schema-forms>
    <loading-view v-else/>
  </v-container>
  <!--  <props-viewer-->
  <!--    v-if='showJSONs && !loading'-->
  <!--    :model='model'-->
  <!--    :schema='schema'-->
  <!--  />-->
</template>

<script setup lang='ts'>
import {onBeforeMount, ref} from 'vue';
import {Schema, SchemaOptions} from "vue3-schema-forms/dist/vocabulary/schema";
import {fetchToken} from "../../../.storybook/keycloak_auth";
import LoadingView from "@/components/storybook-components/LoadingView.vue";

const showJSONs = ref(true);

const props = defineProps<{
  schema: Schema;
  model: object;
  options?: SchemaOptions;
  workspaceId: string,
  showButtons: boolean
}>();

let model = ref(props.model);

let myForm = ref();
let loading = ref(true)

async function validate() {
  const valid = await myForm.value.validate("scroll");

}

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
