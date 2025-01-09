import React, { useId } from "react";
import { IoMdClose } from "react-icons/io";
import clsx from "clsx";
import Select from "./select";

type ColorPickerProps = {
  label?: string;
  color: string;
  onColorChange: (color?: string) => void;
  onColorRemove?: () => void;
  showSelectOptions?: boolean;
  className?: string;
};

export const PLACEHOLDER_COLOR = "#000000";
const DEFAULT_COLOR = undefined;
enum ColorPickerOptions {
  NONE = "none",
  CUSTOM = "custom",
}

const ColorPicker = ({
  label,
  color,
  onColorChange,
  onColorRemove,
  showSelectOptions = false,
  className,
}: ColorPickerProps) => {
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);
  const [colorOption, setColorOption] = React.useState<string | undefined>(
    () => {
      if (color === ColorPickerOptions.NONE || color === "transparent") {
        return ColorPickerOptions.NONE;
      }
      if (color === DEFAULT_COLOR) {
        return DEFAULT_COLOR;
      }
      return ColorPickerOptions.CUSTOM;
    },
  );

  const handleColorOptionChange = (value?: string) => {
    setColorOption(value);
    if (value === ColorPickerOptions.NONE) {
      onColorChange(ColorPickerOptions.NONE);
    } else if (value === ColorPickerOptions.CUSTOM) {
      onColorChange(PLACEHOLDER_COLOR);
    } else {
      onColorChange(DEFAULT_COLOR);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onColorChange) {
      onColorChange(event.target.value);
    }
  };

  const handleRemoveColor = () => {
    if (onColorRemove) onColorRemove();
  };

  const id = useId();

  return (
    <label className={clsx("p-0 m-0", className)}>
      {label && (
        <span className="block mb-1 text-sm text-grayscale-900 dark:text-white font-bold">
          {label}
        </span>
      )}
      <div className="flex items-center justify-between gap-2">
        {showSelectOptions && (
          <div className="flex items-center my-2 flex-1">
            <Select
              id={id}
              value={colorOption}
              options={[
                { label: "None", value: ColorPickerOptions.NONE },
                { label: "Custom", value: ColorPickerOptions.CUSTOM },
              ]}
              onChange={handleColorOptionChange}
              className="w-full"
              includeDefault
            />
          </div>
        )}
        {colorOption === ColorPickerOptions.CUSTOM && (
          <div
            className={clsx("relative inline-flex rounded-full group/swatch")}
          >
            <div className="flex items-center">
              <div className="relative">
                <div
                  className={clsx(
                    "block w-[35px] h-[35px] rounded-full cursor-pointer transition-all justify-center items-center after:content-[''] after:block after:w-full after:h-full after:rounded-[inherit] after:bg-currentColor outline-2 border-2 border-white outline outline-grayscale-300 group-hover/swatch:outline-grayscale-800",
                    isPickerOpen
                      ? "outline-currentColor"
                      : "outline-grayscale-300",
                  )}
                  style={{
                    color,
                  }}
                />
                {onColorRemove && (
                  <button
                    onClick={handleRemoveColor}
                    className="absolute -top-1 -right-1 w-4 h-4 text-white bg-red-500 flex justify-center items-center text-2xl font-bold rounded-full opacity-0 p-0.5 group-hover/swatch:opacity-100 z-20 cursor-pointer"
                  >
                    <IoMdClose />
                  </button>
                )}
              </div>
            </div>
            <input
              id={id}
              className={`absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-10 group-hover/swatch:border-currentColor ${
                isPickerOpen ? "border-currentColor" : ""
              }`}
              type="color"
              value={color}
              onChange={handleChange}
              onFocus={() => setIsPickerOpen(true)}
              onBlur={() => setIsPickerOpen(false)}
            />
          </div>
        )}
      </div>
    </label>
  );
};

export default ColorPicker;