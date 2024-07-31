import {useAppConfig} from "../pinia/stores/useAppConfig";
import {computed} from "vue";

export function useDrawers() {
  const appConfig = useAppConfig();

  const elementsDrawer = computed({
    get() {
      return appConfig.getElementsDrawer;
    },
    set(state: boolean) {
      appConfig.setElementsDrawer(state);
    },
  });
  const propertiesDrawer = computed({
    get() {
      return appConfig.getPropertiesDrawer;
    },
    set(state: boolean) {
      appConfig.setPropertiesDrawer(state);
    },
  });
  return {elementsDrawer, propertiesDrawer};
}
