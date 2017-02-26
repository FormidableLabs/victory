import React, { PropTypes } from "react";
import { ClipPath } from "../victory-primitives/index";

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
    const { padding, translateX, translateY, clipHeight, clipWidth, clipPathComponent } = props;
    return React.cloneElement(
      clipPathComponent,
      { padding, clipId, translateX, translateY, clipWidth, clipHeight }
    );
  }

  render() {
    const { clipWidth } = this.props;
    if (clipWidth || clipWidth === 0) {
      return this.renderClippedGroup(this.props, this.clipId);
    }
    return this.renderGroup(this.props);
  }
}
