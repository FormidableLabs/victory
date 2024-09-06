import { VictoryThemeDefinition } from "./victory-theme";

// *
// * Colors
// *

const gray = {
  "white": "#FFFFFF",
  "50": "#FAFAFA",
  "100": "#F2F2F2",
  "200": "#E8E8E8",
  "300": "#E0E0E0",
  "400": "#D1D1D1",
  "500": "#757575",
  "600": "#5C5C5C",
  "700": "#424242",
  "800": "#333333",
  "900": "#292929",
  "black": "#0F0F0F",
}
const yellow = {
  "100": "#FFEAB6",
  "300": "#FFD66E",
  "500": "#FCB400",
  "600": "#E08D00",
  "900": "#B87503",
};
const orange = {
  "100": "#FEE2D5",
  "300": "#FFA981",
  "500": "#FF6F2C",
  "600": "#F7653B",
  "900": "#D74D26",
};
const red = {
  "100": "#FFDCE5",
  "300": "#FF9EB7",
  "500": "#F82B60",
  "600": "#EF3061",
  "900": "#BA1E45",
};
const pink = {
  "100": "#FFDAF6",
  "300": "#F99DE2",
  "500": "#FF08C2",
  "600": "#E929BA",
  "900": "#B2158B",
};
const purple = {
  "100": "#EDE3FE",
  "300": "#CDB0FF",
  "500": "#8B46FF",
  "600": "#7C39ED",
  "900": "#6B1CB0",
};
const blue = {
  "100": "#CFDFFF",
  "300": "#9CC7FF",
  "500": "#2D7FF9",
  "600": "#1283DA",
  "900": "#2750AE",
};
const cyan = {
  "100": "#D0F0FD",
  "300": "#77D1F3",
  "500": "#18BFFF",
  "600": "#01A9DB",
  "900": "#0B76B7",
};
const teal = {
  "100": "#C2F5E9",
  "300": "#72DDC3",
  "500": "#20D9D2",
  "600": "#02AAA4",
  "900": "#06A09B",
};
const green = {
  "100": "#D1F7C4",
  "300": "#93E088",
  "500": "#20C933",
  "600": "#11AF22",
  "900": "#338A17",
};

const colors = [
  ...Object.values(gray),
  ...Object.values(yellow),
  ...Object.values(orange),
  ...Object.values(red),
  ...Object.values(pink),
  ...Object.values(purple),
  ...Object.values(blue),
  ...Object.values(cyan),
  ...Object.values(teal),
  ...Object.values(green),
];
// *
// * Typography
// *
const sansSerif = "'Inter-Light', 'Seravek', 'Trebuchet MS', sans-serif";
const letterSpacing = "normal";
const fontSize = 10;
// *
// * Layout
// *
const padding = 8;
const baseProps = {
  width: 450,
  height: 300,
  padding: 50,
  colorScale: colors,
};
// *
// * Labels
// *
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding,
  // fontWeight: "light",
  fill: gray["900"],
  stroke: "transparent",
};

const centeredLabelStyles = Object.assign(
  { textAnchor: "middle" },
  baseLabelStyles,
);

// *
// * Strokes
// *
// const strokeDasharray = "10, 5";
const strokeLinecap = "round";
const strokeLinejoin = "round";
const borderRadius = 2;
// *
// * Theme
// *
export const clean: VictoryThemeDefinition = {
  area: Object.assign(
    {
      style: {
        data: {
          fill: blue["500"],
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  axis: Object.assign(
    {
      style: {
        axis: {
          fill: "transparent",
          stroke: gray["200"],
          strokeWidth: 1,
          strokeLinecap,
          strokeLinejoin,
        },
        axisLabel: Object.assign({}, centeredLabelStyles, {
          padding,
          stroke: "transparent",
        }),
        grid: {
          fill: "none",
          stroke: "none",
          painterEvents: "painted",
        },
        ticks: {
          fill: "transparent",
          size: 1,
          stroke: "transparent",
        },
        tickLabels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  polarDependentAxis: Object.assign({
    style: {
      ticks: {
        fill: "transparent",
        size: 1,
        stroke: "transparent",
      },
    },
  }),
  bar: Object.assign(
    {
      style: {
        data: {
          fill: blue["500"],
          padding,
          strokeWidth: 0,
        },
        labels: baseLabelStyles,
      },
      cornerRadius: { top: borderRadius },
    },
    baseProps,
  ),
  boxplot: Object.assign(
    {
      style: {
        max: { padding, stroke: gray["400"], strokeWidth: 2 },
        maxLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        median: { padding, stroke: gray["300"], strokeWidth: 2 },
        medianLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        min: { padding, stroke: gray["400"], strokeWidth: 2 },
        minLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        q1: { padding, fill: blue["500"] },
        q1Labels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        q3: { padding, fill: blue["500"] },
        q3Labels: Object.assign({}, baseLabelStyles, { padding: 3 }),
      },
      boxWidth: 20,
    },
    baseProps,
  ),
  candlestick: Object.assign(
    {
      style: {
        data: {
          stroke: gray["700"],
        },
        labels: Object.assign({}, baseLabelStyles, { padding: 5 }),
      },
      candleColors: {
        positive: "#ffffff",
        negative: gray["700"],
      },
    },
    baseProps,
  ),
  chart: baseProps,
  errorbar: Object.assign(
    {
      borderWidth: 8,
      style: {
        data: {
          fill: "transparent",
          opacity: 1,
          stroke: gray["700"],
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  group: Object.assign(
    {
      colorScale: colors,
    },
    baseProps,
  ),
  histogram: Object.assign(
    {
      style: {
        data: {
          fill: gray["700"],
          stroke: gray["900"],
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  legend: {
    colorScale: colors,
    gutter: 10,
    orientation: "vertical",
    titleOrientation: "top",
    style: {
      data: {
        type: "circle",
      },
      labels: baseLabelStyles,
      title: Object.assign({}, baseLabelStyles, { padding: 5 }),
    },
  },
  line: Object.assign(
    {
      style: {
        data: {
          fill: "transparent",
          opacity: 1,
          stroke: gray["700"],
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  pie: Object.assign(
    {
      colorScale: colors,
      style: {
        data: {
          padding,
          stroke: gray["50"],
          strokeWidth: 1,
        },
        labels: Object.assign({}, baseLabelStyles, { padding: 20 }),
      },
    },
    baseProps,
  ),
  scatter: Object.assign(
    {
      style: {
        data: {
          fill: gray["700"],
          opacity: 1,
          stroke: "transparent",
          strokeWidth: 0,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  stack: Object.assign(
    {
      colorScale: colors,
    },
    baseProps,
  ),
  tooltip: {
    style: Object.assign({}, baseLabelStyles, {
      padding: 0,
      pointerEvents: "none",
    }),
    flyoutStyle: {
      stroke: gray["900"],
      strokeWidth: 1,
      fill: gray["100"],
      pointerEvents: "none",
    },
    flyoutPadding: 5,
    cornerRadius: 5,
    pointerLength: 10,
  },
  voronoi: Object.assign(
    {
      style: {
        data: {
          fill: "transparent",
          stroke: "transparent",
          strokeWidth: 0,
        },
        labels: Object.assign({}, baseLabelStyles, {
          padding: 5,
          pointerEvents: "none",
        }),
        flyout: {
          stroke: gray["900"],
          strokeWidth: 1,
          fill: gray["100"],
          pointerEvents: "none",
        },
      },
    },
    baseProps,
  ),
};