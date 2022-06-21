import React from "react";
import PropTypes from "prop-types";
import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";

export interface TextProps extends VictoryCommonPrimitiveProps {
  children?: React.ReactNode;
  desc?: string;
  title?: string;
}

export const Text = (props: TextProps) => {
  const { children, title, desc, ...rest } = props;
  return (
    // @ts-expect-error FIXME: "id cannot be a number"
    <text {...rest}>
      {title && <title>{title}</title>}
      {desc && <desc>{desc}</desc>}
      {children}
    </text>
  );
};

Text.propTypes = {
  children: PropTypes.node,
  desc: PropTypes.string,
  title: PropTypes.string,
};
