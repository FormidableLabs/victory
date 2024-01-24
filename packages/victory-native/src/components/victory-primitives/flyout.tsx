import React from "react";
import Path from "./path";
import { Flyout, FlyoutProps } from "victory-tooltip/es";

const NativeFlyout = (props: FlyoutProps) => (
  <Flyout pathComponent={<Path />} {...props} />
);

export default NativeFlyout;
