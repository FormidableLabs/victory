import React, { createContext, useCallback, useContext } from "react";
import { VictoryTheme, VictoryThemeDefinition } from "victory";
import { setNestedConfigValue } from "../_utils";

export type ThemeOption = {
  name: string;
  config: VictoryThemeDefinition;
};

type ThemeContextType = {
  baseTheme: ThemeOption | undefined;
  onBaseThemeSelect: (themeName?: string) => void;
  customThemeConfig: VictoryThemeDefinition | undefined;
  updateCustomThemeConfig: (path: string | string[], newValue: unknown) => void;
};

export const themes: ThemeOption[] = [
  { name: "Clean", config: VictoryTheme.clean },
  { name: "Material", config: VictoryTheme.material },
  { name: "Grayscale", config: VictoryTheme.grayscale },
];

const defaultTheme = themes[0];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }) => {
  const [baseTheme, setBaseTheme] = React.useState<ThemeOption>(defaultTheme);
  const [customThemeConfig, setCustomThemeConfig] =
    React.useState<VictoryThemeDefinition>(defaultTheme.config);

  const onBaseThemeSelect = (themeName?: string) => {
    const theme = themes.find((t) => t.name === themeName);
    if (!theme) {
      setBaseTheme(defaultTheme);
      setCustomThemeConfig(defaultTheme.config);
    } else {
      setBaseTheme(theme);
      setCustomThemeConfig({ ...theme?.config });
    }
  };

  const updateCustomThemeConfig = useCallback(
    (path: string | string[], newValue: unknown) => {
      if (!customThemeConfig) return;
      const updatedConfig = setNestedConfigValue(
        customThemeConfig,
        path,
        newValue,
      );
      setCustomThemeConfig(updatedConfig);
    },
    [customThemeConfig],
  );

  return (
    <ThemeContext.Provider
      value={{
        baseTheme,
        onBaseThemeSelect,
        customThemeConfig,
        updateCustomThemeConfig,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
