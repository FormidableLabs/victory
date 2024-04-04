import React from "react";
import styled from "styled-components";
import Image from "next/image";

import nearFormLogo from "../static/logos/nearform-logo-white.svg";

const FooterContainer = styled.footer`
  background-color: #1b1b1d;
  color: ${({ theme }) => theme.color.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 48px 48px;
`;

const BrandLogo = styled.a`
  display: block;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const Footer = ({ className = "" }) => (
  <FooterContainer className={className}>
    <BrandLogo
      href="https://commerce.nearform.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src={nearFormLogo} alt="Nearform logo" height={100} width={100} />
    </BrandLogo>
    <div>Copyright © 2013-2024 Nearform</div>
  </FooterContainer>
);

export default Footer;
