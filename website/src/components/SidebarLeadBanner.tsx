import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function SidebarLeadBanner() {
  return (
    <aside className="rounded-xl bg-[#f2f2f2] m-3 py-7 px-9 text-[#606770]">
      <p className="text-base font-bold">
        Like this project? You&apos;ll love working with us.
      </p>
      <p className="text-sm">
        Contact us to learn more about our full range of services and offerings.
      </p>
      <a
        className="text-[#606770] hover:text-[var(--ifm-color-primary)] text-sm font-bold flex items-center justify-end min-w-[100px] gap-1.5 underline underline-offset-4 decoration-2"
        href="/"
      >
        Learn More
        <FaArrowRight height={40} width={40} scale={5} />
      </a>
    </aside>
  );
}
