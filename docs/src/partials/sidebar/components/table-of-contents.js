/* eslint no-magic-numbers: ["error", { "ignore": [0, 1, 2, 3] }] */
/* eslint-disable react/no-multi-comp */
import React from "react";
import Link from "next/link";
import { maxBy, minBy, isEmpty } from "lodash";
import styled from "styled-components";

import { SidebarSectionSublist } from "../styles";
import { usePathname } from "next/navigation";

const SubItemListItem = styled.li`
  padding-left: ${({ $depth }) => ($depth === 3 ? "7.7rem" : "5.3rem")};
  line-height: ${({ $depth }) => ($depth === 3 ? "1.3rem" : "2.3rem")};
  margin: ${({ $depth }) =>
    $depth === 3 ? "0 .7rem 1.3rem 0" : "0 0.7rem 0.7rem 0"};
  display: block;
  hyphens: auto;
`;

const SubItemLink = ({ href, children, $depth }) => {
  const classNames = [
    "font-bold",
    $depth === 2 && "h-12 text-2xl text-[#793d33] tracking-wide",
    $depth === 3 && "text-lg text-[#242121]",
  ];

  return (
    <Link href={href} className={classNames.join("")}>
      {children}
    </Link>
  );
};

const TableOfContents = ({ active, link, headings }) => {
  const pathname = usePathname();
  if (!active || isEmpty(headings)) {
    return null;
  }
  const getTree = (treeHeadings) => {
    if (!treeHeadings || !treeHeadings.length) {
      return [];
    }
    const depth = minBy(treeHeadings, "depth").depth;
    const maxDepth = maxBy(treeHeadings, "depth").depth;
    if (depth === maxDepth) {
      return treeHeadings;
    }
    const parentIndices = treeHeadings.reduce((memo, curr, index) => {
      let k = memo;
      if (curr.depth === depth) {
        k = memo.concat(index);
      }
      return k;
    }, []);
    return parentIndices.reduce((memo, curr, index) => {
      const lastChild =
        index === parentIndices.length + 1
          ? undefined
          : parentIndices[index + 1];
      const children = [treeHeadings.slice(curr + 1, lastChild)];
      return children.length > 0
        ? memo.concat(treeHeadings[curr], children)
        : memo.concat(treeHeadings[curr]);
    }, []);
  };

  const getPath = (item, itemLink) => {
    const toAnchor = (content) => {
      const baseContent = content.toLowerCase();
      const safeString = baseContent.replace(/[^\w]+/g, " ");
      return safeString.trim().replace(/\s/g, "-");
    };
    // unfortunately we can't treat "active" and "search term hit" as the same -- if it's active then
    // it's a purely relative link hash, if it's from a search tem hit then we need the type and slug.
    const hashPath = `#${toAnchor(item.value)}`;
    const absPath = `/${itemLink.type}/${itemLink.slug}`;
    // Normally I'd lean way back in a wicker chair on the porch, snap my suspenders, shake my head,
    // and take a long sip from a mint julep while mumbling something about the brittleness of scope and the joys of
    // referential transparency, but we're not generalizing this behavior and location-injection is table stakes
    // for front-end routing
    return pathname.includes(absPath) ? hashPath : `${absPath}${hashPath}`;
  };

  const getTOC = (tocLink, tocHeadings, i = 0) => {
    const tree = getTree(tocHeadings);

    if (!tree.length) {
      return null;
    }

    const depth = minBy(tocHeadings, "depth").depth;

    return (
      <SidebarSectionSublist>
        {tree.map((item, index) => {
          if (Array.isArray(item)) {
            /* eslint-disable no-param-reassign */
            return <li key={`${i}-${depth}`}>{getTOC(tocLink, item, i++)}</li>;
          }

          return item.depth === 2 ? (
            <SubItemListItem key={index} $depth={item.depth}>
              <SubItemLink
                $depth={item.depth}
                href={getPath(item, tocLink)}
                strict
              >
                {item.value}
              </SubItemLink>
            </SubItemListItem>
          ) : null;
        })}
      </SidebarSectionSublist>
    );
  };

  return getTOC(link, headings);
};

export default TableOfContents;
