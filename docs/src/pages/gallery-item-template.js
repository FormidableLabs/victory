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
  const { description, image, title, scope } = data;

  const metaTitle = `${config.siteTitle} |  ${title}`;

  return (
    <Page>
      <Helmet>
        <title>{metaTitle}</title>
        <meta
          name="description"
          content={description || config.siteDescription}
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta
          property="og:description"
          content={description || config.siteDescription}
        />
        {image && (
          <meta property="og:image" content={image} />
        )}

        <meta name="twitter:title" content={metaTitle} />
        <meta
          name="twitter:description"
          content={description || config.siteDescription}
        />
        <meta name="twitter:card" content="summary_large_image" />
        {image && (
          <meta name="twitter:image" content={image} />
        )}
      </Helmet>
      <Link to={createPath("gallery")}>Back to Gallery</Link>
      <h1>{title}</h1>
      <Markdown source={content} scope={scope} />
    </Page>
  );
};

GalleryTemplate.propTypes = {
  galleryItem: PropTypes.object,
};

export default withRouteData(GalleryTemplate);
