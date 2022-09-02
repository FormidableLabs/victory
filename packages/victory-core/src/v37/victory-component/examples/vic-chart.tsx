import React from "react";
import { createTurboComponent } from "../core/create-turbo-component";
import { TurboContainerProps } from "../core/with-turbo-container";
import { AggregateProps, NormalizeProps } from "../utils/aggregate-props";
import { VictoryContainer } from "../../../victory-container/victory-container";

export interface VicChartProps extends TurboContainerProps {
  foo: string;
}

export const VicChart = createTurboComponent<VicChartProps>()(
  {
    displayName: "VicChart",
    propTypes: {},
    defaultProps: {
      foo: "FOO",
      containerComponent: <VictoryContainer />,
    },
    normalizeProps: {},
    aggregateProps: { ...AggregateProps },
  },
  (props) => {
    const { domain, range, scale } = props;
    return <g>{props.children}</g>;
  },
);
