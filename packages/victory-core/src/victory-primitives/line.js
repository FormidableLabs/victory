import React from "react";
import isEqual from "react-fast-compare";

const Line = (props) => <line vectorEffect="non-scaling-stroke" {...props} />;

export default React.memo(Line, isEqual);
