/**
 * This theme file overrides original file from the docusaurus theme
 * to customize the playground component
 *
 * Original file: @docusaurus/theme-live-codeblock/src/theme/Playground/index.tsx
 */

/* eslint-disable react/no-multi-comp */
import React from "react";
import clsx from "clsx";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import Translate from "@docusaurus/Translate";
import BrowserOnly from "@docusaurus/BrowserOnly";
import {
  ErrorBoundaryErrorMessageFallback,
  usePrismTheme,
} from "@docusaurus/theme-common";
import ErrorBoundary from "@docusaurus/ErrorBoundary";

import type { Props } from "@theme/Playground";

import styles from "./styles.module.css";

function Header({ children }: { children: React.ReactNode }) {
  return <div className={clsx(styles.playgroundHeader)}>{children}</div>;
}

function LivePreviewLoader() {
  return <div>Loading...</div>;
}

function Preview() {
  // No SSR for the live preview
  // See https://github.com/facebook/docusaurus/issues/5747
  return (
    <BrowserOnly fallback={<LivePreviewLoader />}>
      {() => (
        <>
          <ErrorBoundary
            fallback={(params) => (
              <ErrorBoundaryErrorMessageFallback {...params} />
            )}
          >
            <LivePreview />
          </ErrorBoundary>
          <LiveError />
        </>
      )}
    </BrowserOnly>
  );
}

function ResultWithHeader() {
  return (
    <div className={styles.playgroundPreviewContainer}>
      <Header>
        <Translate
          id="theme.Playground.result"
          description="The result label of the live codeblocks"
        >
          Live View
        </Translate>
      </Header>
      {/* https://github.com/facebook/docusaurus/issues/5747 */}
      <div className={styles.playgroundPreview}>
        <Preview />
      </div>
    </div>
  );
}

function ThemedLiveEditor() {
  const isBrowser = useIsBrowser();
  return (
    <LiveEditor
      // We force remount the editor on hydration,
      // otherwise dark prism theme is not applied
      key={String(isBrowser)}
      className={styles.playgroundEditor}
    />
  );
}

function EditorWithHeader() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <div className={styles.playgroundEditorContainer}>
      <Header>
        <div className="flex flex-row items-center">
          <div className="flex-1">
            <Translate
              id="theme.Playground.liveEditor"
              description="The live editor label of the live codeblocks"
            >
              Live Editor
            </Translate>
          </div>
          <button
            type="button"
            className="rounded bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 border-none xl:hidden"
            onClick={toggleExpanded}
          >
            {isExpanded ? "Hide Code" : "Show Code"}
          </button>
        </div>
      </Header>
      <div className={isExpanded ? "block" : "hidden xl:block"}>
        <ThemedLiveEditor />
      </div>
    </div>
  );
}

// this should rather be a stable function
// see https://github.com/facebook/docusaurus/issues/9630#issuecomment-1855682643
const DEFAULT_TRANSFORM_CODE = (code: string) => `${code};`;

export default function Playground({
  children,
  transformCode,
  ...props
}: Props): JSX.Element {
  const prismTheme = usePrismTheme();
  const noInline = props.metastring?.includes("noInline") ?? false;

  return (
    <div className={styles.playgroundContainer}>
      <LiveProvider
        code={children?.replace(/\n$/, "")}
        noInline={noInline}
        transformCode={transformCode ?? DEFAULT_TRANSFORM_CODE}
        theme={prismTheme}
        {...props}
      >
        <>
          <ResultWithHeader />
          <EditorWithHeader />
        </>
      </LiveProvider>
    </div>
  );
}
