import React from "react";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
};

export const Button = ({
  onClick,
  children,
  className = "",
  ariaLabel = "",
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "py-2 px-4 font-semibold rounded-md cursor-pointer text-sm border-2 border-solid border-button-border bg-button-bg text-button-fg hover:bg-button-bg-hover hover:text-button-fg-hover disabled:bg-grayscale-300 disabled:text-grayscale-400 disabled:cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || undefined}
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
