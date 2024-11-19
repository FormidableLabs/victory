import React from "react";
import { VictoryThemeDefinition } from "victory-core";
import Button from "./button";
import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter";

const SyntaxHighlighter = Prism as any as React.FC<SyntaxHighlighterProps>;

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
    <div className="fixed top-0 right-0 bottom-0 w-full p-10 z-[100] bg-white flex flex-col">
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 bg-transparent border-0 text-xl"
      >
        &times;
      </button>
      <h2>Theme Config Preview</h2>
      <SyntaxHighlighter
        language="json"
        className="flex-1 overflow-auto border border-gray-200 p-3 bg-gray-100"
      >
        {JSON.stringify(config, null, 2)}
      </SyntaxHighlighter>
      <div className="flex items-center justify-end gap-3 mt-5">
        {copyStatus && (
          <span className="text-gray-300 text-xs italic">{copyStatus}</span>
        )}
        <Button onClick={handleCopyThemeConfig} ariaLabel="Copy to Clipboard">
          Copy to Clipboard
        </Button>
      </div>
    </div>
  );
};
export default ConfigPreview;
