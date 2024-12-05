import React from "react";

import "../../css/custom.css";

import Layout from "@theme/Layout";
import SideNav, { NAV_ITEMS } from "./_components/sidenav";
import BaseThemePanel from "./_components/base-theme-panel";
import GlobalPanel from "./_components/global-panel";
import OverridePanel from "./_components/override-panel";
import { ThemeProvider } from "./_providers/themeProvider";
import Main from "./_components/main";

const ThemeBuilder = () => {
  const [activeSidebarItem, setActiveSidebarItem] = React.useState(
    NAV_ITEMS[0],
  );
  const [selectedExample, setSelectedExample] = React.useState("");

  const handleColorScaleChange = (colorScale?: string) => {
    const newColorScale = colorScale === "" ? undefined : colorScale;
    setActiveColorScale(newColorScale);
  };

  const handleThemeConfigPreviewOpen = () => {
    window.scrollTo({ top: 0 });
    setShowThemeConfigPreview(true);
  };

  const handleThemeConfigPreviewClose = () => {
    setShowThemeConfigPreview(false);
  };

  const panelTitle = activeSidebarItem?.config?.title;
  const panelDescription = activeSidebarItem?.config?.description;

  return (
    <Layout>
      <ThemeProvider>
        <div className="relative flex flex-row flex-wrap items-start justify-start w-full theme-builder">
          <SideNav
            activeItem={activeSidebarItem}
            onItemSelect={setActiveSidebarItem}
          />
          <aside className="sticky top-[60px] h-theme-builder w-[380px] overflow-y-auto p-6 bg-gray-50 border-r border-grayscale-300">
            {activeSidebarItem.panelType === "base" && <BaseThemePanel />}
            {activeSidebarItem.panelType === "global" && (
              <GlobalPanel
                title={panelTitle}
                description={panelDescription}
                fields={activeSidebarItem?.config?.fields}
              />
            )}
            {activeSidebarItem.panelType === "overrides" && (
              <OverridePanel
                title={panelTitle}
                description={panelDescription}
                optionsConfig={activeSidebarItem?.config}
                selectedOption={selectedExample}
                onSelectionChange={setSelectedExample}
              />
            )}
          </aside>
          <Main />
        </div>
      </ThemeProvider>
    </Layout>
  );
};

export default ThemeBuilder;
