import React, { useCallback } from "react";
import ColorPicker from "./color-picker";
import clsx from "clsx";
import Toggle from "./toggle";
import {
  defaultColorScale,
  usePreviewOptions,
} from "../_providers/previewOptionsProvider";
import { TiPlus } from "react-icons/ti";

type ColorScaleOverrideSelectorProps = {
  id: string;
  label?: string;
  value?: string | string[];
  onChange: (value: string[] | undefined) => void;
  hideDefaultToggle?: boolean;
  className?: string;
};

const ColorScaleOverrideSelector = ({
  id,
  label = "Color Scale",
  value,
  onChange,
  hideDefaultToggle = false,
  className,
}: ColorScaleOverrideSelectorProps) => {
  const { colorScale, updateColorScale } = usePreviewOptions();
  const [showCustomColors, setShowCustomColors] = React.useState(false);
  const setColorScaleToDefault = useCallback(() => {
    if (colorScale !== defaultColorScale) {
      updateColorScale(defaultColorScale);
    }
  }, [colorScale, updateColorScale]);

  const onCheckboxChange = (isChecked) => {
    setShowCustomColors(isChecked);
    if (!isChecked) {
      onChange(undefined);
    }
    setColorScaleToDefault();
  };

  const handleColorChange = (newColor, index) => {
    if (newColor === undefined) {
      // Remove color if undefined
      const newValue = [...(value as string[])].filter((_, i) => i !== index);
      onChange(newValue);
    } else {
      const newValue = [...(value as string[])];
      newValue[index] = newColor;
      onChange(newValue);
    }
    setColorScaleToDefault();
  };

  const handleAddColor = () => {
    const newValue = Array.isArray(value)
      ? [...(value as string[]), "#000000"]
      : ["#000000"];
    onChange(newValue);
    setColorScaleToDefault();
  };

  return (
    <div className={clsx("p-0 m-0", className)}>
      <label className="block mb-3 text-sm font-bold">{label}</label>
      {!hideDefaultToggle && (
        <Toggle
          id={id}
          label="Use custom color scale"
          checked={showCustomColors}
          onChange={onCheckboxChange}
          className="mb-3"
          size="sm"
        />
      )}
      {showCustomColors && (
        <div className="flex flex-wrap gap-2 mt-3">
          {Array.isArray(value) &&
            value?.map((color, i) => (
              <ColorPicker
                key={i}
                color={color}
                onColorChange={(newColor) => handleColorChange(newColor, i)}
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
  );
};
export default ColorScaleOverrideSelector;
