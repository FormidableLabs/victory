// jsdom normalizes colors in inline styles (e.g. `#252525` becomes
// `rgb(37, 37, 37)`). Normalize an expected color the same way before
// comparing it with a rendered `style` attribute.
export const toCssColor = (color: string) => {
  const el = document.createElement("div");
  el.style.color = color;
  return el.style.color;
};
