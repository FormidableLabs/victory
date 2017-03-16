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
    translateX: PropTypes.number,
    translateY: PropTypes.number
  };

  componentWillMount() {
    const { x, y, width, height } = this.calculateAttributes(this.props);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  shouldComponentUpdate(nextProps) {
    const { x, y, width, height } = this.calculateAttributes(nextProps);
    const { clipId } = this.props;
    if (
      x !== this.x ||
      y !== this.y ||
      width !== this.width ||
      height !== this.height ||
      clipId !== nextProps.clipId
    ) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      return true;
    }
    return false;
  }

  calculateAttributes(props) {
    const { clipWidth, clipHeight, translateX, translateY } = props;
    const padding = Helpers.getPadding(props);
    const clipPadding = props.clipPadding || {};
    const totalPadding = (side) => {
      const total = +padding[side] - (clipPadding[side] || 0);
      return typeof total === "number" ? total : 0;
    };
    return {
      x: totalPadding("left") + (translateX || 0),
      y: totalPadding("top") + (translateY || 0),
      width: Math.max(+clipWidth - totalPadding("left") - totalPadding("right"), 0),
      height: Math.max(+clipHeight - totalPadding("top") - totalPadding("bottom"), 0)
    };
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
    const { clipId, className } = this.props;
    const clipProps = { className, x: this.x, y: this.y, width: this.width, height: this.height };
    return this.renderClipPath(clipProps, clipId);
  }
}
