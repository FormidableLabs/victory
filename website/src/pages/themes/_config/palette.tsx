import { OptionsPanelConfig } from ".";
import { colorScaleOptions } from "../_const";
import { getNestedColorScaleConfig } from "../_utils";

const paletteOptionsConfig: OptionsPanelConfig = {
  title: "Color Palette",
  description:
    "Select a color palette to apply it to the preview charts, then adjust individual colors in the palette to customize the theme.",
  controls: [
    {
      type: "section",
      label: "Component Defaults",
      controls: [
        {
          type: "accordion",
          label: "VictoryStack",
          controls: getNestedColorScaleConfig("stack"),
        },
        {
          type: "accordion",
          label: "VictoryGroup",
          controls: getNestedColorScaleConfig("group"),
        },
        {
          type: "accordion",
          label: "VictoryPie",
          controls: getNestedColorScaleConfig("pie"),
        },
      ],
    },
    {
      type: "section",
      label: "Color Palettes",
      controls: colorScaleOptions.map((option) => ({
        type: "colorPalette",
        colorScaleType: option.value,
        label: option.label,
        value: option.value,
      })),
    },
  ],
};

export default paletteOptionsConfig;
