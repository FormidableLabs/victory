"use client";

import styled from "styled-components";

import StyledLayout from "@/layouts/styled-page";

import Hero from "@/partials/home/hero";
import content from "@/partials/home/content";
import Guides from "@/partials/home/guides";
import Companies from "@/partials/home/companies";
import GetStarted from "@/partials/home/get-started";
import Features from "@/partials/home/features";
import Footer from "@/partials/footer";
import MoreOss from "@/partials/home/more-oss";

const IndexWrapper = styled.div`
  background-color: white;
`;

export default function Home() {
  return (
    <StyledLayout>
      <IndexWrapper>
        <Hero />
        <Features featureArray={content.features} />
        <Companies />
        <Guides />
        <GetStarted {...content.getStarted} />
        <MoreOss {...content.oss} />
        <Footer />
      </IndexWrapper>
    </StyledLayout>
  );
}
