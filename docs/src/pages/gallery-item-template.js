import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { withRouteData } from "react-static";
import { Link } from "react-router-dom";
import Markdown from "../partials/markdown";
import config from "../../static-config-helpers/site-data";
import Page from "../partials/page";
import createPath from "../helpers/path-helpers";

const GalleryTemplate = ({ galleryItem }) => {
  const { content, data } = galleryItem;
  const { title, scope } = data;

  return (
    <Page>
      <Helmet>
        <title>{`${config.siteTitle} |  ${title}`}</title>
        <meta name="description" content={config.siteDescription} />
      </Helmet>
      <Link to={createPath("gallery")}>Back to Gallery</Link>
      <h1>{title}</h1>
      <Markdown source={content} scope={scope} />
    </Page>
  );
};

GalleryTemplate.propTypes = {
  galleryItem: PropTypes.object
};

export default withRouteData(GalleryTemplate);
