import {useTheme} from "vuetify";
import {themesNames} from "@/main";
import {computed} from "vue";

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
