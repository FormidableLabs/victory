import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "../victory-util/prop-types";
import Helpers from "../victory-util/helpers";
import Collection from "../victory-util/collection";

export default class ClipPath extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    clipHeight: CustomPropTypes.nonNegative,
    clipId: PropTypes.number,
    clipPadding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number
      })
    ]),
    clipWidth: CustomPropTypes.nonNegative,
    translateX: PropTypes.number,
    translateY: PropTypes.number
  };

  componentWillMount() {
    Object.assign(this, this.calculateAttributes(this.props));
  }

  shouldComponentUpdate(nextProps) {
    const calculatedAttributes = this.calculateAttributes(nextProps);
    const { className, clipId, clipWidth, translateX, translateY } = this.props;
    if (!Collection.allSetsEqual([
      [className, nextProps.className],
      [clipId, nextProps.clipId],
      [clipWidth, nextProps.clipWidth],
      [translateX, nextProps.translateX],
      [translateY, nextProps.translateY],
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
    const clipPadding = Helpers.getPadding({ padding: props.clipPadding });

    return {
      x: translateX - clipPadding.left,
      y: translateY - clipPadding.top,
      width: Math.max(clipWidth + clipPadding.left + clipPadding.right, 0),
      height: Math.max(clipHeight + clipPadding.top + clipPadding.bottom, 0)
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
