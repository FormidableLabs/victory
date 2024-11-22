import React from "react";
import Layout from "@theme/Layout";

import { LandingHero } from "./_components/landing-hero";
import { LandingFeaturedProjects } from "./_components/landing-featured-projects";
import { LandingFeatures } from "./_components/landing-features";
import { LandingDemo } from "./_components/landing-demo";
import { LandingShowcase } from "./_components/landing-showcase";
import { LandingBanner } from "./_components/landing-banner";
import { FaArrowRight } from "react-icons/fa";

const OtherBanner = () => {
  return (
    <div className="rounded-xl bg-[#202020] mb-24 w-[65%] m-auto py-6 px-8">
      <p className="m-0 text-[var(--ifm-color-primary)] text-xl font-bold">
        Like this project? You'll love working with us.
      </p>
      <div className="flex mt-2.5 items-end justify-between">
        <p className="m-0 text-white text-sm">
          Contact us to learn more about our full range of services and
          offerings.
        </p>
        <a
          className="text-white text-sm font-bold flex items-center gap-1.5 underline underline-offset-4 decoration-2 text-[var(--ifm-color-primary)] hover:text-white"
          href="/"
        >
          Learn More
          <FaArrowRight height={40} width={40} scale={5} />
        </a>
      </div>
    </div>
  );
};

// eslint-disable-next-line no-undef
export default function Home(): JSX.Element {
  return (
    <Layout>
      <LandingBanner />
      <LandingHero />
      <LandingDemo />
      <LandingFeatures />
      <LandingShowcase />
      <LandingFeaturedProjects />
      <OtherBanner />
    </Layout>
  );
}
