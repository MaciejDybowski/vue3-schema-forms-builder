<template>
  <component :is="props.wrapperTag">
    <v-textarea
      v-model="modelValue"
      :auto-grow="props.growEnabled"
      :label="props.label"
      :prefix="props.prefix"
      :rows="props.rows"
      class="pt-2"
      v-bind="{ ...style.inputStyle.value, ...props, ...attrs }"
    >
      <template #append-inner>
        <slot name="append-inner"/>
        <v-icon
          v-if="props.appendInnerIcon"
          class="ml-2"
          style="cursor: pointer;"
          @click.stop="onAppendIconClick"
        >
          {{ props.appendInnerIcon }}
        </v-icon>
      </template>
    </v-textarea>

    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-title>
          <span>{{ props.label }}</span>
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="modelValue"
            :label="props.label"
            :prefix="props.prefix"
            auto-grow
            rows="10"
            v-bind="{ ...style.inputStyle.value }"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="dialog = false">Zamknij</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </component>
</template>


<script lang="ts" setup>
import {ref, useAttrs} from "vue";
import {useStyle} from "@/main";

const modelValue = defineModel();
const style = useStyle();

const props = withDefaults(
  defineProps<{
    label: string;
    rows?: number;
    prefix?: string | undefined;
    wrapperTag?: string | undefined;
    growEnabled?: boolean | undefined;
    appendInnerIcon?: string | undefined;
  }>(),
  {
    rows: 1,
    prefix: undefined,
    wrapperTag: "v-list-item",
    growEnabled: true,
    appendInnerIcon: undefined,
  }
);

const attrs = useAttrs();
const dialog = ref(false);

function onAppendIconClick() {
  if (props.appendInnerIcon === "mdi-cog") {
    dialog.value = true;
  }
}
</script>

<style lang="scss" scoped>
</style>
