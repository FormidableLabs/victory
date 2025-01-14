import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { CUSTOM_THEME, useTheme } from "../_providers/themeProvider";
import { stringifyWithoutQuotes } from "../_utils";
import { Button } from "@site/src/components/button";

const EDITOR_OPTIONS = {
  minimap: { enabled: false },
  fontSize: 12,
};

const CodePanel = () => {
  const { onBaseThemeSelect, customThemeConfig } = useTheme();
  const [customTheme, setCustomTheme] = useState<string>(() =>
    stringifyWithoutQuotes(customThemeConfig),
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCustomTheme(stringifyWithoutQuotes(customThemeConfig));
  }, [customThemeConfig]);

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

      onBaseThemeSelect(CUSTOM_THEME.name, parsedTheme);
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

  return (
    <div className="max-w-screen-lg mx-auto p-10 w-full-panel flex-1 flex flex-col justify-start">
      <h1 className="text-3xl">Theme Code</h1>
      <p className="text-sm text-grayscale-400 mb-2">
        You can <strong>import your code</strong> by pasting your custom theme
        here or <strong>edit the existing theme</strong> configuration.
      </p>
      <div className="flex justify-between items-center mb-4 gap-4">
        <p className="text-sm bg-yellow-100 text-yellow-800 py-0.5 px-1.5 m-0">
          <code className="align-baseline font-bold bg-transparent">
            `candlestick.style.labels.padding`
          </code>{" "}
          and{" "}
          <code className="align-baseline font-bold bg-transparent">
            `errorbar.borderWidth`
          </code>{" "}
          are required for proper theme functionality.
        </p>
        <Button onClick={applyCustomTheme}>Apply Changes</Button>
      </div>
      <div className="w-full flex-1 border rounded">
        <Editor
          height={650}
          defaultLanguage="json"
          theme="vs-dark"
          value={customTheme}
          onChange={handleCustomThemeChange}
          onMount={handleEditorMount}
          options={EDITOR_OPTIONS}
        />
      </div>
    </div>
  );
};
export default CodePanel;
