import React from "react";
import clsx from "clsx";
import { FaChevronDown } from "react-icons/fa";

const Accordion = ({ id, title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id={id} className="group">
      <h2 id={`${id}-heading`}>
        <button
          type="button"
          className={clsx(
            "flex items-center justify-between w-full px-5 py-3 text-sm font-bold rtl:text-right text-gray-500 border border-b-0 border-gray-200 gap-3 group-last:border-b",
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
        <div className="p-5 border border-b-0 border-gray-200 group-last:border-b">
          {children}
        </div>
      </div>
    </div>
  );
};
export default Accordion;
