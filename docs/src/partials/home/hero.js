import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { FeaturedBadge } from "formidable-oss-badges";

import siteConfig from "@/static-config-helpers/site-data";
import nearformLogo from "@/static/logos/nearform-commerce-logo-white.svg";
import HeroDemo from "./hero-demo";
import NpmCopy from "./npm-copy";
import { LandingSectionContent, LinkButton } from "./styles";

const HeroContainer = styled.section`
  background-image: url(${({ $bg }) => $bg});
  background-size: cover;
  color: ${({ theme }) => theme.color.white};
  height: 650px;
  /* used to remove the 1px white border */
  margin-top: -1px;
  @media ${({ theme }) => theme.mediaQuery.sm} {
    height: 600px;
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
    height: 690px;
    margin-bottom: -1px;
  }
`;

const Corner = styled.div`
  background-color: #242526;
  clip-path: polygon(0 0, 0 100%, 100% 0);
  height: 156px;
  padding: 15px 18px;
  position: absolute;
  width: 126px;
  @media ${({ theme }) => theme.mediaQuery.sm} {
    height: 164px;
    width: 130px;
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
    padding: 26px 30px;
    height: 268px;
    width: 220px;
  }
`;

const CornerText = styled.p`
  color: ${({ theme }) => theme.color.white};
  font-size: 0.8rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: 0.57px;
  margin: 0;
  margin-top: 10px;
  white-space: pre-line;
  @media ${({ theme }) => theme.mediaQuery.md} {
    font-size: 1.2rem;
    letter-spacing: 0.86px;
  }
`;

const CornerF = styled.a`
  > img {
    color: ${({ theme }) => theme.color.nearBlack};
    margin-top: 16px;
    height: 19px;
    width: 40px;
    @media ${({ theme }) => theme.mediaQuery.md} {
      height: 32px;
      width: 65px;
    }
  }
`;

const CenterWrapper = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.color.red};
  display: grid;

  margin-top: 6rem;
  padding-bottom: 4rem;
  grid-row-gap: 3.5rem;
  grid-template-areas: "badge" "heading" "subheading" "getstarted";
  grid-template-columns: 1fr;
  grid-auto-rows: auto;

  > h1,
  h2 {
    margin: 0;
  }

  @media ${({ theme }) => theme.mediaQuery.sm} {
    grid-template-areas: "badge heading" "badge subheading" "badge getstarted";
    grid-auto-columns: auto;
    grid-column-gap: 5rem;
    grid-row-gap: 1rem;
    grid-template-columns: auto 1fr;
    grid-template-rows: repeat(3, 1fr);
    margin-top: 10rem;
    padding-bottom: 6rem;
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
    grid-column-gap: 8rem;
    margin-top: 15rem;
    padding-bottom: 8rem;
  }
`;

const HeroBadge = styled.div`
  align-self: center;
  justify-self: center;
  grid-area: badge;
  width: 180px;
  @media ${({ theme }) => theme.mediaQuery.sm} {
    justify-self: left;
    width: 215px;
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
    width: 300px;
  }
`;

const SectionHeading = styled.h1`
  align-self: center;
  justify-self: center;
  font-size: 3rem;
  font-weight: bold;
  grid-area: heading;
  letter-spacing: 6px;
  @media ${({ theme }) => theme.mediaQuery.sm} {
    font-size: 4.8rem;
    justify-self: left;
    letter-spacing: 9px;
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
    font-size: 8rem;
    letter-spacing: 12.41px;
  }
`;

const SectionSubHeading = styled.h2`
  align-self: center;
  font-size: 1.8rem;
  grid-area: subheading;
  line-height: 1.67;
  @media ${({ theme }) => theme.mediaQuery.sm} {
    font-size: 2.4rem;
    line-height: 1.25;
  }
`;

const GetStarted = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  grid-area: getstarted;
  grid-template-columns: 1fr;
  align-items: center;

  @media ${({ theme }) => theme.mediaQuery.sm} {
    align-items: start;
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
    flex-direction: row;
    grid-template-columns: 1fr 1fr;
  }
`;

const LinkContainer = styled.div`
  display: none;
  @media ${({ theme }) => theme.mediaQuery.sm} {
    display: grid;
    grid-template-columns: repeat(7, auto);
    grid-gap: 10px;
    margin: 3rem auto 0 auto;
    padding: 0 50px;
    width: 637px;
  }
`;

const LinkItem = ({ href, children }) => {
  return (
    <Link href={href} className="text-white justify-self-center">
      {children}
    </Link>
  );
};

const StyledLinkButton = styled(LinkButton)`
  margin-top: 1.2rem;
  @media ${({ theme }) => theme.mediaQuery.sm} {
    width: 300px;
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
    margin-top: 0;
    margin-left: 2rem;
    width: 200px;
  }
`;

const content = {
  linksArray: [
    {
      text: "ABOUT",
      location: "/about",
    },
    {
      text: "DOCS",
      location: "/docs",
    },
    {
      text: "GALLERY",
      location: "/gallery",
    },
    {
      text: "GITHUB",
      location: "https://github.com/FormidableLabs/victory",
      external: true,
    },
    {
      text: "FAQS",
      location: "/docs/faq",
    },
  ],
};

const Hero = () => (
  <>
    <HeroContainer $bg="/open-source/victory/static/hero-background.svg">
      <Corner>
        <CornerText>
          ANOTHER OSS
          <br />
          PROJECT BY
        </CornerText>
        <CornerF
          href="https://commerce.nearform.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={nearformLogo} alt="Nearform Logo" title="Nearform" />
        </CornerF>
      </Corner>
      <LandingSectionContent>
        <CenterWrapper>
          <HeroBadge>
            <FeaturedBadge name="victory" />
          </HeroBadge>
          <SectionHeading>VICTORY</SectionHeading>
          <SectionSubHeading>{siteConfig.siteDescription}</SectionSubHeading>
          <GetStarted>
            <NpmCopy text="npm install victory" />
            <StyledLinkButton href="/docs" noMargin>
              DOCUMENTATION
            </StyledLinkButton>
          </GetStarted>
        </CenterWrapper>
        <LinkContainer>
          {content.linksArray.map((l) => {
            return l.external ? (
              <LinkItem
                key={l.text}
                href={l.location}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.text}
              </LinkItem>
            ) : (
              <LinkItem key={l.text} href={l.location}>
                {l.text}
              </LinkItem>
            );
          })}
        </LinkContainer>
      </LandingSectionContent>
    </HeroContainer>
    <HeroDemo />
  </>
);

export default Hero;
