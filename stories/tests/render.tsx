import React from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";

// Renders one story at a time into the page, for the markup and screenshot
// tests.

let root: Root | undefined;
let container: HTMLElement | undefined;

export const unmountStory = () => {
  root?.unmount();
  container?.remove();
  root = container = undefined;
};

// The first render, after effects: what Storybook showed before any
// interaction. Tests compare it before animations or timers run.
export const renderStory = async (Story: React.ComponentType) => {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  flushSync(() => root!.render(<Story />));
  await settle(container);
  return container;
};

const nextFrame = () =>
  new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve)));

// Mount effects set state that renders more (VictoryClipContainer's clip id,
// VictoryPortal's children), scheduled by React rather than flushed with the
// first render. Wait until the markup stops changing.
const MAX_FRAMES = 20;
const settle = async (element: HTMLElement) => {
  let markup = element.innerHTML;
  for (let frame = 0; frame < MAX_FRAMES; frame++) {
    await nextFrame();
    if (element.innerHTML === markup) {
      return;
    }
    markup = element.innerHTML;
  }
  throw new Error(`Still changing after ${MAX_FRAMES} frames`);
};
