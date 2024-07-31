import {MainCanvasMode} from "../models/CanvasMode";
import {useAppConfig} from "../pinia/stores/useAppConfig";
import {computed} from "vue";

export function useMainCanvas() {
  const appConfig = useAppConfig();

  const mainCanvasMode = computed({
    get() {
      return appConfig.mainCanvasMode
    },
    set(mode: MainCanvasMode) {
      appConfig.setMainCanvasMode(mode)
    },
  });

  return {mainCanvasMode};
}
