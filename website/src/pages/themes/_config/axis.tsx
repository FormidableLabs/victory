/* eslint-disable no-magic-numbers */
import React from "react";
import { getBaseLabelsConfig, getBaseStrokeConfig } from "../_utils";
import { VictoryAxis, VictoryPolarAxis } from "victory";
import { ControlConfig, OptionsPanelConfig } from ".";
import { StrokeProps } from "../_const";

const generalAxisOptionsConfig: ControlConfig = {
  type: "accordion",
  label: "Base Axis",
  content: (props) => [
    <VictoryAxis key="x-axis" label="X Axis" {...props} />,
    <VictoryAxis key="y-axis" dependentAxis label="Y Axis" {...props} />,
  ],
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

const polarAxisOptionsConfig = {
  type: "accordion",
  label: "Polar Axis",
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

const axisOptionsConfig: OptionsPanelConfig = {
  title: "Axis Options",
  description: "Customize the appearance of axes in your charts.",
  controls: [
    generalAxisOptionsConfig,
    polarAxisOptionsConfig,
    polarDependentAxisOptionsConfig,
  ],
};

export default axisOptionsConfig;
