/* eslint-disable no-magic-numbers */
import React from "react";
import {
  VictoryArea,
  VictoryAxis,
  VictoryBar,
  VictoryBoxPlot,
  VictoryCandlestick,
  VictoryErrorBar,
  VictoryHistogram,
  VictoryLegend,
  VictoryLine,
  VictoryPie,
  VictoryPolarAxis,
  VictoryScatter,
  VictoryVoronoi,
} from "victory";

type ThemeBuilderFieldConfig =
  | {
      type: "section" | "colorScale";
      label: string;
      fields?: ThemeBuilderFieldConfig[];
    }
  | {
      type: "slider" | "select" | "colorPicker";
      label: string;
      path: string | string[];
      min?: number;
      max?: number;
      step?: number;
      unit?: string;
      default: number | string;
      options?: { label: string; value: string }[];
    };

enum StrokeProps {
  STROKE = "Stroke",
  STROKE_WIDTH = "Stroke Width",
  STROKE_DASH_ARRAY = "Stroke Dash Array",
  STROKE_LINE_CAP = "Stroke Line Cap",
  STROKE_LINE_JOIN = "Stroke Line Join",
}

type ThemeBuilderOptionsConfig = {
  type: "section";
  title: string;
  hasVictoryChart?: boolean;
  content?: (props: any) => React.ReactNode;
  fields: ThemeBuilderFieldConfig[];
}[];

const defaultFill = "#000";

const getPath = (basePath: string | string[], key: string) => {
  if (Array.isArray(basePath)) {
    return basePath.map((p) => `${p}.${key}`);
  }
  return `${basePath}.${key}`;
};

const getBaseStrokeConfig = (
  basePath: string | string[],
  includedStrokeProps: StrokeProps[] = [],
): ThemeBuilderFieldConfig[] => {
  const config = [
    {
      type: "colorPicker",
      label: StrokeProps.STROKE,
      default: defaultFill,
      path: getPath(basePath, "stroke"),
    },
    {
      type: "slider",
      label: StrokeProps.STROKE_WIDTH,
      min: 0,
      max: 5,
      unit: "px",
      default: 1,
      path: getPath(basePath, "strokeWidth"),
    },
    {
      type: "slider",
      label: StrokeProps.STROKE_DASH_ARRAY,
      min: 0,
      max: 10,
      default: 0,
      path: getPath(basePath, "strokeDasharray"),
    },
    {
      type: "select",
      label: StrokeProps.STROKE_LINE_CAP,
      options: [
        { label: "Round", value: "round" },
        { label: "Square", value: "square" },
        { label: "Butt", value: "butt" },
      ],
      default: "round",
      path: getPath(basePath, "strokeLinecap"),
    },
    {
      type: "select",
      label: StrokeProps.STROKE_LINE_JOIN,
      options: [
        { label: "Round", value: "round" },
        { label: "Bevel", value: "bevel" },
        { label: "Miter", value: "miter" },
      ],
      default: "round",
      path: getPath(basePath, "strokeLinejoin"),
    },
  ] as ThemeBuilderFieldConfig[];
  return includedStrokeProps.length
    ? config.filter((field) =>
        includedStrokeProps.includes(field.label as StrokeProps),
      )
    : config;
};

const getBaseLabelsConfig = (
  basePath: string | string[],
): ThemeBuilderFieldConfig[] => [
  {
    type: "slider",
    label: "Font Size",
    min: 10,
    max: 24,
    unit: "px",
    path: getPath(basePath, "fontSize"),
    default: 12,
  },
  {
    type: "slider",
    label: "Text Padding",
    min: 0,
    max: 50,
    unit: "px",
    path: getPath(basePath, "padding"),
    default: 8,
  },
  {
    type: "colorPicker",
    label: "Font Color",
    path: getPath(basePath, "fill"),
    default: defaultFill,
  },
];

const optionsConfig: ThemeBuilderOptionsConfig = [
  {
    type: "section",
    title: "Palette",
    fields: [
      {
        type: "colorScale",
        label: "Color Scale",
      },
    ],
  },
  {
    type: "section",
    title: "Global Settings",
    fields: [
      {
        type: "slider",
        label: "Width",
        min: 0,
        max: 500,
        unit: "px",
        default: 350,
        path: [
          "chart.width",
          "axis.width",
          "area.width",
          "bar.width",
          "boxplot.width",
          "candlestick.width",
          "errorbar.width",
          "group.width",
          "histogram.width",
          "line.width",
          "pie.width",
          "scatter.width",
          "stack.width",
          "voronoi.width",
        ],
      },
      {
        type: "slider",
        label: "Height",
        min: 0,
        max: 500,
        unit: "px",
        default: 350,
        path: [
          "chart.height",
          "axis.height",
          "area.height",
          "bar.height",
          "boxplot.height",
          "candlestick.height",
          "errorbar.height",
          "group.height",
          "histogram.height",
          "line.height",
          "pie.height",
          "scatter.height",
          "stack.height",
          "voronoi.height",
        ],
      },
      {
        type: "slider",
        label: "Padding",
        min: 0,
        max: 100,
        unit: "px",
        default: 50,
        path: [
          "chart.padding",
          "axis.padding",
          "area.padding",
          "bar.padding",
          "boxplot.padding",
          "candlestick.padding",
          "errorbar.padding",
          "group.padding",
          "histogram.padding",
          "line.padding",
          "pie.padding",
          "scatter.padding",
          "stack.padding",
          "voronoi.padding",
        ],
      },
      {
        type: "section",
        label: "Labels",
        fields: getBaseLabelsConfig([
          "axis.style.axisLabel",
          "polarAxis.style.tickLabels",
          "polarDependentAxis.style.tickLabels",
          "tooltip.style",
          "area.style.labels",
          "bar.style.labels",
          "candlestick.style.labels",
          "errorbar.style.labels",
          "histogram.style.labels",
          "legend.style.labels",
          "line.style.labels",
          "pie.style.labels",
          "scatter.style.labels",
          "voronoi.style.labels",
          "boxplot.style.maxLabels",
          "boxplot.style.medianLabels",
          "boxplot.style.minLabels",
          "boxplot.style.q1Labels",
          "boxplot.style.q3Labels",
        ]),
      },
      {
        type: "section",
        label: "Data",
        fields: getBaseStrokeConfig([
          "area.style.data",
          "bar.style.data",
          "candlestick.style.data",
          "errorbar.style.data",
          "histogram.style.data",
          "line.style.data",
          "pie.style.data",
          "scatter.style.data",
          "voronoi.style.data",
        ]),
      },
    ],
  },
  {
    type: "section",
    title: "Axis",
    fields: [
      {
        type: "section",
        label: "General",
        fields: [
          {
            type: "colorPicker",
            label: "Fill",
            default: defaultFill,
            path: "axis.style.axis.fill",
          },
          ...getBaseStrokeConfig("axis.style.axis", [
            StrokeProps.STROKE,
            StrokeProps.STROKE_WIDTH,
            StrokeProps.STROKE_LINE_CAP,
            StrokeProps.STROKE_LINE_JOIN,
          ]),
        ],
      },
      {
        type: "section",
        label: "Grid",
        fields: [
          {
            type: "colorPicker",
            label: "Fill",
            default: defaultFill,
            path: "axis.style.grid.fill",
          },
          ...getBaseStrokeConfig("axis.style.grid"),
        ],
      },
      {
        type: "section",
        label: "Ticks",
        fields: [
          {
            type: "slider",
            label: "Size",
            min: 0,
            max: 50,
            unit: "px",
            default: 5,
            path: "axis.style.ticks.size",
          },
          ...getBaseStrokeConfig("axis.style.ticks", [
            StrokeProps.STROKE,
            StrokeProps.STROKE_WIDTH,
          ]),
        ],
      },
      {
        type: "section",
        label: "Labels",
        fields: getBaseLabelsConfig("axis.style.axisLabel"),
      },
    ],
  },
  {
    type: "section",
    title: "Polar Axis",
    content: (props) => [
      <VictoryPolarAxis {...props} key="polar-axis" standalone={false} />,
      <VictoryPolarAxis
        {...props}
        key="polar-axis-dependent"
        dependentAxis
        domain={[0, 10]}
        standalone={false}
      />,
    ],
    fields: [
      {
        type: "section",
        label: "General",
        fields: getBaseStrokeConfig("polarAxis.style.axis", [
          StrokeProps.STROKE,
          StrokeProps.STROKE_WIDTH,
        ]),
      },
      {
        type: "section",
        label: "Grid",
        fields: getBaseStrokeConfig("polarAxis.style.grid"),
      },
      {
        type: "section",
        label: "Ticks",
        fields: [
          {
            type: "slider",
            label: "Size",
            min: 0,
            max: 50,
            unit: "px",
            default: 5,
            path: "polarAxis.style.ticks.size",
          },
          ...getBaseStrokeConfig("polarAxis.style.ticks", [
            StrokeProps.STROKE,
            StrokeProps.STROKE_WIDTH,
            StrokeProps.STROKE_LINE_CAP,
            StrokeProps.STROKE_LINE_JOIN,
          ]),
        ],
      },
      {
        type: "section",
        label: "Labels",
        fields: getBaseLabelsConfig("polarAxis.style.tickLabels"),
      },
    ],
  },
  {
    type: "section",
    title: "Polar Dependent Axis",
    fields: [
      {
        type: "section",
        label: "General",
        fields: getBaseStrokeConfig("polarDependentAxis.style.axis", [
          StrokeProps.STROKE,
          StrokeProps.STROKE_WIDTH,
        ]),
      },
      {
        type: "section",
        label: "Grid",
        fields: getBaseStrokeConfig("polarDependentAxis.style.grid"),
      },
      {
        type: "section",
        label: "Ticks",
        fields: [
          {
            type: "slider",
            label: "Size",
            min: 0,
            max: 50,
            unit: "px",
            default: 5,
            path: "polarDependentAxis.style.ticks.size",
          },
          ...getBaseStrokeConfig("polarDependentAxis.style.ticks", [
            StrokeProps.STROKE,
            StrokeProps.STROKE_WIDTH,
            StrokeProps.STROKE_LINE_CAP,
            StrokeProps.STROKE_LINE_JOIN,
          ]),
        ],
      },
      {
        type: "section",
        label: "Labels",
        fields: getBaseLabelsConfig("polarDependentAxis.style.tickLabels"),
      },
    ],
  },
  {
    type: "section",
    title: "Area Chart",
    content: (props) => [
      <VictoryAxis key="x-axis" label="X Axis" />,
      <VictoryAxis key="y-axis" dependentAxis label="Y Axis" />,
      <VictoryArea
        {...props}
        key="area-chart"
        data={[
          { x: 1, y: 2, label: "A" },
          { x: 2, y: 3, label: "B" },
          { x: 3, y: 5, label: "C" },
          { x: 4, y: 4, label: "D" },
          { x: 5, y: 7, label: "E" },
        ]}
      />,
    ],
    fields: [
      {
        type: "section",
        label: "Data",
        fields: [
          {
            type: "slider",
            label: "Fill Opacity",
            min: 0,
            max: 1,
            step: 0.1,
            path: "area.style.data.fillOpacity",
            default: 1,
          },
          ...getBaseStrokeConfig("area.style.data", [
            StrokeProps.STROKE,
            StrokeProps.STROKE_WIDTH,
          ]),
          {
            type: "colorPicker",
            label: "Fill",
            path: "area.style.data.fill",
            default: defaultFill,
          },
        ],
      },
      {
        type: "section",
        label: "Labels",
        fields: getBaseLabelsConfig("area.style.labels"),
      },
    ],
  },
  {
    type: "section",
    title: "Bar Chart",
    content: (props) => [
      <VictoryAxis key="x-axis" label="X Axis" />,
      <VictoryAxis key="y-axis" dependentAxis label="Y Axis" />,
      <VictoryBar
        key="bar-chart"
        {...props}
        data={[
          { x: 1, y: 2, label: "A" },
          { x: 2, y: 3, label: "B" },
          { x: 3, y: 5, label: "C" },
          { x: 4, y: 4, label: "D" },
          { x: 5, y: 7, label: "E" },
        ]}
      />,
    ],
    fields: [
      {
        type: "section",
        label: "Data",
        fields: [
          {
            type: "colorPicker",
            label: "Fill",
            path: "bar.style.data.fill",
            default: defaultFill,
          },
          ...getBaseStrokeConfig("bar.style.data", [
            StrokeProps.STROKE,
            StrokeProps.STROKE_WIDTH,
          ]),
          {
            type: "slider",
            label: "Fill Opacity",
            min: 0,
            max: 1,
            step: 0.1,
            path: "bar.style.data.fillOpacity",
            default: 1,
          },
          {
            type: "slider",
            label: "Top Corner Radius",
            path: "bar.cornerRadius.top",
            max: 2,
            step: 0.5,
            default: 0,
          },
        ],
      },
      {
        type: "section",
        label: "Labels",
        fields: getBaseLabelsConfig("bar.style.labels"),
      },
    ],
  },
  {
    type: "section",
    title: "Box Plot",
    content: (props) => (
      <VictoryBoxPlot
        {...props}
        data={[
          { x: 1, y: [1, 2, 3, 5, 8] },
          { x: 2, y: [3, 2, 8, 10, 12] },
          { x: 3, y: [2, 8, 6, 5, 10] },
          { x: 4, y: [1, 3, 2, 9, 5] },
          { x: 5, y: [3, 2, 9, 5, 7] },
        ]}
        labels
        labelOrientation="right"
      />
    ),
    fields: [
      {
        type: "section",
        label: "Max",
        fields: [
          ...getBaseStrokeConfig("boxplot.style.max", [
            StrokeProps.STROKE,
            StrokeProps.STROKE_WIDTH,
          ]),
          ...getBaseLabelsConfig("boxplot.style.maxLabels"),
        ],
      },
      {
        type: "section",
        label: "Median",
        fields: [
          ...getBaseStrokeConfig("boxplot.style.median", [
            StrokeProps.STROKE,
            StrokeProps.STROKE_WIDTH,
          ]),
          ...getBaseLabelsConfig("boxplot.style.medianLabels"),
        ],
      },
      {
        type: "section",
        label: "Min",
        fields: [
          ...getBaseStrokeConfig("boxplot.style.min", [
            StrokeProps.STROKE,
            StrokeProps.STROKE_WIDTH,
          ]),
          ...getBaseLabelsConfig("boxplot.style.minLabels"),
        ],
      },
      {
        type: "section",
        label: "Q1",
        fields: [
          {
            type: "colorPicker",
            label: "Fill",
            default: defaultFill,
            path: "boxplot.style.q1.fill",
          },
          {
            type: "slider",
            label: "Border Radius",
            min: 0,
            max: 10,
            step: 0.5,
            default: 0,
            path: "boxplot.q1.rx",
          },
          {
            type: "slider",
            label: "Stroke Width",
            min: 0,
            max: 5,
            unit: "px",
            default: 1,
            path: "boxplot.style.q1.strokeWidth",
          },
          ...getBaseLabelsConfig("boxplot.style.q1Labels"),
        ],
      },
      {
        type: "section",
        label: "Q3",
        fields: [
          {
            type: "colorPicker",
            label: "Fill",
            default: defaultFill,
            path: "boxplot.style.q3.fill",
          },
          {
            type: "slider",
            label: "Border Radius",
            min: 0,
            max: 10,
            step: 0.5,
            default: 0,
            path: "boxplot.q3.rx",
          },
          ...getBaseLabelsConfig("boxplot.style.q3Labels"),
        ],
      },
    ],
  },
  {
    type: "section",
    title: "Candlestick Chart",
    content: (props) => (
      <VictoryCandlestick
        {...props}
        data={[
          {
            x: "3/1/23",
            open: 5,
            close: 10,
            high: 15,
            low: 0,
            label: "A",
          },
          {
            x: "3/2/23",
            open: 10,
            close: 15,
            high: 20,
            low: 5,
            label: "B",
          },
          {
            x: "3/3/23",
            open: 15,
            close: 20,
            high: 22,
            low: 10,
            label: "C",
          },
          {
            x: "3/4/23",
            open: 20,
            close: 10,
            high: 25,
            low: 7,
            label: "D",
          },
          {
            x: "3/5/23",
            open: 10,
            close: 8,
            high: 15,
            low: 5,
            label: "E",
          },
        ]}
      />
    ),
    fields: [
      {
        type: "section",
        label: "Data",
        fields: [
          ...getBaseStrokeConfig("candlestick.style.data", [
            StrokeProps.STROKE,
            StrokeProps.STROKE_WIDTH,
          ]),
          {
            type: "slider",
            label: "Border Radius",
            max: 2,
            step: 0.5,
            default: 0,
            path: "candlestick.style.data.rx",
          },
          {
            type: "slider",
            label: "Wick Width",
            min: 0,
            max: 5,
            unit: "px",
            path: "candlestick.wickStrokeWidth",
            default: 2,
          },
        ],
      },
      {
        type: "section",
        label: "Labels",
        fields: getBaseLabelsConfig("candlestick.style.labels"),
      },
      {
        type: "section",
        label: "Colors",
        fields: [
          {
            type: "colorPicker",
            label: "Positive Color",
            path: "candlestick.candleColors.positive",
            default: "#ffffff",
          },
          {
            type: "colorPicker",
            label: "Negative Color",
            path: "candlestick.candleColors.negative",
            default: defaultFill,
          },
        ],
      },
    ],
  },
  {
    type: "section",
    title: "Error Bar",
    content: (props) => (
      <VictoryErrorBar
        {...props}
        data={[
          { x: 1, y: 1, errorX: [1, 0.5], errorY: 0.1 },
          { x: 2, y: 2, errorX: [1, 3], errorY: 0.1 },
          { x: 3, y: 3, errorX: [1, 3], errorY: [0.2, 0.3] },
          { x: 4, y: 2, errorX: [1, 0.5], errorY: 0.1 },
          { x: 5, y: 1, errorX: [1, 0.5], errorY: 0.2 },
        ]}
      />
    ),
    fields: [
      {
        type: "section",
        label: "Data",
        fields: [
          {
            type: "slider",
            label: "Border Width",
            min: 0,
            max: 10,
            unit: "px",
            path: "errorbar.borderWidth",
            default: 8,
          },
          ...getBaseStrokeConfig("errorbar.style.data", [
            StrokeProps.STROKE,
            StrokeProps.STROKE_WIDTH,
            StrokeProps.STROKE_LINE_CAP,
          ]),
        ],
      },
      {
        type: "section",
        label: "Labels",
        fields: getBaseLabelsConfig("errorbar.style.labels"),
      },
    ],
  },
  {
    type: "section",
    title: "Histogram",
    content: (props) => (
      <VictoryHistogram
        {...props}
        data={[
          { x: 0 },
          { x: 1 },
          { x: 1 },
          { x: 1 },
          { x: 1 },
          { x: 2 },
          { x: 2 },
          { x: 3 },
          { x: 4 },
          { x: 7 },
          { x: 7 },
          { x: 10 },
        ]}
        labels={({ datum }) => `Bin count:\n ${datum.x}`}
      />
    ),
    fields: [
      {
        type: "section",
        label: "Data",
        fields: [
          {
            type: "colorPicker",
            label: "Fill",
            path: "histogram.style.data.fill",
            default: defaultFill,
          },
          {
            type: "slider",
            label: "Fill Opacity",
            min: 0,
            max: 1,
            step: 0.1,
            path: "histogram.style.data.fillOpacity",
            default: 1,
          },
          {
            type: "slider",
            label: "Top Corner Radius",
            path: "histogram.cornerRadius.top",
            max: 10,
            step: 0.5,
            default: 0,
          },
          {
            type: "slider",
            label: "Bin Spacing",
            min: 0,
            max: 10,
            unit: "px",
            path: "histogram.binSpacing",
            default: 4,
          },
        ],
      },
      {
        type: "section",
        label: "Labels",
        fields: getBaseLabelsConfig("histogram.style.labels"),
      },
    ],
  },
  {
    type: "section",
    title: "Legend",
    content: (props) => [
      <VictoryLegend
        {...props}
        key="legend"
        x={125}
        y={20}
        title="Pets"
        data={[
          {
            name: "Dogs",
            symbol: { fill: "tomato" },
          },
          {
            name: "Cats",
            symbol: { fill: "orange" },
          },
          {
            name: "Rabbits",
            symbol: { fill: "gold" },
          },
        ]}
      />,
      <VictoryBar
        key="legend-chart"
        data={[
          {
            x: "Dogs",
            y: 6,
            fill: "tomato",
          },
          {
            x: "Cats",
            y: 4,
            fill: "orange",
          },
          {
            x: "Rabbits",
            y: 2,
            fill: "gold",
          },
        ]}
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
          },
        }}
      />,
    ],
    fields: [
      {
        type: "section",
        label: "General",
        fields: [
          {
            type: "slider",
            label: "Gutter",
            min: 0,
            max: 50,
            unit: "px",
            path: "legend.gutter",
            default: 20,
          },
          {
            type: "slider",
            label: "Border Padding",
            min: 0,
            max: 50,
            unit: "px",
            path: "legend.borderPadding",
            default: 10,
          },
          {
            type: "select",
            label: "Orientation",
            options: [
              { label: "Horizontal", value: "horizontal" },
              { label: "Vertical", value: "vertical" },
            ],
            path: "legend.orientation",
            default: "horizontal",
          },
          {
            type: "select",
            label: "Title Orientation",
            options: [
              { label: "Top", value: "top" },
              { label: "Bottom", value: "bottom" },
              { label: "Left", value: "left" },
              { label: "Right", value: "right" },
            ],
            path: "legend.titleOrientation",
            default: "top",
          },
          {
            type: "select",
            label: "Data Type",
            options: [
              { label: "Circle", value: "circle" },
              { label: "Square", value: "square" },
              { label: "Diamond", value: "diamond" },
              { label: "Star", value: "star" },
            ],
            path: "legend.style.data.type",
            default: "circle",
          },
        ],
      },
      {
        type: "section",
        label: "Labels",
        fields: getBaseLabelsConfig("legend.style.labels"),
      },
      {
        type: "section",
        label: "Title",
        fields: getBaseLabelsConfig("legend.style.title"),
      },
      {
        type: "section",
        label: "Border",
        fields: getBaseStrokeConfig("legend.style.border", [
          StrokeProps.STROKE,
          StrokeProps.STROKE_WIDTH,
        ]),
      },
    ],
  },
  {
    type: "section",
    title: "Line Chart",
    content: (props) => [
      <VictoryAxis key="x-axis" label="X Axis" />,
      <VictoryAxis key="y-axis" dependentAxis label="Y Axis" />,
      <VictoryLine
        key="line-chart"
        {...props}
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 7 },
        ]}
        labels={({ datum }) => datum.y}
      />,
    ],
    fields: [
      {
        type: "section",
        label: "Data",
        fields: getBaseStrokeConfig("line.style.data", [
          StrokeProps.STROKE,
          StrokeProps.STROKE_WIDTH,
          StrokeProps.STROKE_LINE_CAP,
          StrokeProps.STROKE_LINE_JOIN,
        ]),
      },
      {
        type: "section",
        label: "Labels",
        fields: getBaseLabelsConfig("line.style.labels"),
      },
    ],
  },
  {
    type: "section",
    title: "Pie Chart",
    hasVictoryChart: false,
    content: (props) => (
      <VictoryPie
        {...props}
        data={[
          { x: "Cats", y: 35 },
          { x: "Dogs", y: 40 },
          { x: "Birds", y: 55 },
          { x: "Fishes", y: 15 },
          { x: "Reptiles", y: 10 },
        ]}
      />
    ),
    fields: [
      {
        type: "section",
        label: "Data",
        fields: [
          {
            type: "slider",
            label: "Padding",
            min: 0,
            max: 50,
            unit: "px",
            path: "pie.style.data.padding",
            default: 0,
          },
          ...getBaseStrokeConfig("pie.style.data", [
            StrokeProps.STROKE,
            StrokeProps.STROKE_WIDTH,
          ]),
        ],
      },
      {
        type: "section",
        label: "Labels",
        fields: getBaseLabelsConfig("pie.style.labels"),
      },
    ],
  },
  {
    type: "section",
    title: "Scatter Chart",
    content: (props) => (
      <VictoryScatter
        {...props}
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 7 },
        ]}
      />
    ),
    fields: [
      {
        type: "section",
        label: "Data",
        fields: [
          {
            type: "colorPicker",
            label: "Fill",
            default: defaultFill,
            path: "scatter.style.data.fill",
          },
          {
            type: "slider",
            label: "Opacity",
            min: 0,
            max: 1,
            step: 0.1,
            default: 1,
            path: "scatter.style.data.opacity",
          },
          ...getBaseStrokeConfig("scatter.style.data", [
            StrokeProps.STROKE,
            StrokeProps.STROKE_WIDTH,
          ]),
        ],
      },
      {
        type: "section",
        label: "Labels",
        fields: getBaseLabelsConfig("scatter.style.labels"),
      },
    ],
  },
  {
    type: "section",
    title: "Tooltip",
    fields: [
      {
        type: "section",
        label: "General",
        fields: [
          ...getBaseLabelsConfig("tooltip.style"),
          {
            type: "slider",
            label: "Corner Radius",
            min: 0,
            max: 10,
            default: 0,
            path: "tooltip.cornerRadius",
          },
          {
            type: "slider",
            label: "Pointer Length",
            min: 0,
            max: 20,
            default: 10,
            path: "tooltip.pointerLength",
          },
        ],
      },
      {
        type: "section",
        label: "Flyout",
        fields: [
          {
            type: "colorPicker",
            label: "Fill",
            default: "#FFFFFF",
            path: "tooltip.flyoutStyle.fill",
          },
          ...getBaseStrokeConfig("tooltip.flyoutStyle", [
            StrokeProps.STROKE,
            StrokeProps.STROKE_WIDTH,
          ]),
          {
            type: "select",
            label: "Pointer Events",
            options: [
              { label: "None", value: "none" },
              { label: "All", value: "all" },
            ],
            default: "none",
            path: "tooltip.flyoutStyle.pointerEvents",
          },
        ],
      },
    ],
  },
  {
    type: "section",
    title: "Voronoi",
    content: (props) => (
      <VictoryVoronoi
        {...props}
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 7 },
        ]}
      />
    ),
    fields: [
      {
        type: "section",
        label: "General",
        fields: [
          {
            type: "colorPicker",
            label: "Fill",
            default: "#FFFFFF",
            path: "voronoi.style.data.fill",
          },
          ...getBaseStrokeConfig("voronoi.style.data", [
            StrokeProps.STROKE,
            StrokeProps.STROKE_WIDTH,
          ]),
        ],
      },
      {
        type: "section",
        label: "Labels",
        fields: getBaseLabelsConfig("voronoi.style.labels"),
      },
    ],
  },
];

export default optionsConfig;
