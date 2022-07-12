import { VictoryCommonProps } from "./common-props";
import React from "react";
import { useVictoryContext, VictoryProviderProps } from "../victory-state";
import { withVictoryProvider } from "../victory-state/victory-provider-maybe";

export function withNormalizedProps<
  TProps extends React.PropsWithChildren<VictoryCommonProps>,
  TDefaultPropKeys extends keyof TProps,
>(
  config: {
    displayName: string;
    propTypes: React.WeakValidationMap<Omit<TProps, keyof VictoryCommonProps>>;
    defaultProps: Pick<TProps, TDefaultPropKeys>;
    /** @deprecated */
    initialProviderProps?: Partial<VictoryProviderProps>;
  },
  WrappedComponent: React.FC<TProps>,
) {
  WrappedComponent.displayName = config.displayName;
  const WithNormalizedProps = (props: TProps) => {
    const normalizedProps = useVictoryContext((v) => v);

    return (
      <WrappedComponent {...props} {...normalizedProps}>
        {props.children}
      </WrappedComponent>
    );
  };

  return Object.assign(withVictoryProvider(WithNormalizedProps), {
    displayName: `WithNormalizedProps(${config.displayName}`,
    defaultProps: config.defaultProps,
    propTypes: config.propTypes,
  });
}
