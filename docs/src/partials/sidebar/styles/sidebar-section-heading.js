import styled from "styled-components";

// TODO fix hierarchy of headings in sidebar

const SidebarSectionHeading = styled.p`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.font.bold};
  font-size: 1.4rem;
  letter-spacing: 0.53px;
  line-height: ${({ theme }) => theme.typography.lineHeight.sidebarHeading};
  color: ${({ theme }) => theme.color.red};
  margin-top: 1.6rem;
  padding-left: ${({ theme }) => theme.spacing.sm};
`;

export default SidebarSectionHeading;
