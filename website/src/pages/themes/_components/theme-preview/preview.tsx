import React from "react";

import {
  ColorScalePropType,
  VictoryThemeDefinition,
  VictoryTooltip,
} from "victory";
import { ExampleConfig } from "../examples";
import { useSideNavContext } from "../../_providers/sideNavProvider";
import { axisOptionsItem, chartOptionsItem } from "../sidenav";
import { usePreviewOptions } from "../../_providers/previewOptionsProvider";
import { VictoryComponentType } from "../../_const";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";

type Props = {
  config: ExampleConfig;
  theme: VictoryThemeDefinition;
  colorScale: ColorScalePropType;
  showTooltips: boolean;
};

export function Preview({ config, theme, colorScale, showTooltips }: Props) {
  const { content: Content, title, key } = config;
  const { setActiveChartType } = usePreviewOptions();
  const { setActiveSideNavItem } = useSideNavContext();

  const handleOptionsClick = () => {
    if (
      [
        VictoryComponentType.AXIS,
        VictoryComponentType.POLAR_AXIS,
        VictoryComponentType.POLAR_DEPENDENT_AXIS,
      ].includes(key)
    ) {
      setActiveSideNavItem(axisOptionsItem);
    } else {
      setActiveSideNavItem(chartOptionsItem);
    }
    setActiveChartType(key);
  };

  return (
    <div className="border border-solid border-gray-200 p-8">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold mb-0">{title}</h3>
        <button
          onClick={handleOptionsClick}
          className="bg-transparent border border-gray-200 font-sans cursor-pointer p-1.5 -m-1.5 rounded-md hover:bg-gray-200 flex items-center justify-center "
        >
          Options{" "}
          <AdjustmentsVerticalIcon className="ml-1 h-5 w-5 text-gray-800" />
        </button>
      </div>
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
