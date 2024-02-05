import React from "react";
import * as Helpers from "../victory-util/helpers";
import * as UserProps from "../victory-util/user-props";
import { defaults, isObject, uniqueId } from "lodash";
import { ClipPath } from "../victory-primitives/clip-path";
import { Circle } from "../victory-primitives/circle";
import { Rect } from "../victory-primitives/rect";

import { BlockProps } from "../victory-theme/victory-theme";
import { OriginType } from "../victory-label/victory-label";

export interface VictoryClipContainerProps {
  "aria-label"?: string;
  children?: React.ReactElement | React.ReactElement[];
  circleComponent?: React.ReactElement;
  className?: string;
  clipHeight?: number;
  clipId?: number | string;
  clipPadding?: BlockProps;
  clipPathComponent?: React.ReactElement;
  clipWidth?: number;
  events?: React.DOMAttributes<any>;
  groupComponent?: React.ReactElement;
  origin?: OriginType;
  polar?: boolean;
  radius?: number;
  rectComponent?: React.ReactElement;
  translateX?: number;
  translateY?: number;
}

export class VictoryClipContainer extends React.Component<VictoryClipContainerProps> {
  static displayName = "VictoryClipContainer";
  static role = "container";

  static defaultProps = {
    circleComponent: <Circle />,
    rectComponent: <Rect />,
    clipPathComponent: <ClipPath />,
    groupComponent: <g />,
  };
  public clipId: VictoryClipContainerProps["clipId"];

  constructor(props: VictoryClipContainerProps) {
    super(props);
    this.clipId =
      !isObject(props) || props.clipId === undefined
        ? uniqueId("victory-clip-")
        : props.clipId;
  }

  calculateAttributes(props) {
    const {
      polar,
      origin,
      clipWidth = 0,
      clipHeight = 0,
      translateX = 0,
      translateY = 0,
    } = props;
    const clipPadding = Helpers.getPadding({ padding: props.clipPadding });
    const radius = props.radius || Helpers.getRadius(props);
    return {
      x: (polar ? origin.x : translateX) - clipPadding.left,
      y: (polar ? origin.y : translateY) - clipPadding.top,
      width: Math.max(
        (polar ? radius : clipWidth) + clipPadding.left + clipPadding.right,
        0,
      ),
      height: Math.max(
        (polar ? radius : clipHeight) + clipPadding.top + clipPadding.bottom,
        0,
      ),
    };
  }

  renderClippedGroup(props, clipId) {
    const userProps = UserProps.getSafeUserProps(props);
    const {
      style,
      events,
      transform,
      children,
      className,
      groupComponent,
      tabIndex,
    } = props;
    const clipComponent = this.renderClipComponent(props, clipId);
    const groupProps = Object.assign(
      {
        className,
        style,
        transform,
        key: `clipped-group-${clipId}`,
        clipPath: `url(#${clipId})`,
      },
      events,
    );
    return React.cloneElement(
      groupComponent,
      { ...groupProps, tabIndex, ...userProps },
      [clipComponent, ...React.Children.toArray(children)],
    );
  }

  renderGroup(props) {
    const {
      style,
      events,
      transform,
      children,
      className,
      groupComponent,
      tabIndex,
    } = props;
    return React.cloneElement(
      groupComponent,
      Object.assign(
        {
          className,
          style,
          transform,
          "aria-label": props["aria-label"],
          tabIndex,
        },
        events,
      ),
      children,
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
      clipPathComponent,
    } = props;
    const { top, bottom, left, right } = Helpers.getPadding({
      padding: props.clipPadding,
    });
    let child;
    if (polar) {
      const radius = props.radius || Helpers.getRadius(props);
      const circleProps = {
        r: Math.max(radius + left + right, radius + top + bottom, 0),
        cx: origin.x - left,
        cy: origin.y - top,
      };
      child = React.cloneElement(circleComponent, circleProps);
    } else {
      const rectProps = {
        x: translateX - left,
        y: translateY - top,
        width: Math.max(clipWidth + left + right, 0),
        height: Math.max(clipHeight + top + bottom, 0),
      };
      child = React.cloneElement(rectComponent, rectProps);
    }

    return React.cloneElement(
      clipPathComponent,
      Object.assign({ key: `clip-path-${clipId}` }, props, { clipId }),
      child,
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
    const clipProps = defaults({}, this.props, {
      clipHeight,
      clipWidth,
      translateX,
      translateY,
    });
    return this.renderClippedGroup(clipProps, this.clipId);
  }
}
