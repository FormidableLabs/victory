import React from "react";
import ReactDOM from "react-dom";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import * as Victory from "victory";
import styled, { withTheme } from "styled-components";
import {
  scaleDiscontinuous,
  discontinuitySkipWeekends,
} from "@d3fc/d3fc-discontinuous-scale";
import scopeMap from "./scope-map";
import PlaygroundContainer from "./playground-container";

import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { themes } from "prism-react-renderer";
import theme from "@/styles/theme";

const reactLiveTheme = { ...themes.oneLight };
reactLiveTheme.plain.backgroundColor = theme.color.codeMirror.bgDim;

const renderCodeBlock = (props, scope, theme) => {
  const scopeObject =
    (scope &&
      scope.reduce(
        (obj, key) => Object.assign(obj, { [key]: scopeMap[key] }),
        {},
      )) ||
    {};

  const playgroundScope = Object.assign({}, scopeObject, {
    ...Victory,
    styled,
    scaleDiscontinuous,
    discontinuitySkipWeekends,
    React,
    ReactDOM,
  });

  const { children, className } = props;

  const language = (className || "").replace(/language-/, "");
  const noRender = language && language.includes("norender");
  const isPlayground = language && language.includes("playground");

  // special case to handle inline code blocks in markdown
  if (!language) {
    return <code className={className}>{children}</code>;
  }

  const editorLanguage = isPlayground ? "jsx" : language;

  return (
    // need to pass in the theme since the playgrounds are mounted as
    // separate react component trees that don't share the context of
    // the original tree
    <PlaygroundContainer theme={theme}>
      <LiveProvider
        language={editorLanguage}
        code={String(children).replace(/\n$/, "")}
        scope={playgroundScope}
        noInline={noRender}
        theme={reactLiveTheme}
      >
        {!isPlayground && <LiveEditor disabled={true} className="h-auto" />}
        {isPlayground && (
          <>
            <LiveError className="playgroundError" />
            <div className="playground">
              <LivePreview className="playgroundPreview" />
              <div className="playgroundCode">
                <LiveEditor className="playgroundStage" />
              </div>
            </div>
          </>
        )}
      </LiveProvider>
    </PlaygroundContainer>
  );
};

function renderHeading(props) {
  const { tagName } = props.node;
  const level = tagName[1];

  // Transform heading contents into an anchor slug
  const children = React.Children.toArray(props.children);

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
    .replace(/^\d+\.\s*/, "") // remove leading numbers and periods
    .replace(/[^\w\- ]/g, "") // Remove punctuation
    .replace(/\s+/g, "-"); // Replace spaces with a dash

  const html = `
  <${tagName} class="flex flex-row items-center">
    <a class="${
      level > 1 ? "Anchor" : "hidden-anchor"
    }" aria-hidden="true" id="${slug}" href="#${slug}">
    <svg viewBox="0 0 16 16" version="1.1" width="16" height="16"
          aria-hidden="true" fill="currentcolor">
      <path fill-rule="evenodd"
            d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
    </svg>
  </a><span class="block ml-2">${text}</span>
  </${tagName}>
`;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * When a README.md has relative links to files in the codebase,
 * we need to replace them with absolute links so they aren’t broken on the site.
 * @param {Object} props - properties
 * @param {Object} meta - meta
 * @returns {Object} link element
 */
const renderLink = ({ href, children }) => {
  if (/^\w+:/.test(href)) {
    return (
      <a rel="noopener noreferrer" target="_blank" href={href}>
        {children}
      </a>
    );
  }
  return <Link href={href}>{children}</Link>;
};

const Markdown = (props) => {
  const { className, source, scope, theme } = props;
  const renderers = {
    a: renderLink,
    h1: renderHeading,
    h2: renderHeading,
    h3: renderHeading,
    h4: renderHeading,
    h5: renderHeading,
    code: (p) => renderCodeBlock(p, scope, theme),
  };

  return (
    <ReactMarkdown className={className} components={renderers} skipHtml={true}>
      {source}
    </ReactMarkdown>
  );
};

export default withTheme(Markdown);
