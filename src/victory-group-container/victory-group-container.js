import React, { PropTypes } from "react";
import { ClipPath } from "../victory-primitives/index";

export default class VictoryGroupContainer extends React.Component {
  static displayName = "VictoryGroupContainer";

  static propTypes = {
    /**
     * The style prop specifies styles for your VictoryContainer. Any valid inline style properties
     * will be applied. Height and width should be specified via the height
     * and width props, as they are used to calculate the alignment of
     * components within the container. Styles from the child component will
     * also be passed, if any exist.
     * @examples {border: 1px solid red}
     */
    style: PropTypes.object,
    /**
     * The padding props specifies the amount of padding in number of pixels between
     * the edge of the chart and any rendered child components. This prop should be given
     * as an object with padding specified for top, bottom, left and right.
     */
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number
      })
    ]),
    /**
     * The clipHeight props specifies the height of the clipPath
     * This value should be given as a number of pixels
     */
    clipHeight: PropTypes.number,
    /**
     * The clipWidth props specifies the width of the clipPath
     * This value should be given as a number of pixels
     */
    clipWidth: PropTypes.number,
    /**
     * The events prop attaches arbitrary event handlers to the container component.
     * Event handlers passed from other Victory components are called with their
     * corresponding events as well as scale, style, width, height, and data when
     * applicable. Use the invert method to convert event coordinate information to
     * data. `scale.x.invert(evt.offsetX)`.
     * @examples {(evt) => alert(`x: ${evt.clientX}, y: ${evt.clientY}`)}
     */
    events: PropTypes.object,
    /**
     * VictoryContainer is a wrapper component that controls some props and behaviors of its
     * children. VictoryContainer works with all Victory components.
     * If no children are provided, VictoryContainer will render an empty SVG.
     * Props from children are used to determine default style, height, and width.
     */
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    /**
     * The clipPathComponent prop takes an entire component which will be used to
     * create clipPath elements for use within container elements.
     */
    clipPathComponent: PropTypes.element,
    /**
     * A unique ID for clipPath so, it could make sure using specific clipPath on
     * specific chart
     * @type {Number}
     */
    clipId: PropTypes.number,
    /**
     * The translateX props specifies the x-axis translation of the clipPath
     */
    translateX: PropTypes.number,
    transform: PropTypes.string
  }

  static defaultProps = {
    clipPathComponent: <ClipPath/>
  }

  render() {
    const { style, events, children, transform, clipWidth } = this.props;
    if (clipWidth || clipWidth === 0) {
      const { padding, clipId, translateX, clipHeight, clipPathComponent } = this.props;
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
