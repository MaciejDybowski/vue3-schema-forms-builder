export function inputStyle(darkTheme = false): any {
  const color = darkTheme ? "white" : "primary";
  return {
    variant: "outlined",
    density: "compact",
    color: color,
    clearIcon: "mdi-close",
    "hide-details": "auto"
    // "item-color": color
  };
}

export function buttonStyle(darkTheme = false): any {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const color = darkTheme ? "white" : "primary";
  return {
    size: "small",
    variant: "elevated",
    rounded: "",
  };
}
