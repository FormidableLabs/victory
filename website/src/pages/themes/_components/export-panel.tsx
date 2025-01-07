import React, { useMemo } from "react";
import CodeBlock from "./code-block";
import { useTheme } from "../_providers/themeProvider";
import { VictoryTheme } from "victory";
import { Button } from "@site/src/components/button";
import { stringifyWithoutQuotes } from "../_utils";

const generateThemeCode = (config, format: "js" | "ts") => {
  const jsonConfig = stringifyWithoutQuotes(config);
  if (format === "js") {
    return `/** @type {import('victory').VictoryThemeDefinition} */\n\nconst customTheme = ${jsonConfig};\n\nexport default customTheme;`;
  }
  return `import { VictoryThemeDefinition } from 'victory';\n\nconst customTheme: VictoryThemeDefinition = ${jsonConfig};\n\nexport default customTheme;`;
};

const availableOptions = Object.keys(VictoryTheme.clean).map((key) => {
  return {
    label: key,
    value: key,
  };
});

const ExportPanel = () => {
  const { customThemeConfig: config } = useTheme();
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(() =>
    availableOptions.map((option) => option.value),
  );

  const filteredConfig = useMemo(() => {
    if (!config) return {};
    return Object.keys(config).reduce((acc, key) => {
      if (selectedOptions.includes(key)) {
        acc[key] = config[key];
      }
      return acc;
    }, {});
  }, [config, selectedOptions]);

  const blocks = useMemo(
    () => [
      {
        title: "theme.js",
        code: generateThemeCode(filteredConfig, "js"),
        language: "jsx",
      },
      {
        title: "theme.ts",
        code: generateThemeCode(filteredConfig, "ts"),
        language: "tsx",
      },
    ],
    [filteredConfig],
  );

  const handleSelectButtonClick = () => {
    const newOptions =
      selectedOptions.length === availableOptions.length
        ? []
        : availableOptions.map((option) => option.value);
    setSelectedOptions(newOptions);
  };

  const handleCheckboxChange = (value: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(value)) {
        return prev.filter((option) => option !== value);
      }
      return [...prev, value];
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto p-10 w-export-panel">
      <h1 className="text-3xl">
        How to Use Your Exported Victory Theme Config
      </h1>
      <ol className="pl-4 space-y-2">
        <li>
          <strong>Choose Theme Options to Export</strong>
          <p className="mb-2">
            Select the theme options to include in your custom theme export.
          </p>
          <div className="mb-6">
            <ul className="space-y-2 p-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
              {availableOptions.map(({ label, value }) => (
                <li key={value} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id={value}
                    checked={selectedOptions.includes(value)}
                    onChange={() => handleCheckboxChange(value)}
                    className="mr-2"
                  />
                  <label htmlFor={value} className="cursor-pointer">
                    {label}
                  </label>
                </li>
              ))}
            </ul>
            <Button
              onClick={handleSelectButtonClick}
              size="sm"
              className="mt-4"
            >
              {selectedOptions.length === availableOptions.length
                ? "Deselect All"
                : "Select All"}
            </Button>
          </div>
        </li>
        <li>
          <strong>Save the Exported Theme File</strong>
          <p className="mb-2">
            Save your custom generate theme to a file in your project. Use{" "}
            <code>theme.js</code> or <code>theme.ts</code> depending on whether
            your project uses JavaScript or TypeScript.
          </p>
          <CodeBlock blocks={blocks} className="h-[500px]" />
        </li>
        <li>
          <strong>Import the Theme</strong>
          <p className="mb-2">
            To use your custom theme in your application, import the file where
            you saved the theme configuration. The import path should match the
            file&apos;s location in your project directory.
          </p>
          <CodeBlock
            blocks={[
              {
                title: "App.js",
                code: `import customTheme from './theme.js';`,
                language: "jsx",
              },
              {
                title: "App.ts",
                code: `import customTheme from './theme.ts';`,
                language: "tsx",
              },
            ]}
          />
        </li>
        <li>
          <strong>Apply the Theme to Victory Components</strong>
          <p className="mb-2">
            Once the theme is imported, you can apply it to Victory components
            by passing it as the <code>theme</code> prop.
          </p>
          <CodeBlock
            code={`<VictoryChart theme={customTheme}>
  {/* Add your Victory components here */}
</VictoryChart>`}
            language="jsx"
          />
        </li>
      </ol>
    </div>
  );
};

export default ExportPanel;
