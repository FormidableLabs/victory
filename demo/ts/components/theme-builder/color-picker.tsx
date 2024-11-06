import React from "react";
import { TiPencil } from "react-icons/ti";
import clsx from "clsx";

type ColorPickerProps = {
  label?: string;
  color: string;
  id: string;
  onColorChange: (color: string) => void;
  showColorName?: boolean;
};

const ColorPicker = ({
  label,
  color,
  id,
  onColorChange,
  showColorName = false,
}: ColorPickerProps) => {
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onColorChange) {
      onColorChange(event.target.value);
    }
  };

  return (
    <fieldset>
      {label && (
        <label className="block mb-1 text-sm text-gray-900 dark:text-white font-bold">
          {label}
        </label>
      )}
      <div
        className={clsx("relative inline-flex rounded-full group/swatch", {
          "border-2 border-gray-200 p-0.5 cursor-pointer justify-between bg-gray-100":
            showColorName,
        })}
      >
        <div className="flex items-center">
          <div className="relative">
            <div
              className={clsx(
                "block w-[35px] h-[35px] rounded-full cursor-pointer transition-all justify-center items-center after:content-[''] after:block after:w-full after:h-full after:rounded-[inherit] after:bg-currentColor",
                {
                  "outline-2 border-2 border-white outline outline-gray-200":
                    !showColorName,
                },
                { "w-[30px] h-[30px] p-0.5": showColorName },
              )}
              style={{
                color,
              }}
            />
            {!showColorName && (
              <div
                className={`absolute top-0 left-0 w-full h-full text-white flex justify-center items-center text-xl rounded-full opacity-0 group-hover/swatch:opacity-100 ${
                  isPickerOpen ? "opacity-100" : ""
                }`}
              >
                <TiPencil />
              </div>
            )}
          </div>
          {showColorName && (
            <span
              className={
                "text-sm font-medium text-gray-900 uppercase ml-2 cursor-pointer"
              }
            >
              {color}
            </span>
          )}
        </div>
        {showColorName && (
          <div
            className={`text-gray-300 flex justify-center items-center text-xl rounded-full place-items-end ml-6 mr-1`}
          >
            <TiPencil />
          </div>
        )}
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
    </fieldset>
  );
};

export default ColorPicker;
