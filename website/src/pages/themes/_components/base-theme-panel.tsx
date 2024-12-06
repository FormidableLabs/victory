import React from "react";
import Select from "./select";
import { themes, useTheme } from "../_providers/themeProvider";
import { usePreviewOptions } from "../_providers/previewOptionsProvider";

const themeOptions = [
  { label: "Select a theme", value: undefined },
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
      <h2 className="mb-0 text-xl font-bold">Customize Your Theme</h2>
      <p className="text-sm mb-4 text-grayscale-400">
        Select a theme to begin customizing.
      </p>
      <Select
        id="theme-select"
        value={baseTheme?.name || ""}
        onChange={handleThemeSelect}
        options={themeOptions}
        label="Base Theme"
      />
    </>
  );
};
export default BaseThemePanel;
