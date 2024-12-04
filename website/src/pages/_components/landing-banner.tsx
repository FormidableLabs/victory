import React from "react";
import { FaArrowRight } from "react-icons/fa";

export const LandingBanner = () => (
  <div className="bg-[#4589FF] text-white py-7 px-5 sm:py-2 sm:px-4">
    <div className="lg:max-w-[90%] flex flex-col sm:flex-row justify-between sm:items-center m-auto">
      <div className="flex flex-col sm:flex-row gap-2.5">
        <p className="m-0 text-sm font-bold">
          Like this project? You&apos;ll love working with us.
        </p>
        <p className="m-0 text-sm">
          Contact us to learn more{" "}
          <span className="hidden lg:inline">
            about our full range of services and offerings.
          </span>
        </p>
      </div>
      <a
        className="text-white text-sm font-bold flex items-center justify-end gap-1.5 underline underline-offset-4 decoration-2 hover:text-white mt-2.5 sm:mt-0"
        href="/"
      >
        Learn More
        <FaArrowRight height={40} width={40} scale={5} />
      </a>
    </div>
  </div>
);
