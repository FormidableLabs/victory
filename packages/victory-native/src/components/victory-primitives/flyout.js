import React from "react";
import Path from "./path";
import { Flyout } from "victory-tooltip/es";

const NativeFlyout = (props) => <Flyout pathComponent={<Path/>} {...props} />;

export default NativeFlyout;
