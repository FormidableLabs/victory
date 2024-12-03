import React from "react";
import {
  GlobeAmericasIcon,
  CircleStackIcon,
  SwatchIcon,
  AdjustmentsVerticalIcon,
  ChartPieIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import Layout from "@theme/Layout";
import optionsConfig from "../themes/_config";
import Control from "../themes/_components/control";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "victory";

const section = optionsConfig[1];
const themeConfig = VictoryTheme.clean;
const activeColorScale = "sequential";

const sidebarNavigation = [
  { name: "Base Theme", href: "#", icon: CircleStackIcon, current: false },
  { name: "Color Palette", href: "#", icon: SwatchIcon, current: false },
  { name: "Global", href: "#", icon: GlobeAmericasIcon, current: false },
  {
    name: "Axis Options",
    href: "#",
    icon: AdjustmentsVerticalIcon,
    current: false,
  },
  {
    name: "Chart Options",
    href: "#",
    icon: AdjustmentsVerticalIcon,
    current: true,
  },
];

const tabs = [
  { name: "All Charts", href: "#", current: true },
  { name: "Line Charts", href: "#", current: false },
  { name: "Bar Charts", href: "#", current: false },
  { name: "Area Charts", href: "#", current: false },
  { name: "Pie Charts", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Menu() {
  function updateThemeConfig() {}
  function handleColorScaleChange() {}

  return (
    <Layout>
      <div className="flex flex-row w-full theme-builder">
        <aside className="sticky top-0 h-screen w-32 overflow-y-auto bg-[#242526] py-4">
          <div className="w-full flex-1 space-y-1 px-2">
            {sidebarNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-theme-1 text-theme-2"
                    : "text-white hover:bg-theme-1 hover:text-theme-2",
                  "group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium",
                )}
              >
                <item.icon
                  aria-hidden="true"
                  className={classNames(
                    item.current
                      ? "text-theme-2"
                      : "text-white group-hover:text-theme-2",
                    "size-6",
                  )}
                />
                <span className="mt-2">{item.name}</span>
              </a>
            ))}
          </div>
        </aside>
        <aside className="sticky top-0 h-screen w-[380px] overflow-y-auto p-6 bg-gray-50">
          <h2 className="font-semibold text-theme-2">Chart Options</h2>
          <p className="mt-2 text-sm text-gray-700">
            Adjust the individual settings for each chart type.
          </p>
          <div>
            <label
              htmlFor="location"
              className="hidden text-sm/6 font-medium text-gray-900"
            >
              Chart Type
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="location"
                name="location"
                defaultValue="Canada"
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option>Pie Chart</option>
              </select>
              <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </div>
          </div>
          {section.fields.map((field, i) => {
            return (
              <Control
                key={field.label + i}
                type={field.type}
                field={field}
                themeConfig={themeConfig}
                updateThemeConfig={updateThemeConfig}
                activeColorScale={activeColorScale}
                handleColorScaleChange={handleColorScaleChange}
                className="mb-4"
              />
            );
          })}
        </aside>
        <main className="p-6 flex-1">
          <div className="border-b border-gray-200">
            <div className="md:flex md:items-center md:justify-between">
              <h2 className="font-semibold text-gray-900">Chart Examples</h2>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
