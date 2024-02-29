import React from "react";
import styled, { css } from "styled-components";

import {
  LinkButton,
  LandingSectionWrapper,
  LandingSectionContent,
} from "./styles";
import importedTheme from "../../styles/theme";

const stripeStyle = css`
  content: "";
  display: block;
  height: ${({ theme }) => `calc(${theme.layout.stripesWidth} / 2)`};
  width: 100%;
  background-color: ${({ bg }) => bg};
`;

const Stripe = styled.div`
  ${stripeStyle}
`;

const SectionHeading = styled.h2`
  margin: 0;
`;

const SectionDescription = styled.p`
  margin: 0 0 5rem 0;
`;

const StyledLandingSectionContent = styled(LandingSectionContent)`
  text-align: center;
`;

const GetStarted = ({ description, link }) => {
  return (
    <LandingSectionWrapper bg={importedTheme.color.red}>
      <StyledLandingSectionContent color={importedTheme.color.white}>
        <SectionHeading>Get Started</SectionHeading>
        <SectionDescription>{description}</SectionDescription>
        <LinkButton href={link.location} className="mx-auto bg-white">{link.text}</LinkButton>
      </StyledLandingSectionContent>
      <Stripe bg={importedTheme.color.brown} />
      <Stripe bg={importedTheme.color.otherBrown} />
    </LandingSectionWrapper>
  );
};

export default GetStarted;
