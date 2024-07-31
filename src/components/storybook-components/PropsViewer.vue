<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <div class="d-flex align-center">
          <span class="v-card-title ml-0 pl-0">JSON Schema</span>
          <div>
            <v-btn
              density="compact"
              icon="mdi-content-copy"
              variant="text"
              @click="copy(schema)"
            />
          </div>
        </div>
        <vue-json-pretty :data="schema"/>
      </v-col>
      <v-col cols="6">
        <div class="d-flex align-center">
          <span class="v-card-title ml-0 pl-0">Model formularza</span>
          <div>
            <v-btn
              density="compact"
              icon="mdi-content-copy"
              variant="text"
              @click="copy(model)"
            />
          </div>
        </div>
        <vue-json-pretty :data="model"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

const props = defineProps({
  schema: {
    type: null,
    required: true,
  },
  model: {
    type: null,
    required: true,
  },
});

function copy(val: any) {
  navigator.clipboard.writeText(JSON.stringify(val));
}
</script>

<style lang="scss" scoped></style>
