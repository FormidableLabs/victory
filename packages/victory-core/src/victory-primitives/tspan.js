import React from "react";
import isEqual from "react-fast-compare";

const TSpan = (props) => <tspan {...props} />;

export default React.memo(TSpan, isEqual);
