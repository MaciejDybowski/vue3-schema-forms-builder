<template>
  <component :is="wrapperTag">
    <v-textarea
      v-model="dictUrl"
      :auto-grow="growEnabled"
      :label="label"
      :prefix="prefix"
      :rows="rows"
      class="pt-2"
      v-bind="textareaBindings"
    >
      <template #append-inner>
        <slot name="append-inner"/>
        <v-icon
          v-if="appendInnerIcon"
          style="cursor: pointer; opacity: 1"
          @click.stop="openDialog"
        >
          {{ appendInnerIcon }}
        </v-icon>
      </template>
    </v-textarea>

    <v-dialog v-model="isDialogOpen" max-width="800">
      <v-card>
        <v-card-title>
          <span>{{ label }}</span>
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="dictUrl"
            :label="label"
            :prefix="prefix"
            auto-grow
            class="pb-4"
            rows="5"
            v-bind="style.inputStyle.value"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="closeDialog">Zamknij</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </component>
</template>

<script lang="ts" setup>
import {useStyle} from "@/main";
import {computed, ref, useAttrs} from "vue";
import {buildEncodedUrl, parseUrlToParams} from "@/components/properties-drawer/atoms/urlSourceInput/AureaURLlParser";

// ============ TYPES ============


interface Props {
  label: string;
  rows?: number;
  prefix?: string;
  wrapperTag?: string;
  growEnabled?: boolean;
  appendInnerIcon?: string;
}

const modelValue = defineModel<string>();

const props = withDefaults(defineProps<Props>(), {
  rows: 1,
  prefix: undefined,
  wrapperTag: "v-list-item",
  growEnabled: true,
  appendInnerIcon: undefined,
});


const style = useStyle();
const attrs = useAttrs();
const isDialogOpen = ref(false);

const textareaBindings = computed(() => ({
  ...style.inputStyle.value,
  ...attrs,
}));

const dictUrl = computed<string | null>({
  get: () => decodeURIComponent(String(modelValue.value ?? "")),
  set: (newVal) => {
    const parsed = parseUrlToParams(String(newVal ?? ""));
    modelValue.value = buildEncodedUrl(newVal+"", parsed);
  },
});

const openDialog = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};
</script>

<style lang="scss" >


</style>
