import styled from "styled-components";

const SidebarSectionList = styled.ul`
  font-family: ${({ theme }) => theme.font.bold};
  font-size: 1.4rem;
  letter-spacing: 0.53px;
  line-height: ${({ theme }) => theme.typography.lineHeight.sidebarHeading};
  color: ${({ theme }) => theme.color.brown};
  margin-top: 0;
`;

export default SidebarSectionList;
