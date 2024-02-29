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

    .playgroundPreview {
      align-items: center;
      display: flex;
      flex: 0 1 ${STAGE_HEIGHT};
      justify-content: center;
      order: 1;
      position: relative;
      text-align: center;
      margin: 0 auto;
      min-width: 80%;
      padding-top: 3rem;
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
      overflow-x: auto;
      overflow-y: hidden;
    }
  `}
`;

export default PlaygroundContainer;
