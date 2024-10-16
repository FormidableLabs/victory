import { VictoryThemeDefinition, VictoryThemePalette } from "./types";

// *
// * Colors
// *
const yellow200 = "#FFF59D";
const deepOrange600 = "#F4511E";
const lime300 = "#DCE775";
const lightGreen500 = "#8BC34A";
const teal700 = "#00796B";
const cyan900 = "#006064";
const colorScale = [
  deepOrange600,
  yellow200,
  lime300,
  lightGreen500,
  teal700,
  cyan900,
];
const blueGrey50 = "#ECEFF1";
const blueGrey300 = "#90A4AE";
const blueGrey700 = "#455A64";
const grey900 = "#212121";

const colors: VictoryThemePalette = {
  blue: "#4F7DA1",
  pink: "#E2A37F",
  teal: teal700,
  purple: "#DF948A",
  green: lightGreen500,
  orange: deepOrange600,
  cyan: cyan900,
  red: "#DF5A49",
  yellow: yellow200,
};

const grayscale = [blueGrey50, blueGrey300, blueGrey700, grey900];
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
const sansSerif = "'Helvetica Neue', 'Helvetica', sans-serif";
const letterSpacing = "normal";
const fontSize = 12;
// *
// * Layout
// *
const padding = 8;
const baseProps = {
  width: 350,
  height: 350,
  padding: 50,
};
// *
// * Labels
// *
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding,
  fill: blueGrey700,
  stroke: "transparent",
  strokeWidth: 0,
};

const centeredLabelStyles = Object.assign(
  { textAnchor: "middle" },
  baseLabelStyles,
);
// *
// * Strokes
// *
const strokeDasharray = "10, 5";
const strokeLinecap = "round";
const strokeLinejoin = "round";

export const material: VictoryThemeDefinition = {
  palette: {
    colors,
    grayscale,
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
          fill: grey900,
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
          stroke: blueGrey300,
          strokeWidth: 2,
          strokeLinecap,
          strokeLinejoin,
        },
        axisLabel: Object.assign({}, centeredLabelStyles, {
          padding,
          stroke: "transparent",
        }),
        grid: {
          fill: "none",
          stroke: blueGrey50,
          strokeDasharray,
          strokeLinecap,
          strokeLinejoin,
          pointerEvents: "painted",
        },
        ticks: {
          fill: "transparent",
          size: 5,
          stroke: blueGrey300,
          strokeWidth: 1,
          strokeLinecap,
          strokeLinejoin,
        },
        tickLabels: Object.assign({}, baseLabelStyles, {
          fill: blueGrey700,
        }),
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
          fill: blueGrey700,
          padding,
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
        max: { padding, stroke: blueGrey700, strokeWidth: 1 },
        maxLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        median: { padding, stroke: blueGrey700, strokeWidth: 1 },
        medianLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        min: { padding, stroke: blueGrey700, strokeWidth: 1 },
        minLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        q1: { padding, fill: blueGrey700 },
        q1Labels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        q3: { padding, fill: blueGrey700 },
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
          stroke: blueGrey700,
        },
        labels: Object.assign({}, baseLabelStyles, { padding: 5 }),
      },
      candleColors: {
        positive: "#ffffff",
        negative: blueGrey700,
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
          stroke: blueGrey700,
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
          fill: blueGrey700,
          stroke: grey900,
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
          opacity: 1,
          stroke: blueGrey700,
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  pie: Object.assign(
    {
      colorScale,
      style: {
        data: {
          padding,
          stroke: blueGrey50,
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
          fill: blueGrey700,
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
      stroke: grey900,
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
          stroke: grey900,
          strokeWidth: 1,
          fill: "#f0f0f0",
          pointerEvents: "none",
        },
      },
    },
    baseProps,
  ),
};
