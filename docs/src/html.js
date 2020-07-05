import React from "react";

// eslint-disable-next-line react/prop-types
export default ({ Html, Head, Body, children }) => (
  <Html lang="en">
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href="../static/logos/favicon.ico" />

      {/* CodeMirror for Component Playgrounds */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css"
      />
    </Head>
    <title>Victory</title>
    <Body>{children}</Body>
  </Html>
);
