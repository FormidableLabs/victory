import React from "react";
import styled from "styled-components";
import Guides from "../partials/home/guides";
import Companies from "../partials/home/companies";
import Hero from "../partials/home/hero";
import GetStarted from "../partials/home/get-started";
import Features from "../partials/home/features";
import Footer from "../partials/footer";
import content from "../partials/home/_content";
import MoreOss from "../partials/home/more-oss";

const IndexWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.white};
`;

const Index = () => (
  <IndexWrapper>
    <Hero {...content.hero} />
    <Features featureArray={content.features} />
    <Companies />
    <Guides />
    <GetStarted {...content.getStarted} />
    <MoreOss {...content.oss} />
    <Footer />
  </IndexWrapper>
);

export default Index;
