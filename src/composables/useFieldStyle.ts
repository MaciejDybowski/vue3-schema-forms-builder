export function useFieldStyle() {
  const fieldProps: any/*Partial<VTextField>*/ = {
    density: "compact",
    variant: "outlined",
    hideDetails: "auto",
    color: "primary",
    clearIcon: "mdi-close"
  }

  return {fieldProps};
}
