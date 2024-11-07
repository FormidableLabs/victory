import React from "react";

import { VictoryLabel, VictoryTheme, VictoryTooltip } from "@/victory";

export const VictoryAxisCommonProps = {
  dependentAxis: { control: "boolean" },
  invertAxis: { control: "boolean" },
  tickCount: { control: "number" },

  // disable changing these values
  axisComponent: { control: false },
  axisLabelComponent: { control: false },
  axisValue: { control: false },
  disableInlineStyles: { control: false },
  gridComponent: { control: false },
  style: { control: false },
  tickComponent: { control: false },
  tickFormat: { control: false },
  tickLabelComponent: { control: false },
  tickValues: { control: false },
} as const;

export const VictoryCommonThemeProps = {
  animate: { control: "boolean" },
  colorScale: {
    control: "select",
    options: [
      "greyscale",
      "qualitative",
      "heatmap",
      "warm",
      "cool",
      "red",
      "green",
      "blue",
    ],
  },
  disableInlineStyles: { control: "boolean" },
  height: { control: "number" },
  horizontal: { control: "boolean" },
  name: { control: "text" },
  padding: { control: "text" },
  polar: { control: "boolean" },
  standalone: { control: "boolean" },
  width: { control: "number" },

  // disable changing these values
  containerComponent: { control: false },
  groupComponent: { control: false },
  externalEventMutations: { control: false },
  domainPadding: { control: false },
  maxDomain: { control: false },
  minDomain: { control: false },
  origin: { control: false },
  range: { control: false },
  scale: { control: false },
  sharedEvents: { control: false },
  singleQuadrantDomainPadding: { control: false },
} as const;

export const VictoryCommonProps = {
  ...VictoryCommonThemeProps,

  // disable changing these values
  theme: { control: false },

  // custom control to allow us to hoist the theme to the parent
  // chart for better control of rendering
  themeKey: { control: "select", options: Object.keys(VictoryTheme) },
} as const;

export const VictoryContainerProps = {
  "aria-describedby": { control: "text" },
  "aria-labelledby": { control: "text" },
  className: { control: "text" },
  containerId: { control: "text" },
  desc: { control: "text" },
  height: { control: "number" },
  name: { control: "text" },
  ouiaId: { control: "text" },
  ouiaSafe: { control: "boolean" },
  ouiaType: { control: "text" },
  polar: { control: "boolean" },
  portalZIndex: { control: "number" },
  preserveAspectRatio: { control: "text" },
  responsive: { control: "boolean" },
  role: { control: "text" },
  tabIndex: { control: "number" },
  title: { control: "text" },
  width: { control: "number" },
} as const;

export const VictoryDatableProps = {
  data: { control: "object" },
  samples: { control: "number" },
  sortKey: { control: "text" },
  sortOrder: { control: "select", options: ["ascending", "descending"] },

  // disable changing these values
  categories: { control: false },
  dataComponent: { control: false },
  domain: { control: false },
  domainPadding: { control: false },
  x: { control: false },
  y: { control: false },
  y0: { control: false },
} as const;

export const VictoryLabelableProps = {
  labelComponent: {
    options: ["Label", "Tooltip"],
    mapping: {
      Label: <VictoryLabel />,
      Tooltip: <VictoryTooltip />,
    },
  },
} as const;

export const VictoryMultiLabelableProps = {
  ...VictoryLabelableProps,

  // NOTE: controls not yet supported, but left for clarity
  // labels: { control: "text" },
} as const;

export const VictorySingleLabelableProps = {
  ...VictoryLabelableProps,

  // NOTE: controls not yet supported, but left for clarity
  // label: { control: "text" },
} as const;
