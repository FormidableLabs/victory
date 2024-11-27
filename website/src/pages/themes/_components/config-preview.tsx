import React from "react";
import Button from "./button";
import { VictoryThemeDefinition } from "victory";
import { Highlight } from "prism-react-renderer";

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
    <div className="absolute top-0 right-0 bottom-0 w-full p-10 z-[100] bg-white flex flex-col">
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 bg-transparent border-0 text-xl"
      >
        &times;
      </button>
      <h2>Theme Config Preview</h2>
      <Highlight
        code={JSON.stringify(config, null, 2)}
        language="json"
        className="flex-1 overflow-auto border border-grayscale-300 p-3 bg-grayscale-100"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })} key={i}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} key={key} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <div className="flex items-center justify-end gap-3 mt-5">
        {copyStatus && (
          <span className="text-grayscale-400 text-xs italic">
            {copyStatus}
          </span>
        )}
        <Button onClick={handleCopyThemeConfig} ariaLabel="Copy to Clipboard">
          Copy to Clipboard
        </Button>
      </div>
    </div>
  );
};
export default ConfigPreview;
