import { match, RoutingContext } from "react-router";
import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "./app";
import IndexTemplate from "./static-index";
import { routes } from "../router";

const Index = React.createFactory(IndexTemplate);
const _renderIndex = (component) => `<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(component)}`;

/**
 * Helper component that allows `static-site-generator-webpack-plugin` to render
 * root component (`Docs`) as static HTML
 *
 * Output built to `/gh-pages/`
 */

module.exports = (locals, next) => {
  const source = JSON.parse(locals.webpackStats.compilation.assets["stats.json"].source());
  const bundle = `/${source.assetsByChunkName.main}`;

  match({ routes, location: locals.path }, (err, redirectLocation, renderProps) => {
    // TODO err/redirect handling
    const content = ReactDOMServer.renderToStaticMarkup(<RoutingContext {...renderProps}/>)
    const html = _renderIndex(new Index({
      content: content,
      bundle: bundle
    }));

    next(null, html);
  });
};
