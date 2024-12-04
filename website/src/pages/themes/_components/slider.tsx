import React from "react";

type SliderProps = {
  label: string;
  id: string;
  value?: number;
  unit?: string;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

const Slider = ({
  label,
  id,
  value,
  unit,
  onChange,
  min,
  max,
  step = 1,
  className,
}: SliderProps) => {
  const handleChange = (event) => {
    const newValue = event.target.valueAsNumber;
    if (onChange) {
      onChange(newValue);
    }
  };

  const valueString = value !== undefined ? `${value}${unit ?? ""}` : "default";

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block mb-1 text-sm font-medium text-grayscale-900 dark:text-white"
      >
        <span className="text-sm font-bold">{label}</span>: {valueString}
      </label>
      <input
        id={id}
        type="range"
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-grayscale-300 rounded-lg appearance-none cursor-pointer dark:bg-grayscale-700"
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};
export default Slider;
