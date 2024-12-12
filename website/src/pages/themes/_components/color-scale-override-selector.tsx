import React from "react";
import ColorPicker from "./color-picker";
import Checkbox from "./checkbox";
import clsx from "clsx";

type ColorScaleOverrideSelectorProps = {
  label?: string;
  value?: string | string[];
  onChange: (value: string[] | undefined) => void;
  className?: string;
};

const ColorScaleOverrideSelector = ({
  label = "Color Scale",
  value,
  onChange,
  className,
}: ColorScaleOverrideSelectorProps) => {
  const hasCustomValue = Array.isArray(value);
  const [initialCustomValue] = React.useState(
    hasCustomValue ? value : undefined,
  );

  const onCheckboxChange = (isChecked) => {
    if (isChecked) {
      onChange(initialCustomValue);
    } else {
      onChange(undefined);
    }
  };

  const handleColorChange = (newColor, index) => {
    const newValue = [...(value as string[])];
    newValue[index] = newColor;
    onChange(newValue);
  };

  return (
    <fieldset className={clsx("p-0 m-0", className)}>
      <label className="block mb-3 text-sm font-bold">{label}</label>
      <Checkbox
        label="Use custom color scale"
        isChecked={hasCustomValue}
        onChange={onCheckboxChange}
      />
      {hasCustomValue && (
        <div className="flex flex-wrap gap-3 mt-3">
          {value.map((color, i) => (
            <ColorPicker
              key={i}
              color={color}
              onColorChange={(newColor) => handleColorChange(newColor, i)}
            />
          ))}
        </div>
      )}
    </fieldset>
  );
};
export default ColorScaleOverrideSelector;
