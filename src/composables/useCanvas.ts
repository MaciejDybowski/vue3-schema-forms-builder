import { CanvasMode } from "@/models/CanvasMode";
import { useAppConfig } from "@/pinia/stores/useAppConfig";
import { computed } from "vue";

export function useCanvas() {
  const appConfig = useAppConfig();

  const canvasMode = computed({
    get() {
      return appConfig.canvasMode
    },
    set(mode: CanvasMode) {
      appConfig.setCanvasMode(mode)
    },
  });
 
  return { canvasMode };
}
