/* eslint-disable react/no-multi-comp */
import * as React from "react";
import {
  useVictoryContext,
  VictoryCommonProps,
  VictoryContainer,
  VictoryProvider,
  VictoryProviderProps
} from "victory-core";
import { Bar, VictoryBarProps } from "./index";
import { getBarPosition } from "./helper-methods";

const defaultData = [
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 4 }
];

// TODO: This would be a shared helper that allows us to access context values in the base component
export function withContainer<Props extends VictoryCommonProps>(
  WrappedComponent: (props: Props) => React.ReactElement,
  initialProviderProps: Partial<VictoryProviderProps> = {}
) {
  return (props: Props) => {
    const providerProps = {
      ...props,
      ...initialProviderProps
    };
    // TODO: Figure out how to default this
    const containerProps = {
      ...props,
      width: 450,
      height: 300
    };
    const { standalone = true, containerComponent = <VictoryContainer /> } =
      props;
    if (standalone) {
      return (
        <VictoryProvider {...providerProps}>
          {React.cloneElement(
            containerComponent,
            containerProps,
            <WrappedComponent {...props} />
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
  horizontal = false
}: VictoryBarProps) {
  const { scale, data, domain } = useVictoryContext();
  const children = data.map((datum, i) => {
    const { x, y, x0, y0 } = getBarPosition(
      { domain, scale, horizontal },
      datum
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
      y0
    };
    return React.cloneElement(dataComponent, dataProps);
  });
  return React.cloneElement(groupComponent, {}, children);
}

export default withContainer<VictoryBarProps>(VictoryBar, {
  data: defaultData,
  includeZero: true,
  padding: 50
});
