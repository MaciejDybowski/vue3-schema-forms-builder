<template>
  <v-list-item>
    <v-select
      v-model="modelValue"
      :items="attrs.items"
      :label="label"
      class="pt-2"
      clearable
      v-bind="{ ...style.inputStyle.value, ...props, ...attrs }"
      v-on="attrs"
    >
      <template #item="{ props, item }">
        <v-list-item
          :subtitle="item.raw.subtitle"
          :title="item.raw.title"
          v-bind="props"
        />
      </template>

      <template #selection="{ item }">
        <div class="d-flex flex-column">
          <span>{{ item.raw.title }}</span>
          <small
            v-if="item.raw.subtitle"
            class="text-caption text-medium-emphasis"
          >
            {{ item.raw.subtitle }}
          </small>
        </div>
      </template>
    </v-select>
  </v-list-item>
</template>

<script lang="ts" setup>
import {useStyle} from "@/main";
import {useAttrs} from "vue";

const attrs = useAttrs();
const modelValue = defineModel();
const style = useStyle();

const props = defineProps<{
  label: string;
}>();
</script>

<style lang="scss" scoped>
.v-list-item {
  min-height: 44px;
}

.text-caption {
  line-height: 1.2;
}
</style>
