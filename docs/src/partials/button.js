import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  display: inline-block;
  background: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.darkBrown};
  text-transform: uppercase;
  line-height: 4rem;
  text-align: center;
  transition: background 0.4s ease 0s;
  padding: 0 2.8rem;

  :hover {
    background: #ffece9;
  }
`;

const Button = ({ children, onClick }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default Button;
