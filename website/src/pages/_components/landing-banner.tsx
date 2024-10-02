import React from "react";
import { LinkButton } from "../../components/link-button";
import { LandingDivider } from "./landing-divider";

export const LandingBanner = ({
  body,
  cta,
  heading,
  showDivider,
}: {
  body: string;
  cta: { link: string; text: string };
  heading: string;
  showDivider?: boolean;
}) => (
  <div className="flex flex-col text-left mx-16 lg:mx-32 xl:mx-64 my-8">
    {showDivider && <LandingDivider />}

    <h2 className="my-8 text-4xl font-semibold">{heading}</h2>
    <p className="text-lg">{body}</p>
    <LinkButton link={cta.link}>{cta.text}</LinkButton>
  </div>
);
