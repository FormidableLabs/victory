import React from "react";
import Svg from "react-native-svg";
import { Portal } from "victory-core/es";

export default class extends Portal {

  render() {
    return <Svg {...this.props}>{this.getChildren()}</Svg>;
  }
}
