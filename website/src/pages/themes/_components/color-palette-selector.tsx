import React from "react";
import ColorPicker from "./color-picker";
import { ColorScalePropType, VictoryThemeDefinition } from "victory";
import { ColorChangeArgs } from "./control";
import clsx from "clsx";
import { usePreviewOptions } from "../_providers/previewOptionsProvider";

type ColorPaletteSelectorProps = {
  label: string;
  value: string;
  palette?: VictoryThemeDefinition["palette"];
  colorScaleType?: ColorScalePropType;
  onColorChange: (args: ColorChangeArgs) => void;
  className?: string;
};

const ColorPaletteSelector = ({
  label,
  value,
  colorScaleType,
  palette,
  onColorChange,
  className,
}: ColorPaletteSelectorProps) => {
  const { colorScale, updateColorScale } = usePreviewOptions();

  const handleRadioChange = () => {
    updateColorScale(value);
  };

  const isSelected = colorScale === value;

  return (
    <label
      className={clsx(
        "flex items-start gap-2 border rounded p-4 cursor-pointer",
        isSelected ? "border-blue-500 bg-blue-100" : "border-gray-300",
        className,
      )}
    >
      <input
        type="radio"
        name={label}
        value={value}
        checked={isSelected}
        onChange={handleRadioChange}
      />
      <div className="p-0 m-0">
        <span className="block mb-3 text-sm font-bold">{label}</span>
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
      </div>
    </label>
  );
};
export default ColorPaletteSelector;
