<template>
  <v-list-item>
    <v-combobox
      v-model="internalValue"
      :items="internalItems"
      :label="props.label"
      class="pt-2"
      clearable
      :return-object="false"
      v-bind="{ ...style.inputStyle.value, ...attrs }"
      v-on="attrs"
      @update:model-value="onInput"
    >
      <template #item="{ props, item }">
        <v-list-item
          v-bind="props"
          :title="item.title || item.value"
        />
      </template>

      <template #selection="{ item }">
        <div class="d-flex flex-column">
          <span>{{ item.title || item.value }}</span>
        </div>
      </template>
    </v-combobox>
  </v-list-item>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import { useStyle } from "@/main";
import { useAttrs } from "vue";

// Props
const props = defineProps<{
  label: string;
  items: Array<{ value: string; title?: string; subtitle?: string }>;
}>();

const attrs = useAttrs();
const style = useStyle();

// Lokalny model, żeby modyfikować listę dynamicznie
const internalValue = ref("");
const internalItems = reactive([...props.items]);

// Synchronizacja z v-model z zewnątrz
const modelValue = defineModel<string>();

watch(internalValue, (val) => {
  modelValue.value = val;
});

// Funkcja dodająca nowe wpisy
function onInput(value: string) {
  if (value && !internalItems.find(i => i.value === value)) {
    internalItems.push({ value, title: value });
  }
  internalValue.value = value;
}
</script>

<style lang="scss" scoped>
.v-list-item {
  min-height: 44px;
}

.text-caption {
  line-height: 1.2;
}
</style>
