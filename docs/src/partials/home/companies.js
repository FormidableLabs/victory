import React from "react";
import styled from "styled-components";
import Image from "next/image";

// Assets
import VIACOM from "../../static/logos/logo-viacom.svg";
import FIVETHIRTYEIGHT from "../../static/logos/logo-fivethirtyeight.svg";
import USAFACTS from "../../static/logos/logo-usafacts.svg";
import AIRBNB from "../../static/logos/logo-airbnb.svg";
import REDFIN from "../../static/logos/logo-redfin.svg";
import TUNE from "../../static/logos/logo-tune.svg";
import ZILLOW from "../../static/logos/logo-zillow.svg";
import BENAROYA from "../../static/logos/logo-benaroya.png";
import importedTheme from "../../styles/theme";
import {
  LinkButton,
  LandingSectionWrapper,
  LandingSectionContent,
} from "./styles";

const SectionHeading = styled.h2`
  color: ${({ theme }) => theme.color.darkBrown};
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 1.58;
  letter-spacing: 0.48px;
  margin: 0;
  text-align: center;
  @media ${({ theme }) => theme.mediaQuery.md} {
    font-size: 2.4rem;
  }
`;

const CompaniesList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  grid-gap: 4rem;
  margin: 5rem 0;
  @media ${({ theme }) => theme.mediaQuery.sm} {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 1fr;
    grid-gap: 3rem;
  }
`;

const Company = styled.li`
  align-self: center;
  justify-self: center;
  max-height: 100px;
  max-width: 200px;
`;

const CompanyLogo = Image;

const Companies = () => (
  <LandingSectionWrapper bg={importedTheme.color.lightGray}>
    <LandingSectionContent>
      <SectionHeading>A Few of Our Fans</SectionHeading>
      <CompaniesList>
        <Company>
          <CompanyLogo src={AIRBNB} alt="Airbnb" title="Airbnb" />
        </Company>
        <Company>
          <CompanyLogo
            src={FIVETHIRTYEIGHT}
            alt="FiveThirtyEight"
            title="FiveThirtyEight"
          />
        </Company>
        <Company>
          <CompanyLogo src={REDFIN} alt="Redfin" title="Redfin" />
        </Company>
        <Company>
          <CompanyLogo src={USAFACTS} alt="USAFacts" title="USAFacts" />
        </Company>
        <Company>
          <CompanyLogo src={VIACOM} alt="Viacom" title="Viacom" />
        </Company>
        <Company>
          <CompanyLogo src={BENAROYA} alt="Benaroya" title="Benaroya" />
        </Company>
        <Company>
          <CompanyLogo src={ZILLOW} alt="Zillow" title="Zillow" />
        </Company>
        <Company>
          <CompanyLogo src={TUNE} alt="Tune" title="Tune" />
        </Company>
      </CompaniesList>
      <LinkButton href="/about#showcase" className="mx-auto bg-white">
        SEE SHOWCASE
      </LinkButton>
    </LandingSectionContent>
  </LandingSectionWrapper>
);

export default Companies;
