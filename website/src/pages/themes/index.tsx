import React from "react";

import "../../css/custom.css";

import Layout from "@theme/Layout";
import SideNav, { NAV_ITEMS } from "./_components/sidenav";
import BaseThemePanel from "./_components/base-theme-panel";
import GlobalPanel from "./_components/global-panel";
import OverridePanel from "./_components/override-panel";
import { ThemeProvider } from "./_providers/themeProvider";
import Main from "./_components/main";
import { PreviewOptionsProvider } from "./_providers/previewOptionsProvider";

const ThemeBuilder = () => {
  const [activeSidebarItem, setActiveSidebarItem] = React.useState(
    NAV_ITEMS[0],
  );
  const [showExportModal, setShowExportModal] = React.useState(false);

  const handleExportModalOpen = () => {
    window.scrollTo({ top: 0 });
    setShowExportModal(true);
  };

  const handleExportModalClose = () => {
    setShowExportModal(false);
  };

  const panelTitle = activeSidebarItem?.config?.title;
  const panelDescription = activeSidebarItem?.config?.description;

  return (
    <Layout>
      <ThemeProvider>
        <PreviewOptionsProvider>
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
        </PreviewOptionsProvider>
      </ThemeProvider>
    </Layout>
  );
};

export default ThemeBuilder;
