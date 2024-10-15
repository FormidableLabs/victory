import { VictoryThemeDefinition } from "./victory-theme";

// *
// * Colors
// *

const gray = {
  white: "#FFFFFF",
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
  black: "#0F0F0F",
};
const yellow = {
  "100": "#FFEAB6",
  "300": "#FFD66E",
  "500": "#FCB400",
  "900": "#B87503",
};
const orange = {
  "100": "#FEE2D5",
  "300": "#FFA981",
  "500": "#FF6F2C",
  "900": "#D74D26",
};
const red = {
  "100": "#FFDCE5",
  "300": "#FF9EB7",
  "500": "#F82B60",
  "900": "#BA1E45",
};
const pink = {
  "100": "#FFDAF6",
  "300": "#F99DE2",
  "500": "#FF08C2",
  "900": "#B2158B",
};
const purple = {
  "100": "#EDE3FE",
  "300": "#CDB0FF",
  "500": "#8B46FF",
  "900": "#6B1CB0",
};
const blue = {
  "100": "#CFDFFF",
  "300": "#9CC7FF",
  "500": "#2D7FF9",
  "900": "#2750AE",
};
const cyan = {
  "100": "#D0F0FD",
  "300": "#77D1F3",
  "500": "#18BFFF",
  "900": "#0B76B7",
};
const teal = {
  "100": "#C2F5E9",
  "300": "#72DDC3",
  "500": "#20D9D2",
  "900": "#06A09B",
};
const green = {
  "100": "#D1F7C4",
  "300": "#93E088",
  "500": "#20C933",
  "900": "#338A17",
};

const colors = {
  blue: blue["500"],
  cyan: cyan["500"],
  purple: purple["500"],
  green: green["500"],
  orange: orange["500"],
  teal: teal["500"],
  red: red["500"],
  yellow: yellow["500"],
};

const colorScale = Object.values(colors);
const grayscale = [gray["200"], gray["400"], gray["600"], gray["900"]];
const warm = [yellow["500"], orange["500"], red["500"], pink["500"]];
const cool = [cyan["500"], teal["500"], blue["500"], purple["500"]];
const heatmap = [green["500"], yellow["500"], red["500"]];
const redPalette = [red["500"], red["300"], red["100"]];
const greenPalette = [green["500"], green["300"], green["100"]];
const bluePalette = [blue["500"], blue["300"], blue["100"]];

const defaultColor = blue["500"];

// *
// * Typography
// *
const sansSerif =
  "'Inter', 'Helvetica Neue', 'Seravek', 'Helvetica', sans-serif";
const letterSpacing = "normal";
const fontSize = 12;
// *
// * Layout
// *
const padding = 8;
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
  fontWeight: 300,
  letterSpacing,
  padding,
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
const strokeDasharray = "10, 5";
const strokeLinecap = "round";
const strokeLinejoin = "round";
const borderRadius = 1;
// *
// * Theme
// *
export const clean: VictoryThemeDefinition = {
  palette: {
    colors,
    grayscale,
    qualitative: colorScale,
    heatmap,
    warm,
    cool,
    red: redPalette,
    green: greenPalette,
    blue: bluePalette,
  },
  area: Object.assign(
    {
      style: {
        data: {
          fill: defaultColor,
          strokeWidth: 2,
          fillOpacity: 0.5,
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
          stroke: gray["500"],
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
          size: 5,
          stroke: "transparent",
        },
        tickLabels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  polarAxis: Object.assign({
    style: {
      axis: {
        stroke: gray["500"],
      },
      grid: {
        stroke: gray["400"],
        strokeDasharray,
        strokeLinecap,
        strokeLinejoin,
        pointerEvents: "painted",
      },
      ticks: {
        fill: "transparent",
        size: 5,
        stroke: gray["400"],
        strokeWidth: 1,
        strokeLinecap,
        strokeLinejoin,
      },
      tickLabels: baseLabelStyles,
    },
  }),
  polarDependentAxis: Object.assign({
    style: {
      axis: {
        stroke: gray["500"],
      },
      grid: {
        stroke: gray["400"],
        strokeDasharray,
        strokeLinecap,
        strokeLinejoin,
        pointerEvents: "painted",
      },
      ticks: {
        fill: "transparent",
        size: 5,
        stroke: gray["300"],
        strokeWidth: 1,
        strokeLinecap,
        strokeLinejoin,
      },
      tickLabels: baseLabelStyles,
    },
  }),
  bar: Object.assign(
    {
      style: {
        data: {
          fill: defaultColor,
          padding,
          strokeWidth: 1,
          fillOpacity: 0.5,
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
        median: { padding, stroke: gray.white, strokeWidth: 2 },
        medianLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        min: { padding, stroke: gray["400"], strokeWidth: 2 },
        minLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        q1: { padding, fill: colorScale[0], rx: borderRadius, strokeWidth: 2 },
        q1Labels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        q3: { padding, fill: colorScale[1], rx: borderRadius },
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
          stroke: gray["300"],
          strokeWidth: 0,
          rx: borderRadius,
        },
        labels: Object.assign({}, baseLabelStyles, { padding: 5 }),
      },
      candleColors: {
        positive: green["500"],
        negative: red["500"],
      },
      wickStrokeWidth: 2,
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
          strokeLinecap,
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
          fill: cyan["500"],
          fillOpacity: 0.5,
        },
        labels: baseLabelStyles,
      },
      binSpacing: 4,
      cornerRadius: { top: borderRadius },
    },
    baseProps,
  ),
  label: baseLabelStyles,
  legend: {
    colorScale,
    gutter: 24,
    borderPadding: 10,
    orientation: "horizontal",
    titleOrientation: "top",
    centerTitle: true,
    style: {
      data: {
        type: "circle",
      },
      labels: { ...baseLabelStyles, fontSize: 12 },
      title: Object.assign({}, baseLabelStyles, { padding, fontSize: 16 }),
      border: { stroke: gray["200"], strokeWidth: 2, padding: 16 },
    },
  },
  line: Object.assign(
    {
      style: {
        data: {
          fill: "transparent",
          opacity: 1,
          stroke: defaultColor,
          strokeWidth: 2,
          strokeLinecap,
          strokeLinejoin,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  pie: Object.assign(
    {
      style: {
        parent: {
          backgroundColor: gray.white,
        },
        data: {
          padding,
          stroke: gray.white,
          strokeWidth: 1,
        },
        labels: {
          ...baseLabelStyles,
          padding: 20,
          fill: gray["600"],
          fontSize: 10,
        },
      },
      colorScale,
      cornerRadius: borderRadius,
    },
    baseProps,
  ),
  scatter: Object.assign(
    {
      style: {
        data: {
          fill: defaultColor,
          opacity: 1,
          stroke: "transparent",
          strokeWidth: 0,
        },
        labels: {
          ...baseLabelStyles,
          padding: 20,
        },
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
      stroke: gray["300"],
      strokeWidth: 2,
      fill: gray.white,
      pointerEvents: "none",
    },
    flyoutPadding: { top: 8, bottom: 8, left: 16, right: 16 },
    cornerRadius: borderRadius,
    pointerLength: 4,
  },
  voronoi: Object.assign(
    {
      style: {
        data: {
          fill: blue["100"],
          stroke: defaultColor,
          strokeWidth: 2,
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
        padding: { left: 2, bottom: 2 },
      },
    },
    baseProps,
  ),
};