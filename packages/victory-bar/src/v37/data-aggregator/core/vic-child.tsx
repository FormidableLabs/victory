import React, { ReactElement } from "react";
import { VictoryDatableProps } from "victory-core";
import { useAggregateProps } from "./vic-parent";

export type VictoryChildConfig = {
  displayName: string;
};
export type VictoryChildProps = VictoryDatableProps;

export function wrapVictoryChild<
  TProps extends VictoryChildProps,
  TComp extends (props: TProps) => JSX.Element,
>(config: VictoryChildConfig, Component: TComp) {
  const ChildWrapper = (props: React.PropsWithChildren<TProps>) => {
    const normalizedProps = normalizeChildProps(config, props);
    const aggregateProps = useAggregateProps();
    return (
      <Component {...normalizedProps} {...aggregateProps}>
        {props.children}
      </Component>
    );
  };
  ChildWrapper.victoryConfig = config;
  ChildWrapper.displayName = `ChildWrapper(${config.displayName})`;

  return ChildWrapper;
}

export type ChildWrapperType = ReturnType<typeof wrapVictoryChild>;

export type VictoryChildNode = ReactElement<
  VictoryChildProps,
  ChildWrapperType
>;

export function isVictoryChild(
  child: React.ReactNode,
): child is VictoryChildNode {
  return !!(
    child &&
    typeof child === "object" &&
    (child as VictoryChildNode).type?.victoryConfig
  );
}

export function normalizeChildProps(
  config: VictoryChildConfig,
  props: VictoryChildProps,
) {
  // TODO
  return props;
}
