import React from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import { maxBy, minBy, isEmpty } from "lodash";
import styled from "styled-components";
import createPath from "../../../helpers/path-helpers";

import { SidebarSectionSublist } from "../styles";

const getLinkStylesByDepth = (depth, theme) => {
  if (depth === 2) {
    return {
      "font-size": "1.4rem",
      height: "3rem",
      color: theme.color.otherBrown,
      "letter-spacing": "0.53px"
    };
  }

  if (depth === 3) {
    return {
      "font-size": "1.2rem",
      color: theme.color.nearBlack
    };
  }
  return {};
};

const SubItemListItem = styled.li`
  padding-left: ${({ depth }) => (depth === 3 ? "7.7rem" : "5.3rem")};
  line-height: ${({ depth }) => (depth === 3 ? "1.3rem" : "2.3rem")};
  margin: ${({ depth }) =>
    depth === 3 ? "0 .7rem 1.3rem 0" : "0 0.7rem 0.7rem 0"};
  display: block;
  hyphens: auto;
`;
SubItemListItem.propTypes = {
  depth: PropTypes.number.isRequired
};

const SubItemLink = styled(NavLink)(props => ({
  ...getLinkStylesByDepth(props.depth, props.theme),
  "font-family": props.theme.font.bold
}));
SubItemLink.propTypes = {
  depth: PropTypes.number.isRequired
};

const TableOfContents = ({ active, link, headings }) => {
  const location = useLocation();
  if (!active || isEmpty(headings)) {
    return null;
  }
  const getTree = treeHeadings => {
    if (!treeHeadings || !treeHeadings.length) {
      return [];
    }
    const depth = minBy(treeHeadings, "depth").depth;
    const maxDepth = maxBy(treeHeadings, "depth").depth;
    if (depth === maxDepth) {
      return treeHeadings;
    }
    const parentIndices = treeHeadings.reduce((memo, curr, index) => {
      if (curr.depth === depth) {
        memo = memo.concat(index);
      }
      return memo;
    }, []);
    return parentIndices.reduce((memo, curr, index) => {
      const lastChild =
        index === parentIndices.length + 1
          ? undefined
          : parentIndices[index + 1];
      const children = [treeHeadings.slice(curr + 1, lastChild)];
      memo =
        children.length > 0
          ? memo.concat(treeHeadings[curr], children)
          : memo.concat(treeHeadings[curr]);
      return memo;
    }, []);
  };

  const getPath = (item, itemLink) => {
    const toAnchor = content => {
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
    return location.pathname.includes(absPath)
      ? hashPath
      : `${absPath}${hashPath}`;
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
            return <li key={`${i}-${depth}`}>{getTOC(tocLink, item, i++)}</li>;
          }

          return item.depth === 2 ? (
            <SubItemListItem key={index} depth={item.depth}>
              <SubItemLink
                depth={item.depth}
                to={createPath(getPath(item, tocLink))}
                prefetch={"data"}
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

TableOfContents.propTypes = {
  active: PropTypes.bool,
  headings: PropTypes.array,
  link: PropTypes.object,
  searchTerm: PropTypes.string
};

export default TableOfContents;
