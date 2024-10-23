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
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || undefined}
      className={`button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
