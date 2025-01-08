import React from "react";
import ColorPicker from "./color-picker";
import { ColorScalePropType, VictoryThemeDefinition } from "victory";
import { ColorChangeArgs } from "./control";
import clsx from "clsx";
import { usePreviewOptions } from "../_providers/previewOptionsProvider";
import { useTheme } from "../_providers/themeProvider";
import { TiPlus } from "react-icons/ti";

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
  const { updateCustomThemeConfig } = useTheme();

  const handleRadioChange = () => {
    updateColorScale(value);
  };

  const handleColorChange = (newColor, i, cScale) => {
    if (newColor === undefined) {
      // Remove color if undefined
      const updatedColors = palette?.[cScale]?.filter(
        (_, index) => index !== i,
      );
      updateCustomThemeConfig(`palette.${cScale}`, updatedColors);
    } else {
      onColorChange({
        newColor,
        index: i,
        colorScale: cScale,
      });
    }
    if (colorScale !== cScale) {
      updateColorScale(cScale);
    }
  };

  const handleAddColor = () => {
    const updatedColors = [
      ...(palette?.[colorScaleType as string] || []),
      "#000000",
    ];
    updateCustomThemeConfig(`palette.${colorScaleType}`, updatedColors);
  };

  const isSelected = colorScale === value;

  return (
    <label
      className={clsx(
        "flex items-start gap-2 border-2 rounded-md p-4 cursor-pointer",
        isSelected ? "border-blue-500 bg-blue-100" : "border-gray-200",
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
                  handleColorChange(newColor, i, colorScaleType)
                }
              />
            ))}
            <button
              onClick={handleAddColor}
              className="font-medium flex w-[35px] h-[35px] rounded-full cursor-pointer justify-center items-center border-2 border-grayscale-300"
            >
              <TiPlus className="text-lg" />
            </button>
          </div>
        )}
      </div>
    </label>
  );
};
export default ColorPaletteSelector;
