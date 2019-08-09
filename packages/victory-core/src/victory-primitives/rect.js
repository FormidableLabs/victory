import React from "react";
import isEqual from "react-fast-compare";

const Rect = (props) => <rect vectorEffect="non-scaling-stroke" {...props} />;

export default React.memo(Rect, isEqual);
