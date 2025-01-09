import React from "react";
import ColorPicker, { PLACEHOLDER_COLOR } from "./color-picker";
import clsx from "clsx";
import { TiPlus } from "react-icons/ti";

type ColorPickerListProps = {
  label?: string;
  colors?: string[];
  onColorsChange: (newColors: string[]) => void;
  className?: string;
};

const ColorPickerList = ({
  label,
  colors = [],
  onColorsChange,
  className,
}: ColorPickerListProps) => {
  const handleColorChange = (newColor, i) => {
    const updatedColors = [...colors];
    updatedColors[i] = newColor;
    onColorsChange(updatedColors);
  };

  const handleRemoveColor = (i) => {
    const updatedColors = [...colors];
    updatedColors.splice(i, 1);
    onColorsChange(updatedColors);
  };

  const handleAddColor = () => {
    const updatedColors = [...colors, PLACEHOLDER_COLOR];
    onColorsChange(updatedColors);
  };

  return (
    <div className={clsx("p-0 m-0", className)}>
      {label && <span className="block mb-3 text-sm font-bold">{label}</span>}
      <div className="flex flex-wrap gap-3">
        {colors.map((color, i) => (
          <ColorPicker
            key={i}
            color={color}
            onColorChange={(newColor) => handleColorChange(newColor, i)}
            onColorRemove={() => handleRemoveColor(i)}
          />
        ))}
        <button
          onClick={handleAddColor}
          className="flex w-[35px] h-[35px] p-0.5 rounded-full cursor-pointer justify-center items-center border-2 border-grayscale-300"
        >
          <TiPlus />
        </button>
      </div>
    </div>
  );
};
export default ColorPickerList;
