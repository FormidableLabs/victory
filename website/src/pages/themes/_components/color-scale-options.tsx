import React from "react";
import Select from "./select";
import ColorPicker from "./color-picker";
import { ColorScalePropType, VictoryThemeDefinition } from "victory";
import { ColorChangeArgs } from "./control";

type ColorScaleOptionsProps = {
  palette?: VictoryThemeDefinition["palette"];
  activeColorScale?: ColorScalePropType;
  onColorChange: (args: ColorChangeArgs) => void;
  onColorScaleChange: (colorScale?: string) => void;
};

export const colorScaleOptions = [
  {
    label: "Qualitative",
    value: "qualitative",
  },
  {
    label: "Grayscale",
    value: "grayscale",
  },
  {
    label: "Heatmap",
    value: "heatmap",
  },
  {
    label: "Warm",
    value: "warm",
  },
  {
    label: "Cool",
    value: "cool",
  },
  {
    label: "Red",
    value: "red",
  },
  {
    label: "Green",
    value: "green",
  },
  {
    label: "Blue",
    value: "blue",
  },
];

const ColorScaleOptions = ({
  activeColorScale,
  palette,
  onColorChange,
  onColorScaleChange,
}: ColorScaleOptionsProps) => {
  return (
    <section>
      <Select
        id="color-scale-select"
        value={activeColorScale as string}
        onChange={onColorScaleChange}
        options={colorScaleOptions}
        label="Color Scale"
        className="mb-5"
        includeDefault
      />
      {!!activeColorScale && (
        <div className="flex flex-wrap gap-3">
          {palette?.[activeColorScale as string]?.map((color, i) => (
            <ColorPicker
              key={i}
              color={color}
              id={`color-${i}`}
              onColorChange={(newColor) =>
                onColorChange({
                  newColor,
                  index: i,
                  colorScale: activeColorScale as string,
                })
              }
            />
          ))}
        </div>
      )}
    </section>
  );
};
export default ColorScaleOptions;
