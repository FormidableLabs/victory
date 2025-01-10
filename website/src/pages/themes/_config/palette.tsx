import { OptionsPanelConfig } from ".";
import { colorScaleOptions } from "../_const";
import { getNestedColorScaleConfig } from "../_utils";

const paletteOptionsConfig: OptionsPanelConfig = {
  title: "Color Palette",
  description: "Customize your theme's color palettes.",
  controls: [
    {
      type: "section",
      label: "Defaults",
      description:
        "Set the default color scale for each of the following Victory components.",
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
      label: "Color Scales",
      description: "Customize the theme's predefined color scale palettes.",
      controls: colorScaleOptions.map((option) => ({
        type: "colorPalette",
        label: option.label,
        value: option.value,
        path: `palette.${option.value}`,
      })),
    },
  ],
};

export default paletteOptionsConfig;
