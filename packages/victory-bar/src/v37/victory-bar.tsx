/* eslint-disable react/no-multi-comp */
import * as React from "react";
import {
  Datum,
  NumberOrCallback,
  useData,
  useDomain,
  useScale,
  useVictoryProviderSync,
  VictoryCalculatedStateProps,
  withContainer,
} from "victory-core";
import Bar from "../bar";
import { getBarPosition } from "../helper-methods";

export type VictoryBarAlignmentType = "start" | "middle" | "end";
export interface VictoryBarProps extends VictoryCalculatedStateProps {
  alignment?: VictoryBarAlignmentType;
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
  data?: Datum[];
  dataComponent?: React.ReactElement;
  groupComponent?: React.ReactElement;
  horizontal?: boolean;
}

function VictoryBar({
  alignment = "middle",
  barRatio,
  barWidth,
  cornerRadius,
  data = [
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
  ],
  dataComponent = <Bar />,
  groupComponent = <g role="presentation" />,
  includeZero = true,
  horizontal = false,
  sortOrder = "ascending",
  ...props
}: VictoryBarProps) {
  // Typescript works best when we provide defaults in the destructured
  // component props. However, I am anticipating confusion about which props
  // we will need to pass back up to the provider vs. the props that are only
  // used in this component.
  useVictoryProviderSync("bar", {
    data,
    includeZero,
    sortOrder,
    ...props,
  });
  const scale = useScale();
  const domain = useDomain();

  // TODO: Do we need to get this from context?
  const formattedData = useData();

  const children = formattedData.map((datum: Datum, i: number) => {
    const { x, y, x0, y0 } = getBarPosition(
      { domain, scale, horizontal },
      datum,
    );
    const dataProps = {
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
      x0,
      y0,
      datum,
    };
    return React.cloneElement(dataComponent, dataProps);
  });
  return React.cloneElement(groupComponent, {}, children);
}

// @ts-expect-error we need to work out what props this withContainer wrapper accepts
export default withContainer<VictoryBarProps>(VictoryBar);
