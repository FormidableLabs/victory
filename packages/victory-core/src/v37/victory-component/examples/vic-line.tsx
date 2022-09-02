import { TurboContainerProps } from "../core/with-turbo-container";
import { TurboDataProps } from "../utils/props";
import { createTurboComponent } from "../core/create-turbo-component";
import { VictoryContainer } from "../../../victory-container/victory-container";
import { AggregateProps, NormalizeProps } from "../utils/aggregate-props";
import { Clone } from "../../clone";
import { Path, LineHelpers } from "../../../index";
import React from "react";

interface VicLineProps<TDatum = any>
  extends TurboContainerProps,
    TurboDataProps<TDatum> {
  title: string;
  fill: string;
}
export const VicLine = createTurboComponent<VicLineProps>()(
  {
    displayName: "VicLine",
    propTypes: {},
    defaultProps: {
      title: "?",
      fill: "?",
      containerComponent: <VictoryContainer />,
      dataComponent: <Path />,
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
      <g>
        <text>{props.title}</text>
        <Clone element={props.dataComponent} d={d} fill={props.fill} />
      </g>
    );
  },
);
