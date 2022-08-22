import React from "react";

/**
 * Syntax sugar for `React.cloneElement`, so that we can use JSX instead
 *
 * @example
 *   // Before:
 *   const children = React.cloneElement(props.groupComponent, { prop2 }, props.children);
 *   return React.cloneElement(props.containerComponent, { prop1 }, children);
 *
 *   // After:
 *   return (
 *     <Clone element={props.containerComponent} prop1={prop1}>
 *       <Clone element={props.groupComponent} prop2={prop2}>
 *         {props.children}
 *       </Clone>
 *     </Clone>
 *   );
 */
export const Clone = <TProps,>(
  props: React.PropsWithChildren<
    {
      element: React.ReactElement<TProps>;
      children?: React.ReactNode | React.ReactNode[];
    } & TProps
  >,
) => {
  const { children, element, ...rest } = props;
  return React.cloneElement(element, rest as unknown as TProps, children);
};
