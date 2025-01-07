import React, { useEffect, useState } from "react";
import Select from "./select";
import { CUSTOM_THEME, themes, useTheme } from "../_providers/themeProvider";
import { usePreviewOptions } from "../_providers/previewOptionsProvider";
import PanelHeader from "./panel-header";
import Editor from "@monaco-editor/react";
import { Button } from "@site/src/components/button";
import { stringifyWithoutQuotes } from "../_utils";

const EDITOR_OPTIONS = {
  minimap: { enabled: false },
  fontSize: 12,
};

const themeOptions = [
  ...themes.map((theme) => ({
    label: theme.name,
    value: theme.name,
  })),
];

const BaseThemePanel = () => {
  const { baseTheme, onBaseThemeSelect, customThemeConfig } = useTheme();
  const { resetPreviewOptions } = usePreviewOptions();
  const [customTheme, setCustomTheme] = useState<string>(() =>
    stringifyWithoutQuotes(customThemeConfig),
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCustomTheme(stringifyWithoutQuotes(customThemeConfig));
  }, [customThemeConfig]);

  const handleThemeSelect = (themeName?: string) => {
    const theme = themes.find((t) => t.name === themeName);
    if (!theme) return;
    onBaseThemeSelect(theme);
    resetPreviewOptions();
  };

  const handleCustomThemeChange = (value: string | undefined) => {
    setCustomTheme(value || "");
    setError(null);
  };

  const applyCustomTheme = () => {
    try {
      const parsedTheme = new Function(`return (${customTheme.trim()});`)();
      if (typeof parsedTheme !== "object" || Array.isArray(parsedTheme)) {
        throw new Error("Invalid theme structure. Must be an object.");
      }

      onBaseThemeSelect({
        ...CUSTOM_THEME,
        config: parsedTheme,
      });
      setError(null);
    } catch {
      setError(
        "Invalid JavaScript object. Please check your theme configuration.",
      );
    }
  };

  const handleEditorMount = (_, monaco) => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: false,
      enableSchemaRequest: false,
      schemas: [],
    });
  };

  const isCustomTheme = baseTheme?.name === CUSTOM_THEME.name;

  return (
    <div className="flex flex-col h-full">
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
      {isCustomTheme && (
        <div className="mt-4 flex-1 flex flex-col justify-start">
          <p className="text-sm text-grayscale-400 mb-2">
            Extend the theme object below to apply your own theme configuration.
          </p>
          <div className="w-full flex-1 border rounded">
            <Editor
              height="100%"
              defaultLanguage="json"
              theme="vs-dark"
              value={customTheme}
              onChange={handleCustomThemeChange}
              onMount={handleEditorMount}
              options={EDITOR_OPTIONS}
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button onClick={applyCustomTheme} className="mt-4">
            Apply Custom Theme
          </Button>
        </div>
      )}
    </div>
  );
};

export default BaseThemePanel;
