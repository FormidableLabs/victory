import React from "react";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
};

const Button = ({
  onClick,
  children,
  className = "",
  ariaLabel = "",
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "py-2 px-5 border-none font-bold rounded-md cursor-pointer text-sm bg-button-bg text-button-fg hover:underline disabled:bg-grayscale-300 disabled:text-grayscale-400 disabled:cursor-not-allowed disabled:hover:no-underline";

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

export default Button;
