import React from "react";
import { VictoryBrushLineProps } from "victory-brush-line";

export interface VictoryNativeBrushLine extends VictoryBrushLineProps {
  onTouchStart?: Function;
  onTouchEnd?: Function;
}

export default class extends React.Component<VictoryNativeBrushLine, any> {}
