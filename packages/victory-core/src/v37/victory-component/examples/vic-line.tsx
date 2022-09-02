import React from "react";
import PropTypes from "prop-types";

import { VictoryContainer } from "../../../victory-container/victory-container";
import {
  LineHelpers,
  VictoryClipContainer,
  VictoryClipContainerProps,
  InterpolationPropType,
  Path,
} from "../../../index";

import { TurboContainerProps } from "../core/with-turbo-container";
import { createTurboComponent } from "../core/create-turbo-component";
import { CommonProps, TurboCommonProps, TurboDataProps } from "../utils/props";
import { AggregateProps, NormalizeProps } from "../utils/aggregate-props";
import { usePrimitives, useSvgPrimitives } from "../utils/svg-primitives";
import { Clone } from "../../clone";

interface VicLineProps<TDatum = any>
  extends TurboContainerProps,
    TurboDataProps<TDatum>,
    TurboCommonProps {
  interpolation: InterpolationPropType;
  groupComponent: React.ReactElement<VictoryClipContainerProps>;
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
      interpolation: "linear",

      groupComponent: <VictoryClipContainer />,
      containerComponent: <VictoryContainer />,
      dataComponent: <Path />,

      sortKey: "x",
      sortOrder: "ascending",

      ...CommonProps.defaultProps,
      ...TurboDataProps.defaultProps,
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
    const d = lineFunction(props.data as any)!;
    const style = { fill: "none", stroke: "black" };

    return (
      <Clone element={props.groupComponent} {...props}>
        <Clone element={props.dataComponent} d={d} style={style} />
      </Clone>
    );
  },
);
