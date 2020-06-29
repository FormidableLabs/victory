import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BounceAnimation } from "./styles/";
import styled from "styled-components";

const HeroNPMWrapper = styled.div`
  color: ${({ theme }) => theme.color.black};
  display: flex;
  flex-direction: row;
  flex: 1 0 auto;
  width: 100%;
  @media ${({ theme }) => theme.mediaQuery.sm} {
    width: 300px;
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
    max-width: 350px;
  }
`;

const HeroNPMCopy = styled.p`
  width: 22rem;
  height: 4rem;
  background-color: ${({ theme }) => theme.color.white};
  color: black;
  text-align: left;
  padding: 0.33rem 1.5rem;
  line-height: 3.44rem;
  font-size: 1.4rem;
  letter-spacing: 0.2px;
  margin: 0;
  flex: 1 0 auto;
`;

const HeroNPMButton = styled.button`
  width: 8rem;
  height: 4rem;
  background: ${({ theme }) => theme.color.red};
  transition: background 0.4s;
  font-size: 1.4rem;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1px;
  border: 0;
  text-transform: uppercase;
  cursor: copy;
  &:hover {
    background: ${({ theme }) => theme.color.lightGray};
  }
`;

const NpmCopy = ({ text }) => {
  const [animating, setAnimating] = useState(false);
  const [copied, setCopied] = useState(false);
  const animatingTimeout = useRef(null);
  const copiedTimeout = useRef(null);

  const handleCopy = e => {
    e.preventDefault();
    setAnimating(true);
    setCopied(true);
    clearTimeout(animatingTimeout.current);
    clearTimeout(copiedTimeout.current);
    animatingTimeout.current = setTimeout(() => {
      setAnimating(false);
    }, "100");
    copiedTimeout.current = setTimeout(() => {
      setCopied(false);
    }, "3000");
  };

  return (
    <CopyToClipboard text={text}>
      <HeroNPMWrapper>
        <HeroNPMCopy>{text}</HeroNPMCopy>
        <HeroNPMButton onClick={handleCopy}>
          <BounceAnimation bouncing={animating}>
            {copied ? "Copied" : "Copy"}
          </BounceAnimation>
        </HeroNPMButton>
      </HeroNPMWrapper>
    </CopyToClipboard>
  );
};

NpmCopy.propTypes = {
  text: PropTypes.string
};

export default NpmCopy;
