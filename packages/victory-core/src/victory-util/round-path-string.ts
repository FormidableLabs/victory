/**
 * Rounds the numeric coordinates in an SVG path `d` string to a fixed number
 * of decimal places.
 *
 * d3-shape can emit values like `252.50000000000003` on one platform/build and
 * `252.5` on another (e.g. server vs. client in a Next.js app), which causes
 * React hydration mismatches because the serialized `d` attribute differs.
 * Rounding every coordinate to `precision` decimals makes the output
 * deterministic across environments while being visually indistinguishable at
 * rendered scale.
 *
 * @example
 * roundPathString("M60,240L252.50000000000003,67.2")
 * // => "M60,240L252.5,67.2"
 */
export function roundPathString(d: string, precision = 3): string {
  return d.replace(
    /(-?\d*\.?\d+(?:[eE][-+]?\d+)?)/g,
    (num) => {
      const parsed = Number(num);
      // Leave integers untouched to keep the string minimal.
      if (Number.isInteger(parsed)) {
        return String(parsed);
      }
      const rounded = parseFloat(parsed.toFixed(precision));
      return String(rounded);
    },
  );
}
