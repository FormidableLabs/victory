import React from "react";
import { VictoryThemeDefinition } from "victory";
import clsx from "clsx";
import { usePreviewOptions } from "../_providers/previewOptionsProvider";
import ColorPickerList from "./color-picker-list";

type ColorPaletteSelectorProps = {
  label: string;
  value: string;
  palette?: VictoryThemeDefinition["palette"];
  className?: string;
  onColorsChange: (newColors: string[]) => void;
};

const ColorPaletteSelector = ({
  label,
  value,
  palette,
  className,
  onColorsChange,
}: ColorPaletteSelectorProps) => {
  const { colorScale, updateColorScale } = usePreviewOptions();

  const handleRadioChange = () => {
    updateColorScale(value);
  };

  const handleColorsChange = (newColors) => {
    onColorsChange(newColors);
    updateColorScale(value);
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
      <ColorPickerList
        label={label}
        colors={palette?.[value as string]}
        onColorsChange={handleColorsChange}
      />
    </label>
  );
};
export default ColorPaletteSelector;
