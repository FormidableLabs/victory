import React from "react";
import PropTypes from "prop-types";
import { withRouteData } from "react-static";
import styled from "styled-components";
import Page from "../partials/page";
import Showcase from "../partials/about/showcase";

const Divider = styled.hr`
  height: 1px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.paleRed};
  margin: 2.8rem 0 3rem 0;
`;

const Section = styled.div`
  margin-bottom: 4.6rem;
`;

const PageHeader = styled.h1`
  font-family: ${({ theme }) => theme.font.bold};
  margin-top: 0;
  margin-bottom: 2rem;
`;

const Subheader = styled.h2`
  font-size: 3rem;
  font-family: ${({ theme }) => theme.font.bold};
  margin-top: 0;
  margin-bottom: 0.4rem;
`;

const GitHubIconContainer = styled.div`
  margin-bottom: 2.3rem;
`;

const About = ({ sidebarContent }) => {
  return (
    <Page sidebarContent={sidebarContent}>
      <PageHeader>Victory: Charting for React and React Native</PageHeader>
      <GitHubIconContainer>
        {/*
         * TODO: Customize these buttons
         * https://github.com/FormidableLabs/formidable-landers/issues/175
         */}
        <iframe
          src="https://ghbtns.com/github-btn.html?user=formidablelabs&repo=victory&type=star&count=true&size=large"
          frameBorder="0"
          scrolling="0"
          width="160px"
          height="30px"
        >
          &nbsp;
        </iframe>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=formidablelabs&repo=victory&type=watch&count=true&size=large&v=2"
          frameBorder="0"
          scrolling="0"
          width="160px"
          height="30px"
        >
          &nbsp;
        </iframe>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=formidablelabs&repo=victory&type=fork&count=true&size=large"
          frameBorder="0"
          scrolling="0"
          width="158px"
          height="30px"
        >
          &nbsp;
        </iframe>
      </GitHubIconContainer>
      <p>
        Victory is a set of modular charting components for React and React
        Native. Victory makes it easy to get started without sacrificing
        flexibility. Create one of a kind data visualizations with fully
        customizable styles and behaviors. Victory uses the same API for web and
        React Native applications for easy cross-platform charting.
      </p>
      <p>
        Victory is helmed by Formidable’s{" "}
        <a href="https://github.com/boygirl"> Lauren Eastridge</a>.
      </p>
      <p>
        <a href="https://github.com/FormidableLabs/victory/graphs/contributors">
          See Victory Contributors
        </a>
      </p>

      <Divider />

      <Section>
        <Subheader id="showcase">Victory in Use</Subheader>
        <p>
          Victory is used for charting across the web, from publicly-consumed
          informational graphs to internal tracking and reporting.
        </p>
      </Section>

      <Showcase />

      <Section>
        <Subheader>About Formidable</Subheader>
        <p>
          Formidable is a Seattle-based consultancy and development shop,
          focused on open-source, full-stack JavaScript using React.js and
          Node.js, and the architecture of large-scale JavaScript applications.
          We build products for some of the world’s biggest companies, while
          helping their internal teams develop smart, thoughtful, and scalable
          systems.
        </p>
      </Section>
    </Page>
  );
};

About.propTypes = {
  sidebarContent: PropTypes.array
};

export default withRouteData(About);
