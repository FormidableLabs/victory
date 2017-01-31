import React from "react";
import { Log } from "victory-core";

class VictoryZoom extends React.Component {
  static displayName = "VictoryZoom";

  static propTypes = {
    children: React.PropTypes.node
  }

  render() {
    Log.warn("VictoryZoom has been depreccated. Use VictoryZoomContainer instead.");
    return this.props.children;
  }
}
export default VictoryZoom;
