import clsx from "clsx";
import React, { useId } from "react";

type CheckboxProps = {
  label?: string;
  isChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
  className?: string;
};

const Checkbox = ({
  label = "Checkbox",
  isChecked = false,
  onChange,
  className,
}: CheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  const id = useId();

  return (
    <label
      htmlFor={id}
      className={clsx("p-0 m-0 flex items-center justify-start", className)}
    >
      <input
        type="checkbox"
        id={id}
        name="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="mr-2"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
};
export default Checkbox;
