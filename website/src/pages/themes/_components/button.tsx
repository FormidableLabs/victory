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
    "py-2 px-5 border-0 rounded-md cursor-pointer text-sm bg-primary text-white hover:bg-secondary disabled:bg-gray-200 disabled:cursor-not-allowed";

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
