/*globals document:false */

import { match, RoutingContext } from "react-router";
import React from "react";
import ReactDOMServer from "react-dom/server";

import IndexTemplate from "./static-index";
import Router, { routes } from "../router";
import { routing as routingConfig } from "../config";

const Index = React.createFactory(IndexTemplate);
const _renderIndex = (component) => `<!DOCTYPE html>
  ${ReactDOMServer.renderToStaticMarkup(component)}`;

/**
 * Helper component that allows `static-site-generator-webpack-plugin` to render
 * app as static HTML
 *
 * Output built to `/gh-pages/`
 */

// Run once the client loads:
if (typeof document !== "undefined") {
  const rootEl = document.getElementById("content");
  Router.run(rootEl);
}

module.exports = (locals, next) => {
  const source = JSON.parse(locals.webpackStats.compilation.assets["stats.json"].source());
  const bundle = source.assetsByChunkName.main;

  match({ routes, location: locals.path }, (err, redirectLocation, renderProps) => {
    // TODO err/redirect handling
    const content = ReactDOMServer.renderToStaticMarkup(<RoutingContext {...renderProps}/>);
    const html = _renderIndex(new Index({
      content,
      bundle,
      baseHref: routingConfig.base
    }));

    next(null, html);
  });
};
