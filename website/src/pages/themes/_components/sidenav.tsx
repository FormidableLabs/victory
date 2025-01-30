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
import {
  AllExamples,
  ExampleConfig,
  GroupExamples,
  PieExamples,
  StackExamples,
} from "./examples";
import SideNavButton from "./sideNavButton";
import { useSideNavContext } from "../_providers/sideNavProvider";
import { AxisOptionsIcon, ChartOptionsIcon, ExportIcon } from "../_icons";
import { FiGlobe } from "react-icons/fi";
import { LuDatabase } from "react-icons/lu";
import { HiOutlineColorSwatch, HiCode } from "react-icons/hi";

export type NavItem = {
  title: string;
  Icon: React.ElementType;
  content: ExampleConfig[];
} & (
  | {
      panelType: "theme" | "export" | "code";
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

export const baseThemeItem: NavItem = {
  title: "Base Theme",
  Icon: LuDatabase,
  panelType: "theme",
  content: AllExamples,
};

export const colorPaletteItem: NavItem = {
  title: "Color Palette",
  Icon: HiOutlineColorSwatch,
  config: paletteOptionsConfig,
  panelType: "default",
  content: [...StackExamples, ...GroupExamples, ...PieExamples],
};

export const globalOptionsItem: NavItem = {
  title: "Global Options",
  Icon: FiGlobe,
  config: globalOptionsConfig,
  panelType: "default",
  content: AllExamples,
};

export const axisOptionsItem: NavItem = {
  title: "Axis Options",
  Icon: AxisOptionsIcon,
  config: axisOptionsConfig,
  panelType: "chart",
  content: [],
};

export const chartOptionsItem: NavItem = {
  title: "Chart Options",
  Icon: ChartOptionsIcon,
  config: chartOptionsConfig,
  panelType: "chart",
  content: [],
};

export const NAV_ITEMS: NavItem[] = [
  baseThemeItem,
  colorPaletteItem,
  globalOptionsItem,
  axisOptionsItem,
  chartOptionsItem,
];

export const codeItem: NavItem = {
  title: "Theme Code",
  Icon: HiCode,
  panelType: "code",
  content: [],
};

export const exportItem: NavItem = {
  title: "Export Theme",
  Icon: ExportIcon,
  panelType: "export",
  content: [],
};

const SideNav = () => {
  const { baseTheme } = useTheme();
  const { activeSideNavItem, setActiveSideNavItem } = useSideNavContext();
  const { setExampleContent, updateColorScale, setActiveChartType } =
    usePreviewOptions();
  const isBaseThemeSelected = !!baseTheme;

  const handleItemSelect = (item: NavItem) => {
    setActiveChartType(null);
    setActiveSideNavItem(item);
    updateColorScale(defaultColorScale);
    setExampleContent(item.content);
  };

  const isExportItemActive = activeSideNavItem.title === exportItem.title;
  const isCodeItemActive = activeSideNavItem.title === codeItem.title;

  return (
    <aside className="sticky top-[60px] h-theme-builder w-[100px] overflow-y-auto bg-black py-2 flex-none flex flex-col justify-between px-2">
      <div className="w-full space-y-1">
        {NAV_ITEMS.map((item, i) => {
          const isActive = item.title === activeSideNavItem.title;
          const isDisabled =
            item.title !== "Base Theme" && !isBaseThemeSelected;
          return (
            <SideNavButton
              key={item.title + i}
              item={item}
              Icon={item.Icon}
              isActive={isActive}
              isDisabled={isDisabled}
              onClick={() => handleItemSelect(item)}
            />
          );
        })}
      </div>
      <div className="w-full space-y-4">
        <SideNavButton
          item={codeItem}
          Icon={codeItem.Icon}
          isActive={isCodeItemActive}
          onClick={() => handleItemSelect(codeItem)}
        />
        <button
          aria-current={isExportItemActive ? "page" : undefined}
          onClick={() => handleItemSelect(exportItem)}
          disabled={!isBaseThemeSelected}
          className={clsx(
            "group flex w-full flex-col items-center rounded-md p-3 text-xs font-bold cursor-pointer text-theme-2 disabled:bg-grayscale-400 disabled:text-grayscale-800 disabled:cursor-not-allowed",
            isExportItemActive
              ? "bg-theme-1/100"
              : "bg-theme-1/80 hover:bg-theme-1/100",
          )}
        >
          <exportItem.Icon
            aria-hidden="true"
            className={"size-5 group-disabled:text-grayscale-800"}
          />
          <span className="mt-2">{exportItem.title}</span>
        </button>
      </div>
    </aside>
  );
};

export default SideNav;
