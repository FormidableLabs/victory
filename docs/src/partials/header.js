import React from "react";
import Link from 'next/link';
import styled, { css } from "styled-components";
import SVG from "react-inlinesvg";

import { usePathname } from "next/navigation";

const formidableIcon = "/open-source/victory/static/logos/logo-formidable-icon.svg";
const formidableLogo = "/open-source/victory/static/logos/logo-formidable.svg";
const burgerIcon = "/open-source/victory/static/burger.svg";

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.color.white};
  box-shadow: 0 0.2rem 0.7rem 0 rgba(0, 0, 0, 0.14);
  display: flex;
  height: ${({ theme }) => theme.layout.headerHeight};
  justify-content: center;
  padding-left: ${({ theme }) => theme.layout.pageGutterLeft};
  padding-right: ${({ theme }) => theme.layout.pageGutterRight};

  @media ${({ theme }) => theme.mediaQuery.md} {
    padding-left: ${({ theme }) => theme.layout.md.pageGutterLeft};
    padding-right: ${({ theme }) => theme.layout.md.pageGutterRight};
  }
`;

const InnerContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  width: 100%;
`;

const LeftContainer = styled.div`
  align-items: center;
  display: flex;
`;

const MenuButton = styled.button`
  margin-right: ${({ theme }) => theme.spacing.sm};

  @media ${({ theme }) => theme.mediaQuery.md} {
    display: none;
  }
`;

const BurgerIcon = styled(SVG)`
  display: flex;
`;

const VictoryLogoLink = ({ className, href, children }) => {
  const classNames = [
    "text-4xl font-bold tracking-wider uppercase mr-12 text-black leading-8",
    className
  ];

  return (
    <Link href={href} className={classNames.join('')}>{children}</Link>
  )
};

const NavLinksList = styled.ul`
  margin: 0;
  display: none;

  @media ${({ theme }) => theme.mediaQuery.md} {
    display: block;
  }
`;

const navItemStyle = css`
  color: ${({ active, theme }) =>
    active ? theme.color.red : theme.color.darkBrown};
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
  margin-right: 2rem;
  text-transform: uppercase;
`;

// this is needed so that we don't forward these props to the base components
// to avoid an error
// eslint-disable-next-line no-unused-vars
const NavLink = styled(({ active, theme, ...rest }) => <Link {...rest} />)`
  ${navItemStyle}
`;

// eslint-disable-next-line no-unused-vars
const NavAnchor = styled(({ active, theme, ...rest }) => <a {...rest} />)`
  ${navItemStyle}
`;

const FormidableIcon = styled(SVG)`
  color: ${({ theme }) => theme.color.red};
  display: flex;

  @media ${({ theme }) => theme.mediaQuery.md} {
    display: none;
  }

  > svg {
    height: 2.4rem;
    width: 1.8rem;
  }
`;

const FormidableLogo = styled(SVG)`
  color: ${({ theme }) => theme.color.nearBlack};
  display: none;
  height: 2.8rem;
  position: relative;
  top: -0.1rem;

  @media ${({ theme }) => theme.mediaQuery.md} {
    display: block;
  }
`;

const Header = ({ className = "", onMenuClick }) => {
  const pathname = usePathname();
  return (
    <HeaderContainer className={className}>
      <InnerContainer>
        <LeftContainer>
          <MenuButton onClick={onMenuClick}>
            <BurgerIcon src={burgerIcon} />
          </MenuButton>
          <VictoryLogoLink href="/">Victory</VictoryLogoLink>

          <NavLinksList>
            <NavLink
              active={pathname.includes("about")}
              href="/about"
            >
              About
            </NavLink>
            {/* /faq is nested under /docs but is at top-level for convenience
                so we don't want to highlight the link if /faq is the active
                path; conversely, /guides is nested under /docs but is not
                top-level, so highlight docs when on guides */}
            <NavLink
              active={
                (pathname.includes("docs") || pathname.includes("guides")) &&
                !pathname.includes("faq")
              }
              href="/docs"
            >
              Docs
            </NavLink>
            <NavLink
              active={pathname.includes("gallery")}
              href="/gallery"
            >
              Gallery
            </NavLink>

            <NavAnchor
              key="GitHub"
              href="https://github.com/FormidableLabs/victory"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </NavAnchor>

            <NavLink
              active={pathname.includes("faq")}
              href="/docs/faq"
            >
              FAQs
            </NavLink>
          </NavLinksList>
        </LeftContainer>

        <a
          href="https://commerce.nearform.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormidableIcon src={formidableIcon} />
        </a>
        <a
          href="https://commerce.nearform.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormidableLogo src={formidableLogo} />
        </a>
      </InnerContainer>
    </HeaderContainer>
  );
};

export default Header;
