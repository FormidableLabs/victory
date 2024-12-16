import React from "react";

import "../../css/custom.css";

import Layout from "@theme/Layout";
import SideNav, { NAV_ITEMS } from "./_components/sidenav";
import BaseThemePanel from "./_components/base-theme-panel";
import OptionsPanel from "./_components/options-panel";
import ChartPanel from "./_components/chart-panel";
import { ThemeProvider } from "./_providers/themeProvider";
import ThemePreview from "./_components/theme-preview";
import { PreviewOptionsProvider } from "./_providers/previewOptionsProvider";
import ExportPanel from "./_components/export-panel";

const getPanel = ({ panelType, config }) => {
  switch (panelType) {
    case "theme":
      return <BaseThemePanel />;
    case "chart":
      return <ChartPanel config={config} />;
    default:
      return <OptionsPanel config={config} />;
  }
};

const ThemeBuilder = () => {
  const [activeSidebarItem, setActiveSidebarItem] = React.useState(
    NAV_ITEMS[0],
  );

  const isExportPanel = activeSidebarItem.panelType === "export";

  return (
    <Layout>
      <ThemeProvider>
        <PreviewOptionsProvider>
          <div className="relative flex flex-row items-start justify-start w-full theme-builder">
            <SideNav
              activeItem={activeSidebarItem}
              onItemSelect={setActiveSidebarItem}
            />
            {isExportPanel ? (
              <ExportPanel />
            ) : (
              <>
                <aside className="sticky top-[60px] h-theme-builder p-6 border-r border-grayscale-300 overflow-y-scroll w-[380px] bg-gray-50">
                  {getPanel(activeSidebarItem)}
                </aside>
                <ThemePreview />
              </>
            )}
          </div>
        </PreviewOptionsProvider>
      </ThemeProvider>
    </Layout>
  );
};

export default ThemeBuilder;
