import React from "react";
import isEqual from "react-fast-compare";

const Circle = (props) => <circle vectorEffect="non-scaling-stroke" {...props} />;

export default React.memo(Circle, isEqual);
