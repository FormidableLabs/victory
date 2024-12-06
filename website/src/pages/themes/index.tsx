import React from "react";

import "../../css/custom.css";

import Layout from "@theme/Layout";
import SideNav, { NAV_ITEMS } from "./_components/sidenav";
import BaseThemePanel from "./_components/base-theme-panel";
import OptionsPanel from "./_components/options-panel";
import ChartPanel from "./_components/chart-panel";
import { ThemeProvider } from "./_providers/themeProvider";
import Main from "./_components/main";
import { PreviewOptionsProvider } from "./_providers/previewOptionsProvider";

const getPanel = (activeSidebarItem) => {
  switch (activeSidebarItem.panelType) {
    case "theme":
      return <BaseThemePanel />;
    case "chart":
      return <ChartPanel optionsConfig={activeSidebarItem.config} />;
    default:
      return (
        <OptionsPanel
          title={activeSidebarItem.config.title}
          description={activeSidebarItem.config.description}
          controls={activeSidebarItem.config.controls}
        />
      );
  }
};

const ThemeBuilder = () => {
  const [activeSidebarItem, setActiveSidebarItem] = React.useState(
    NAV_ITEMS[0],
  );

  return (
    <Layout>
      <ThemeProvider>
        <PreviewOptionsProvider>
          <div className="relative flex flex-row flex-wrap items-start justify-start w-full theme-builder">
            <SideNav
              activeItem={activeSidebarItem}
              onItemSelect={setActiveSidebarItem}
            />
            <aside className="sticky top-[60px] h-theme-builder w-[380px] overflow-y-scroll p-6 bg-gray-50 border-r border-grayscale-300">
              {getPanel(activeSidebarItem)}
            </aside>
            <Main />
          </div>
        </PreviewOptionsProvider>
      </ThemeProvider>
    </Layout>
  );
};

export default ThemeBuilder;
