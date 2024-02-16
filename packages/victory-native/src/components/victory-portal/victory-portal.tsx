import React from "react";
import { G } from "react-native-svg";
import {
  VictoryPortal as VictoryPortalBase,
  VictoryPortalProps,
} from "victory-core/es";

export const VictoryPortal = (initialProps: VictoryPortalProps) => {
  return (
    <VictoryPortalBase
      {...initialProps}
      groupComponent={initialProps.groupComponent ?? <G />}
    />
  );
};
