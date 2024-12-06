import { OptionsPanelConfig } from ".";
import { colorScaleOptions } from "../_components/color-scale-options";

const paletteOptionsConfig: OptionsPanelConfig = {
  title: "Color Palette",
  description: "Choose custom colors for each color scale.",
  controls: colorScaleOptions.map((option) => ({
    type: "colorScale",
    colorScaleType: option.value,
    label: option.label,
  })),
};

export default paletteOptionsConfig;
