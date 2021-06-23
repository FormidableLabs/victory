import React from "react";
import { Link } from "react-router-dom";

import LazyRender from "../lazy-render";
import {
  LandingSectionWrapper,
  LandingSectionContent,
  DropShadow
} from "./styles";

import createPath from "../../helpers/path-helpers";

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
const GuideLink = styled(Link)`
  color: ${({ theme }) => theme.color.darkBrown};
  display: block;
  font-size: 1.8rem;
  font-weight: bold;
  margin: auto;
  margin-top: 1.5rem;
  text-align: center;

  @media ${({ theme }) => theme.mediaQuery.sm} {
    line-height: 1.29;
    margin-top: 2rem;
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
    font-size: 2.4rem;
    line-height: 1.6;
    margin-top: 2.3rem;
  }
`;

const Guides = () => (
  <LandingSectionWrapper>
    <LandingSectionContent>
      <SectionHeading>Guides</SectionHeading>
      <GuidesList>
        <li>
          <GuideDemo>
            <LazyRender LazyRenderedComponent={DemoCustomChart} />
          </GuideDemo>
          <GuideLink to={createPath("/guides/custom-charts")}>
            Custom Charts
          </GuideLink>
        </li>
        <li>
          <GuideDemo>
            <LazyRender LazyRenderedComponent={DemoZoom} />
          </GuideDemo>
          <GuideLink to={createPath("/guides/brush-and-zoom")}>
            Brush and Zoom
          </GuideLink>
        </li>
        <li>
          <GuideDemo>
            <LazyRender LazyRenderedComponent={DemoCustomComponents} />
          </GuideDemo>
          <GuideLink to={createPath("/guides/custom-components")}>
            Custom Components
          </GuideLink>
        </li>
        <li>
          <GuideDemo>
            <LazyRender LazyRenderedComponent={DemoTooltips} />
          </GuideDemo>
          <GuideLink to={createPath("/guides/tooltips")}>Tooltips</GuideLink>
        </li>
        <li>
          <GuideDemo>
            <LazyRender LazyRenderedComponent={DemoSharedEvents} />
          </GuideDemo>
          <GuideLink to={createPath("/guides/events")}>Events</GuideLink>
        </li>
        <li>
          <GuideDemo>
            <LazyRender LazyRenderedComponent={DemoAnimation} />
          </GuideDemo>
          <GuideLink to={createPath("/guides/animations")}>
            Animations
          </GuideLink>
        </li>
      </GuidesList>
    </LandingSectionContent>
  </LandingSectionWrapper>
);

export default Guides;
