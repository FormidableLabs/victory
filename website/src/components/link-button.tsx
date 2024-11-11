import clsx from 'clsx';
import React from "react";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  link: string;
  screenReaderLabel?: string;
}

export const LinkButton = ({ children, link, className }: ButtonProps) => {
  const classes = clsx(
    'bg-button-bg text-button-fg border-button-border hover:text-button-fg-hover after:bg-button-bg-hover border-2 font-bold rounded-full text-lg z-0 transition-colors delay-75 w-fit overflow-hidden py-[14px] px-[23px] relative flex gap-2.5 justify-between leading-[21px] after:absolute after:w-[200%] after:h-full after:bottom-0 after:transform-gpu after:-skew-x-[50deg] after:-right-[250%] after:-z-10 after:transition-transform after:duration-200 hover:after:-translate-x-[100%] hover:after:[-webkit-transform:translate3d(-100%,0,0)_!important]',
    className
  )
  return (
    <a
      className={classes}
      href={link}
    >
      {children}
    </a>
  );
};
