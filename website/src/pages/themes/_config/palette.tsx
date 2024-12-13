import { OptionsPanelConfig } from ".";
import { colorScaleOptions } from "../_const";

const paletteOptionsConfig: OptionsPanelConfig = {
  title: "Color Palette",
  description:
    "Select a color palette to apply it to the preview charts, then adjust individual colors in the palette to customize the theme.",
  controls: colorScaleOptions.map((option) => ({
    type: "colorPalette",
    colorScaleType: option.value,
    label: option.label,
    value: option.value,
  })),
};

export default paletteOptionsConfig;
