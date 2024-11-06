import React from "react";

export type SelectOption = {
  label: string;
  value?: string;
};

type SelectProps = {
  id: string;
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ id, label, options, value, onChange }: SelectProps) => {
  return (
    <div className="relative w-full">
      {label && (
        <label htmlFor={id} className="block mb-1 text-sm">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="p-2 w-full text-base border border-gray-200 bg-white appearance-none rounded-md bg-select-chevron bg-no-repeat bg-[right_8px_center] bg-[length:16px]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Select;
