import { VictoryThemeDefinition } from "./types";

// *
// * Colors
// *
const colors = {
  blue: "#4F7DA1",
  pink: "#E2A37F",
  teal: "#00796B",
  purple: "#DF948A",
  green: "#8BC34A",
  orange: "#F4511E",
  cyan: "#006064",
  red: "#DF5A49",
  yellow: "#FFF59D",
};

const colorScale = [
  "#252525",
  "#525252",
  "#737373",
  "#969696",
  "#bdbdbd",
  "#d9d9d9",
  "#f0f0f0",
];

const charcoal = "#252525";
const grey = "#969696";

const qualitative = [
  "#334D5C",
  "#45B29D",
  "#EFC94C",
  "#E27A3F",
  "#DF5A49",
  "#4F7DA1",
  "#55DBC1",
  "#EFDA97",
  "#E2A37F",
  "#DF948A",
];
const heatmap = ["#428517", "#77D200", "#D6D305", "#EC8E19", "#C92B05"];
const warm = ["#940031", "#C43343", "#DC5429", "#FF821D", "#FFAF55"];
const cool = ["#2746B9", "#0B69D4", "#2794DB", "#31BB76", "#60E83B"];
const red = ["#FCAE91", "#FB6A4A", "#DE2D26", "#A50F15", "#750B0E"];
const green = ["#354722", "#466631", "#649146", "#8AB25C", "#A9C97E"];
const blue = ["#002C61", "#004B8F", "#006BC9", "#3795E5", "#65B4F4"];

// *
// * Typography
// *
const sansSerif = "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif";
const letterSpacing = "normal";
const fontSize = 14;
// *
// * Layout
// *
const baseProps = {
  width: 450,
  height: 300,
  padding: 50,
  colorScale,
};
// *
// * Labels
// *
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding: 10,
  fill: charcoal,
  stroke: "transparent",
};

const centeredLabelStyles = Object.assign(
  { textAnchor: "middle" },
  baseLabelStyles,
);
// *
// * Strokes
// *
const strokeLinecap = "round";
const strokeLinejoin = "round";

export const grayscale: VictoryThemeDefinition = {
  palette: {
    colors,
    grayscale: colorScale,
    qualitative,
    heatmap,
    warm,
    cool,
    red,
    green,
    blue,
  },
  area: Object.assign(
    {
      style: {
        data: {
          fill: charcoal,
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
          stroke: charcoal,
          strokeWidth: 1,
          strokeLinecap,
          strokeLinejoin,
        },
        axisLabel: Object.assign({}, centeredLabelStyles, {
          padding: 25,
        }),
        grid: {
          fill: "none",
          stroke: "none",
          pointerEvents: "painted",
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
  bar: Object.assign(
    {
      style: {
        data: {
          fill: charcoal,
          padding: 8,
          strokeWidth: 0,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  boxplot: Object.assign(
    {
      style: {
        max: { padding: 8, stroke: charcoal, strokeWidth: 1 },
        maxLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        median: { padding: 8, stroke: charcoal, strokeWidth: 1 },
        medianLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        min: { padding: 8, stroke: charcoal, strokeWidth: 1 },
        minLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        q1: { padding: 8, fill: grey },
        q1Labels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        q3: { padding: 8, fill: grey },
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
          stroke: charcoal,
          strokeWidth: 1,
        },
        labels: Object.assign({}, baseLabelStyles, { padding: 5 }),
      },
      candleColors: {
        positive: "#ffffff",
        negative: charcoal,
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
          stroke: charcoal,
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  group: Object.assign(
    {
      colorScale,
    },
    baseProps,
  ),
  histogram: Object.assign(
    {
      style: {
        data: {
          fill: grey,
          stroke: charcoal,
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  legend: {
    colorScale,
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
          stroke: charcoal,
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  pie: {
    style: {
      data: {
        padding: 10,
        stroke: "transparent",
        strokeWidth: 1,
      },
      labels: Object.assign({}, baseLabelStyles, { padding: 20 }),
    },
    colorScale,
    width: 400,
    height: 400,
    padding: 50,
  },
  scatter: Object.assign(
    {
      style: {
        data: {
          fill: charcoal,
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
      colorScale,
    },
    baseProps,
  ),
  tooltip: {
    style: Object.assign({}, baseLabelStyles, {
      padding: 0,
      pointerEvents: "none",
    }),
    flyoutStyle: {
      stroke: charcoal,
      strokeWidth: 1,
      fill: "#f0f0f0",
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
          stroke: charcoal,
          strokeWidth: 1,
          fill: "#f0f0f0",
          pointerEvents: "none",
        },
      },
    },
    baseProps,
  ),
};
