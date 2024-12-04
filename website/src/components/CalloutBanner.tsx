import React from "react";
import { FaArrowRight } from "react-icons/fa";

const CalloutBanner = ({ fullWidth = false }) => {
  return (
    <div
      className={`rounded-xl bg-[#202020] mb-24 ${!fullWidth ? "w-[65%]" : ""} m-auto py-6 px-8 border-solid border-[6px] border-[#8F4438] outline outline-[6px] outline-[#FF684F]`}
    >
      <p className="m-0 text-[var(--ifm-color-primary)] text-xl font-bold">
        Like this project? You&apos;ll love working with us.
      </p>
      <div className="flex flex-col sm:flex-row mt-2.5 items-end justify-between">
        <p className="m-0 text-white text-sm mb-6 sm:mb-0">
          Contact us to learn more about our full range of services and
          offerings.
        </p>
        <a
          className="text-white text-sm font-bold flex items-center justify-between min-w-[100px] gap-1.5 underline underline-offset-4 decoration-2 text-[var(--ifm-color-primary)] hover:text-white"
          href="/"
        >
          Learn More
          <FaArrowRight height={40} width={40} scale={5} />
        </a>
      </div>
    </div>
  );
};

export default CalloutBanner;
