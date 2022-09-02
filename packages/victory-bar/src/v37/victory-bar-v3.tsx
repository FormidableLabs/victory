/* eslint-disable react/no-multi-comp */
import React from "react";
import {
  Datum,
  NumberOrCallback,
  VictoryCommonProps,
  VictoryDatableProps,
} from "victory-core";
import {
  createTurboComponent,
  AggregateProps,
  NormalizeProps,
  TurboContainerProps,
} from "victory-core/es/v37/victory-component";

import Bar from "../bar";
import { BarProps } from "..";
import { getBarPosition } from "../helper-methods";

export type VictoryBarAlignmentType = "start" | "middle" | "end";
export interface VictoryBarProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    TurboContainerProps {
  alignment: VictoryBarAlignmentType;
  barRatio?: number;
  barWidth?: NumberOrCallback;
  cornerRadius?:
    | NumberOrCallback
    | {
        top?: NumberOrCallback;
        topLeft?: NumberOrCallback;
        topRight?: NumberOrCallback;
        bottom?: NumberOrCallback;
        bottomLeft?: NumberOrCallback;
        bottomRight?: NumberOrCallback;
      };
  data: Datum[];
  dataComponent: React.ReactElement;
  groupComponent: React.ReactElement;
  horizontal: boolean;
}

export const VictoryBarV3 = createTurboComponent<VictoryBarProps>()(
  {
    displayName: "VictoryBar",
    propTypes: {},
    defaultProps: {
      alignment: "middle",
      data: [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 4 },
      ],
      dataComponent: <Bar />,
      groupComponent: <g role="presentation" />,
      horizontal: false,
      sortOrder: "ascending",
    },
    normalizeProps: {
      ...NormalizeProps,
    },
    aggregateProps: {
      ...AggregateProps,
    },
  },
  (props) => {
    const {
      data,
      domain,
      scale,
      horizontal,
      alignment,
      barRatio,
      barWidth,
      cornerRadius,
      dataComponent,
      groupComponent,
    } = props;

    const barPositionProps = { domain, scale, horizontal };

    const children = data.map((datum: Datum, i: number) => {
      const { x, y, y0 } = getBarPosition(barPositionProps, datum);
      const dataProps: BarProps & { key: string } = {
        index: i,
        key: `bar-${i}`,
        alignment,
        barRatio,
        barWidth,
        cornerRadius,
        scale,
        data,
        x,
        y,
        y0,
        datum,
      };
      return React.cloneElement(dataComponent, dataProps);
    });
    return React.cloneElement(groupComponent, {}, children);
  },
);

export default VictoryBarV3;
