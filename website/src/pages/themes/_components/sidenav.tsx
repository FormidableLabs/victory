import {
  AdjustmentsVerticalIcon,
  CircleStackIcon,
  GlobeAmericasIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import { globalOptionsConfig, paletteOptionsConfig } from "../_config";

type NavItem = {
  title: string;
  description?: string;
  icon: React.ElementType;
  config?: any;
  panelType?: "base" | "global" | "overrides";
};

type SideNavProps = {
  activeItem: NavItem;
  onItemSelect: (item: NavItem) => void;
  isBaseThemeSelected: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { title: "Base Theme", icon: CircleStackIcon, panelType: "base" },
  {
    title: "Color Palette",
    icon: SwatchIcon,
    config: paletteOptionsConfig,
    panelType: "global",
  },
  {
    title: "Global Options",
    icon: GlobeAmericasIcon,
    config: globalOptionsConfig,
    panelType: "global",
  },
  {
    title: "Axes",
    icon: AdjustmentsVerticalIcon,
  },
  {
    title: "Charts",
    icon: AdjustmentsVerticalIcon,
  },
];

const SideNav = ({
  activeItem,
  onItemSelect,
  isBaseThemeSelected,
}: SideNavProps) => {
  return (
    <aside className="sticky top-[60px] h-theme-builder w-32 overflow-y-auto bg-black py-4">
      <div className="w-full flex-1 space-y-1 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = item.title === activeItem.title;
          const isDisabled =
            item.title !== "Base Theme" && !isBaseThemeSelected;
          return (
            <button
              key={item.title}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onItemSelect(item)}
              disabled={isDisabled}
              className={clsx(
                "group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium cursor-pointer",
                isActive
                  ? "bg-theme-1 text-theme-2"
                  : "bg-transparent text-white hover:text-theme-1 disabled:text-grayscale-800 disabled:cursor-not-allowed",
              )}
            >
              <item.icon
                aria-hidden="true"
                className={clsx(
                  isActive
                    ? "text-theme-2"
                    : "text-white group-hover:text-theme-1 group-disabled:text-grayscale-800",
                  "size-6",
                )}
              />
              <span className="mt-2">{item.title}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default SideNav;
