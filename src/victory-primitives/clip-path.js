import React, { PropTypes } from "react";
import {
  PropTypes as CustomPropTypes, Helpers
} from "../victory-util/index";

export default class ClipPath extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    clipId: PropTypes.number,
    clipPadding: PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number
    }),
    clipHeight: CustomPropTypes.nonNegative,
    clipWidth: CustomPropTypes.nonNegative,
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number
      })
    ]),
    translateX: PropTypes.number
  };

  static defaultProps = {
    translateX: 0,
    clipPadding: {
      top: 5,
      bottom: 5,
      left: 0,
      right: 0
    }
  }

  // Overridden in victory-core-native
  renderClipPath(props, id) {
    return (
      <defs>
        <clipPath id={id}>
          <rect {...props}/>
        </clipPath>
      </defs>
    );
  }

  render() {
    const {
      clipId,
      clipWidth,
      clipHeight,
      translateX,
      clipPadding,
      className
    } = this.props;

    const padding = Helpers.getPadding(this.props);

    const totalPadding = (side) => padding[side] - (clipPadding[side] || 0);

    const clipProps = {
      className,
      x: totalPadding("left") + translateX,
      y: totalPadding("top"),
      width: Math.max(clipWidth - totalPadding("left") - totalPadding("right"), 0),
      height: Math.max(clipHeight - totalPadding("top") - totalPadding("bottom"), 0)
    };

    return this.renderClipPath(clipProps, clipId);
  }
}
