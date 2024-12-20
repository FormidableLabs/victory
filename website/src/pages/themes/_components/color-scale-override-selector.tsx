import React, { useCallback } from "react";
import ColorPicker from "./color-picker";
import clsx from "clsx";
import Toggle from "./toggle";
import {
  defaultColorScale,
  usePreviewOptions,
} from "../_providers/previewOptionsProvider";

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
  const hasCustomValue = Array.isArray(value);
  const [initialCustomValue] = React.useState(
    hasCustomValue ? value : undefined,
  );

  const setColorScaleToDefault = useCallback(() => {
    if (colorScale !== defaultColorScale) {
      updateColorScale(defaultColorScale);
    }
  }, [colorScale, updateColorScale]);

  const onCheckboxChange = (isChecked) => {
    if (isChecked) {
      onChange(initialCustomValue);
    } else {
      onChange(undefined);
    }
    setColorScaleToDefault();
  };

  const handleColorChange = (newColor, index) => {
    const newValue = [...(value as string[])];
    newValue[index] = newColor;
    onChange(newValue);
    setColorScaleToDefault();
  };

  return (
    <label className={clsx("p-0 m-0", className)}>
      <span className="block mb-3 text-sm font-bold">{label}</span>
      {!hideDefaultToggle && (
        <Toggle
          id={id}
          label="Use custom color scale"
          checked={hasCustomValue}
          onChange={onCheckboxChange}
          className="mb-3"
          size="sm"
        />
      )}
      {hasCustomValue && (
        <div className="flex flex-wrap gap-2 mt-3">
          {value.map((color, i) => (
            <ColorPicker
              key={i}
              color={color}
              onColorChange={(newColor) => handleColorChange(newColor, i)}
            />
          ))}
        </div>
      )}
    </label>
  );
};
export default ColorScaleOverrideSelector;
