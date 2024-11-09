import React from "react";
import Layout from "@theme/Layout";

import { LandingHero } from "./_components/landing-hero";
import { LandingFeaturedProjects } from "./_components/landing-featured-projects";
import { LandingFeatures } from "./_components/landing-features";
import { LandingDemo } from "./_components/landing-demo";
import { LandingShowcase } from "./_components/landing-showcase";

// eslint-disable-next-line no-undef
export default function Home(): JSX.Element {
  return (
    <Layout>
      <LandingHero />
      <LandingDemo />
      <LandingFeatures />
      <LandingShowcase />
      <LandingFeaturedProjects />
    </Layout>
  );
}
