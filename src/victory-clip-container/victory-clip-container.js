import React, { PropTypes } from "react";
import { ClipPath } from "../victory-primitives/index";

export default class VictoryClipContainer extends React.Component {
  static displayName = "VictoryClipContainer";

  static propTypes = {
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
    transform: PropTypes.string
  }

  static defaultProps = {
    clipPathComponent: <ClipPath/>
  }

  render() {
    const { style, events, children, transform, clipWidth } = this.props;
    if (clipWidth || clipWidth === 0) {
      const { padding, translateX, clipHeight, clipPathComponent } = this.props;
      const clipId = Math.round(Math.random() * 10000);
      const clipComponent = React.cloneElement(
        clipPathComponent,
        { padding, clipId, translateX, clipWidth, clipHeight }
      );
      return (
        <g
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
    return (
      <g
        style={style}
        {...events}
        transform={transform}
      >
        {children}
      </g>
    );
  }
}
