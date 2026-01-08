<template>
  <component :is="wrapperTag">
    <v-textarea
      v-model="modelValue"
      :auto-grow="growEnabled"
      :label="label"
      :prefix="prefix"
      :rows="rows"
      class="pt-2"
      v-bind="{...style.inputStyle.value, ...props, ...attrs}"
    >
      <template #append-inner>
        <slot name="append-inner"/>
        <v-icon
          v-if="props.appendInnerIcon"
          class="ml-2"
          style="cursor: pointer;"
          @click.stop="dialog = true"
        >
          {{ props.appendInnerIcon }}
        </v-icon>
      </template>
    </v-textarea>

    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-title>
          <span>{{ label }}</span>
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="modelValue"
            :label="label"
            :prefix="prefix"
            auto-grow
            class="pb-4"
            rows="5"
            v-bind="{...style.inputStyle.value}"
          />


          <v-textarea
            v-model="dictUrl"
            :label="label"
            :prefix="prefix"
            auto-grow
            rows="5"
            v-bind="{...style.inputStyle.value}"
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
import {useStyle} from "@/main";
import {computed, ref, useAttrs} from "vue";

const modelValue = defineModel();
const style = useStyle();
const props = withDefaults(defineProps<{
  label: string
  rows?: number
  prefix?: string | undefined
  wrapperTag?: string | undefined
  growEnabled?: boolean | undefined
  appendInnerIcon?: string | undefined
}>(), {
  rows: 1,
  prefix: undefined,
  wrapperTag: "v-list-item",
  growEnabled: true,
  appendInnerIcon: undefined,
});

const attrs = useAttrs();
const dialog = ref(false);

/**
 * Enkoduje tekst podobnie jak w narzędziu do URL słownika:
 * - segmenty wewnątrz { } są enkodowane wewnątrz (z zachowaniem []),
 * - segmenty poza { } są całkowicie encodeURIComponent
 */
function encodeWithoutBraces(str: string | null | undefined): string | null {
  if (str == null) return str;
  return str
    .replace(/\{([^}]+)\}/g, (match, group) => {
      const safe = group.replace(/\[/g, "___SAFE_L___").replace(/\]/g, "___SAFE_R___");
      const encoded = encodeURIComponent(safe);
      return "{" + encoded.replace(/___SAFE_L___/g, "[").replace(/___SAFE_R___/g, "]") + "}";
    })
    .replace(/(.*?)(?=\{)|(?<=\})(.*)/g, (segment) => {
      return encodeURIComponent(segment);
    });
}

/**
 * Dekoduje odwrotnie: dzieli na tokeny {..} i pozostałe,
 * dekoduje tokeny poza nawiasami i wnętrze nawiasów przywraca decodeURIComponent
 * z obsługą zachowanych nawiasów kwadratowych.
 */
function decodeWithoutBraces(str: string | null | undefined): string | null {
  if (str == null) return str;
  // dopasuj tokeny: {..} albo fragmenty bez nawiasów
  const tokens = str.match(/\{[^}]*\}|[^{}]+/g) || [];
  return tokens
    .map((token) => {
      if (token.startsWith("{") && token.endsWith("}")) {
        const inner = token.slice(1, -1);
        // we wcześniejszym enkodowaniu [] zamieniane były na zwykne znaki, tutaj przyjmujemy,
        // że decodeURIComponent poprawnie zdekoduje, więc najpierw zastąp placeholdery (jeśli są)
        // a potem decodeURIComponent; w praktyce enkodowanie zapisywało [] bez placeholderów,
        // więc zachowujemy bezpieczną próbę dekodowania.
        const temp = inner.replace(/\[/g, "___SAFE_L___").replace(/\]/g, "___SAFE_R___");
        try {
          const decodedInner = decodeURIComponent(temp);
          return "{" + decodedInner.replace(/___SAFE_L___/g, "[").replace(/___SAFE_R___/g, "]") + "}";
        } catch (e) {
          return token;
        }
      } else {
        try {
          return decodeURIComponent(token);
        } catch (e) {
          return token;
        }
      }
    })
    .join("");// zamień istniejące funkcje na poniższe
}

/**
 * computed z getterem/setter:
 * - getter: dekoduje aktualne modelValue do czytelnego dictUrl
 * - setter: enkoduje wprowadzone dictUrl i ustawia modelValue
 */
const dictUrl = computed<string | null>({
  get() {
    const val = modelValue?.value;
    if (val == null) return null;
    // jeśli modelValue już wygląda jak URL, zdekoduj go
    return decodeWithoutBraces(String(val));
  },
  set(newVal: string | null) {
    if (newVal == null) {
      modelValue.value = newVal as any;
      return;
    }
    const encoded = encodeWithoutBraces(String(newVal));
    modelValue.value = encoded as any;
  }
});
</script>

<style lang="scss" scoped>
</style>
