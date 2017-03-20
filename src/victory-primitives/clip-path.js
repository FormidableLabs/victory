import React, { PropTypes } from "react";
import {
  PropTypes as CustomPropTypes, Helpers, Collection
} from "../victory-util";

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
    Object.assign(this, this.calculateAttributes(this.props));
  }

  shouldComponentUpdate(nextProps) {
    const calculatedAttributes = this.calculateAttributes(nextProps);
    if (!Collection.allSetsEqual([
      [this.props.clipId, nextProps.clipId],
      [this.x, calculatedAttributes.x],
      [this.y, calculatedAttributes.y],
      [this.height, calculatedAttributes.height],
      [this.width, calculatedAttributes.width]
    ])) {
      Object.assign(this, calculatedAttributes);
      return true;
    }
    return false;
  }

  calculateAttributes(props) {
    const { clipWidth = 0, clipHeight = 0, translateX = 0, translateY = 0 } = props;
    const padding = Helpers.getPadding(props);
    const clipPadding = Helpers.getPadding({ padding: props.clipPadding });

    const totalPadding = (side) => {
      return padding[side] - clipPadding[side];
    };
    return {
      x: totalPadding("left") + translateX,
      y: totalPadding("top") + translateY,
      width: Math.max(clipWidth - totalPadding("left") - totalPadding("right"), 0),
      height: Math.max(clipHeight - totalPadding("top") - totalPadding("bottom"), 0)
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
