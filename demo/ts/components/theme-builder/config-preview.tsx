import React from "react";
import { VictoryThemeDefinition } from "victory-core/lib";
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
    <div className="config-preview">
      <button onClick={handleClose} className="config-preview__close-button">
        &times;
      </button>
      <h2>Theme Config Preview</h2>
      <SyntaxHighlighter language="json" className="config-preview__code">
        {JSON.stringify(config, null, 2)}
      </SyntaxHighlighter>
      <div className="config-preview__copy-container">
        {copyStatus && (
          <span className="config-preview__copy-status">{copyStatus}</span>
        )}
        <Button onClick={handleCopyThemeConfig} ariaLabel="Copy to Clipboard">
          Copy to Clipboard
        </Button>
      </div>
    </div>
  );
};
export default ConfigPreview;
