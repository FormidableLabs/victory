import clsx from "clsx";
import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={clsx("bg-white p-4 rounded-md", className)}>{children}</div>
  );
};

export default Card;
