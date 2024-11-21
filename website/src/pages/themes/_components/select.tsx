import React from "react";
import clsx from "clsx";

export type SelectOption = {
  label: string;
  value?: string;
};

type SelectProps = {
  id: string;
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
};

const Select = ({
  id,
  label,
  options,
  value = "",
  onChange,
  className,
}: SelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };
  return (
    <div className={clsx("relative w-full", className)}>
      {label && (
        <label htmlFor={id} className="block mb-1 text-sm font-bold">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={handleChange}
        className="p-2 w-full text-base border border-gray-200 bg-white appearance-none rounded-md bg-select-chevron bg-no-repeat bg-[right_8px_center] bg-[length:16px]"
      >
        {options.map((option, i) => (
          <option key={(option.value || "") + i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Select;
