import React from "react";
import Button from "./button";
import { VictoryThemeDefinition } from "victory";
import CodeBlock from "./code-block";

type ConfigPreviewProps = {
  config: VictoryThemeDefinition;
  onClose: () => void;
};

const ConfigPreview = ({ config, onClose }: ConfigPreviewProps) => {
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

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed top-[60px] right-0 w-full py-10 px-20 z-[100] bg-white flex flex-col overflow-y-auto min-h-screen">
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 bg-transparent border-0 text-2xl cursor-pointer"
      >
        &times;
      </button>
      <div className="flex gap-20">
        <section className="w-1/3">
          <h1 className="text-2xl">Using Your Exported Victory Theme Config</h1>
          <ol>
            <li>
              <strong>Copy the Config</strong>
              <ul>
                <li>
                  Click the <em>Copy to Clipboard</em> button to copy the JSON
                  theme configuration.
                </li>
              </ul>
            </li>
            <li>
              <strong>Save the Exported Theme as a File</strong>
              <ul>
                <li>
                  Save the copied JSON as a <code>.js</code> or{" "}
                  <code>.json</code> file in your project, e.g.,{" "}
                  <code>theme.js</code>.
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
              <ul>
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
        </section>
        <section className="flex-1">
          <CodeBlock
            language="json"
            code={JSON.stringify(config, null, 2)}
            className="min-h-[500px] max-h-[80vh]"
          />
          <div className="flex items-center justify-end gap-3 mt-5">
            {copyStatus && (
              <span className="text-grayscale-400 text-xs italic">
                {copyStatus}
              </span>
            )}
            <Button
              onClick={handleCopyThemeConfig}
              ariaLabel="Copy to Clipboard"
            >
              Copy to Clipboard
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};
export default ConfigPreview;
