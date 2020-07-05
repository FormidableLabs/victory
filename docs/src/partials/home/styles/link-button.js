import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// * Use isExternal prop to create an anchor link with the same styling
// eslint-disable-next-line no-unused-vars
const LinkButton = styled(({ isExternal, noMargin, ...props }) =>
  isExternal ? (
    <a {...props} href={props.to} target="_blank" rel="noopener noreferrer" />
  ) : (
    <Link {...props} />
  )
)`
  background-color: ${({ bg, theme }) => bg || theme.color.white};
  color: ${({ color, theme }) => color || theme.color.black};
  display: block;
  font-size: 1.4rem;
  height: 40px;
  line-height: 40px;
  margin: ${({ noMargin }) => noMargin || "auto"};
  letter-spacing: 1px;
  width: ${({ width }) => width || "200px"};
  text-align: center;
`;

export default LinkButton;
