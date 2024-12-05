/* eslint-disable no-magic-numbers */
import React from "react";
import {
  getBaseLabelsConfig,
  getBaseStrokeConfig,
  StrokeProps,
} from "../_utils";
import { VictoryPolarAxis } from "victory";

const generalAxisOptionsConfig = {
  type: "section",
  title: "Base Axis",
  fields: [
    {
      type: "section",
      label: "General",
      fields: getBaseStrokeConfig("axis.style.axis", [
        StrokeProps.STROKE,
        StrokeProps.STROKE_WIDTH,
        StrokeProps.STROKE_LINE_CAP,
        StrokeProps.STROKE_LINE_JOIN,
      ]),
    },
    {
      type: "section",
      label: "Grid",
      fields: getBaseStrokeConfig("axis.style.grid"),
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
};

const polarAxisOptionsConfig = {
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
};

const polarDependentAxisOptionsConfig = {
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
};

export default {
  title: "Axis Options",
  types: {
    general: generalAxisOptionsConfig,
    polar: polarAxisOptionsConfig,
    polarDependent: polarDependentAxisOptionsConfig,
  },
};
