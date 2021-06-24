import * as React from "react";
import {
  EventPropTypeInterface,
  NumberOrCallback,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface
} from "victory-core";

export type VictoryHistogramTargetType = "data" | "labels" | "parent";

export interface VictoryHistogramProps
  extends Omit<VictoryCommonProps, "polar">,
    Omit<VictoryDatableProps, "y" | "y0">,
    VictoryMultiLabelableProps {
  binSpacing?: number;
  bins?: number | number[] | Date[];
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
  events?: EventPropTypeInterface<
    VictoryHistogramTargetType,
    number | string | number[] | string[]
  >[];
  eventKey?: StringOrNumberOrCallback;
  horizontal?: boolean;
  style?: VictoryStyleInterface;
}

/**
 * Draw SVG histogram charts with React. VictoryHistogram is a composable component, so it doesn't include axes
 * Check out VictoryChart for complete histogram charts and more.
 */
export class VictoryHistogram extends React.Component<
  VictoryHistogramProps,
  any
> {}
