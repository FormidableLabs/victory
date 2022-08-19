import { VictoryCommonProps } from "../victory-util/common-props";
import React from "react";
import {
  useVictoryContext,
  VictoryProviderProps,
  withVictoryProvider,
} from "./victory-state";

type FC<TProps> = (props: TProps) => JSX.Element;

export function withNormalizedProps<
  TProps extends React.PropsWithChildren<VictoryCommonProps>,
  TDefaultPropKeys extends keyof TProps,
>(
  config: {
    displayName: string;
    propTypes?: React.WeakValidationMap<Omit<TProps, keyof VictoryCommonProps>>;
    defaultProps: Pick<TProps, TDefaultPropKeys>;
    /** @deprecated */
    initialProviderProps?: Partial<VictoryProviderProps>;
  },
  WrappedComponent: React.FC<TProps>,
) {
  WrappedComponent.displayName = config.displayName;
  const WithNormalizedProps: FC<TProps> = withVictoryProvider<
    FC<TProps>,
    TProps
  >((props: TProps) => {
    const normalizedProps = useVictoryContext((v) => v);

    return (
      <WrappedComponent {...props} {...normalizedProps}>
        {props.children}
      </WrappedComponent>
    );
  });

  return Object.assign(WithNormalizedProps, {
    displayName: `WithNormalizedProps(${config.displayName}`,
    defaultProps: config.defaultProps,
    propTypes: config.propTypes,
  });
}
