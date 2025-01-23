import React from "react";

const ExportIcon = ({ className, ...props }) => {
  return (
    <svg
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M8.3335 5.61003H5.00016C4.55814 5.61003 4.13421 5.78562 3.82165 6.09818C3.50909 6.41074 3.3335 6.83467 3.3335 7.27669V15.61C3.3335 16.0521 3.50909 16.476 3.82165 16.7885C4.13421 17.1011 4.55814 17.2767 5.00016 17.2767H13.3335C13.7755 17.2767 14.1994 17.1011 14.512 16.7885C14.8246 16.476 15.0002 16.0521 15.0002 15.61V12.2767M11.6668 3.94336H16.6668M16.6668 3.94336V8.94336M16.6668 3.94336L8.3335 12.2767"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default ExportIcon;
