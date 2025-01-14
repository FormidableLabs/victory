import React from "react";
import { useSideNavContext } from "../_providers/sidenavProvider";
import { ThemePreview } from "./theme-preview";
import BaseThemePanel from "./base-theme-panel";
import ChartPanel from "./chart-panel";
import OptionsPanel from "./options-panel";
import ExportPanel from "./export-panel";
import CodePanel from "./code-panel";

const Main = () => {
  const { activeSideNavItem } = useSideNavContext();

  const isExportPanel = activeSideNavItem.panelType === "export";

  if (isExportPanel) return <ExportPanel />;

  if (activeSideNavItem.panelType === "code") return <CodePanel />;

  return (
    <>
      <aside className="sticky top-[60px] h-theme-builder p-6 border-r border-grayscale-300 overflow-y-scroll w-[380px] bg-gray-100">
        {activeSideNavItem.panelType === "theme" && <BaseThemePanel />}
        {activeSideNavItem.panelType === "chart" && (
          <ChartPanel config={activeSideNavItem.config} />
        )}
        {activeSideNavItem.panelType === "default" && (
          <OptionsPanel config={activeSideNavItem.config} />
        )}
      </aside>
      <ThemePreview />
    </>
  );
};
export default Main;
