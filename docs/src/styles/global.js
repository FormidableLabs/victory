import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";
import prism from "./prism";

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${prism}

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    overflow-x: hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
  }

  body {
    background-color: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.nearBlack};
    font-family: ${({ theme }) => theme.font.primary};
    font-size: 1.4rem;
    line-height: 1.7;
    overflow: hidden;
    position: relative;
  }

  /**
   * Reset default spacing and border for appropriate elements.
   * (suitcss-base)
   */

  blockquote,
  dl,
  dd,
  h2,
  h3,
  h4,
  h5,
  h6,
  figure,
  p,
  pre,
  ol,
  ul,
  table {
    margin: 1.375em 0 0 0;
  }

  button {
    background: transparent;
    border: 0;
    padding: 0;
  }

  /**
   * Work around a Firefox/IE bug where the transparent button background
   * results in a loss of the default button focus styles.
   * (suitcss-base)
   */

  button:focus {
    outline: 0.1rem dotted;
    outline: 0.5rem auto -webkit-focus-ring-color;
  }

  /**
   * Suppress the focus outline on elements that cannot be accessed via keyboard.
   * This prevents an unwanted focus outline from appearing around elements that
   * might still respond to pointer events.
   * (suitcss-base)
   */

  [tabindex='-1']:focus {
    outline: none !important;
  }

  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
  }

  iframe {
    border: 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ol ol,
  ul ul {
    margin: 0;
    padding: 0;
  }

  h1 {
    font-size: 3rem;
    font-weight: bold;
    line-height: 1.2;
  }

  @media ${({ theme }) => theme.mediaQuery.md} {
    h1 {
      font-size: 4.6rem;
    }
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
    line-height: 1.5;
  }

  h2 {
    font-size: 1.75rem;
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
    h2 {
      font-size: 3rem;
    }
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.6rem;
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
    h4 {
      font-size: 2rem;
    }
  }


  h5 {
    font-size: 1.125rem;
    font-weight: normal;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  h6 {
    font-size: 1.25rem;
  }

  h1 code,
  h2 code,
  h3 code,
  h4 code,
  h5 code,
  h6 code {
    border: 0;
    font-size: 0.85em;
    padding: 0.25em 0.333em 0.2em;
  }

  strong {
    font-style: normal;
    font-weight: 500;
  }

  pre, code {
    font-family: ${({ theme }) => theme.font.monospace};
  }

  li > pre {
    margin-left: 0;
  }

  pre[class*='language-'] code,
  pre[class*='lang-'] code {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }

  pre code {
    border: 0;
  }

  code {
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.1rem;
    font-variant-ligatures: none;
    padding: 0.33em 0.333em 0.28em;
    word-break: break-word;
  }
  @media ${({ theme }) => theme.mediaQuery.md} {
    code {
      font-size: 1.2rem;
    }
  }

  svg {
    fill: currentColor;
  }

  table {
    border-collapse: collapse;
    display: block;
    overflow: auto;
    width: 100%;
  }

  thead,
  tbody {
    border: 0;
    font-size: 100%;
    margin: 0;
    padding: 0;
  }

  thead {
    font: inherit;
    vertical-align: baseline;
  }

  tbody {
    vertical-align: middle;
  }

  th,
  td {
    border: 0.1rem solid ${({ theme }) => theme.color.gray};
    padding: 0.425rem 0.75rem;
    vertical-align: top;
  }

  th code,
  td code {
    background: none;
  }

  a {
    color: ${({ theme }) => theme.color.red};
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
