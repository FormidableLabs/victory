import React, { PropTypes } from "react";
import {
  PropTypes as CustomPropTypes, Helpers
} from "../victory-util/index";

export default class ClipPath extends React.Component {
  static propTypes = {
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
      clipPadding
    } = this.props;

    const padding = Helpers.getPadding(this.props);

    const totalPadding = (side) => padding[side] - (clipPadding[side] || 0);

    const clipProps = {
      x: totalPadding("left") + translateX,
      y: totalPadding("top"),
      width: clipWidth - totalPadding("left") - totalPadding("right"),
      height: clipHeight - totalPadding("top") - totalPadding("bottom")
    };

    return this.renderClipPath(clipProps, clipId);
  }
}
