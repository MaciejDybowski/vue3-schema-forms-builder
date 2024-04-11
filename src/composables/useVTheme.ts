import {useTheme} from "vuetify";

import {computed} from "vue";
import {themesNames} from "@/main";


export function useVTheme() {
  const vTheme = useTheme()

  const isLightTheme = computed(() => {
    return vTheme.name.value === themesNames.light
  })

  const isDarkTheme = computed(() => {
    return vTheme.name.value === themesNames.dark
  })

  return {
    isLightTheme,
    isDarkTheme
  }
}
