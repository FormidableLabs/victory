import defaults from "lodash/object/defaults";
import React, { PropTypes } from "react";
import { VictoryLabel, Helpers} from "victory-core";

export default class LineLabel extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    events: PropTypes.object,
    position: PropTypes.object,
    style: PropTypes.object
  };

  renderLabelComponent(props) {
    const component = props.label;
    const baseStyle = defaults({}, component.props.style, props.style, {padding: 0});
    const style = Helpers.evaluateStyle(baseStyle, props.data);
    const children = component.props.children || "";
    const newProps = {
      x: component.props.x || props.position.x + style.padding,
      y: component.props.y || props.position.y - style.padding,
      data: props.data,
      events: component.props.events || props.events,
      textAnchor: component.props.textAnchor || "start",
      verticalAnchor: component.props.verticalAnchor || "middle",
      style
    };
    return React.cloneElement(component, newProps, children);
  }

  renderVictoryLabel(props) {
    const style = Helpers.evaluateStyle(defaults({}, props.style), props.data, {padding: 0});
    return (
      <VictoryLabel
        x={props.position.x + style.padding}
        y={props.position.y - style.padding}
        textAnchor={"start"}
        verticalAnchor={"middle"}
        style={style}
        events={props.events}
      >
        {props.label}
      </VictoryLabel>
    );
  }

  renderLabel(props) {
    return props.label && props.label.props ?
      this.renderLabelComponent(props) : this.renderVictoryLabel(props);
  }

  render() {
    return (
      <g>
        {this.renderLabel(this.props)}
      </g>
    );
  }
}
