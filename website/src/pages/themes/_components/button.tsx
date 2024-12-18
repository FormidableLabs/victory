import clsx from "clsx";
import React from "react";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  size?: "sm" | "md";
};

const Button = ({
  onClick,
  children,
  className = "",
  ariaLabel = "",
  disabled = false,
  size = "md",
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || undefined}
      className={clsx(
        "border-none rounded-md cursor-pointer text-sm bg-button-bg text-button-fg hover:underline disabled:bg-grayscale-300 disabled:text-grayscale-400 disabled:cursor-not-allowed disabled:hover:no-underline",
        size === "md" && "py-2 px-5 font-bold",
        size === "sm" && "py-1.5 px-3 font-semibold",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
