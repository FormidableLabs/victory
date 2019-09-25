import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import CommonProps from "../victory-util/common-props";
import Line from "./line";
import { assign } from "lodash";

const Whisker = (props) => {
  const {
    groupComponent,
    lineComponent,
    events,
    className,
    majorWhisker,
    minorWhisker,
    transform,
    clipPath,
    role,
    shapeRendering
  } = props;
  const baseProps = {
    ...events,
    style: Helpers.evaluateStyle(props.style, props),
    desc: Helpers.evaluateProp(props.desc, props),
    tabIndex: Helpers.evaluateProp(props.tabIndex, props),
    className,
    transform,
    clipPath,
    role,
    shapeRendering
  };
  return React.cloneElement(groupComponent, {}, [
    React.cloneElement(lineComponent, assign({ key: "major-whisker" }, baseProps, majorWhisker)),
    React.cloneElement(lineComponent, assign({ key: "minor-whisker" }, baseProps, minorWhisker))
  ]);
};

Whisker.propTypes = {
  ...CommonProps.primitiveProps,
  groupComponent: PropTypes.element,
  lineComponent: PropTypes.element,
  majorWhisker: PropTypes.shape({
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number
  }),
  minorWhisker: PropTypes.shape({
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number
  })
};

Whisker.defaultProps = {
  groupComponent: <g />,
  lineComponent: <Line />,
  role: "presentation",
  shapeRendering: "auto"
};

export default Whisker;
