import * as React from "react";
import { VictoryCommonProps, withContainer } from "victory-core";

interface VictoryStackProps extends VictoryCommonProps {
  children: React.ReactElement;
}

function VictoryStack({ children }: VictoryStackProps) {
  return children;
}

export default withContainer<VictoryStackProps>(VictoryStack);
