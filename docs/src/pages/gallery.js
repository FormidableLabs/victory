import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactDOM from "react-dom";
import { withRouteData } from "react-static";
import { Link } from "react-router-dom";
import * as Victory from "victory";

import createPath from "../helpers/path-helpers";
import Page from "../partials/page";
import Preview from "../partials/gallery/preview";
import Slider from "../partials/gallery/slider";
import basketballData from "../data/basketball-data";
import listeningData from "../data/listening-data";
import LazyRender from "../partials/lazy-render";

const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.2rem;

  > * + * {
    margin-top: 4rem;
  }

  @media ${({ theme }) => theme.mediaQuery.sm} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-gap: 3.6rem;

    > * + * {
      margin-top: 0;
    }
  }
`;

const StyledLazyRender = styled(LazyRender)`
  box-shadow: -1.2rem 1.2rem 0px 0px ${({ theme }) => theme.color.brown};
  border: 6px solid ${({ theme }) => theme.color.accentBrown};
  padding: 2rem;

  @media ${({ theme }) => theme.mediaQuery.md} {
    height: 300px;
  }

  @media ${({ theme }) => theme.mediaQuery.lg} {
    height: 375px;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-family: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.color.darkBrown};
  text-align: center;
  margin-top: 2.5rem;
`;

const PageHeader = styled.h1`
  font-family: ${({ theme }) => theme.font.bold};
  margin-top: 0;
  margin-bottom: 2rem;
`;

const Divider = styled.hr`
  height: 1px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.nearWhite};
  margin: 3rem 0;
`;

const Gallery = ({ gallery, sidebarContent }) => {
  const parseRaw = str => {
    const playground = "playground_norender";
    const start = str.indexOf(playground) + playground.length;
    const end = str.indexOf("```", start);
    return str.slice(start, end);
  };

  // eslint-disable-next-line react/no-multi-comp
  const renderPreviewItem = item => {
    const code = parseRaw(item.content);
    const slug = item.data.slug;
    const title = item.data.title;

    return (
      <Link to={createPath(`gallery/${slug}`)}>
        <StyledLazyRender
          LazyRenderedComponent={() => (
            <Preview
              codeText={code}
              noRender={false}
              theme="elegant"
              scope={{
                ...Victory,
                _: require("lodash"),
                styled,
                React,
                ReactDOM,
                PropTypes,
                Slider,
                basketballData,
                listeningData
              }}
            />
          )}
        />
        <Title>{title}</Title>
      </Link>
    );
  };

  const previews = gallery.map((item, index) => (
    <div key={index}>{renderPreviewItem(item)}</div>
  ));

  return (
    <Page sidebarContent={sidebarContent}>
      <PageHeader>Victory Gallery</PageHeader>
      <p>
        Here are some examples to help you get started. Each example below links
        to a live, editable playground. Code samples provided in these examples
        are free to use or modify however you like.
      </p>
      <Divider />
      <GalleryWrapper>{previews}</GalleryWrapper>
    </Page>
  );
};

Gallery.propTypes = {
  data: PropTypes.object,
  gallery: PropTypes.array,
  sidebarContent: PropTypes.array
};

Gallery.defaultProps = {
  params: null
};

export default withRouteData(Gallery);
