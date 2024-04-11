import React from "react";
import { isEmpty } from "lodash";
import styled from "styled-components";

import {
  SidebarSectionHeading,
  SidebarSectionList,
  SidebarListItem,
  SidebarListItemLink,
} from "../styles";

const MobileSidebarLinks = styled.div`
  @media ${({ theme }) => theme.mediaQuery.md} {
    display: none;
  }
`;

const renderMobileSidebarLinks = (mobileLinks) => {
  return mobileLinks.map((link) => {
    const isExternal = link.slug.charAt(0) !== "/";
    return (
      <SidebarListItem key={link.slug}>
        {isExternal ? (
          <SidebarListItemLink
            href={link.slug}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.title}
          </SidebarListItemLink>
        ) : (
          <SidebarListItemLink href={link.slug}>
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
    { slug: "https://github.com/FormidableLabs/victory", title: "Github" },
    { slug: "/docs/faq", title: "FAQs" },
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

export default Introduction;
