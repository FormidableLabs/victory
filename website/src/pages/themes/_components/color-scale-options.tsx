import React from "react";
import ColorPicker from "./color-picker";
import { ColorScalePropType, VictoryThemeDefinition } from "victory";
import { ColorChangeArgs } from "./control";

type ColorScaleOptionsProps = {
  label?: string;
  palette?: VictoryThemeDefinition["palette"];
  colorScaleType?: ColorScalePropType;
  onColorChange: (args: ColorChangeArgs) => void;
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
  label,
  colorScaleType,
  palette,
  onColorChange,
}: ColorScaleOptionsProps) => {
  return (
    <fieldset className="p-0 mt-4 mb-8">
      {label && (
        <label className="block mb-3 text-base font-bold">{label}</label>
      )}
      {!!colorScaleType && (
        <div className="flex flex-wrap gap-3">
          {palette?.[colorScaleType as string]?.map((color, i) => (
            <ColorPicker
              key={i}
              color={color}
              id={`color-${i}`}
              onColorChange={(newColor) =>
                onColorChange({
                  newColor,
                  index: i,
                  colorScale: colorScaleType as string,
                })
              }
            />
          ))}
        </div>
      )}
    </fieldset>
  );
};
export default ColorScaleOptions;
