import React from "react";
import { VictoryThemeDefinition } from "victory-core/lib";

type ConfigPreviewProps = {
  config: VictoryThemeDefinition;
  onClose: () => void;
};

const containerStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  padding: 20,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  zIndex: 1000,
};

const copyButtonContainerStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 20,
};

const copyStatusStyles: React.CSSProperties = {
  color: "#666",
  fontSize: 12,
  fontStyle: "italic",
};

const codeStyles: React.CSSProperties = {
  overflow: "auto",
  maxHeight: 600,
  border: "1px solid #ccc",
  padding: 10,
  backgroundColor: "#f9f9f9",
};

const closeButtonStyles: React.CSSProperties = {
  position: "absolute",
  top: 10,
  right: 10,
  background: "transparent",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
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
    <div style={containerStyles}>
      <div style={copyButtonContainerStyles}>
        <button onClick={handleCopyThemeConfig}>Copy Theme Config</button>
        {copyStatus && <span style={copyStatusStyles}>{copyStatus}</span>}
      </div>
      <h2>Theme Config Preview</h2>
      <pre style={codeStyles}>{JSON.stringify(config, null, 2)}</pre>
      <button onClick={handleClose} style={closeButtonStyles}>
        &times;
      </button>
    </div>
  );
};
export default ConfigPreview;
