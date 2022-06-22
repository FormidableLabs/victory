import React from "react";
import PropTypes from "prop-types";
import { VictoryCommonPrimitiveProps } from "../victory-util/common-props";

export interface ClipPathProps extends VictoryCommonPrimitiveProps {
  children?: React.ReactNode[] | React.ReactNode;
  clipId?: number | string;
}

export const ClipPath = (props: ClipPathProps) => (
  <defs>
    {
      // @ts-expect-error FIXME: "id cannot be a number"
      <clipPath id={props.clipId}>{props.children}</clipPath>
    }
  </defs>
);

ClipPath.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  clipId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
