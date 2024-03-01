import React from "react";
import Link from "next/link";

import LazyRender from "../lazy-render";
import {
  LandingSectionWrapper,
  LandingSectionContent,
  DropShadow,
} from "./styles";

// Demos
import DemoCustomChart from "./demo-custom-chart";
import DemoSharedEvents from "./demo-shared-events";
import DemoCustomComponents from "./demo-custom-components";
import DemoTooltips from "./demo-tooltips";
import DemoZoom from "./demo-zoom";
import DemoAnimation from "./demo-animation";
import styled from "styled-components";

// * the section headings could be extracted into generic style
const SectionHeading = styled.h2`
  color: ${({ theme }) => theme.color.darkBrown};
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 1.06;
  letter-spacing: 0.72px;
  margin: 0;
  text-align: center;
  @media ${({ theme }) => theme.mediaQuery.md} {
    font-size: 3.6rem;
  }
`;

const GuidesList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  grid-gap: 4rem;
  margin: 6rem 0;
  @media ${({ theme }) => theme.mediaQuery.sm} {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 1fr;
    grid-gap: 3rem;
  }
`;

const GuideDemo = styled.div`
  ${DropShadow}
  overflow: hidden;
  height: 195px;
  margin: auto;
  width: 250px;

  border: 6px solid ${({ theme }) => theme.color.accentBrown};

  @media ${({ theme }) => theme.mediaQuery.md} {
    height: 350px;
    width: 450px;
  }
`;

const GuideLinkTitle = ({ children }) => (
  <div className="block text-2xl font-bold mx-auto mt-8 text-center text-[#4c2e29] md:text-4xl md:mt-12">
    {children}
  </div>
);

const Guides = () => (
  <LandingSectionWrapper>
    <LandingSectionContent>
      <SectionHeading>Guides</SectionHeading>
      <GuidesList>
        <li>
          <Link href="/guides/custom-charts">
            <GuideDemo>
              <LazyRender LazyRenderedComponent={DemoCustomChart} />
            </GuideDemo>
            <GuideLinkTitle>Custom Charts</GuideLinkTitle>
          </Link>
        </li>
        <li>
          <Link href="/guides/brush-and-zoom">
            <GuideDemo>
              <LazyRender LazyRenderedComponent={DemoZoom} />
            </GuideDemo>
            <GuideLinkTitle>Brush and Zoom</GuideLinkTitle>
          </Link>
        </li>
        <li>
          <Link href="/guides/custom-components">
            <GuideDemo>
              <LazyRender LazyRenderedComponent={DemoCustomComponents} />
            </GuideDemo>
            <GuideLinkTitle>Custom Components</GuideLinkTitle>
          </Link>
        </li>
        <li>
          <Link href="/guides/tooltips">
            <GuideDemo>
              <LazyRender LazyRenderedComponent={DemoTooltips} />
            </GuideDemo>
            <GuideLinkTitle>Tooltips</GuideLinkTitle>
          </Link>
        </li>
        <li>
          <Link href="/guides/events">
            <GuideDemo>
              <LazyRender LazyRenderedComponent={DemoSharedEvents} />
            </GuideDemo>
            <GuideLinkTitle>Events</GuideLinkTitle>
          </Link>
        </li>
        <li>
          <Link href="/guides/animations">
            <GuideDemo>
              <LazyRender LazyRenderedComponent={DemoAnimation} />
            </GuideDemo>
            <GuideLinkTitle>Animations</GuideLinkTitle>
          </Link>
        </li>
      </GuidesList>
    </LandingSectionContent>
  </LandingSectionWrapper>
);

export default Guides;
