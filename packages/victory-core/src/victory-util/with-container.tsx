import React from "react";
import {
  VictoryCommonProps,
  VictoryProvider,
  VictoryProviderProps,
  VictoryContainer
} from "victory-core";

export function withContainer<Props extends VictoryCommonProps>(
  WrappedComponent: (props: Props) => React.ReactElement,
  initialProviderProps: Partial<VictoryProviderProps> = {}
) {
  return (props: Props) => {
    const providerProps = {
      ...initialProviderProps,
      ...props
    };
    const { standalone = true, containerComponent = <VictoryContainer /> } =
      props;
    if (standalone) {
      return (
        <VictoryProvider {...providerProps}>
          {React.cloneElement(
            containerComponent,
            providerProps,
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
