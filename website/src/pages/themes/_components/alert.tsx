import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  FaCircleCheck,
  FaCircleInfo,
  FaCircleXmark,
  FaTriangleExclamation,
} from "react-icons/fa6";

export enum AlertType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}

export type AlertProps = {
  id: number;
  type: AlertType;
  title: string;
  message?: string;
  duration?: number;
};

type AlertComponentProps = Omit<AlertProps, "id"> & {
  onClose: () => void;
};

const alertStyles: Record<
  AlertComponentProps["type"],
  {
    iconStyle: string;
    typeStyle: string;
    buttonStyle: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }
> = {
  success: {
    iconStyle: "text-green-400",
    typeStyle: "bg-green-50 text-green-800",
    buttonStyle: "hover:bg-green-100",
    Icon: FaCircleCheck,
  },
  error: {
    iconStyle: "text-red-400",
    typeStyle: "bg-red-50 text-red-800",
    buttonStyle: "hover:bg-red-100",
    Icon: FaCircleXmark,
  },
  info: {
    iconStyle: "text-blue-400",
    typeStyle: "bg-blue-50 text-blue-800",
    buttonStyle: "hover:bg-blue-100",
    Icon: FaCircleInfo,
  },
  warning: {
    iconStyle: "text-yellow-400",
    typeStyle: "bg-yellow-50 text-yellow-800",
    buttonStyle: "hover:bg-yellow-100",
    Icon: FaTriangleExclamation,
  },
};

const DEFAULT_DURATION = 5000;

const Alert = ({
  type,
  title,
  message,
  onClose,
  duration = DEFAULT_DURATION,
}: AlertComponentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    if (duration) {
      const timer = setTimeout(() => setIsVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const { Icon, typeStyle, iconStyle, buttonStyle } = alertStyles[type];

  return (
    <div
      className={clsx(
        "flex items-start p-4 mb-4 rounded shadow-md gap-3 min-w-[500px] transform transition-all duration-500",
        typeStyle,
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
      )}
      onTransitionEnd={() => !isVisible && onClose()}
    >
      <Icon className={clsx("pt-0.5 h-5 w-5", iconStyle)} />
      <div className="flex-1">
        <h4 className="text-sm font-medium m-0">{title}</h4>
        {message && <p className="text-sm font-normal mt-2 mb-0">{message}</p>}
      </div>
      <button
        onClick={handleClose}
        className={clsx(
          "bg-transparent border-none cursor-pointer p-1.5 -m-1.5 rounded-md",
          iconStyle,
          buttonStyle,
        )}
      >
        <IoClose className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Alert;
