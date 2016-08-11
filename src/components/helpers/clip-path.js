import React, { PropTypes } from "react";
import {
  PropTypes as CustomPropTypes
} from "victory-core";

export default class ClipPath extends React.Component {
  static propTypes = {
    /**
     * A unique ID for clipPath so, it could make sure using specific clipPath on
     * specific chart
     * @type {Number}
     */
    clipId: PropTypes.number,
    /**
     * The clipPadding props specifies the paddings in clipPath
     * @type {Number}
     */
    clipPadding: PropTypes.number,
    /**
     * The clipHeight props specifies the height of the clipPath
     * This value should be given as a number of pixels
     */
    height: CustomPropTypes.nonNegative,
    /**
     * The width props specifies the width of the clipPath
     * This value should be given as a number of pixels
     */
    width: CustomPropTypes.nonNegative,
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
    barWidth: PropTypes.number,
    /**
     * The translateX props specifies the x-axis translation of the clipPath
     */
    translateX: PropTypes.number
  };

  static defaultProps = {
    clipPadding: 5,
    translateX: 0
  }

  render() {
    const {
      padding,
      clipId,
      translateX,
      width,
      height,
      barWidth,
      clipPadding
    } = this.props;

    const modifiedBarWidth = barWidth || 0;

    return (
      <defs>
        <clipPath id={clipId}>
          <rect
            x={padding.left - modifiedBarWidth + translateX - clipPadding}
            y={padding.top - modifiedBarWidth - clipPadding}
            width={width + clipPadding * 2}
            height={height + clipPadding * 2}
          />
        </clipPath>
      </defs>
    );
  }
}
