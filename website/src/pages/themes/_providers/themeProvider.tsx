import React, { createContext, useCallback, useContext } from "react";
import { VictoryTheme, VictoryThemeDefinition } from "victory";
import { setNestedConfigValue } from "../_utils";
import { useLocalStorage } from "@site/src/hooks/useLocalStorage";

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

const localStorageCustomConfigKey = "customThemeConfig";
const localStorageBaseThemeKey = "baseTheme";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }) => {
  const [baseTheme, setBaseTheme] = useLocalStorage(
    localStorageBaseThemeKey,
    defaultTheme,
  );
  const [customThemeConfig, setCustomThemeConfig] = useLocalStorage(
    localStorageCustomConfigKey,
    defaultTheme.config,
  );

  const onBaseThemeSelect = (themeName?: string) => {
    const theme = themes.find((t) => t.name === themeName);
    if (!theme) {
      setBaseTheme(defaultTheme);
      setCustomThemeConfig(defaultTheme.config);
    } else {
      setBaseTheme(theme);
      if (theme.name !== "Custom") {
        setCustomThemeConfig({ ...theme?.config });
      }
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
    [customThemeConfig, setCustomThemeConfig],
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
