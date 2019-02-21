import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "../victory-util/prop-types";
import Helpers from "../victory-util/helpers";
import { assign, defaults, isObject, uniqueId } from "lodash";
import ClipPath from "../victory-primitives/clip-path";
import Circle from "../victory-primitives/circle";
import Rect from "../victory-primitives/rect";

export default class VictoryClipContainer extends React.Component {
  static displayName = "VictoryClipContainer";
  static role = "container";
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    circleComponent: PropTypes.element,
    className: PropTypes.string,
    clipHeight: CustomPropTypes.nonNegative,
    clipId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    clipPadding: PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number
    }),
    clipPathComponent: PropTypes.element,
    clipWidth: CustomPropTypes.nonNegative,
    events: PropTypes.object,
    groupComponent: PropTypes.element,
    origin: PropTypes.shape({ x: CustomPropTypes.nonNegative, y: CustomPropTypes.nonNegative }),
    polar: PropTypes.bool,
    radius: CustomPropTypes.nonNegative,
    style: PropTypes.object,
    transform: PropTypes.string,
    translateX: PropTypes.number,
    translateY: PropTypes.number
  };

  static defaultProps = {
    circleComponent: <Circle />,
    rectComponent: <Rect />,
    clipPathComponent: <ClipPath />,
    groupComponent: <g />
  };

  constructor(props) {
    super(props);
    this.clipId =
      !isObject(props) || props.clipId === undefined ? uniqueId("victory-clip-") : props.clipId;
  }

  calculateAttributes(props) {
    const { polar, origin, clipWidth = 0, clipHeight = 0, translateX = 0, translateY = 0 } = props;
    const clipPadding = Helpers.getPadding({ padding: props.clipPadding });
    const radius = props.radius || Helpers.getRadius(props);
    return {
      x: (polar ? origin.x : translateX) - clipPadding.left,
      y: (polar ? origin.y : translateY) - clipPadding.top,
      width: Math.max((polar ? radius : clipWidth) + clipPadding.left + clipPadding.right, 0),
      height: Math.max((polar ? radius : clipHeight) + clipPadding.top + clipPadding.bottom, 0)
    };
  }

  renderClippedGroup(props, clipId) {
    const { style, events, transform, children, className, groupComponent } = props;
    const clipComponent = this.renderClipComponent(props, clipId);
    const groupProps = assign(
      {
        className,
        style,
        transform,
        key: `clipped-group-${clipId}`,
        clipPath: `url(#${clipId})`
      },
      events
    );
    return React.cloneElement(groupComponent, groupProps, [
      clipComponent,
      ...React.Children.toArray(children)
    ]);
  }

  renderGroup(props) {
    const { style, events, transform, children, className, groupComponent } = props;
    return React.cloneElement(
      groupComponent,
      assign({ className, style, transform }, events),
      children
    );
  }

  renderClipComponent(props, clipId) {
    const {
      polar,
      origin,
      clipWidth = 0,
      clipHeight = 0,
      translateX = 0,
      translateY = 0,
      circleComponent,
      rectComponent,
      clipPathComponent
    } = props;
    const { top, bottom, left, right } = Helpers.getPadding({ padding: props.clipPadding });
    let child;
    if (polar) {
      const radius = props.radius || Helpers.getRadius(props);
      const circleProps = {
        r: Math.max(radius + left + right, radius + top + bottom, 0),
        cx: origin.x - left,
        cy: origin.y - top
      };
      child = React.cloneElement(circleComponent, circleProps);
    } else {
      const rectProps = {
        x: translateX - left,
        y: translateY - top,
        width: Math.max(clipWidth + left + right, 0),
        height: Math.max(clipHeight + top + bottom, 0)
      };
      child = React.cloneElement(rectComponent, rectProps);
    }

    return React.cloneElement(
      clipPathComponent,
      assign({ key: `clip-path-${clipId}` }, props, { clipId }),
      child
    );
  }

  getClipValue(props, axis) {
    const clipValues = { x: props.clipWidth, y: props.clipHeight };
    if (clipValues[axis] !== undefined) {
      return clipValues[axis];
    }
    const range = Helpers.getRange(props, axis);
    return range ? Math.abs(range[0] - range[1]) || undefined : undefined;
  }

  getTranslateValue(props, axis) {
    const translateValues = { x: props.translateX, y: props.translateY };
    if (translateValues[axis] !== undefined) {
      return translateValues[axis];
    }
    const range = Helpers.getRange(props, axis);
    return range ? Math.min(...range) : undefined;
  }
  render() {
    const clipHeight = this.getClipValue(this.props, "y");
    const clipWidth = this.getClipValue(this.props, "x");
    if (clipWidth === undefined || clipHeight === undefined) {
      return this.renderGroup(this.props);
    }
    const translateX = this.getTranslateValue(this.props, "x");
    const translateY = this.getTranslateValue(this.props, "y");
    const clipProps = defaults({}, this.props, { clipHeight, clipWidth, translateX, translateY });
    return this.renderClippedGroup(clipProps, this.clipId);
  }
}
