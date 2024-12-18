import React, { useMemo } from "react";
import CodeBlock from "./code-block";
import { useTheme } from "../_providers/themeProvider";

const generateThemeCode = (config, format: "js" | "ts") => {
  const jsonConfig = JSON.stringify(config, null, 2).replace(
    // Remove quotes around keys
    /"([^"]+)":/g,
    "$1:",
  );
  if (format === "js") {
    return `/** @type {import('victory').VictoryThemeDefinition} */\n\nconst customTheme = ${jsonConfig};\n\nexport default customTheme;`;
  }
  return `import { VictoryThemeDefinition } from 'victory';\n\nconst customTheme: VictoryThemeDefinition = ${jsonConfig};\n\nexport default customTheme;`;
};

const ExportPanel = () => {
  const { customThemeConfig: config } = useTheme();

  const blocks = useMemo(
    () => [
      {
        title: "theme.js",
        code: generateThemeCode(config, "js"),
        language: "jsx",
      },
      {
        title: "theme.ts",
        code: generateThemeCode(config, "ts"),
        language: "tsx",
      },
    ],
    [config],
  );

  return (
    <div className="max-w-screen-lg mx-auto p-10 w-export-panel">
      <h1 className="text-3xl">
        How to Use Your Exported Victory Theme Config
      </h1>
      <ol className="pl-4 space-y-2">
        <li>
          <div>
            <strong>Save the Exported Theme File</strong>
            <p className="mb-2">
              Save your custom generate theme to a file in your project. Use{" "}
              <code>theme.js</code> or <code>theme.ts</code> depending on
              whether your project uses JavaScript or TypeScript.
            </p>
          </div>
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
