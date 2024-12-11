import React from "react";
import ColorPicker from "./color-picker";
import { ColorScalePropType, VictoryThemeDefinition } from "victory";
import { ColorChangeArgs } from "./control";

type ColorPaletteSelectorProps = {
  label?: string;
  palette?: VictoryThemeDefinition["palette"];
  colorScaleType?: ColorScalePropType;
  onColorChange: (args: ColorChangeArgs) => void;
};

const ColorPaletteSelector = ({
  label,
  colorScaleType,
  palette,
  onColorChange,
}: ColorPaletteSelectorProps) => {
  return (
    <fieldset className="p-0 m-0 mt-4 mb-8">
      {label && (
        <label className="block mb-3 text-base font-bold">{label}</label>
      )}
      {!!colorScaleType && (
        <div className="flex flex-wrap gap-3">
          {palette?.[colorScaleType as string]?.map((color, i) => (
            <ColorPicker
              key={i}
              color={color}
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
export default ColorPaletteSelector;
