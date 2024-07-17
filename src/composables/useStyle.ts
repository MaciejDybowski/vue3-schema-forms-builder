import { computed } from "vue";
import { useTheme } from "vuetify";

import { buttonStyle as bs, inputStyle as is } from "@/utils/componentsStyle";

export function useStyle() {
  const theme = useTheme();

  const buttonStyle = computed(() => bs(theme.current.value.dark));
  const inputStyle = computed(() => is(theme.current.value.dark));

  const primaryWhite = computed(() => theme.current.value.dark ? 'white' : 'primary')

  return { buttonStyle, inputStyle, primaryWhite };
}
