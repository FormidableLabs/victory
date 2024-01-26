import React from "react";
import { Path } from "./path";
import { Flyout as FlyoutBase, FlyoutProps } from "victory-tooltip/es";

export const Flyout = (props: FlyoutProps) => (
  <FlyoutBase pathComponent={<Path />} {...props} />
);
