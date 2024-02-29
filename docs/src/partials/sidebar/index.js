import React, { useEffect, useState } from "react";

import styled from "styled-components";
import Fuse from "fuse.js";
import { maxBy, findIndex, includes, last, isEmpty } from "lodash";
import { FeaturedBadge } from "formidable-oss-badges";

import { StyledLink } from "@/partials/styled-link";
import Introduction from "./components/introduction";
import Category from "./components/category";
import SearchInput from "./components/search-input";
import TableOfContents from "./components/table-of-contents";
import { TABLE_OF_CONTENTS_SECTIONS } from "./constants";

import {
  SidebarListItem,
  SidebarListItemLink,
  SidebarSectionHeading,
} from "./styles";

import { usePathname } from "next/navigation";

// was gonna pass this but I'm leaning towards this being an internal detail since at the end of the day the proper
// behavior is based on a bunch of magic strings for a non-configurable internal method
const documentationSubcategories = ["charts", "containers", "more"];

const getPathPrefix = (item) => {
  // just a bunch of one-offs, elegance is harder to realize gains from
  if (item.category === "introduction") {
    return item.slug === "getting-started" ? "/docs" : `/docs/${item.slug}`;
  }
  if (item.category === "support") {
    return "/docs/faq";
  }
  if (item.category === "documentation") {
    return "/docs/common-props";
  }
  const checkedCategory = documentationSubcategories.includes(item.category)
    ? "docs"
    : item.category;
  return `/${checkedCategory}/${item.slug}`;
};

const SidebarContainer = styled.nav`
  background-color: ${({ theme }) => theme.color.nearWhite};
  overflow: scroll;
  overflow-x: hidden;
  padding: 1.8rem 0;
  position: relative;
  width: ${({ theme }) => theme.layout.sidebarWidth};
`;

// only show close button on small devices
const CloseButton = styled.button`
  font-size: 2.8rem;
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: ${({ theme }) => `calc(${theme.spacing.sm} - 0.8rem)`};

  @media ${({ theme }) => theme.mediaQuery.md} {
    display: none;
  }
`;

const VictoryLogo = styled(StyledLink)`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  > svg {
    width: 9.8rem;
  }
`;

const getMatchTree = (link, filterTerm) => {
  const options = {
    keys: ["value", "subHeadings.value", "subHeadings.subHeadings.value"],
    threshold: 0.2,
    findAllMatches: true,
    distance: 100,
  };
  const fuse = new Fuse(link.subHeadings, options);
  const matches = fuse.search(filterTerm);
  if (!isEmpty(matches)) {
    const maxDepth = maxBy(matches, "depth").depth;
    let matchIndices = matches.map((match) =>
      findIndex(link.subHeadings, (heading) =>
        includes(heading.value, match.value),
      ),
    );

    matchIndices = matchIndices.sort((a, b) => a - b);
    return link.subHeadings
      .slice(0, last(matchIndices) + 1)
      .reduce((memo, curr, i) => {
        const useHeading =
          i === matchIndices[0] ||
          (i < matchIndices[0] && curr.depth < maxDepth);
        if (useHeading && curr.value !== "Props") {
          memo = memo.concat(curr);
          matchIndices =
            i === matchIndices[0] ? matchIndices.slice(1) : matchIndices;
        }
        return memo;
      }, []);
  }
  return [];
};
const Sidebar = ({ className, content, onCloseClick }) => {
  if (!content || !content.length) {
    return null;
  }

  const pathname = usePathname();
  const [filteredResults, setFilteredResults] = useState(content);
  const [filterTerm, setFilterTerm] = useState("");

  const handleInputChange = (value) => {
    const options = {
      keys: ["data.subHeadings.value", "data.title", "data.category"],
      threshold: 0.2,
      findAllMatches: true,
      distance: 100,
    };

    const fuse = new Fuse(content, options);

    setFilteredResults(value ? fuse.search(value) : content);
    setFilterTerm(value);
  };

  const handleClearInput = () => {
    setFilteredResults(content);
    setFilterTerm("");
  };

  // TODO: address this function, it's doing too much
  // We need this to rerender every time a new item is clicked in the side nav until the visibility isn't tied to the currently selected item
  const linksLists = (() => {
    const filteredByCategory = {};
    TABLE_OF_CONTENTS_SECTIONS.map((sectionCategory) => {
      const filteredEdges =
        filteredResults &&
        filteredResults.filter((edge) => {
          return edge.data && edge.data.type === sectionCategory.type;
        });
      return filteredEdges
        ? (filteredByCategory[[sectionCategory.category]] =
            filteredEdges.filter((edge) =>
              sectionCategory.category.includes(edge.data.category),
            ))
        : null;
    });

    const renderList = {};

    Object.entries(filteredByCategory).map((category) => {
      const filteredCategoryKey = category[0];
      const filteredCategory = category[1];
      renderList[filteredCategoryKey] = filteredCategory.map((edge) => {
        const link = edge.data;
        if (!link) {
          return null;
        }

        // If link is currently active and not under the Introduction section,
        // then display its table of contents underneath it
        const active =
          filteredCategoryKey !== "introduction" &&
          pathname.includes(`/${link.type}/${link.slug}`)
            ? true
            : filterTerm !== "";

        const finalLink = getPathPrefix(link);
        const activeLink = pathname === finalLink;

        const headings =
          filterTerm !== "" ? getMatchTree(link, filterTerm) : link.subHeadings;

        return (
          <SidebarListItem key={link.slug} onClick={handleClearInput}>
            <SidebarListItemLink
              href={finalLink}
              className={activeLink && "bg-[#ddd]"}
            >
              {link.title}
            </SidebarListItemLink>
            <TableOfContents
              active={active}
              link={link}
              headings={headings}
              filterTerm={filterTerm}
            />
          </SidebarListItem>
        );
      });
    });
    return renderList;
  })();

  return (
    <SidebarContainer className={className}>
      <CloseButton onClick={onCloseClick}>&times;</CloseButton>
      <VictoryLogo href="/">
        <FeaturedBadge name="victory" isHoverable />
      </VictoryLogo>
      <SearchInput
        onHandleInputChange={handleInputChange}
        content={content}
        searchText={filterTerm}
        onClearInput={handleClearInput}
      />

      {isEmpty(filteredResults) ? (
        <SidebarSectionHeading>No Results</SidebarSectionHeading>
      ) : (
        <>
          <Introduction content={linksLists.introduction} />
          <Category title="Support" content={linksLists.support} />
          <Category title="Guides" content={linksLists.guides} />
          <Category
            title="Documentation"
            content={linksLists.documentation}
            subCategories={[
              {
                title: "Charts",
                content: linksLists.charts,
              },
              {
                title: "Containers",
                content: linksLists.containers,
              },
              {
                title: "More",
                content: linksLists.more,
              },
            ]}
          />
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
