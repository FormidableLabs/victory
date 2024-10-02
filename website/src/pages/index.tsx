import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import { LandingHero } from "./_components/landing-hero";
import { LandingFeaturedProjects } from "./_components/landing-featured-projects";
import { LandingFeatures } from "./_components/landing-features";
import { LandingDemo } from "./_components/landing-demo";
import { LandingShowcase } from "./_components/landing-showcase";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <LandingHero />
      <LandingDemo />
      <LandingFeatures />
      <LandingShowcase />
      <LandingFeaturedProjects />
    </Layout>
  );
}
