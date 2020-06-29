/* eslint-disable react/no-multi-comp */
/* eslint-disable func-style */
/* eslint-disable react/no-multi-comp */
/* eslint-disable no-magic-numbers */
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import ComponentPlayground from "component-playground";
import * as Victory from "victory";
import styled, { withTheme } from "styled-components";
import scopeMap from "./scope-map";
import PlaygroundContainer from "./playground-container";
import createPath from "../../helpers/path-helpers";

import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-sql";

const Pre = styled.pre`
  font-size: 1rem !important;
`;

const renderPlayground = (props, scope, theme) => {
  const scopeObject =
    (scope &&
      scope.reduce(
        (obj, key) => Object.assign(obj, { [key]: scopeMap[key] }),
        {}
      )) ||
    {};

  const playgroundScope = Object.assign({}, scopeObject, {
    ...Victory,
    React,
    ReactDOM
  });

  /* eslint-disable react/prop-types */
  const { value, language } = props;
  const noRender = !language.includes("norender");
  /* eslint-enable react/prop-types */

  return (
    // need to pass in the theme since the playgrounds are mounted as
    // separate react component trees that don't share the context of
    // the original tree
    <PlaygroundContainer theme={theme}>
      <ComponentPlayground
        codeText={value}
        noRender={noRender}
        theme="elegant"
        scope={playgroundScope}
      />
    </PlaygroundContainer>
  );
};

export function renderCodeBlock(props, scope, theme) {
  if (props.language && props.language.includes("playground")) {
    return renderPlayground(props, scope, theme);
  }
  const html = Prism.languages[props.language]
    ? Prism.highlight(props.value, Prism.languages[props.language])
    : props.value;
  const cls = `language-${props.language}`;
  return (
    <Pre className={cls}>
      <code dangerouslySetInnerHTML={{ __html: html }} className={cls} />
    </Pre>
  );
}
renderCodeBlock.propTypes = {
  language: PropTypes.any,
  value: PropTypes.any
};

export function renderHeading(props) {
  const { level, ...restProps } = props;
  // Transform heading contents into an anchor slug
  const children = React.Children.toArray(restProps.children);

  const flatten = (text, child) => {
    if (typeof child === "string") {
      return `${text}${child}`;
    }
    return React.Children.toArray(child.props.children).reduce(flatten, text);
  };

  const text = children.reduce((txt, child) => {
    if (typeof child === "string") {
      return `${txt}${child}`;
    }
    return React.Children.toArray(child.props.children).reduce(flatten, txt);
  }, "");

  // The slug here should match the one that Github creates
  // see https://github.com/jch/html-pipeline/blob/master/lib/html/pipeline/toc_filter.rb
  const slug = text
    .trim()
    .toLowerCase()
    .replace(/[^\w\- ]/g, "") // Remove punctuation
    .replace(/\s+/g, "-"); // Replace spaces with a dash

  const html = `
  <h${level}>
    <a class="${
      level > 1 ? "Anchor" : "hidden-anchor"
    }" aria-hidden="true" id="${slug}" href="#${slug}">
    <svg viewBox="0 0 16 16" version="1.1" width="16" height="16"
          aria-hidden="true">
      <path fill-rule="evenodd"
            d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
    </svg>
  </a> ${text}
  </h${level}>
`;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

renderHeading.propTypes = {
  children: PropTypes.any,
  level: PropTypes.number
};

/**
 * When a README.md has relative links to files in the codebase,
 * we need to replace them with absolute links so they aren’t broken on the site.
 * @param {Object} props - properties
 * @param {Object} meta - meta
 * @returns {Object} link element
 */
// eslint-disable-next-line react/no-multi-comp
export const renderLink = ({ href, children }) => {
  if (/^\w+:/.test(href)) {
    return (
      <a rel="noopener noreferrer" target="_blank" href={href}>
        {children}
      </a>
    );
  }
  return <Link to={createPath(href)}>{children}</Link>;
};

renderLink.propTypes = {
  children: PropTypes.any,
  href: PropTypes.string
};

/* eslint-enable react/prop-types, no-magic-numbers */
const Markdown = props => {
  const { className, source, scope, theme } = props;
  /* eslint-disable react/prop-types, no-magic-numbers */
  const renderers = {
    link: renderLink,
    linkReference: renderLink,
    heading: renderHeading,
    code: p => renderCodeBlock(p, scope, theme)
  };

  return (
    <ReactMarkdown
      className={className}
      source={source}
      renderers={renderers}
      escapeHtml={false}
    />
  );
};

Markdown.propTypes = {
  className: PropTypes.string,
  renderers: PropTypes.object,
  scope: PropTypes.array,
  source: PropTypes.string,
  theme: PropTypes.object
};

export default withTheme(Markdown);
