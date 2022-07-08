import React from "react";

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
