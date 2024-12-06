/* eslint-disable no-magic-numbers */
import React from "react";
import {
  VictoryArea,
  VictoryAxis,
  VictoryBar,
  VictoryBoxPlot,
  VictoryCandlestick,
  VictoryErrorBar,
  VictoryGroup,
  VictoryHistogram,
  VictoryLegend,
  VictoryLine,
  VictoryPie,
  VictoryScatter,
  VictoryVoronoi,
} from "victory";
import {
  getBaseLabelsConfig,
  getBaseStrokeConfig,
  getNestedColorScaleConfig,
  StrokeProps,
} from "../_utils";
import { ControlConfig } from ".";

const chartOptionsConfig: {
  [key: string]: ControlConfig;
} = {
  area: {
    type: "section",
    label: "Area Chart",
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
    controls: [
      {
        type: "section",
        label: "Data",
        controls: [
          {
            type: "slider",
            label: "Fill Opacity",
            min: 0,
            max: 1,
            step: 0.1,
            path: "area.style.data.fillOpacity",
          },
          ...getBaseStrokeConfig("area.style.data", [
            StrokeProps.STROKE,
            StrokeProps.STROKE_WIDTH,
          ]),
          {
            type: "colorPicker",
            label: "Fill",
            path: "area.style.data.fill",
          },
        ],
      },
      {
        type: "section",
        label: "Labels",
        controls: getBaseLabelsConfig("area.style.labels"),
      },
    ],
  },
  bar: {
    type: "section",
    label: "Bar Chart",
    content: (props) => [
      <VictoryAxis key="x-axis" label="X Axis" />,
      <VictoryAxis key="y-axis" dependentAxis label="Y Axis" />,
      <VictoryGroup key="victory-group" domainPadding={{ x: 20 }} offset={20}>
        <VictoryBar
          {...props}
          data={[
            { x: "2023 Q1", y: 1 },
            { x: "2023 Q2", y: 2 },
            { x: "2023 Q3", y: 3 },
            { x: "2023 Q4", y: 2 },
          ]}
        />
        <VictoryBar
          {...props}
          data={[
            { x: "2023 Q1", y: 2 },
            { x: "2023 Q2", y: 3 },
            { x: "2023 Q3", y: 4 },
            { x: "2023 Q4", y: 5 },
          ]}
        />
        <VictoryBar
          {...props}
          data={[
            { x: "2023 Q1", y: 1 },
            { x: "2023 Q2", y: 2 },
            { x: "2023 Q3", y: 3 },
            { x: "2023 Q4", y: 4 },
          ]}
        />
      </VictoryGroup>,
    ],
    controls: [
      {
        type: "section",
        label: "Data",
        controls: [
          {
            type: "colorPicker",
            label: "Fill",
            path: "bar.style.data.fill",
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
          },
          {
            type: "slider",
            label: "Top Corner Radius",
            path: "bar.cornerRadius.top",
            max: 2,
            step: 0.5,
          },
        ],
      },
      {
        type: "section",
        label: "Labels",
        controls: getBaseLabelsConfig("bar.style.labels"),
      },
    ],
  },
  boxPlot: {
    type: "section",
    label: "Box Plot",
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
    controls: [
      {
        type: "section",
        label: "Max",
        controls: [
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
        controls: [
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
        controls: [
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
        controls: [
          {
            type: "colorPicker",
            label: "Fill",
            path: "boxplot.style.q1.fill",
          },
          {
            type: "slider",
            label: "Border Radius",
            min: 0,
            max: 10,
            step: 0.5,
            path: "boxplot.q1.rx",
          },
          {
            type: "slider",
            label: "Stroke Width",
            min: 0,
            max: 5,
            unit: "px",
            path: "boxplot.style.q1.strokeWidth",
          },
          ...getBaseLabelsConfig("boxplot.style.q1Labels"),
        ],
      },
      {
        type: "section",
        label: "Q3",
        controls: [
          {
            type: "colorPicker",
            label: "Fill",
            path: "boxplot.style.q3.fill",
          },
          {
            type: "slider",
            label: "Border Radius",
            min: 0,
            max: 10,
            step: 0.5,
            path: "boxplot.q3.rx",
          },
          ...getBaseLabelsConfig("boxplot.style.q3Labels"),
        ],
      },
    ],
  },
  candlestick: {
    type: "section",
    label: "Candlestick Chart",
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
    controls: [
      {
        type: "section",
        label: "Data",
        controls: [
          ...getBaseStrokeConfig("candlestick.style.data", [
            StrokeProps.STROKE,
            StrokeProps.STROKE_WIDTH,
          ]),
          {
            type: "slider",
            label: "Border Radius",
            max: 2,
            step: 0.5,
            path: "candlestick.style.data.rx",
          },
          {
            type: "slider",
            label: "Wick Width",
            min: 0,
            max: 5,
            unit: "px",
            path: "candlestick.wickStrokeWidth",
          },
        ],
      },
      {
        type: "section",
        label: "Labels",
        controls: getBaseLabelsConfig("candlestick.style.labels"),
      },
      {
        type: "section",
        label: "Colors",
        controls: [
          {
            type: "colorPicker",
            label: "Positive Color",
            path: "candlestick.candleColors.positive",
          },
          {
            type: "colorPicker",
            label: "Negative Color",
            path: "candlestick.candleColors.negative",
          },
        ],
      },
    ],
  },
  errorBar: {
    type: "section",
    label: "Error Bar",
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
    controls: [
      {
        type: "section",
        label: "Data",
        controls: [
          {
            type: "slider",
            label: "Border Width",
            min: 0,
            max: 10,
            unit: "px",
            path: "errorbar.borderWidth",
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
        controls: getBaseLabelsConfig("errorbar.style.labels"),
      },
    ],
  },
  histogram: {
    type: "section",
    label: "Histogram",
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
    controls: [
      {
        type: "section",
        label: "Data",
        controls: [
          {
            type: "colorPicker",
            label: "Fill",
            path: "histogram.style.data.fill",
          },
          {
            type: "slider",
            label: "Fill Opacity",
            min: 0,
            max: 1,
            step: 0.1,
            path: "histogram.style.data.fillOpacity",
          },
          {
            type: "slider",
            label: "Top Corner Radius",
            path: "histogram.cornerRadius.top",
            max: 10,
            step: 0.5,
          },
          {
            type: "slider",
            label: "Bin Spacing",
            min: 0,
            max: 10,
            unit: "px",
            path: "histogram.binSpacing",
          },
        ],
      },
      {
        type: "section",
        label: "Labels",
        controls: getBaseLabelsConfig("histogram.style.labels"),
      },
    ],
  },
  group: {
    type: "section",
    label: "Group",
    controls: [
      {
        type: "section",
        label: "Data",
        controls: [
          ...getNestedColorScaleConfig("group"),
          {
            type: "slider",
            label: "Width",
            min: 0,
            max: 50,
            unit: "px",
            path: "group.style.data.width",
          },
        ],
      },
    ],
  },
  legend: {
    type: "section",
    label: "Legend",
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
    controls: [
      {
        type: "section",
        label: "General",
        controls: [
          {
            type: "slider",
            label: "Gutter",
            min: 0,
            max: 50,
            unit: "px",
            path: "legend.gutter",
          },
          {
            type: "slider",
            label: "Border Padding",
            min: 0,
            max: 50,
            unit: "px",
            path: "legend.borderPadding",
          },
          {
            type: "select",
            label: "Orientation",
            options: [
              { label: "Horizontal", value: "horizontal" },
              { label: "Vertical", value: "vertical" },
            ],
            path: "legend.orientation",
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
          },
        ],
      },
      {
        type: "section",
        label: "Labels",
        controls: getBaseLabelsConfig("legend.style.labels"),
      },
      {
        type: "section",
        label: "Title",
        controls: getBaseLabelsConfig("legend.style.title"),
      },
      {
        type: "section",
        label: "Border",
        controls: getBaseStrokeConfig("legend.style.border", [
          StrokeProps.STROKE,
          StrokeProps.STROKE_WIDTH,
        ]),
      },
    ],
  },
  line: {
    type: "section",
    label: "Line Chart",
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
    controls: [
      {
        type: "section",
        label: "Data",
        controls: getBaseStrokeConfig("line.style.data", [
          StrokeProps.STROKE,
          StrokeProps.STROKE_WIDTH,
          StrokeProps.STROKE_LINE_CAP,
          StrokeProps.STROKE_LINE_JOIN,
        ]),
      },
      {
        type: "section",
        label: "Labels",
        controls: getBaseLabelsConfig("line.style.labels"),
      },
    ],
  },
  pie: {
    type: "section",
    label: "Pie Chart",
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
    controls: [
      {
        type: "section",
        label: "Data",
        controls: [
          ...getNestedColorScaleConfig("pie"),
          {
            type: "slider",
            label: "Padding",
            min: 0,
            max: 50,
            unit: "px",
            path: "pie.style.data.padding",
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
        controls: getBaseLabelsConfig("pie.style.labels"),
      },
    ],
  },
  scatter: {
    type: "section",
    label: "Scatter Chart",
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
    controls: [
      {
        type: "section",
        label: "Data",
        controls: [
          {
            type: "colorPicker",
            label: "Fill",
            path: "scatter.style.data.fill",
          },
          {
            type: "slider",
            label: "Opacity",
            min: 0,
            max: 1,
            step: 0.1,
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
        controls: getBaseLabelsConfig("scatter.style.labels"),
      },
    ],
  },
  tooltip: {
    type: "section",
    label: "Tooltip",
    controls: [
      {
        type: "section",
        label: "General",
        controls: [
          ...getBaseLabelsConfig("tooltip.style"),
          {
            type: "slider",
            label: "Corner Radius",
            min: 0,
            max: 10,
            path: "tooltip.cornerRadius",
          },
          {
            type: "slider",
            label: "Pointer Length",
            min: 0,
            max: 20,
            path: "tooltip.pointerLength",
          },
        ],
      },
      {
        type: "section",
        label: "Flyout",
        controls: [
          {
            type: "colorPicker",
            label: "Fill",
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
            path: "tooltip.flyoutStyle.pointerEvents",
          },
        ],
      },
    ],
  },
  voronoi: {
    type: "section",
    label: "Voronoi",
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
    controls: [
      {
        type: "section",
        label: "General",
        controls: [
          {
            type: "colorPicker",
            label: "Fill",
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
        controls: getBaseLabelsConfig("voronoi.style.labels"),
      },
    ],
  },
};

export default chartOptionsConfig;
