import React from "react";

import {
  ColorScalePropType,
  VictoryThemeDefinition,
  VictoryTooltip,
} from "victory";
import { ExampleConfig } from "../examples";

type Props = {
  config: ExampleConfig;
  theme: VictoryThemeDefinition;
  colorScale: ColorScalePropType;
  showTooltips: boolean;
};

export function Preview({ config, theme, colorScale, showTooltips }: Props) {
  const { content: Content, title } = config;

  return (
    <div className="border border-solid border-gray-200 p-8">
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      {Content({
        labels: ({ datum }) => datum.y || datum.x,
        colorScale: colorScale as ColorScalePropType,
        theme,
        ...(showTooltips && {
          labelComponent: <VictoryTooltip />,
        }),
      })}
    </div>
  );
}
