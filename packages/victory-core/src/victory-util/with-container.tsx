import React from "react";
import { VictoryProvider, VictoryProviderProps } from "../victory-state";
import { VictoryContainer } from "../victory-container/victory-container";
import { VictoryCommonProps } from "./common-props";

const defaultProviderProps = {
  width: 450,
  height: 300,
  padding: 50,
  data: [],
};

export function withContainer<Props extends VictoryCommonProps>(
  WrappedComponent: (props: Props) => React.ReactElement,
  initialProviderProps: Partial<VictoryProviderProps> = {},
) {
  return (props: Props) => {
    const providerProps = {
      ...defaultProviderProps,
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
    return <WrappedComponent {...props} />;
  };
}
