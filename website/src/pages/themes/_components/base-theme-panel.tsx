import React from "react";
import Select from "./select";
import { VictoryTheme, VictoryThemeDefinition } from "victory";

export type ThemeOption = {
  name: string;
  config?: VictoryThemeDefinition;
};

export const themes: ThemeOption[] = [
  { name: "Clean", config: VictoryTheme.clean },
  { name: "Material", config: VictoryTheme.material },
  { name: "Grayscale", config: VictoryTheme.grayscale },
];

const themeOptions = [
  { label: "Select a theme", value: undefined },
  ...themes.map((theme) => ({
    label: theme.name,
    value: theme.name,
  })),
];

const BaseThemePanel = ({ onThemeSelect, baseTheme }) => {
  return (
    <>
      <h2 className="mb-0 text-xl font-bold">Customize Your Theme</h2>
      <p className="text-sm mb-4 text-grayscale-400">
        Select a theme to begin customizing.
      </p>
      <Select
        id="theme-select"
        value={baseTheme?.name || ""}
        onChange={onThemeSelect}
        options={themeOptions}
        label="Base Theme"
      />
    </>
  );
};
export default BaseThemePanel;
