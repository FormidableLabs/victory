import React, { useCallback, useEffect } from "react";
import clsx from "clsx";
import Toggle from "./toggle";
import {
  defaultColorScale,
  usePreviewOptions,
} from "../_providers/previewOptionsProvider";
import ColorPickerList from "./color-picker-list";

type ColorScaleOverrideSelectorProps = {
  id: string;
  label?: string;
  colors?: string | string[];
  onColorsChange: (colors: string[] | undefined) => void;
  hideDefaultToggle?: boolean;
  className?: string;
};

const ColorScaleOverrideSelector = ({
  id,
  label = "Color Scale",
  colors,
  onColorsChange,
  hideDefaultToggle = false,
  className,
}: ColorScaleOverrideSelectorProps) => {
  const { colorScale, updateColorScale } = usePreviewOptions();
  const [showCustomColors, setShowCustomColors] = React.useState(
    () => !!colors && Array.isArray(colors),
  );

  const setColorScaleToDefault = useCallback(() => {
    if (colorScale !== defaultColorScale) {
      updateColorScale(defaultColorScale);
    }
  }, [colorScale, updateColorScale]);

  const onCheckboxChange = (isChecked) => {
    setShowCustomColors(isChecked);
    if (!isChecked) {
      onColorsChange(undefined);
    }
    setColorScaleToDefault();
  };

  const handleColorsChange = (newColors) => {
    onColorsChange(newColors);
    setColorScaleToDefault();
  };

  return (
    <div className={clsx("p-0 m-0", className)}>
      <label htmlFor={id} className="block mb-3 text-sm font-bold">
        {label}
      </label>
      {!hideDefaultToggle && (
        <Toggle
          id={id}
          label="Use custom color scale"
          checked={showCustomColors}
          onChange={onCheckboxChange}
          className="mb-3"
          size="xs"
        />
      )}
      {showCustomColors && typeof colors !== "string" && (
        <ColorPickerList colors={colors} onColorsChange={handleColorsChange} />
      )}
    </div>
  );
};
export default ColorScaleOverrideSelector;
