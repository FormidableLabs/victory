import React, { PropTypes } from "react";
import {
  PropTypes as CustomPropTypes
} from "victory-core";

export default class ClipPath extends React.Component {
  static propTypes = {
    /**
     * A unique ID for clipPath so, it could make sure using specific clipPath on
     * specific chart
     * @type {String}
     */
    clipId: PropTypes.number,
    /**
     * The clipHeight props specifies the height of the clipPath
     * This value should be given as a number of pixels
     */
    clipHeight: CustomPropTypes.nonNegative,
    /**
     * The clipWidth props specifies the width of the clipPath
     * This value should be given as a number of pixels
     */
    clipWidth: CustomPropTypes.nonNegative,
    /**
     * The padding props specifies the amount of padding in number of pixels between
     * the edge of the chart and any rendered child components. This prop should be given
     * as an object with padding specified for top, bottom, left and right.
     */
    padding: PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number
    }),
    /**
     * The barWidth props specifies the barWidth of the bars this should be given when the
     * component is using in bar type charts
     */
    barWidth: PropTypes.number
  };

  render() {
    const {
      padding,
      clipId,
      width,
      height,
      barWidth
    } = this.props;

    const modifiedBarWidth = barWidth || 0;

    return (
      <defs>
        <clipPath id={clipId}>
          <rect
            x={padding.left - modifiedBarWidth}
            y={padding.top - modifiedBarWidth}
            width={width}
            height={height}
          />
        </clipPath>
      </defs>
    );
  }
}
