import { css } from "styled-components";

const SidebarListItemLinkStyle = css`
  color: ${({ theme }) => theme.color.brown};
  font-family: ${({ theme }) => theme.font.bold};
  font-size: 1.4rem;
  letter-spacing: 0.53px;
  line-height: ${({ theme }) => theme.typography.lineHeight.sidebarHeading};
  display: block;
  padding: 0.4rem 0.7rem 0.3rem 3.4rem;
  hyphens: auto;
  &.is-active {
    background-color: ${({ theme }) => theme.color.darkGray};
  }
`;

export default SidebarListItemLinkStyle;
