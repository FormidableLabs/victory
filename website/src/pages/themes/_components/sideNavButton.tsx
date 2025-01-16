import clsx from "clsx";
import React from "react";
import { NavItem } from "./sidenav";

type SideNavButtonProps = {
  item: NavItem;
  Icon: React.ElementType;
  isActive: boolean;
  isDisabled?: boolean;
  onClick: () => void;
};

const SideNavButton = ({
  item,
  Icon,
  isActive,
  isDisabled = false,
  onClick,
}: SideNavButtonProps) => {
  return (
    <button
      key={item.title}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
      disabled={isDisabled}
      className={clsx(
        "group flex w-full flex-col items-center rounded-md p-3 text-xs font-semibold cursor-pointer",
        isActive
          ? "text-white bg-gray-800"
          : "text-grayscale-300 hover:text-white disabled:text-grayscale-800 disabled:cursor-not-allowed bg-transparent hover:bg-gray-900",
      )}
    >
      <Icon
        aria-hidden="true"
        className={clsx(
          isActive
            ? "text-orange-100"
            : "text-grayscale-300 group-hover:text-white group-disabled:text-grayscale-800",
          "size-6",
        )}
      />
      <span className="mt-2">{item.title}</span>
    </button>
  );
};

export default SideNavButton;
