import PropTypes from "prop-types";
import React from "react";
import { Curve, CurveProps } from "../curve";
import {
  InterpolationPropType,
  VictoryClipContainer,
  VictoryClipContainerProps,
  VictoryCommonProps,
  VictoryContainer,
  VictoryDatableProps,
  VictoryLabel,
  VictoryLabelableProps,
  VictoryLabelProps,
  VictoryStyleInterface,
  VictoryTheme,
} from "victory-core";
import { withNormalizedProps, Clone } from "victory-core/es/v37";

export interface VictoryLineProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryLabelableProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  interpolation?: InterpolationPropType | Function;
  samples?: number;
  style?: VictoryStyleInterface;
  animate?: boolean;
}

export const VictoryLine = withNormalizedProps(
  {
    displayName: "VictoryLine",
    propTypes: {
      interpolation: PropTypes.oneOfType([
        PropTypes.oneOf([
          "basis",
          "bundle",
          "cardinal",
          "catmullRom",
          "linear",
          "monotoneX",
          "monotoneY",
          "natural",
          "step",
          "stepAfter",
          "stepBefore",
        ] as const),
        PropTypes.func,
      ]),
    },
    defaultProps: {
      width: 450,
      height: 300,
      padding: 50,
      data: [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 4 },
      ],
      containerComponent: <VictoryContainer />,
      dataComponent: (<Curve />) as React.ReactElement<CurveProps>,
      interpolation: "linear",
      labelComponent: (
        <VictoryLabel renderInPortal />
      ) as React.ReactElement<VictoryLabelProps>,
      groupComponent: (
        <VictoryClipContainer />
      ) as React.ReactElement<VictoryClipContainerProps>,
      samples: 50,
      sortKey: "x",
      sortOrder: "ascending",
      standalone: true,
      theme: VictoryTheme.grayscale,
    },
  },
  (props: VictoryLineProps) => {
    return (
      <Clone element={props.groupComponent}>
        <Clone element={props.dataComponent} {...props} />
      </Clone>
    );
  },
);
