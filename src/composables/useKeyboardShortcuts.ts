import Shortcuts from "shortcuts";
import { onUnmounted } from "vue";
import { onMounted } from "vue";

export function useKeyboardShortcuts() {
  const shortcuts = new Shortcuts({
    capture: true, // Handle events during the capturing phase
    target: document, // Listening for events on the document object
    shouldHandleEvent(event) {
      return true; // Handle all possible events
    },
  });
  onMounted(() => shortcuts.start());
  onUnmounted(() => {
    shortcuts.stop();
  });
  return { shortcuts };
}
