import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import styled from "styled-components";
import createPath from "../../../helpers/path-helpers";

import {
  SidebarSectionHeading,
  SidebarSectionList,
  SidebarListItem,
  SidebarListItemLink,
  SidebarListItemAnchorLink
} from "../styles";

const MobileSidebarLinks = styled.div`
  @media ${({ theme }) => theme.mediaQuery.md} {
    display: none;
  }
`;

const renderMobileSidebarLinks = mobileLinks => {
  return mobileLinks.map(link => {
    const isExternal = link.slug.charAt(0) !== "/";
    return (
      <SidebarListItem key={link.slug}>
        {isExternal ? (
          <SidebarListItemAnchorLink
            href={link.slug}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.title}
          </SidebarListItemAnchorLink>
        ) : (
          <SidebarListItemLink
            to={createPath(link.slug)}
            activeClassName={"is-active"}
            prefetch={"data"}
          >
            {link.title}
          </SidebarListItemLink>
        )}
      </SidebarListItem>
    );
  });
};

const Introduction = ({ content }) => {
  if (isEmpty(content)) {
    return null;
  }
  const mobileLinks = [
    { slug: "/about", title: "About" },
    { slug: "/gallery", title: "Gallery" },
    { slug: "https://spectrum.chat/victory", title: "Support" },
    { slug: "https://github.com/FormidableLabs/victory", title: "Github" },
    { slug: "/docs/faq", title: "FAQs" }
  ];
  return (
    <>
      <SidebarSectionHeading>Introduction</SidebarSectionHeading>
      <SidebarSectionList>
        {content}
        <MobileSidebarLinks>
          {renderMobileSidebarLinks(mobileLinks)}
        </MobileSidebarLinks>
      </SidebarSectionList>
    </>
  );
};

Introduction.propTypes = {
  content: PropTypes.array
};

export default Introduction;
