import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Element } from "react-scroll";

import LazyImage from "../lazy-image";
import {
  LandingSectionWrapper,
  LandingSectionContent,
  DropShadow
} from "./styles";

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

const FeaturesList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  grid-gap: 4rem;
  margin: 6rem 0;
  @media ${({ theme }) => theme.mediaQuery.sm} {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
    grid-gap: 3rem;
  }
`;

const Feature = styled.li`
  justify-self: center;
  padding: 0;
  width: 18.5rem;
  @media ${({ theme }) => theme.mediaQuery.md} {
    width: 28rem;
  }
`;

const FeatureImg = styled(LazyImage)`
  ${DropShadow}
  display: block;
  margin: auto;
`;

const FeatureTitle = styled.h3`
  color: ${({ theme }) => theme.color.darkBrown};
  font-family: HelveticaNeue;
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 4rem;
  line-height: 0.96;
  text-align: center;
  @media ${({ theme }) => theme.mediaQuery.sm} {
    margin-top: 3rem;
    text-align: left;
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
    font-size: 2.4rem;
  }
`;

const FeatureText = styled.p`
  font-size: 1.4rem;
  line-height: 1.29;
  @media ${({ theme }) => theme.mediaQuery.sm} {
    line-height: 1.29;
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
    font-size: 2.4rem;
    line-height: 1.6;
  }
`;

const CodeWrapper = styled.span`
  display: block;
  padding-top: 1rem;
  &&& {
    > code {
      margin: 0;
      font-size: 1.1rem;
      @media ${({ theme }) => theme.mediaQuery.md} {
        font-size: 1.6rem;
      }
    }
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
    padding-top: 0;
  }
`;

const Features = ({ featureArray }) => (
  <LandingSectionWrapper>
    <LandingSectionContent>
      <Element name="Features">
        <SectionHeading>Features</SectionHeading>
      </Element>
      <FeaturesList>
        {featureArray.map(feature => (
          <Feature key={feature.title}>
            <FeatureImg src={feature.icon} />
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureText>
              {feature.description}{" "}
              {feature.code && (
                <CodeWrapper>
                  {/* explicit className not ideal but had to target the prism style */}
                  <code className="language-bash">{feature.code}</code>
                </CodeWrapper>
              )}
            </FeatureText>
          </Feature>
        ))}
      </FeaturesList>
    </LandingSectionContent>
  </LandingSectionWrapper>
);

const featureProps = {
  title: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  description: PropTypes.string,
  code: PropTypes.string
};

Features.propTypes = {
  featureArray: PropTypes.arrayOf(PropTypes.shape(featureProps))
};

export default Features;
