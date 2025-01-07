import React, { useState } from "react";
import Select from "./select";
import { themes, useTheme } from "../_providers/themeProvider";
import { usePreviewOptions } from "../_providers/previewOptionsProvider";
import PanelHeader from "./panel-header";

const themeOptions = [
  ...themes.map((theme) => ({
    label: theme.name,
    value: theme.name,
  })),
  { label: "Custom", value: "custom" },
];

const BaseThemePanel = () => {
  const { baseTheme, onBaseThemeSelect } = useTheme();
  const { resetPreviewOptions } = usePreviewOptions();
  const [isCustomTheme, setIsCustomTheme] = useState(false);
  const [customTheme, setCustomTheme] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleThemeSelect = (themeName?: string) => {
    if (themeName === "custom") {
      setIsCustomTheme(true);
      resetPreviewOptions();
    } else {
      setIsCustomTheme(false);
      onBaseThemeSelect(themeName);
      resetPreviewOptions();
    }
  };

  const handleCustomThemeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCustomTheme(event.target.value);
    setError(null);
  };

  const applyCustomTheme = () => {
    try {
      console.log("trying to apply custom theme");
      const parsedTheme = new Function(`return (${customTheme.trim()});`)();

      if (typeof parsedTheme !== "object" || Array.isArray(parsedTheme)) {
        console.log("Invalid theme structure. Must be an object.");
        throw new Error("Invalid theme structure. Must be an object.");
      }
      console.log("parsedTheme", parsedTheme);
      onBaseThemeSelect("custom", parsedTheme);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(
        "Invalid JavaScript object. Please check your theme configuration.",
      );
    }
  };

  return (
    <>
      <PanelHeader
        title="Base Theme"
        description="Select a theme to begin customizing."
      />
      <Select
        id="theme-select"
        value={isCustomTheme ? "custom" : baseTheme?.name || ""}
        onChange={handleThemeSelect}
        options={themeOptions}
        label="Theme"
      />
      {isCustomTheme && (
        <div className="mt-4">
          <label
            htmlFor="custom-theme"
            className="block text-sm font-bold mb-2"
          >
            Custom Theme Object
          </label>
          <textarea
            id="custom-theme"
            value={customTheme}
            onChange={handleCustomThemeChange}
            className="w-full h-40 p-2 border rounded resize-none"
            placeholder="Paste your custom theme object here"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            onClick={applyCustomTheme}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Apply Custom Theme
          </button>
        </div>
      )}
    </>
  );
};

export default BaseThemePanel;
