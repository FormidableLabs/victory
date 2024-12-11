import React, { useId } from "react";
import Select from "./select";
import ColorPicker from "./color-picker";

const inheritOption = {
  label: "Inherit",
  value: "inherit",
};

const customOption = {
  label: "Custom",
  value: "custom",
};

const options = [inheritOption, customOption];

const ColorScaleOverrideSelector = ({
  label = "Color Scale",
  value,
  onChange,
}) => {
  const id = useId();
  const hasCustomValue = Array.isArray(value);
  const [initialCustomValue] = React.useState(
    hasCustomValue ? value : undefined,
  );

  const selectValue = hasCustomValue ? customOption.value : inheritOption.value;

  const handleSelectChange = (newValue) => {
    if (newValue === inheritOption.value) {
      onChange(undefined);
    } else {
      onChange(initialCustomValue);
    }
  };

  return (
    <fieldset className="p-0 m-0 mt-4 mb-8">
      <Select
        id={id}
        value={selectValue}
        options={options}
        label={label}
        onChange={handleSelectChange}
      />
      {hasCustomValue && (
        <div className="flex flex-wrap gap-3 mt-3">
          {value.map((color, i) => (
            <ColorPicker
              key={i}
              color={color}
              onColorChange={(newColor) => {
                const updatedColors = [...value];
                updatedColors[i] = newColor;
                onChange(updatedColors);
              }}
            />
          ))}
        </div>
      )}
    </fieldset>
  );
};
export default ColorScaleOverrideSelector;
