import React from "react";
import PropTypes from "prop-types";
import { withRouteData } from "react-static";
import Helmet from "react-helmet";
import config from "../../static-config-helpers/site-data";
import Markdown from "../partials/markdown";
import Page from "../partials/page";

const DocsTemplate = React.memo(({ doc, sidebarContent }) => {
  const { content, data } = doc;
  const { title, scope } = data;
  return (
    <Page withSidebar sidebarContent={sidebarContent}>
      <Helmet>
        <title>{`${config.siteTitle} | ${title}`}</title>
        <meta name="description" content={config.siteDescription} />
      </Helmet>
      {/* TODO: Add edit this page link */}
      {/* <a className="SubHeading" href="">Edit this page</a> */}
      <Markdown source={content} scope={scope} />
    </Page>
  );
});

DocsTemplate.propTypes = {
  children: PropTypes.array,
  doc: PropTypes.shape({
    data: PropTypes.object,
    content: PropTypes.string
  }),
  sidebarContent: PropTypes.array
};

export default withRouteData(DocsTemplate);
