import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const InputContainer = styled.div`
  margin: ${({ theme }) => `0 ${theme.spacing.sm} 0 ${theme.spacing.sm}`};
`;

const StyledInput = styled.input`
  width: 100%;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  line-height: 2.3rem;
  letter-spacing: -0.6px;
  padding: 0.4rem 0.9rem 0.6rem;
  color: ${({ theme }) => theme.color.black};
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  font-family: ${({ theme }) => theme.font.secondary};
`;

const SidebarSearchInput = ({ content, onHandleInputChange, searchText }) => (
  <InputContainer>
    <StyledInput
      placeholder="Filter..."
      type="search"
      value={searchText}
      onChange={e => onHandleInputChange(e.target.value, content)}
    />
  </InputContainer>
);

SidebarSearchInput.propTypes = {
  content: PropTypes.array,
  onHandleInputChange: PropTypes.func,
  searchText: PropTypes.string
};

export default SidebarSearchInput;
