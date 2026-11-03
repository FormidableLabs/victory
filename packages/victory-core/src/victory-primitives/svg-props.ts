// Props that aren't SVG attributes: the primitives' own Victory props, and the
// props `VictoryChart`, `VictoryGroup` and `VictoryStack` inject into every
// child (#3118). `origin` would also conflict with the SVG `origin` attribute.
const NON_SVG_PROPS = [
  "active",
  "animate",
  "categories",
  "colorScale",
  "data",
  "disableInlineStyles",
  "domain",
  "domainPadding",
  "events",
  "horizontal",
  "index",
  "labelComponent",
  "labels",
  "name",
  "origin",
  "padding",
  "polar",
  "range",
  "scale",
  "standalone",
  "stringMap",
  "theme",
  "xOffset",
] as const;
const nonSvgProps = new Set<string>(NON_SVG_PROPS);

/**
 * Drops props that aren't SVG attributes, so primitives can spread the rest
 * onto their element.
 */
export function getSvgProps<T extends object>(
  props: T,
): Omit<T, (typeof NON_SVG_PROPS)[number]> {
  const svgProps = {} as T;
  for (const key in props) {
    if (!nonSvgProps.has(key)) {
      svgProps[key] = props[key];
    }
  }
  return svgProps;
}
