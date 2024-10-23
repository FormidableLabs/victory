import React from "react";
import { VictoryThemeDefinition } from "victory-core/lib";
import Button from "./button";

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
      <div className="config-preview__copy-container">
        <Button onClick={handleCopyThemeConfig} ariaLabel="Copy to Clipboard">
          Copy to Clipboard
        </Button>
        {copyStatus && (
          <span className="config-preview__copy-status">{copyStatus}</span>
        )}
      </div>
      <h2>Theme Config Preview</h2>
      <pre className="config-preview__code">
        {JSON.stringify(config, null, 2)}
      </pre>
      <button onClick={handleClose} className="config-preview__close-button">
        &times;
      </button>
    </div>
  );
};
export default ConfigPreview;
