import React from "react";
import { mapChildrenProps } from "../utils/traverse-children";

/* eslint-disable react/no-multi-comp */

type NestableContextValue = NestableProps[];
const NestableContext = React.createContext<NestableContextValue | null>(null);

export type NestableConfig = {
  displayName: string;
  getNormalizedProps(props): any;
  getAggregateProps(allComponents, props): any;
  defaultProps: any;
  propTypes: any;
};

/**
 * Makes a component nestable, so the props can be normalized and aggregated
 */
export function makeNestable(
  nestedConfig: NestableConfig,
  Component: (props: NestableProps) => JSX.Element,
) {
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

    // We are already nested; this means our props are already normalized.
    // Let's calculate our aggregate props:
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
  // Standard React configs:
  NestableComponent.displayName = `NestableComponent(${nestedConfig.displayName})`;
  NestableComponent.defaultProps = nestedConfig.defaultProps;
  NestableComponent.propTypes = nestedConfig.propTypes;

  return NestableComponent;
}

/**
 * Clones all children, normalizing their properties, and collecting all props
 */
function NestableContextProvider({ children }: React.PropsWithChildren) {
  // Traverse all children, normalizing their props, and collecting the results:
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

/**
 * Determines whether the React child is one of our nested nodes
 */
function isNestableNode(
  child: React.ReactNode,
): child is NestableComponentNode {
  return !!(
    child &&
    typeof child === "object" &&
    (child as NestableComponentNode).type?.nestedConfig
  );
}
