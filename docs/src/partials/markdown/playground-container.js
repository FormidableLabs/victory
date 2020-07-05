import styled from "styled-components";

/** Component Playground Structure
 *
 *  .playground
 *  |- .playgroundCode
 *  |  |- .playgroundStage
 *  |- .playgroundPreview
 *     |- div
 *        |- .playgroundError
 *        |- .previewArea
 *           |- div
 **/

const STAGE_HEIGHT = "40rem";

const PlaygroundContainer = styled.div`
  background-color: rgba(255, 254, 252, 0.5);
  position: relative;
  width: 100%;

  ${({ theme }) => `
    @media ${theme.mediaQuery.md} {
      .playgroundStage {
        height: ${STAGE_HEIGHT};
      }
  }

    .playground {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      flex-wrap: none;
      padding: 0;
      margin: 4rem -4rem;
      @media ${theme.mediaQuery.lg} {
          flex-direction: row;
      }
    }

    .playgroundCode {
      flex: 1 1 auto;
      order: 2;
      margin: 4rem 0;
      position: relative;
      @media ${theme.mediaQuery.md} {
        margin-top: 4.3rem;
    }
    }

    .playgroundCode:before,
    .playgroundPreview:before {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      color: ${theme.color.codeMirror.comment};
      font-size: 0.9em;
      line-height: 1;
      letter-spacing: 0.15em;
      text-align: center;
      text-transform: uppercase;
    }

    .playgroundCode:before {
      content: "Editable Source";
      padding: 1.25em 0.5em;
      top: inherit;
      bottom: 100%;
    }

    .playgroundStage {
      background-color: ${theme.color.codeMirror.bgDim};
      overflow: auto;
      padding: ${theme.spacing.sm} ${theme.spacing.md};
      width: 80%;
      margin: 0 auto;
      resize: both;
      transition: background-color 195ms ease-in;
      min-height: 40rem;
      @media ${theme.mediaQuery.lg} {
        width: 95%;
        min-height: 110%;
      }
    }

    .playgroundStage.ReactCodeMirror--focused {
      /* Focused state when editing code */
      background-color: ${theme.color.codeMirror.bgFocused};
      transition: background-color 250ms ease-out;
    }

    .playgroundPreview {
      align-items: center;
      display: flex;
      flex: 0 1 ${STAGE_HEIGHT};
      justify-content: center;
      order: 1;
      position: relative;
      text-align: center;
      margin: 0 auto;
      min-width: 80%
    }

    @media ${theme.mediaQuery.lg} {
      .playgroundPreview {
        min-width: 50%;
      }
    }

    .playgroundPreview:before {
      content: "Live Preview";
      padding: 1.25em 0.5em;

    }

    .playgroundPreview > div:first-child {
      width: 100%;
      margin: 1em auto;
    }

    .previewArea {
      background-color: white;
      height: 100%;
      min-height: calc(${STAGE_HEIGHT}* 0.5);
      margin: 3em auto;
      overflow-x: auto;
    }

    .previewArea {
      height: inherit;
      max-height: 100%;
      width: auto;
      > svg {
        max-height: 40rem;
      }
    }

    .playgroundPreview .VictoryContainer svg {
      margin: 0 auto;
      max-height: calc(${STAGE_HEIGHT});
      max-width: 100%;
    }

    .playgroundError {
      background: ${theme.color.darkRed};
      color: ${theme.color.white};
      font-family: ${theme.font.monospace};
      font-size: 1rem;
      font-weight: normal;
      line-height: 1.2;
      overflow: scroll;
      padding: ${theme.spacing.sm};
      text-align: left;
      white-space: pre;
      width: 100%;
    }

    /**
     * Code Mirror Color Theme
    **/
    .CodeMirror-line {
      background: none !important;
    }

    .cm-s-elegant.CodeMirror {
      height: auto;
      overflow: hidden;
      padding: 0;

      background: none !important;
      color: ${theme.color.codeMirror.punctuation};
      font-family: ${theme.font.monospace};
      font-size: 1.3rem;
      font-variant-ligatures: none;
      hyphens: none;
      line-height: 1.9;
      tab-size: 2;
      text-shadow: 0 0.1rem white;
      white-space: pre;
      word-break: normal;
      word-spacing: normal;
      word-wrap: normal;
    }

    .cm-s-elegant .CodeMirror-selected { /* text selection */
      background: ${theme.color.codeMirror.bgSelected};
      color: white;
    }

    .cm-s-elegant .CodeMirror-activeline {
      background: ${theme.color.codeMirror.bgSelected};
    }

    .cm-s-elegant .CodeMirror-activeline-background {
      background: ${theme.color.codeMirror.bgSelected};
    }

    .cm-s-elegant .CodeMirror-gutters {
      background: ${theme.color.codeMirror.bg} !important;
    }

    .cm-s-elegant .CodeMirror-foldgutter-open,
    .CodeMirror-foldgutter-folded {
      color: ${theme.color.gray};
    }

    .cm-s-elegant div.CodeMirror-cursor {
      border-left: 0.1rem solid ${theme.color.black} !important;
    }

    .cm-s-elegant span.cm-builtin {
      color: ${theme.color.white};
      text-decoration: underline;
    }

    .cm-s-elegant span.cm-atom {
      color: ${theme.color.codeMirror.function};
    }

    .cm-s-elegant span.cm-attribute {
      color: ${theme.color.codeMirror.attribute};
    }

    .cm-s-elegant span.cm-comment {
      color: ${theme.color.codeMirror.comment};
    }

    .cm-s-elegant span.cm-def {
      color: ${theme.color.codeMirror.def};
    }

    .cm-s-elegant span.cm-header {
      color: ${theme.color.codeMirror.bgSelected};
    }

    .cm-s-elegant span.cm-keyword {
      color: ${theme.color.codeMirror.keyword};
    }

    .cm-s-elegant span.cm-meta {
      color: ${theme.color.codeMirror.comment};
    }

    .cm-s-elegant span.cm-number {
      color: ${theme.color.codeMirror.number};
    }

    .cm-s-elegant span.cm-operater,
    .cm-s-elegant span.cm-operator {
      color: ${theme.color.codeMirror.operator};
    }

    .cm-s-elegant span.cm-property {
      color: ${theme.color.codeMirror.function};
    }

    .cm-s-elegant span.cm-qualifier {
      color: ${theme.color.codeMirror.function};
    }

    .cm-s-elegant span.cm-string {
      color: ${theme.color.codeMirror.selector};
    }

    .cm-s-elegant span.cm-string-2 {
      color: ${theme.color.codeMirror.selector};
    }

    .cm-s-elegant span.cm-tag {
      color: ${theme.color.codeMirror.tag};
    }

    .cm-s-elegant span.cm-tag.cm-bracket,
    .cm-s-elegant span.cm-bracket {
      color: ${theme.color.codeMirror.operator};
    }

    .cm-s-elegant span.cm-variable,
    .cm-s-elegant span.cm-variable-2 {
      color: ${theme.color.black};
    }

    .cm-s-elegant span.CodeMirror-matchingbracket {
      box-sizing: border-box;
      background: transparent;
      border-bottom: 0.1rem solid;
    }

    .cm-s-elegant span.CodeMirror-nonmatchingbracket {
      border-bottom: 0.1rem solid;
      background: none;
    }

  `}
`;

export default PlaygroundContainer;
