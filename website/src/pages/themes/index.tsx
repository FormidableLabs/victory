import React from "react";

import "../../css/custom.css";

import Layout from "@theme/Layout";
import SideNav from "./_components/sideNav";
import { ThemeProvider } from "./_providers/themeProvider";
import { PreviewOptionsProvider } from "./_providers/previewOptionsProvider";
import { SideNavProvider } from "./_providers/sideNavProvider";
import Main from "./_components/main";
import { AlertProvider } from "./_providers/alertProvider";

const ThemeBuilder = () => {
  return (
    <Layout>
      <ThemeProvider>
        <PreviewOptionsProvider>
          <AlertProvider>
            <SideNavProvider>
              <div className="relative flex flex-row items-start justify-start w-full theme-builder">
                <SideNav />
                <Main />
              </div>
            </SideNavProvider>
          </AlertProvider>
        </PreviewOptionsProvider>
      </ThemeProvider>
    </Layout>
  );
};

export default ThemeBuilder;
