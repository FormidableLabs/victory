import React from "react";
import PropTypes from "prop-types";
import { withRouteData } from "react-static";
import styled from "styled-components";
import Page from "../partials/page";
import NotFoundImage from "../../static/not-found.png";

// the drop shadow style should be shared with `partials/home/styles/drop-shadow`
const NotFoundImg = styled.img`
  box-shadow: -1rem 1rem ${({ theme }) => theme.color.brown};
  display: block;
  height: 25rem;
  margin: 5rem 0;
  @media ${({ theme }) => theme.mediaQuery.sm} {
    box-shadow: -1.3rem 1.3rem ${({ theme }) => theme.color.brown};
    height: 35rem;
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
    box-shadow: -1.5rem 1.5rem ${({ theme }) => theme.color.brown};
    height: 40rem;
  }
  @media ${({ theme }) => theme.mediaQuery.lg} {
    box-shadow: -1.7rem 1.7rem ${({ theme }) => theme.color.brown};
    height: 50rem;
  }
`;

const StyledLink = styled.a`
  margin-top: 2rem;
`;

const NotFound = props => {
  return (
    <Page withSidebar sidebarContent={props.sidebarContent}>
      <h1>Uh oh.</h1>
      <p>Looks like that page doesn't exist. What a bummer.</p>
      <StyledLink href={"/"}>Take me back to the good stuff.</StyledLink>
      <NotFoundImg src={NotFoundImage} />
    </Page>
  );
};

NotFound.propTypes = {
  sidebarContent: PropTypes.arrayOf(PropTypes.object)
};

export default withRouteData(NotFound);
