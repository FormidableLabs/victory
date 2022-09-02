import React from "react";
import { TurboContainerProps } from "../core/with-turbo-container";
import { CommonProps, TurboCommonProps, TurboDataProps } from "../utils/props";
import { createTurboComponent } from "../core/create-turbo-component";
import { VictoryContainer } from "../../../victory-container/victory-container";
import { AggregateProps, NormalizeProps } from "../utils/aggregate-props";
import { Clone } from "../../clone";
import {
  Path,
  LineHelpers,
  VictoryClipContainer,
  VictoryClipContainerProps,
  InterpolationPropType,
} from "../../../index";
import PropTypes from "prop-types";

interface VicLineProps<TDatum = any>
  extends TurboContainerProps,
    TurboDataProps<TDatum>,
    TurboCommonProps {
  fill: string;
  interpolation: InterpolationPropType;
  groupComponent: React.ReactElement;
}
export const VicLine = createTurboComponent<VicLineProps>()(
  {
    displayName: "VicLine",
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
      ]).isRequired,
    },
    defaultProps: {
      ...CommonProps.defaultProps,
      interpolation: "linear",
      fill: "test-fill",

      groupComponent: (
        <VictoryClipContainer />
      ) as React.ReactElement<VictoryClipContainerProps>,
      containerComponent: <VictoryContainer />,
      dataComponent: <Path />,

      sortKey: "x",
      sortOrder: "ascending",

      data: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
      ],
    },
    normalizeProps: {
      ...NormalizeProps,
    },
    aggregateProps: {
      ...AggregateProps,
    },
  },
  (props) => {
    const lineFunction = LineHelpers.getLineFunction(props);
    const d = lineFunction(props.data as any);
    return (
      <Clone element={props.groupComponent}>
        <text>{props.title}</text>
        <Clone element={props.dataComponent} d={d} fill={props.fill} />
      </Clone>
    );
  },
);
