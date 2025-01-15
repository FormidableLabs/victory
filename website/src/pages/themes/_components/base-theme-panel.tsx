import React from "react";
import Select from "./select";
import { CUSTOM_THEME, themes, useTheme } from "../_providers/themeProvider";
import { usePreviewOptions } from "../_providers/previewOptionsProvider";
import PanelHeader from "./panel-header";
import Card from "./card";
import { codeItem } from "./sideNav";
import { TiArrowRight } from "react-icons/ti";
import { useSideNavContext } from "../_providers/sideNavProvider";

const themeOptions = themes.map((theme) => ({
  label: theme.name,
  value: theme.name,
}));

const BaseThemePanel = () => {
  const { baseTheme, onBaseThemeSelect } = useTheme();
  const { resetPreviewOptions } = usePreviewOptions();
  const { setActiveSideNavItem } = useSideNavContext();

  const handleThemeSelect = (themeName?: string) => {
    onBaseThemeSelect(themeName);
    resetPreviewOptions();
  };

  const isCustomTheme = baseTheme?.name === CUSTOM_THEME.name;

  return (
    <>
      <PanelHeader
        title="Base Theme"
        description='Select a theme to begin customizing. Choose from pre-defined themes or select "Custom" to import your own theme.'
      />
      <Card>
        <Select
          id="theme-select"
          value={baseTheme?.name || ""}
          onChange={handleThemeSelect}
          options={themeOptions}
          label="Theme"
        />
      </Card>
      {isCustomTheme && (
        <Card className="mt-6">
          <h3 className="text-sm font-bold mb-3">Theme Code</h3>
          <p className="text-sm mb-3">
            Extend the theme object to apply your own theme configuration. Any
            modifications will change the base theme to &quot;Custom&quot;.
          </p>
          <button
            onClick={() => setActiveSideNavItem(codeItem)}
            className="text-blue-600 bg-transparent p-0 m-0 flex items-center cursor-pointer"
          >
            Theme Code <TiArrowRight className="h-4 w-4" />
          </button>
        </Card>
      )}
    </>
  );
};
export default BaseThemePanel;
