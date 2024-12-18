import {
  getBaseLabelsConfig,
  getBaseStrokeConfig,
  getNestedColorScaleConfig,
} from "../_utils";
import { ControlConfig } from ".";
import { StrokeProps } from "../_const";
import {
  AreaExamples,
  BarExamples,
  BoxPlotExamples,
  CandlestickExamples,
  ErrorBarExamples,
  GroupExamples,
  HistogramExamples,
  LegendExamples,
  LineExamples,
  PieExamples,
  ScatterExamples,
  StackExamples,
  VoronoiExamples,
} from "../_components/examples";

const chartConfigs: {
  [key: string]: ControlConfig;
} = {
  area: {
    type: "section",
    label: "Area Chart",
    content: AreaExamples,
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
    content: BarExamples,
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
    content: BoxPlotExamples,
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
    content: CandlestickExamples,
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
    content: ErrorBarExamples,
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
    content: HistogramExamples,
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
    content: GroupExamples,
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
    content: LegendExamples,
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
    content: LineExamples,
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
    content: PieExamples,
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
    content: ScatterExamples,
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
  stack: {
    type: "section",
    label: "Stack",
    content: StackExamples,
    controls: [
      {
        type: "section",
        label: "Data",
        controls: [
          ...getNestedColorScaleConfig("stack"),
          {
            type: "slider",
            label: "Width",
            min: 0,
            max: 50,
            unit: "px",
            path: "stack.style.data.width",
          },
        ],
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
    content: VoronoiExamples,
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

const chartOptionsConfig = {
  title: "Chart Options",
  description: "Customize the appearance of individual charts.",
  selectLabel: "Chart Type",
  types: chartConfigs,
};

export default chartOptionsConfig;
