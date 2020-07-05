import { css } from "styled-components";

/**
 * http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+actionscript+handlebars+json+markdown+jsx+sass+scss
 *
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 **/

const prism = css`
  ${({ theme }) => `
    code[class*="language-"],
    pre[class*="language-"] {
      font-size: 1.5rem;
      color: ${theme.color.black};
      background: none;
      text-shadow: 0 0.1rem ${theme.color.white};
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      word-wrap: normal;
      line-height: 1.5;

      -moz-tab-size: 4;
      -o-tab-size: 4;
      tab-size: 4;

      -webkit-hyphens: none;
      -moz-hyphens: none;
      -ms-hyphens: none;
      hyphens: none;
    }

    pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
    code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
      text-shadow: none;
      background: ${theme.color.codeMirror.bgSelected};
    }

    pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
    code[class*="language-"]::selection, code[class*="language-"] ::selection {
      text-shadow: none;
      background: ${theme.color.codeMirror.bgSelected};
    }

    @media print {
      code[class*="language-"],
      pre[class*="language-"] {
        text-shadow: none;
      }
    }

    /* Code blocks */
    pre[class*="language-"] {
      overflow: auto;
    }

    :not(pre) > code[class*="language-"],
    pre[class*="language-"] {
      background: ${theme.color.codeMirror.bgDim};
      padding: 2rem;
    }

    /* Inline code */
    :not(pre) > code[class*="language-"] {
      opacity: 0.8;
      font-size: 1.5rem;
      border: 1px solid ${theme.color.inlineCodeBorder};
      border-image: initial;
      padding: 0.5rem;
      margin: 0px 0.5rem;
      border-radius: .45rem;
      white-space: normal;
      background: #f5f2f0;
    }

    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: ${theme.color.codeMirror.comment};
    }

    .token.punctuation {
      color: ${theme.color.codeMirror.punctuation};
    }

    .namespace {
      opacity: .7;
    }

    .token.property,
    .token.tag,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.deleted {
      color: ${theme.color.codeMirror.number};
    }

    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted {
      color: ${theme.color.codeMirror.attribute};
    }

    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string {
      color: ${theme.color.codeMirror.operator};
      background: hsla(0, 0%, 100%, .5);
    }

    .token.atrule,
    .token.attr-value,
    .token.keyword {
      color: ${theme.color.codeMirror.keyword};
    }

    .token.function {
      color: ${theme.color.codeMirror.function};
    }

    .token.regex,
    .token.important,
    .token.variable {
      color: ${theme.color.codeMirror.variable};
    }

    .token.important,
    .token.bold {
      font-weight: bold;
    }
    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }
  `}
`;

export default prism;
