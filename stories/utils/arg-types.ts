import { VictoryTheme } from "@/victory";

export const VictoryAxisCommonProps = {
  dependentAxis: { control: "boolean" },
  invertAxis: { control: "boolean" },
  tickCount: { control: "number" },

  // NOTE: controls not yet supported, but left for clarity
  // axisComponent: { control: "text" },
  // axisLabelComponent: { control: "text" },
  // axisValue: { control: "text" },
  // disableInlineStyles: { control: "text" },
  // gridComponent: { control: "text" },
  // style: { control: "text" },
  // tickComponent: { control: "text" },
  // tickFormat: { control: "text" },
  // tickLabelComponent: { control: "text" },
  // tickValues: { control: "text" },
};

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
  theme: { control: "text" },
  width: { control: "number" },

  // NOTE: controls not yet supported, but left for clarity
  // containerComponent: { control: "text" },
  // externalEventMutations: { control: "text" },
  // domainPadding: { control: "text" },
  // groupComponent: { control: "text" },
  // maxDomain: { control: "number" },
  // minDomain: { control: "number" },
  // origin: { control: "text" },
  // range: { control: "text" },
  // scale: { control: "text" },
  // sharedEvents: { control: "text" },
  // singleQuadrantDomainPadding: { control: "text" },
};

export const VictoryCommonProps = {
  ...VictoryCommonThemeProps,
  themeKey: { control: "select", options: Object.keys(VictoryTheme) },
};

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
};

export const VictoryDatableProps = {
  data: { control: "object" },
  samples: { control: "number" },
  sortKey: { control: "text" },
  sortOrder: { control: "select", options: ["ascending", "descending"] },

  // NOTE: controls not yet supported, but left for clarity
  // categories: { control: "text" },
  // dataComponent: { control: "text" },
  // domain: { control: "text" },
  // domainPadding: { control: "text" },
  // x: { control: "text" },
  // y: { control: "text" },
  // y0: { control: "text" },
};

export const VictoryLabelableProps = {
  // NOTE: controls not yet supported, but left for clarity
  // labelComponent: { control: "text" },
};

export const VictoryMultiLabelableProps = {
  ...VictoryLabelableProps,

  // NOTE: controls not yet supported, but left for clarity
  // labels: { control: "text" },
};

export const VictorySingleLabelableProps = {
  ...VictoryLabelableProps,

  // NOTE: controls not yet supported, but left for clarity
  // label: { control: "text" },
};
