import React from "react";
import { VictoryArea } from "victory-area";
import { VictoryAxis } from "victory-axis";
import { VictoryBar } from "victory-bar";
import { VictoryCandlestick } from "victory-candlestick";
import { VictoryErrorBar } from "victory-errorbar";
import { VictoryHistogram } from "victory-histogram";
import { VictoryLegend } from "victory-legend";

type ThemeBuilderFieldConfig =
  | {
      type: "section" | "colorScale";
      label: string;
      fields?: ThemeBuilderFieldConfig[];
    }
  | {
      type: "slider" | "select" | "colorPicker";
      label: string;
      path: string;
      min?: number;
      max?: number;
      step?: number;
      unit?: string;
      default: number | string;
      options?: { label: string; value: string }[];
    };

type ThemeBuilderOptionsConfig = {
  type: "section";
  title: string;
  content?: (props: any) => React.ReactNode;
  fields: ThemeBuilderFieldConfig[];
}[];

const defaultFill = "#000";

const getBaseLabelsConfig: (basePath: string) => ThemeBuilderFieldConfig[] = (
  basePath: string,
) => [
  {
    type: "slider",
    label: "Font Size",
    min: 10,
    max: 24,
    unit: "px",
    path: `${basePath}.fontSize`,
    default: 12,
  },
  {
    type: "slider",
    label: "Padding",
    min: 0,
    max: 50,
    unit: "px",
    path: `${basePath}.padding`,
    default: 8,
  },
  {
    type: "colorPicker",
    label: "Fill",
    path: `${basePath}.fill`,
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
    title: "Axis Labels",
    fields: getBaseLabelsConfig("axis.style.axisLabel"),
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
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 7 },
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
          {
            type: "slider",
            label: "Stroke Width",
            min: 0,
            max: 5,
            unit: "px",
            path: "area.style.data.strokeWidth",
            default: 2,
          },
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
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 7 },
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
          {
            type: "slider",
            label: "Stroke Width",
            min: 0,
            max: 5,
            unit: "px",
            path: "bar.style.data.strokeWidth",
            default: 0,
          },
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
          },
          {
            x: "3/2/23",
            open: 10,
            close: 15,
            high: 20,
            low: 5,
          },
          {
            x: "3/3/23",
            open: 15,
            close: 20,
            high: 22,
            low: 10,
          },
          {
            x: "3/4/23",
            open: 20,
            close: 10,
            high: 25,
            low: 7,
          },
          {
            x: "3/5/23",
            open: 10,
            close: 8,
            high: 15,
            low: 5,
          },
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
            label: "Stroke Color",
            path: "candlestick.style.data.stroke",
            default: defaultFill,
          },
          {
            type: "slider",
            label: "Stroke Width",
            min: 0,
            max: 5,
            unit: "px",
            path: "candlestick.style.data.strokeWidth",
            default: 1,
          },
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
          {
            type: "colorPicker",
            label: "Stroke Color",
            path: "errorbar.style.data.stroke",
            default: defaultFill,
          },
          {
            type: "slider",
            label: "Stroke Width",
            min: 0,
            max: 5,
            unit: "px",
            path: "errorbar.style.data.strokeWidth",
            default: 2,
          },
          {
            type: "select",
            label: "Stroke Line Cap",
            options: [
              { label: "Round", value: "round" },
              { label: "Square", value: "square" },
              { label: "Butt", value: "butt" },
            ],
            path: "errorbar.style.data.strokeLinecap",
            default: "round",
          },
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
        fields: [
          {
            type: "colorPicker",
            label: "Stroke",
            path: "legend.style.border.stroke",
            default: defaultFill,
          },
          {
            type: "slider",
            label: "Stroke Width",
            min: 0,
            max: 5,
            unit: "px",
            path: "legend.style.border.strokeWidth",
            default: 2,
          },
        ],
      },
    ],
  },
];

export default optionsConfig;
