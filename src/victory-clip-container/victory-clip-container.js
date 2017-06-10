import React from "react";
import PropTypes from "prop-types";
import { assign, defaults, isFunction } from "lodash";
import ClipPath from "../victory-primitives/clip-path";

export default class VictoryClipContainer extends React.Component {
  static displayName = "VictoryClipContainer";
  static role = "container";
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    className: PropTypes.string,
    clipHeight: PropTypes.number,
    clipId: PropTypes.number,
    clipPadding: PropTypes.shape({
      top: PropTypes.number, bottom: PropTypes.number,
      left: PropTypes.number, right: PropTypes.number
    }),
    clipPathComponent: PropTypes.element,
    clipWidth: PropTypes.number,
    events: PropTypes.object,
    origin: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    polar: PropTypes.bool,
    radius: PropTypes.number,
    style: PropTypes.object,
    transform: PropTypes.string,
    translateX: PropTypes.number,
    translateY: PropTypes.number
  }

  static defaultProps = {
    clipPathComponent: <ClipPath/>
  }

  constructor(props) {
    super(props);
    this.clipId = props.clipId !== undefined ?
      props.clipId :
      Math.round(Math.random() * 10000); // eslint-disable-line no-magic-numbers
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
    return React.cloneElement(
      props.clipPathComponent,
      assign({}, props, { clipId })
    );
  }

  getClipValue(props, axis) {
    const clipValues = { x: props.clipWidth, y: props.clipHeight };
    if (clipValues[axis] !== undefined) {
      return clipValues[axis];
    }
    const range = this.getRange(props, axis);
    return range ? Math.abs(range[0] - range[1]) || undefined : undefined;
  }

  getTranslateValue(props, axis) {
    const translateValues = { x: props.translateX, y: props.translateY };
    if (translateValues[axis] !== undefined) {
      return translateValues[axis];
    }
    const range = this.getRange(props, axis);
    return range ? Math.min(...range) : undefined;
  }

  getRange(props, axis) {
    const scale = props.scale || {};
    if (!scale[axis]) {
      return undefined;
    }
    return isFunction(scale[axis].range) ? scale[axis].range() : undefined;
  }

  render() {
    const clipHeight = this.getClipValue(this.props, "y");
    const clipWidth = this.getClipValue(this.props, "x");
    if (clipWidth === undefined || clipHeight === undefined) {
      return this.renderGroup(this.props);
    }
    const translateX = this.getTranslateValue(this.props, "x");
    const translateY = this.getTranslateValue(this.props, "y");
    const clipProps = defaults({}, this.props, { clipHeight, clipWidth, translateX, translateY });
    return this.renderClippedGroup(clipProps, this.clipId);
  }
}
