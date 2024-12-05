import { colorScaleOptions } from "../_components/color-scale-options";

export default {
  title: "Color Palette",
  description: "Choose custom colors for each color scale.",
  fields: colorScaleOptions.map((option) => ({
    type: "colorScale",
    colorScaleType: option.value,
    label: option.label,
  })),
};
