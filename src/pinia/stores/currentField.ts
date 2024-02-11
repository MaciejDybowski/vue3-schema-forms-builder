import { defineStore } from "pinia"



export const currentField = defineStore({
  id: "currentField",
  state: () => ({
    currentField: null as any,
  }),
  getters: {
    getCurrentField(state): () => any {
      return () => state.currentField
    },
    getCurrentFieldKey(state): () => string {
      return () => state.currentField?.key
    },
  },
  actions: {
    setCurrentField(field: any): void {
      this.currentField = field
    },
  },
})
