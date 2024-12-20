import { getBaseLabelsConfig, getBaseStrokeConfig } from "../_utils";
import { StrokeProps } from "../_const";
import { ControlConfig } from ".";
import {
  AxisExamples,
  PolarAxisExamples,
  PolarAxisDependentExamples,
} from "../_components/examples";

const generalAxisOptionsConfig: ControlConfig = {
  type: "accordion",
  label: "Base Axis",
  content: AxisExamples,
  controls: [
    {
      type: "section",
      label: "General",
      controls: getBaseStrokeConfig("axis.style.axis", [
        StrokeProps.STROKE,
        StrokeProps.STROKE_WIDTH,
        StrokeProps.STROKE_LINE_CAP,
        StrokeProps.STROKE_LINE_JOIN,
      ]),
    },
    {
      type: "section",
      label: "Grid",
      controls: getBaseStrokeConfig("axis.style.grid"),
    },
    {
      type: "section",
      label: "Ticks",
      controls: [
        {
          type: "slider",
          label: "Size",
          min: 0,
          max: 50,
          unit: "px",
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
      controls: getBaseLabelsConfig("axis.style.axisLabel"),
    },
  ],
};

const polarAxisOptionsConfig: ControlConfig = {
  type: "accordion",
  label: "Polar Axis",
  content: PolarAxisExamples,
  controls: [
    {
      type: "section",
      label: "General",
      controls: getBaseStrokeConfig("polarAxis.style.axis", [
        StrokeProps.STROKE,
        StrokeProps.STROKE_WIDTH,
      ]),
    },
    {
      type: "section",
      label: "Grid",
      controls: getBaseStrokeConfig("polarAxis.style.grid"),
    },
    {
      type: "section",
      label: "Ticks",
      controls: [
        {
          type: "slider",
          label: "Size",
          min: 0,
          max: 50,
          unit: "px",
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
      controls: getBaseLabelsConfig("polarAxis.style.tickLabels"),
    },
  ],
};

const polarDependentAxisOptionsConfig: ControlConfig = {
  type: "accordion",
  label: "Polar Dependent Axis",
  content: PolarAxisDependentExamples,
  controls: [
    {
      type: "section",
      label: "General",
      controls: getBaseStrokeConfig("polarDependentAxis.style.axis", [
        StrokeProps.STROKE,
        StrokeProps.STROKE_WIDTH,
      ]),
    },
    {
      type: "section",
      label: "Grid",
      controls: getBaseStrokeConfig("polarDependentAxis.style.grid"),
    },
    {
      type: "section",
      label: "Ticks",
      controls: [
        {
          type: "slider",
          label: "Size",
          min: 0,
          max: 50,
          unit: "px",
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
      controls: getBaseLabelsConfig("polarDependentAxis.style.tickLabels"),
    },
  ],
};

const axisOptionsConfig = {
  title: "Axis Options",
  description: "Customize the appearance of axes.",
  selectLabel: "Axis Type",
  types: {
    base: generalAxisOptionsConfig,
    polarAxis: polarAxisOptionsConfig,
    polarDependentAxis: polarDependentAxisOptionsConfig,
  },
};

export default axisOptionsConfig;
