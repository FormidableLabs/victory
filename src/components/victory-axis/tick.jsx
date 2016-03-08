import React, { PropTypes } from "react";
import { Helpers } from "victory-core";

export default class Tick extends React.Component {
  static role = "tick";

  static propTypes = {
    position: PropTypes.object,
    tick: PropTypes.any,
    style: PropTypes.object,
    events: PropTypes.object
  };

  render() {
    const style = Helpers.evaluateStyle(this.props.style, this.props.tick);
    return (
      <line
        {...this.props.events}
        x2={this.props.position.x2}
        y2={this.props.position.y2}
        style={style}
      />
    );
  }
}
