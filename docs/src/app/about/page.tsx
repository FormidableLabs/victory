"use client";

import styled from "styled-components";

import StyledLayout from "@/layouts/styled-page";

import Page from "@/partials/page";
import Showcase from "@/partials/about/showcase";
import Footer from "@/partials/footer";

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

export default function Home() {
  return (
    <StyledLayout>
      <Page sidebarContent={null}>
        <PageHeader>Victory: Charting for React and React Native</PageHeader>
        <GitHubIconContainer>
          {/*
           * TODO: Customize these buttons
           * https://github.com/FormidableLabs/formidable-landers/issues/175
           */}
          <iframe
            src="https://ghbtns.com/github-btn.html?user=formidablelabs&repo=victory&type=star&count=true&size=large"
            width="160px"
            height="30px"
            className="inline-block"
          >
            &nbsp;
          </iframe>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=formidablelabs&repo=victory&type=watch&count=true&size=large&v=2"
            width="160px"
            height="30px"
            className="inline-block"
          >
            &nbsp;
          </iframe>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=formidablelabs&repo=victory&type=fork&count=true&size=large"
            width="158px"
            height="30px"
            className="inline-block"
          >
            &nbsp;
          </iframe>
        </GitHubIconContainer>
        <p>
          Victory is a set of modular charting components for React and React
          Native. Victory makes it easy to get started without sacrificing
          flexibility. Create one of a kind data visualizations with fully
          customizable styles and behaviors. Victory uses the same API for web
          and React Native applications for easy cross-platform charting.
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

        <Footer />
      </Page>
    </StyledLayout>
  );
}
