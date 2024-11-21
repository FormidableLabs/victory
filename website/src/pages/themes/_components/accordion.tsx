import React from "react";
import clsx from "clsx";
import { FaChevronDown } from "react-icons/fa";

type AccordionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const Accordion = ({
  id,
  title,
  children,
  defaultOpen = false,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id={id} className="group">
      <h2 id={`${id}-heading`} className="mb-0">
        <button
          type="button"
          className={clsx(
            "bg-white flex items-center justify-between w-full px-5 py-3 text-sm font-bold rtl:text-right text-grayscale-500 border border-b-0 border-grayscale-300 gap-3 group-last:border-b",
            { "group-last:border-b-0": isOpen },
          )}
          aria-expanded="true"
          aria-controls={`${id}-body`}
          onClick={toggleAccordion}
        >
          <span>{title}</span>
          <FaChevronDown
            className={clsx("w-3 h-3 shrink-0", { "rotate-180 ": isOpen })}
          />
        </button>
      </h2>
      <div
        id={`${id}-body`}
        className={isOpen ? "block" : "hidden"}
        aria-labelledby={`${id}-heading`}
      >
        <div className="p-5 border border-b-0 border-grayscale-300 group-last:border-b">
          {children}
        </div>
      </div>
    </div>
  );
};
export default Accordion;
