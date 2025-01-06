import React from "react";
import clsx from "clsx";
import Toggle from "./toggle";

type SliderProps = {
  label: string;
  id: string;
  value?: number;
  unit?: string;
  onChange?: (value?: number) => void;
  onDefaultToggle?: (isChecked: boolean) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;

const Slider = ({
  label,
  id,
  value,
  unit,
  onChange,
  onDefaultToggle,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  step = 1,
  className,
}: SliderProps) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.valueAsNumber;
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value) || min;
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleToggle = (isChecked: boolean) => {
    if (!onDefaultToggle) return;
    onDefaultToggle(isChecked);
  };

  return (
    <fieldset className={clsx("relative py-2 px-0 m-0", className)}>
      <label
        htmlFor={id}
        className="flex justify-between items-center mb-2 text-sm font-bold text-grayscale-900"
      >
        <span>{label}</span>
      </label>
      <Toggle
        id={`${id}-toggle`}
        label="Use default value"
        checked={value === undefined}
        onChange={handleToggle}
        size="xs"
        className="mb-2"
      />
      {value !== undefined && (
        <div className="flex items-center gap-4">
          <input
            id={id}
            type="range"
            value={value}
            onChange={handleSliderChange}
            className="w-full h-2 bg-grayscale-300 rounded-lg appearance-none cursor-pointer accent-blue-800 m-0"
            min={min}
            max={max}
            step={step}
          />
          <div className="flex items-center">
            <input
              type="number"
              value={value}
              onChange={handleNumberChange}
              className="px-2 py-1 text-sm border border-grayscale-300 rounded-lg"
              min={min}
              max={max}
              step={step}
            />
            {unit && <span className="text-sm ml-1">{unit}</span>}
          </div>
        </div>
      )}
    </fieldset>
  );
};

export default Slider;
