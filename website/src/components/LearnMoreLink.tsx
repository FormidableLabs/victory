import React from "react";
import { ComponentProps } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function LearnMoreLink(
  props: Omit<ComponentProps<"a">, "href">,
) {
  return (
    <a
      href="https://commerce.nearform.com/contact?lead_source_2_0=Open%20Source"
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      Learn More
      <FaArrowRight height={40} width={40} scale={5} />
    </a>
  );
}
