import React from "react";
import styled from "styled-components";
import { Element } from "react-scroll";
import Image from "next/image";

import { LandingSectionWrapper, LandingSectionContent } from "./styles";

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
  margin: 3rem 0;
  padding: 2rem;
  @media ${({ theme }) => theme.mediaQuery.sm} {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
    grid-gap: 3rem;
    margin: 6rem 0;
    padding: 0;
  }
`;

const Feature = styled.li`
  justify-self: center;
  padding: 0;
  width: 100%;
  @media ${({ theme }) => theme.mediaQuery.md} {
    width: 28rem;
  }
`;

const FeatureImg = ({ className, ...props }) => (
  <Image className={`feature-img ${className}`} {...props} />
);

const FeatureTitle = styled.h3`
  color: ${({ theme }) => theme.color.darkBrown};
  font-family: Helvetica Neue;
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 4rem;
  line-height: 0.96;
  text-align: center;
  @media ${({ theme }) => theme.mediaQuery.sm} {
    margin-top: calc(2rem + 20px);
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
    font-size: 2rem;
  }
`;

const FeatureText = styled.p`
  font-size: 1.5rem;
  line-height: 1.29;
  text-align: center;
  margin: 2.75rem 0 0;
  @media ${({ theme }) => theme.mediaQuery.sm} {
    line-height: 1.29;
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
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
        {featureArray.map((feature) => (
          <Feature key={feature.title}>
            <FeatureImg
              src={feature.icon}
              width={280}
              height={280}
              alt={feature.title}
              title={feature.description}
            />
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

export default Features;
