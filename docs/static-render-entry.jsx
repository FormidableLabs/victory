import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";

import Docs from "./docs";
import IndexTemplate from "./static-index";

const Index = React.createFactory(IndexTemplate);
const _renderIndex = (component) => `<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(component)}`;

/**
 * Helper component that allows `static-site-generator-webpack-plugin` to render
 * root component (`Docs`) as static HTML
 *
 * Output built to `/gh-pages/`
 */

if (typeof document !== "undefined") {
  const content = document.getElementById("content");
  ReactDOM.render(<Docs/>, content);
}

module.exports = (locals, next) => {
  const source = JSON.parse(locals.webpackStats.compilation.assets["stats.json"].source());
  const bundle = source.assetsByChunkName.main;

  const content = ReactDOMServer.renderToStaticMarkup(<Docs />);
  const html = _renderIndex(new Index({
    content: content,
    bundle: bundle
  }));

  next(null, html)
};
