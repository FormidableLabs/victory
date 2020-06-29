import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import SVG from "react-inlinesvg";
import createPath from "../helpers/path-helpers";
import config from "../../static-config-helpers/site-data";
import formidableIcon from "../../static/logos/logo-formidable-icon.svg";
import formidableLogo from "../../static/logos/logo-formidable.svg";
import burgerIcon from "../../static/burger.svg";

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

const VictoryLogoLink = styled(Link)`
  color: ${({ theme }) => theme.color.nearBlack};
  font-size: 2.4rem;
  font-weight: bold;
  letter-spacing: 0.4rem;
  margin-right: 3rem;
  text-transform: uppercase;
  @media ${({ theme }) => theme.mediaQuery.md} {
    font-size: 2.8rem;
  }
`;

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
  const location = useLocation();
  const pathname = location ? location.pathname : "";
  return (
    <HeaderContainer className={className}>
      <InnerContainer>
        <LeftContainer>
          <MenuButton onClick={onMenuClick}>
            <BurgerIcon src={burgerIcon} />
          </MenuButton>
          <VictoryLogoLink to={createPath("/")}>Victory</VictoryLogoLink>

          <NavLinksList>
            <NavLink
              active={pathname.includes("about")}
              to={createPath("about")}
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
              to={createPath("docs")}
            >
              Docs
            </NavLink>
            <NavLink
              active={pathname.includes("gallery")}
              to={createPath("gallery")}
            >
              Gallery
            </NavLink>

            {config.projectLinks.map(link => (
              <NavAnchor
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </NavAnchor>
            ))}

            <NavLink
              active={pathname.includes("faq")}
              to={createPath("docs/faq")}
            >
              FAQs
            </NavLink>
          </NavLinksList>
        </LeftContainer>

        <a
          href="https://formidable.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormidableIcon src={formidableIcon} />
        </a>
        <a
          href="https://formidable.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormidableLogo src={formidableLogo} />
        </a>
      </InnerContainer>
    </HeaderContainer>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  onMenuClick: PropTypes.func
};

export default Header;
