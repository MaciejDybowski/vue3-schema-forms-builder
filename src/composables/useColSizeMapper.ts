import {useCanvas} from "@/composables/useCanvas";
import {SchemaField} from "vue3-schema-forms";

export function useColSizeMapper() {
  const {canvasMode} = useCanvas()

  function colSize(element: SchemaField): number {
    switch (canvasMode.value) {
      case "DESKTOP":
        return element.layout.cols.xxl
      case "MOBILE":
        return element.layout.cols.xs
      case "TABLET":
        return element.layout.cols.md
      default:
        return 12
    }
  }

  return {colSize}
}
