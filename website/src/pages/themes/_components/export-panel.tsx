import React from "react";
import CodeBlock from "./code-block";
import { useTheme } from "../_providers/themeProvider";
import { FiCopy } from "react-icons/fi";

const ExportPanel = () => {
  const { customThemeConfig: config } = useTheme();
  const [copyStatus, setCopyStatus] = React.useState<string | null>(null);

  const handleCopyThemeConfig = () => {
    navigator.clipboard
      .writeText(JSON.stringify(config, null, 2))
      .then(() => {
        setCopyStatus("Copied successfully.");
        return "Theme config copied to clipboard";
      })
      .catch(() => {
        setCopyStatus("Failed to copy.");
      });
  };

  return (
    <div className="max-w-screen-lg mx-auto p-10 w-export-panel">
      <h1 className="text-3xl">Using Your Exported Victory Theme Config</h1>
      <ol className="pl-4 space-y-2">
        <li>
          <strong>Copy the theme configuration</strong>
          <ul className="space-y-2">
            <li>
              Click the <FiCopy /> button to copy the JSON theme configuration.
              <div className="relative mt-2">
                <div className="flex items-center justify-end gap-3 absolute top-3 right-6">
                  <button
                    onClick={handleCopyThemeConfig}
                    className="bg-transparent text-xl text-grayscale-400 cursor-pointer hover:bg-grayscale-300 flex items-center justify-center p-1 rounded-md"
                  >
                    {copyStatus && (
                      <span className="text-grayscale-400 text-xs italic">
                        {copyStatus}
                      </span>
                    )}
                    <FiCopy />
                  </button>
                </div>
                <CodeBlock
                  language="json"
                  code={JSON.stringify(config, null, 2)}
                  className="h-[500px]"
                />
              </div>
            </li>
          </ul>
        </li>
        <li>
          <strong>Save the Exported Theme as a File</strong>
          <ul className="space-y-2">
            <li>
              Save the copied JSON as a <code>.js</code> or <code>.json</code>{" "}
              file in your project, e.g., <code>theme.js</code>.
            </li>
            <li>
              Import the theme in your app:
              <CodeBlock
                language="javascript"
                code={`import customTheme from './theme.js';`}
              />
            </li>
          </ul>
        </li>
        <li>
          <strong>Apply to Victory Components</strong>
          <ul className="space-y-2">
            <li>
              Use the <code>theme</code> prop on any Victory component:
              <CodeBlock
                language="javascript"
                code={`<VictoryChart theme={customTheme}>
{/* Your Victory components */}
</VictoryChart>`}
              />
            </li>
          </ul>
        </li>
      </ol>
    </div>
  );
};
export default ExportPanel;
