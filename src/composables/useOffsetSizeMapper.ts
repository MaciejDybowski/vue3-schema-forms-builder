import {useCanvas} from "@/composables/useCanvas";


export function useOffsetSizeMapper() {
  const {canvasMode} = useCanvas()

  function offsetSize(element: any): number {
    switch (canvasMode.value) {
      case "DESKTOP":
        return element?.layout?.offset.lg || 0
      case "MOBILE":
        return element?.layout?.offset.xs || 0
      case "TABLET":
        return element?.layout?.offset.sm || 0
      default:
        return 12
    }
  }

  return {offsetSize}
}
