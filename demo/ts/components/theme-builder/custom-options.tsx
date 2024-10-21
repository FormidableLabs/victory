import React from "react";
import { ThemeOption } from ".";
import ConfigPreview from "./config-preview";

type ColorChangeArgs = {
  event: React.ChangeEvent<HTMLInputElement>;
  index: number;
  colorScale: string;
};

type CustomOptionsProps = {
  activeTheme: ThemeOption;
  onColorChange: (args: ColorChangeArgs) => void;
};

const colorContainer: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 20,
};

const colorPickerStyles: React.CSSProperties = {
  width: 50,
  height: 50,
};

const CustomOptions = ({ activeTheme, onColorChange }: CustomOptionsProps) => {
  const [showThemeConfigPreview, setShowThemeConfigPreview] =
    React.useState(false);

  const onThemeConfigPreviewOpen = () => {
    setShowThemeConfigPreview(true);
  };

  const onThemeConfigPreviewClose = () => {
    setShowThemeConfigPreview(false);
  };
  return (
    <>
      <div>
        <button onClick={onThemeConfigPreviewOpen}>
          See Custom Config JSON
        </button>
        <section>
          <h2>Color Scales</h2>
          <h3>Qualitative</h3>
          <div style={colorContainer}>
            {activeTheme.config?.palette?.qualitative?.map((color, index) => (
              <input
                key={index}
                style={colorPickerStyles}
                type="color"
                value={color}
                onChange={(event) =>
                  onColorChange({
                    event,
                    index,
                    colorScale: "qualitative",
                  })
                }
              />
            ))}
          </div>
        </section>
      </div>

      {showThemeConfigPreview && activeTheme.config && (
        <ConfigPreview
          config={activeTheme.config}
          onClose={onThemeConfigPreviewClose}
        />
      )}
    </>
  );
};
export default CustomOptions;
