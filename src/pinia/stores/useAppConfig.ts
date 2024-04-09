import {CanvasMode, MainCanvasMode} from "@/models/CanvasMode";
import {defineStore} from "pinia";

export const useAppConfig = defineStore({
  id: "useAppConfig",
  state: () => ({
    elementsDrawer: true,
    propertiesDrawer: false,
    canvasMode: "DESKTOP" as CanvasMode,
    mainCanvasMode: "BUILDER" as MainCanvasMode
  }),
  getters: {
    getElementsDrawer: (state) => state.elementsDrawer,
    getPropertiesDrawer: (state) => state.propertiesDrawer,
    getCanvasMode: (state) => state.canvasMode,
    getMainCanvasMode: (state) => state.mainCanvasMode,
  },
  actions: {
    setElementsDrawer(state: boolean) {
      this.elementsDrawer = state;
    },
    setPropertiesDrawer(state: boolean) {
      this.propertiesDrawer = state;
    },
    setCanvasMode(mode: CanvasMode) {
      this.canvasMode = mode;
    },
    setMainCanvasMode(mode: MainCanvasMode) {
      this.mainCanvasMode = mode;
    },
  },
});
