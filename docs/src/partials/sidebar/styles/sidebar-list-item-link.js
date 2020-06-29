import styled from "styled-components";
import { NavLink } from "react-router-dom";
import SidebarListItemLinkStyle from "./sidebar-list-item-link-style";

const SidebarListItemLink = styled(NavLink)`
  ${SidebarListItemLinkStyle}
`;

export default SidebarListItemLink;
