import React from "react";
import isEqual from "react-fast-compare";

const Path = (props) => <path {...props} />;

export default React.memo(Path, isEqual);
