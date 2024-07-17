import {computed} from "vue";

import {buttonStyle as bs, inputStyle as is} from "@/utils/componentsStyle";

export function useStyleDefault() {
  const theme = "light"

  const buttonStyle = computed(() => bs(false));
  const inputStyle = computed(() => is(false));

  const primaryWhite = computed(() => "primary")

  return {buttonStyle, inputStyle, primaryWhite};
}
