/* eslint-disable react/no-multi-comp */
import * as React from "react";
import {
  Datum,
  NumberOrCallback,
  VictoryCommonProps,
  VictoryContainer,
  VictoryDatableProps,
} from "victory-core";
import {
  useData,
  useDomain,
  useScale,
  VictoryProvider,
  VictoryProviderProps,
} from "victory-core/es/v37";
import Bar from "../bar";
import { getBarPosition } from "../helper-methods";

// This is a demo component that uses VictoryProvider to access calculated props and state.
// This component does not include events, animations, or styling.
// To test out, swap out the VictoryBar export in ./index.js and run `pnpm run storybook:server`.

const defaultProps: VictoryProviderProps = {
  data: [
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
  ],
  height: 300,
  includeZero: true,
  padding: 50,
  sortOrder: "ascending" as const,
  width: 450,
};

export type VictoryBarAlignmentType = "start" | "middle" | "end";
export interface VictoryBarProps
  extends VictoryCommonProps,
    VictoryDatableProps {
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
  dataComponent?: React.ReactElement;
  groupComponent?: React.ReactElement;
  horizontal?: boolean;
}

// TODO: This would be a shared helper that allows us to access context values in the base component
export function withContainer<Props extends VictoryCommonProps>(
  WrappedComponent: (props: Props) => React.ReactElement,
  initialProviderProps: Partial<VictoryProviderProps> = {},
) {
  return (props: Props) => {
    const providerProps = {
      ...initialProviderProps,
      ...props,
    };
    const { standalone = true, containerComponent = <VictoryContainer /> } =
      props;
    if (standalone) {
      return (
        <VictoryProvider {...providerProps}>
          {React.cloneElement(
            containerComponent,
            providerProps,
            <WrappedComponent {...props} />,
          )}
        </VictoryProvider>
      );
    }
    return (
      <VictoryProvider {...providerProps}>
        <WrappedComponent {...props} />
      </VictoryProvider>
    );
  };
}

function VictoryBar({
  dataComponent = <Bar />,
  groupComponent = <g role="presentation" />,
  alignment,
  barRatio,
  barWidth,
  cornerRadius,
  horizontal = false,
}: VictoryBarProps) {
  const scale = useScale();
  const data = useData();
  const domain = useDomain();

  const children = data.map((datum: Datum, i: number) => {
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

export default withContainer<VictoryBarProps>(VictoryBar, defaultProps);
