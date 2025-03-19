<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center">
          <span class="v-card-title ml-0 pl-0">JSON</span>
          <div>
            <v-btn
              density="compact"
              icon="mdi-content-copy"
              variant="text"
              @click="copy(jsonData)"
            />
          </div>
        </div>
        <vue-json-pretty :data="jsonData"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

const props = defineProps<{
  jsonData: any
}>();

function copy(val: any) {
  navigator.clipboard.writeText(JSON.stringify(val));
}
</script>

<style lang="scss" scoped></style>
