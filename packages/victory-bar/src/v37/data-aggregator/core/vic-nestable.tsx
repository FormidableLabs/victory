import React from "react";
import { mapChildrenProps } from "../utils/traverse-children";

/* eslint-disable react/no-multi-comp */

type NestableContextValue = NestableProps[];
const NestableContext = React.createContext<NestableContextValue | null>(null);

export type NestableConfig = {
  displayName: string;
  getNormalizedProps(props): any;
  getAggregateProps(allComponents, props): any;
};

export function makeNestable(nestedConfig: NestableConfig, Component) {
  const NestableComponent = (props: React.PropsWithChildren) => {
    const allNestedProps = React.useContext(NestableContext);

    if (!allNestedProps) {
      // Nest this component in a NestableContext and render again:
      return (
        <NestableContextProvider>
          <NestableComponent {...props}>{props.children}</NestableComponent>
        </NestableContextProvider>
      );
    }

    const aggregateProps = nestedConfig.getAggregateProps(
      allNestedProps,
      props,
    );
    return (
      <Component {...props} {...aggregateProps}>
        {props.children}
      </Component>
    );
  };
  NestableComponent.nestedConfig = nestedConfig;
  return NestableComponent;
}

function NestableContextProvider({ children }: React.PropsWithChildren) {
  const allNestedProps: NestableContextValue = [];
  const normalizedTree = mapChildrenProps(children, (child) => {
    if (isNestableNode(child)) {
      const normalizedProps = child.type.nestedConfig.getNormalizedProps(
        child.props,
      );
      allNestedProps.push({ ...child.props, ...normalizedProps });
      return normalizedProps;
    }
  });

  return (
    <NestableContext.Provider value={allNestedProps}>
      {normalizedTree}
    </NestableContext.Provider>
  );
}

type NestableComponent = ReturnType<typeof makeNestable>;
// eslint-disable-next-line @typescript-eslint/ban-types
type NestableProps = {};
type NestableComponentNode = React.ReactElement<
  NestableProps,
  NestableComponent
>;

function isNestableNode(
  child: React.ReactNode,
): child is NestableComponentNode {
  return !!(
    child &&
    typeof child === "object" &&
    (child as NestableComponentNode).type?.nestedConfig
  );
}
