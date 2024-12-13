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
  includeDefault?: boolean;
  className?: string;
  size?: "sm" | "md";
};

const Select = ({
  id,
  label,
  options,
  value = "",
  onChange,
  includeDefault,
  className,
  size = "md",
}: SelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const labelSizeClasses = size === "sm" ? "font-medium" : "font-bold";
  const selectSizeClasses =
    size === "sm" ? "text-sm px-2 py-1.5" : "text-base p-2";

  return (
    <div className={clsx("relative", className)}>
      {label && (
        <label
          htmlFor={id}
          className={clsx("block flex-1 my-1 text-sm", labelSizeClasses)}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={handleChange}
        className={clsx(
          "w-full border border-grayscale-300 bg-white appearance-none rounded-md bg-select-chevron bg-no-repeat bg-[right_8px_center] bg-[length:16px] flex-1",
          selectSizeClasses,
        )}
      >
        {includeDefault && <option value="">Default</option>}
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
