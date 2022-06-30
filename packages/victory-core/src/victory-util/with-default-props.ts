import React from "react";

/**
 * Same definition as `React.FunctionComponent<TProps>`,
 * except stronger types for `defaultProps`.
 */
export type FCWithDefaultProps<TProps, TDefaultProps> = {
  (props: TProps): React.ReactElement | null;
  defaultProps: TDefaultProps;
} & Pick<React.FC<TProps>, "propTypes" | "contextTypes" | "displayName">;

/**
 * Provides the maximum type-safety for the `Component.defaultProps` property.
 */
export function withDefaultProps<
  TProps,
  TDefaultPropsKeys extends keyof TProps,
>(
  defaultProps: {
    [P in TDefaultPropsKeys]: TProps[P];
  },
  Component: (props: TProps) => React.ReactElement | null,
) {
  const C = Component as FCWithDefaultProps<TProps, typeof defaultProps>;
  C.defaultProps = defaultProps;
  return C;
}
