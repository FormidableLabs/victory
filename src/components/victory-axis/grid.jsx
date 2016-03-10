import React, { PropTypes } from "react";
import { Helpers } from "victory-core";
import Events from "../../helpers/events";

export default class GridLine extends React.Component {
  static role = "grid";

  static propTypes = {
    index: PropTypes.number,
    tick: PropTypes.any,
    x2: PropTypes.number,
    y2: PropTypes.number,
    xTransform: PropTypes.number,
    yTransform: PropTypes.number,
    style: PropTypes.object,
    events: PropTypes.object
  };

  render() {
    const { props } = this;
    const events = Events.getPartialEvents(props.events, props.index, props);
    return (
      <g transform={`translate(${props.xTransform}, ${props.yTransform})`}>
        <line
          {...events}
          x2={props.x2}
          y2={props.y2}
          style={Helpers.evaluateStyle(props.style, props.tick)}
        />
      </g>
    );
  }
}
