import React from "react";
import Rect from "./rect";
import { Border } from "victory-core/es";

const NativeBorder = (props) => <Border rectComponent={<Rect/>} {...props} />;

export default NativeBorder;
