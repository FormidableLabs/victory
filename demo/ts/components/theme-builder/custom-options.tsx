import React from "react";
import { ThemeOption } from ".";
import ConfigPreview from "./config-preview";
import { ColorScalePropType } from "victory-core/lib";

type ColorChangeArgs = {
  event: React.ChangeEvent<HTMLInputElement>;
  index: number;
  colorScale: string;
};

type CustomOptionsProps = {
  activeTheme?: ThemeOption;
  activeColorScale: ColorScalePropType;
  onColorChange: (args: ColorChangeArgs) => void;
  onColorScaleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const colorPickerStyles: React.CSSProperties = {
  width: 40,
  height: 40,
};

const colorScales = ["qualitative", "heatmap", "warm", "cool", "red", "green"];

const config = [
  {
    label: "Color Scales",
    subSections: [
      {
        label: "Qualitative",
        key: "qualitative",
      },
      {
        label: "Heatmap",
        key: "heatmap",
      },
      {
        label: "Warm",
        key: "warm",
      },
      {
        label: "Cool",
        key: "cool",
      },
      {
        label: "Red",
        key: "red",
      },
      {
        label: "Green",
        key: "green",
      },
      {
        label: "Blue",
        key: "blue",
      },
    ],
  },
];

const CustomOptions = ({
  activeColorScale,
  activeTheme,
  onColorChange,
  onColorScaleChange,
}: CustomOptionsProps) => {
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
      <button onClick={onThemeConfigPreviewOpen}>See Custom Config JSON</button>
      <section>
        <div>
          <select value={activeColorScale} onChange={onColorScaleChange}>
            {colorScales.map((scale) => (
              <option key={scale} value={scale}>
                {scale}
              </option>
            ))}
          </select>
        </div>
        {activeTheme?.config?.palette?.[activeColorScale as string]?.map(
          (color, i) => (
            <input
              key={i}
              style={colorPickerStyles}
              type="color"
              value={color}
              onChange={(event) =>
                onColorChange({
                  event,
                  index: i,
                  colorScale: activeColorScale as string,
                })
              }
            />
          ),
        )}
      </section>

      {showThemeConfigPreview && activeTheme?.config && (
        <ConfigPreview
          config={activeTheme?.config}
          onClose={onThemeConfigPreviewClose}
        />
      )}
    </>
  );
};
export default CustomOptions;
