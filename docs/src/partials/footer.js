import React from "react";
import PropTypes from "prop-types";
import SVG from "react-inlinesvg";
import styled from "styled-components";
import formidableIcon from "../../static/logos/logo-formidable-icon.svg";

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.white};
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${({ theme }) => theme.layout.footerHeight};
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing.md};
  width: 100%;

  @media ${({ theme }) => theme.mediaQuery.md} {
    flex-direction: row;
    height: ${({ theme }) => theme.layout.md.footerHeight};
    max-width: ${({ theme }) => theme.layout.footerMaxWidth};
    padding-bottom: ${({ theme }) => theme.spacing.lg};
    padding-top: ${({ theme }) => theme.spacing.lg};
  }
`;

const IconAndContact = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  margin-right: ${({ theme }) => theme.spacing.xl};
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;

  > a {
    color: ${({ theme }) => theme.color.white};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const Icon = styled(SVG)`
  margin-right: ${({ theme }) => theme.spacing.sm};

  > svg {
    color: ${({ theme }) => theme.color.white};
    height: 6rem;
  }
`;

const Blurb = styled.p`
  margin: 0;
`;

const Footer = ({ className = "" }) => (
  <FooterContainer className={className}>
    <InnerContainer>
      <IconAndContact>
        <a
          href="https://formidable.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon src={formidableIcon} />
        </a>
        <Contact>
          <a
            href="https://formidable.com/contact/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CONTACT
          </a>
          <a
            href="https://formidable.com/careers/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CAREERS
          </a>
        </Contact>
      </IconAndContact>
      <Blurb>
        Formidable is a Seattle, Denver, Phoenix and London-based engineering
        consultancy and open source software organization, specializing in
        React.js, React Native, GraphQL, Node.js, and the extended JavaScript
        ecosystem. We build products for some of the world’s biggest companies,
        while helping their internal teams develop smart, thoughtful, and
        scalable systems.
      </Blurb>
    </InnerContainer>
  </FooterContainer>
);

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
