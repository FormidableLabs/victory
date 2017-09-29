import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "../victory-util/prop-types";
import Helpers from "../victory-util/helpers";
import Collection from "../victory-util/collection";

export default class ClipPath extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    clipHeight: CustomPropTypes.nonNegative,
    clipId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
    origin: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    polar: PropTypes.bool,
    radius: PropTypes.number,
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
    const {
      polar, origin, clipWidth = 0, clipHeight = 0, translateX = 0, translateY = 0
    } = props;
    const clipPadding = Helpers.getPadding({ padding: props.clipPadding });
    const radius = props.radius || Helpers.getRadius(props);
    return {
      x: (polar ? origin.x : translateX) - clipPadding.left,
      y: (polar ? origin.y : translateY) - clipPadding.top,
      width: Math.max((polar ? radius : clipWidth) + clipPadding.left + clipPadding.right, 0),
      height: Math.max((polar ? radius : clipHeight) + clipPadding.top + clipPadding.bottom, 0)
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

  renderPolarClipPath(props, id) {
    return (
      <defs>
        <clipPath id={id}>
          <circle {...props}/>
        </clipPath>
      </defs>
    );
  }

  render() {
    const { clipId, className, polar } = this.props;
    const clipProps = polar ?
      { className, cx: this.x, cy: this.y, r: Math.max(this.width, this.height) } :
      { className, x: this.x, y: this.y, width: this.width, height: this.height };
    return polar ?
      this.renderPolarClipPath(clipProps, clipId) : this.renderClipPath(clipProps, clipId);
  }
}
