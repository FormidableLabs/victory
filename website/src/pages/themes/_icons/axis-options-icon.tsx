import React from "react";

const AxisOptionsIcon = ({ className, ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M3.75 3.75C3.75 2.98945 3.13555 2.375 2.375 2.375C1.61445 2.375 1 2.98945 1 3.75V18.1875C1 20.0867 2.53828 21.625 4.4375 21.625H21.625C22.3855 21.625 23 21.0105 23 20.25C23 19.4895 22.3855 18.875 21.625 18.875H4.4375C4.05938 18.875 3.75 18.5656 3.75 18.1875V3.75Z"
        fill="currentColor"
      />
      <path
        d="M20.6207 7.34081C21.0752 7.79523 21.0752 8.53321 20.6207 8.98763L20.6244 8.99126L15.9711 13.6445C15.5167 14.0989 14.7787 14.0989 14.3243 13.6445L12.2376 11.5578L8.98763 14.8042C8.53321 15.2586 7.79523 15.2586 7.34081 14.8042C6.8864 14.3498 6.8864 13.6118 7.34081 13.1574L11.4124 9.08578C11.8668 8.63136 12.6048 8.63136 13.0592 9.08578L15.1459 11.1725L18.9739 7.34081C19.4283 6.8864 20.1663 6.8864 20.6207 7.34081Z"
        fill="currentColor"
      />
    </svg>
  );
};
export default AxisOptionsIcon;
