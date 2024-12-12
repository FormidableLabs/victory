import React from "react";
import ColorPicker from "./color-picker";
import { ColorScalePropType, VictoryThemeDefinition } from "victory";
import { ColorChangeArgs } from "./control";
import clsx from "clsx";

type ColorPaletteSelectorProps = {
  label?: string;
  palette?: VictoryThemeDefinition["palette"];
  colorScaleType?: ColorScalePropType;
  onColorChange: (args: ColorChangeArgs) => void;
  className?: string;
};

const ColorPaletteSelector = ({
  label,
  colorScaleType,
  palette,
  onColorChange,
  className,
}: ColorPaletteSelectorProps) => {
  return (
    <fieldset className={clsx("p-0 m-0", className)}>
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
