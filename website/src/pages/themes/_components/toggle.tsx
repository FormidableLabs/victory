import clsx from "clsx";
import React from "react";

type ToggleProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  size?: "xs" | "sm" | "md";
};

const Toggle = ({
  id,
  label,
  checked,
  onChange,
  className,
  size = "md",
}: ToggleProps) => {
  const handleChange = () => {
    onChange(!checked);
  };

  const labelSizeClasses = size === "md" ? "font-bold" : "font-medium";

  return (
    <label
      htmlFor={id}
      className={clsx(
        "flex justify-between items-center cursor-pointer",
        className,
      )}
    >
      <span className={clsx("text-sm", labelSizeClasses)}>{label}</span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="sr-only peer"
      />
      <div
        className={clsx(
          "relative bg-grayscale-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-grayscale-300 after:border after:rounded-full after:transition-all peer-checked:bg-blue-800",
          size === "xs" && "w-7 h-4 after:h-3 after:w-3",
          size === "sm" && "w-9 h-5 after:h-4 after:w-4",
          size === "md" && "w-11 h-6 after:h-5 after:w-5",
        )}
      ></div>
    </label>
  );
};

export default Toggle;
