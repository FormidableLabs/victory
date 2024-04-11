import React from "react";
import Link from "next/link";

function LinkButton({ isExternal, href, className, children }) {
  const classes = [
    "block text-center h-[40px] w-[200px] bg-[#ff684f] text-[#1f1f1f] leading-[40px] text-xl tracking-widest",
    className,
  ];

  if (isExternal) {
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes.join(" ")}
    >
      {children}
    </a>;
  }

  return (
    <Link href={href} className={classes.join(" ")}>
      {children}
    </Link>
  );
}

export default LinkButton;
