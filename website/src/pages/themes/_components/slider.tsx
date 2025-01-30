import React, { useState } from "react";
import clsx from "clsx";
import Toggle from "./toggle";

type SliderProps = {
  label: string;
  id: string;
  value?: number;
  defaultValue?: number;
  unit?: string;
  onChange?: (value?: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 100;

const Slider = ({
  label,
  id,
  value,
  defaultValue,
  unit,
  onChange,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  step = 1,
  className,
}: SliderProps) => {
  const [prevValue, setPrevValue] = useState(() => {
    return value ?? defaultValue ?? min;
  });

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.valueAsNumber;
    if (onChange) {
      onChange(newValue);
      setPrevValue(newValue);
    }
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value) || min;
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleToggle = (isChecked: boolean) => {
    if (!onChange) return;
    const newValue = isChecked ? undefined : prevValue;
    onChange(newValue);
  };

  const isUsingDefault = value === undefined;

  return (
    <fieldset className={clsx("relative p-0 m-0", className)}>
      <label
        htmlFor={id}
        className="flex justify-between items-center mb-2 text-sm font-semibold text-gray-800"
      >
        <span>{label}</span>
      </label>
      <Toggle
        id={`${id}-toggle`}
        label="Use default"
        checked={value === undefined}
        onChange={handleToggle}
        size="xs"
      />
      <div
        className={clsx(
          "flex items-center gap-4 mt-2",
          isUsingDefault && "opacity-30",
        )}
      >
        <input
          id={id}
          type="range"
          value={isUsingDefault ? "" : value}
          onChange={handleSliderChange}
          className={clsx(
            "w-full h-2 bg-grayscale-300 rounded-lg appearance-none accent-blue-500 m-0",
            !isUsingDefault && "cursor-pointer",
          )}
          min={min}
          max={max}
          step={step}
          disabled={isUsingDefault}
        />
        <div className="flex items-center">
          <input
            id={`${id}-number-input`}
            type="number"
            value={isUsingDefault ? "" : value}
            onChange={handleNumberChange}
            className="px-2 py-1 text-sm border border-grayscale-300 rounded-lg"
            min={min}
            max={max}
            step={step}
            disabled={isUsingDefault}
          />
          {unit && <span className="text-sm ml-1">{unit}</span>}
        </div>
      </div>
    </fieldset>
  );
};

export default Slider;
