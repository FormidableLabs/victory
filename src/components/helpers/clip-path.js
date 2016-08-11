import React, { PropTypes } from "react";
import {
  PropTypes as CustomPropTypes, Helpers
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
    clipPadding: PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number
    }),
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
     * the edge of the chart and any rendered child components. This prop can be given
     * as a number or as an object with padding specified for top, bottom, left
     * and right.
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
     * The barWidth props specifies the barWidth of the bars this should be given when the
     * component is using in bar type charts
     */
    barWidth: PropTypes.number
  };

  static defaultProps = {
    clipPadding: {
      top: 5,
      bottom: 5,
      left: 0,
      right: 0
    }
  }

  render() {
    const {
      clipId,
      clipWidth,
      clipHeight,
      barWidth,
      clipPadding
    } = this.props;

    const padding = Helpers.getPadding(this.props);
    const modifiedBarWidth = barWidth || 0;

    const totalPadding = (side) => padding[side] - clipPadding[side];

    return (
      <defs>
        <clipPath id={clipId}>
          <rect
            x={totalPadding("left") - modifiedBarWidth}
            y={totalPadding("top") - modifiedBarWidth}
            width={clipWidth - totalPadding("left") - totalPadding("right")}
            height={clipHeight - totalPadding("top") - totalPadding("bottom")}
          />
        </clipPath>
      </defs>
    );
  }
}
