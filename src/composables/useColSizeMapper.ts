import {useCanvas} from "@/composables/useCanvas";
import {SchemaField} from "vue3-schema-forms";

export function useColSizeMapper() {
  const {canvasMode} = useCanvas()

  function colSize(element: SchemaField): number {
    switch (canvasMode.value) {
      case "DESKTOP":
        return element?.layout?.cols.lg || 12
      case "MOBILE":
        return element?.layout?.cols.xs || 12
      case "TABLET":
        return element?.layout?.cols.sm || 12
      default:
        return 12
    }
  }

  return {colSize}
}
