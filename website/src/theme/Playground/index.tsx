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
  return (
    <div className={styles.playgroundEditorContainer}>
      <Header>
        <Translate
          id="theme.Playground.liveEditor"
          description="The live editor label of the live codeblocks"
        >
          Editor
        </Translate>
      </Header>
      <ThemedLiveEditor />
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
