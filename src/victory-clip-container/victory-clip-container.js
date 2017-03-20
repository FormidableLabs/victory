import React, { PropTypes } from "react";
import { defaults } from "lodash";
import { ClipPath } from "../victory-primitives/index";
import { Helpers } from "../victory-util/index";

export default class VictoryClipContainer extends React.Component {
  static displayName = "VictoryClipContainer";

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number
      })
    ]),
    clipPadding: PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number
    }),
    clipHeight: PropTypes.number,
    clipWidth: PropTypes.number,
    events: PropTypes.object,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    clipPathComponent: PropTypes.element,
    translateX: PropTypes.number,
    translateY: PropTypes.number,
    transform: PropTypes.string
  }

  static defaultProps = {
    clipPathComponent: <ClipPath/>
  }

  constructor(props) {
    super(props);
    this.clipId = Math.round(Math.random() * 10000);
  }

  // Overridden in victory-core-native
  renderClippedGroup(props, clipId) {
    const { style, events, transform, children, className } = props;
    const clipComponent = this.renderClipComponent(props, clipId);
    return (
      <g
        className={className}
        style={style}
        {...events}
        transform={transform}
      >
        {clipComponent}
        <g clipPath={`url(#${clipId})`}>
          {children}
        </g>
      </g>
    );
  }

  // Overridden in victory-core-native
  renderGroup(props) {
    const { style, events, transform, children, className } = props;
    return (
      <g
        className={className}
        style={style}
        {...events}
        transform={transform}
      >
        {children}
      </g>
    );
  }

  // Overridden in victory-core-native
  renderClipComponent(props, clipId) {
    const {
      padding, clipPadding, translateX, translateY, clipHeight, clipWidth, clipPathComponent
    } = props;
    return React.cloneElement(
      clipPathComponent,
      { padding, clipPadding, clipId, translateX, translateY, clipWidth, clipHeight }
    );
  }

  getClipValue(props, axis) {
    const clipValues = {x: props.clipWidth, y: props.clipHeight};
    if (clipValues[axis] !== undefined) {
      return clipValues[axis];
    }
    const range = Helpers.getRange(props, axis);
    return range ? Math.abs(range[0] - range[1]) : undefined;
  }

  getTranslateValue(props, axis) {
    const translateValues = {x: props.translateX, y: props.translateY};
    if (translateValues[axis] !== undefined) {
      return translateValues[axis];
    }
    const range = Helpers.getRange(props, axis);
    return range ? Math.min(...range) : undefined;
  }

  render() {
    const clipHeight = this.getClipValue(this.props, "y");
    const clipWidth = this.getClipValue(this.props, "x");
    if (clipWidth === undefined || clipHeight === undefined) {
      return this.renderGroup(this.props);
    }
    const translateX = this.getTranslateValue(this.props, "x");
    const translateY = this.getTranslateValue(this.props, "y");
    const clipProps = defaults({}, this.props, {clipHeight, clipWidth, translateX, translateY});
    return this.renderClippedGroup(clipProps, this.clipId);
  }
}
