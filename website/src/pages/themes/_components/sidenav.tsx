import {
  AdjustmentsVerticalIcon,
  CircleStackIcon,
  GlobeAmericasIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import {
  chartOptionsConfig,
  ChartPanelConfig,
  globalOptionsConfig,
  OptionsPanelConfig,
  paletteOptionsConfig,
} from "../_config";
import axisOptionsConfig from "../_config/axis";
import { useTheme } from "../_providers/themeProvider";
import {
  defaultColorScale,
  usePreviewOptions,
} from "../_providers/previewOptionsProvider";
import { TiExportOutline } from "react-icons/ti";
import { AllExamples, ExampleConfig, StackExamples } from "./examples";

type NavItem = {
  title: string;
  icon: React.ElementType;
  content: ExampleConfig[];
} & (
  | {
      panelType: "theme" | "export";
    }
  | {
      panelType: "default";
      config: OptionsPanelConfig;
    }
  | {
      panelType: "chart";
      config: ChartPanelConfig;
    }
);

type SideNavProps = {
  activeItem: NavItem;
  onItemSelect: (item: NavItem) => void;
};

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Base Theme",
    icon: CircleStackIcon,
    panelType: "theme",
    content: AllExamples,
  },
  {
    title: "Color Palette",
    icon: SwatchIcon,
    config: paletteOptionsConfig,
    panelType: "default",
    content: StackExamples,
  },
  {
    title: "Global Options",
    icon: GlobeAmericasIcon,
    config: globalOptionsConfig,
    panelType: "default",
    content: AllExamples,
  },
  {
    title: "Axis Options",
    icon: AdjustmentsVerticalIcon,
    config: axisOptionsConfig,
    panelType: "chart",
    content: [],
  },
  {
    title: "Chart Options",
    icon: AdjustmentsVerticalIcon,
    config: chartOptionsConfig,
    panelType: "chart",
    content: [],
  },
];

const exportItem: NavItem = {
  title: "Export",
  icon: TiExportOutline,
  panelType: "export",
  content: [],
};

const SideNav = ({ activeItem, onItemSelect }: SideNavProps) => {
  const { baseTheme } = useTheme();
  const { setExampleContent, updateColorScale } = usePreviewOptions();
  const isBaseThemeSelected = !!baseTheme;

  const handleItemSelect = (item: NavItem) => {
    onItemSelect(item);
    updateColorScale(defaultColorScale);
    setExampleContent(item.content);
  };

  const isExportItemActive = activeItem.title === exportItem.title;

  return (
    <aside className="sticky top-[60px] h-theme-builder w-[100px] overflow-y-auto bg-black py-4 flex-none flex flex-col justify-between px-2">
      <div className="w-full space-y-1 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = item.title === activeItem.title;
          const isDisabled =
            item.title !== "Base Theme" && !isBaseThemeSelected;
          return (
            <button
              key={item.title}
              aria-current={isActive ? "page" : undefined}
              onClick={() => handleItemSelect(item)}
              disabled={isDisabled}
              className={clsx(
                "group flex w-full flex-col items-center rounded-md p-3 text-xs font-bold cursor-pointer bg-transparent",
                isActive
                  ? "text-orange-100"
                  : "text-grayscale-300 hover:text-white disabled:text-grayscale-800 disabled:cursor-not-allowed",
              )}
            >
              <item.icon
                aria-hidden="true"
                className={clsx(
                  isActive
                    ? "text-orange-100"
                    : "text-grayscale-300 group-hover:text-white group-disabled:text-grayscale-800",
                  "size-6",
                )}
              />
              <span className="mt-2">{item.title}</span>
            </button>
          );
        })}
      </div>
      <button
        aria-current={isExportItemActive ? "page" : undefined}
        onClick={() => handleItemSelect(exportItem)}
        disabled={!isBaseThemeSelected}
        className={clsx(
          "group flex w-full flex-col items-center rounded-md p-3 text-xs font-bold cursor-pointer text-theme-2 hover:underline disabled:bg-grayscale-400 disabled:text-grayscale-800 disabled:cursor-not-allowed",
          isExportItemActive
            ? "bg-theme-1/100"
            : "bg-theme-1/80 hover:bg-theme-1/100",
        )}
      >
        <exportItem.icon
          aria-hidden="true"
          className={"size-6 text-theme-2 group-disabled:text-grayscale-800"}
        />
        <span className="mt-2">{exportItem.title}</span>
      </button>
    </aside>
  );
};

export default SideNav;
