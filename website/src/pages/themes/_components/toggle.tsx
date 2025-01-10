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
  const handleToggle = () => {
    onChange(!checked);
  };

  const labelSizeClasses = size === "md" ? "font-bold" : "font-medium";

  return (
    <div className={clsx("flex justify-between items-center", className)}>
      <label className={clsx("text-sm", labelSizeClasses)}>{label}</label>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        className={clsx(
          "group flex p-0.5 rounded-full bg-grayscale-300 transition-colors duration-200 ease-in-out overflow-hidden aria-checked:bg-blue-800 cursor-pointer",
          size === "xs" && "w-7 h-4",
          size === "sm" && "w-9 h-5",
          size === "md" && "w-11 h-6",
        )}
      >
        <span
          className={clsx(
            "rounded-full bg-white transition-transform duration-200 ease-in-out group-aria-checked:translate-x-full",
            size === "xs" && "h-3 w-3",
            size === "sm" && "h-4 w-4",
            size === "md" && "h-5 w-5",
          )}
        ></span>
      </button>
    </div>
  );
};

export default Toggle;
