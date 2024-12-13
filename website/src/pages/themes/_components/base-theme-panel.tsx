import React from "react";
import Select from "./select";
import { themes, useTheme } from "../_providers/themeProvider";
import { usePreviewOptions } from "../_providers/previewOptionsProvider";
import PanelHeader from "./panel-header";

const themeOptions = [
  { label: "Select a theme", value: "" },
  ...themes.map((theme) => ({
    label: theme.name,
    value: theme.name,
  })),
];

const BaseThemePanel = () => {
  const { baseTheme, onBaseThemeSelect } = useTheme();
  const { resetPreviewOptions } = usePreviewOptions();

  const handleThemeSelect = (themeName?: string) => {
    onBaseThemeSelect(themeName);
    resetPreviewOptions();
  };

  return (
    <>
      <PanelHeader
        title="Base Theme"
        description="Select a theme to begin customizing."
      />
      <Select
        id="theme-select"
        value={baseTheme?.name || ""}
        onChange={handleThemeSelect}
        options={themeOptions}
        label="Theme"
      />
    </>
  );
};
export default BaseThemePanel;
