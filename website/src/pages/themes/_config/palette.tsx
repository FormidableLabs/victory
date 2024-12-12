import { OptionsPanelConfig } from ".";
import { colorScaleOptions } from "../_const";

const paletteOptionsConfig: OptionsPanelConfig = {
  title: "Color Palette",
  description: "Choose custom colors for each color scale.",
  controls: colorScaleOptions.map((option) => ({
    type: "colorPalette",
    colorScaleType: option.value,
    label: option.label,
    value: option.value,
  })),
};

export default paletteOptionsConfig;
