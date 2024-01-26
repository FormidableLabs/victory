import React from "react";
import { G } from "react-native-svg";
import { Circle } from "./victory-primitives/circle";
import { Rect } from "./victory-primitives/rect";
import { ClipPath } from "./victory-primitives/clip-path";
import { VictoryClipContainer as VictoryClipContainerBase } from "victory-core/es";
import { uniqueId } from "lodash";

export class VictoryClipContainer extends VictoryClipContainerBase {
  static defaultProps = {
    ...VictoryClipContainerBase.defaultProps,
    groupComponent: <G />,
    rectComponent: <Rect />,
    clipPathComponent: <ClipPath />,
    circleComponent: <Circle />,
  };

  // There seems to be a caching issue with clip paths.
  // This is required to make clip paths update when animating
  componentDidUpdate() {
    this.clipId = uniqueId("victory-clip-");
  }
}
