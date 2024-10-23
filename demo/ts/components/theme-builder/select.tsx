import React from "react";

export type SelectOption = {
  label: string;
  value: string;
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
    <div className="select">
      {label && (
        <label htmlFor={id} className="select__label">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="select__input"
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
