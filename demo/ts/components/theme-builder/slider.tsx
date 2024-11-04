import React, { useEffect } from "react";

const Slider = ({ label, id, defaultValue, unit = "px", onChange }) => {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="my-4">
      <label
        htmlFor={id}
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
      >
        <span className="text-sm font-bold">{label}</span>: {value}
        {unit}
      </label>
      <input
        id={id}
        type="range"
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
};
export default Slider;
