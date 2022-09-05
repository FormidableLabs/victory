/* eslint-disable react/no-multi-comp */
import PropTypes from "prop-types";
import React from "react";
import { defaults, isFunction, pick } from "lodash";
import { VictoryTooltip } from "victory-tooltip";
import {
  VictoryContainer,
  Helpers,
  PropTypes as CustomPropTypes,
} from "victory-core";
import VoronoiHelpers from "./voronoi-helpers";

export const voronoiContainerMixin = (base) =>
  class VictoryVoronoiContainer extends base {
    static displayName = "VictoryVoronoiContainer";
    static propTypes = {
      ...VictoryContainer.propTypes,
      activateData: PropTypes.bool,
      activateLabels: PropTypes.bool,
      disable: PropTypes.bool,
      labelComponent: PropTypes.element,
      labels: PropTypes.func,
      mouseFollowTooltips: PropTypes.bool,
      onActivated: PropTypes.func,
      onDeactivated: PropTypes.func,
      radius: PropTypes.number,
      voronoiBlacklist: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, CustomPropTypes.regExp]),
      ),
      voronoiDimension: PropTypes.oneOf(["x", "y"]),
      voronoiPadding: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          top: PropTypes.number,
          bottom: PropTypes.number,
          left: PropTypes.number,
          right: PropTypes.number,
        }),
      ]),
    };
    static defaultProps = {
      ...VictoryContainer.defaultProps,
      activateData: true,
      activateLabels: true,
      labelComponent: <VictoryTooltip />,
      voronoiPadding: 5,
    };

    static defaultEvents = (props) => {
      return [
        {
          target: "parent",
          eventHandlers: {
            onMouseLeave: (evt, targetProps) => {
              return props.disable
                ? {}
                : VoronoiHelpers.onMouseLeave(evt, targetProps);
            },
            onTouchCancel: (evt, targetProps) => {
              return props.disable
                ? {}
                : VoronoiHelpers.onMouseLeave(evt, targetProps);
            },
            onMouseMove: (evt, targetProps) => {
              return props.disable
                ? {}
                : VoronoiHelpers.onMouseMove(evt, targetProps);
            },
            onTouchMove: (evt, targetProps) => {
              return props.disable
                ? {}
                : VoronoiHelpers.onMouseMove(evt, targetProps);
            },
          },
        },
        {
          target: "data",
          eventHandlers: props.disable
            ? {}
            : {
                onMouseOver: () => null,
                onMouseOut: () => null,
                onMouseMove: () => null,
              },
        },
      ];
    };

    getDimension(props) {
      const { horizontal, voronoiDimension } = props;
      if (!horizontal || !voronoiDimension) {
        return voronoiDimension;
      }
      return voronoiDimension === "x" ? "y" : "x";
    }

    getPoint(point) {
      const whitelist = ["_x", "_x1", "_x0", "_y", "_y1", "_y0"];
      return pick(point, whitelist);
    }

    getLabelPosition(props, labelProps, points) {
      const { mousePosition, mouseFollowTooltips } = props;
      const voronoiDimension = this.getDimension(props);
      const point = this.getPoint(points[0]);
      const basePosition = Helpers.scalePoint(props, point);

      let center = mouseFollowTooltips ? mousePosition : undefined;
      if (!voronoiDimension || points.length < 2) {
        return {
          ...basePosition,
          center: defaults({}, labelProps.center, center),
        };
      }

      const x = voronoiDimension === "y" ? mousePosition.x : basePosition.x;
      const y = voronoiDimension === "x" ? mousePosition.y : basePosition.y;
      center = mouseFollowTooltips ? mousePosition : { x, y };
      return { x, y, center: defaults({}, labelProps.center, center) };
    }

    getStyle(props, points, type) {
      const { labels, labelComponent, theme } = props;
      const componentProps = labelComponent.props || {};
      const themeStyles =
        theme && theme.voronoi && theme.voronoi.style
          ? theme.voronoi.style
          : {};
      const componentStyleArray =
        type === "flyout" ? componentProps.flyoutStyle : componentProps.style;
      return points.reduce((memo, datum, index) => {
        const labelProps = defaults({}, componentProps, {
          datum,
          active: true,
        });
        const text = isFunction(labels) ? labels(labelProps) : undefined;
        const textArray = text !== undefined ? `${text}`.split("\n") : [];
        const baseStyle = (datum.style && datum.style[type]) || {};
        const componentStyle = Array.isArray(componentStyleArray)
          ? componentStyleArray[index]
          : componentStyleArray;
        const style = Helpers.evaluateStyle(
          defaults({}, componentStyle, baseStyle, themeStyles[type]),
          labelProps,
        );
        const styleArray = textArray.length
          ? textArray.map(() => style)
          : [style];
        memo = memo.concat(styleArray);
        return memo;
      }, []);
    }

    getDefaultLabelProps(props, points) {
      const { voronoiDimension, horizontal, mouseFollowTooltips } = props;
      const point = this.getPoint(points[0]);
      const multiPoint = voronoiDimension && points.length > 1;
      const y = point._y1 !== undefined ? point._y1 : point._y;
      const defaultHorizontalOrientation = y < 0 ? "left" : "right";
      const defaultOrientation = y < 0 ? "bottom" : "top";
      const labelOrientation = horizontal
        ? defaultHorizontalOrientation
        : defaultOrientation;
      const orientation = mouseFollowTooltips ? undefined : labelOrientation;
      return {
        orientation,
        pointerLength: multiPoint ? 0 : undefined,
        constrainToVisibleArea:
          multiPoint || mouseFollowTooltips ? true : undefined,
      };
    }

    getLabelProps(props, points) {
      const { labels, scale, labelComponent, theme, width, height } = props;
      const componentProps = labelComponent.props || {};
      const text = points.reduce((memo, datum) => {
        const labelProps = defaults({}, componentProps, {
          datum,
          active: true,
        });
        const t = isFunction(labels) ? labels(labelProps) : null;
        if (t === null || t === undefined) {
          return memo;
        }
        memo = memo.concat(`${t}`.split("\n"));
        return memo;
      }, []);

      // remove properties from first point to make datum
      // eslint-disable-next-line no-unused-vars
      const { childName, eventKey, style, continuous, ...datum } = points[0];
      const name =
        props.name === childName ? childName : `${props.name}-${childName}`;
      const labelProps = defaults(
        {
          key: `${name}-${eventKey}-voronoi-tooltip`,
          id: `${name}-${eventKey}-voronoi-tooltip`,
          active: true,
          renderInPortal: false,
          activePoints: points,
          datum,
          scale,
          theme,
        },
        componentProps,
        {
          text,
          width,
          height,
          style: this.getStyle(props, points, "labels"),
          flyoutStyle: this.getStyle(props, points, "flyout")[0],
        },
        this.getDefaultLabelProps(props, points),
      );
      const labelPosition = this.getLabelPosition(props, labelProps, points);
      return defaults({}, labelPosition, labelProps);
    }

    getTooltip(props) {
      const { labels, activePoints, labelComponent } = props;
      if (!labels) {
        return null;
      }
      if (Array.isArray(activePoints) && activePoints.length) {
        const labelProps = this.getLabelProps(props, activePoints);
        const { text } = labelProps;
        const showLabel = Array.isArray(text)
          ? text.filter(Boolean).length
          : text;
        return showLabel
          ? React.cloneElement(labelComponent, labelProps)
          : null;
      }
      return null;
    }

    // Overrides method in VictoryContainer
    getChildren(props) {
      return [
        ...React.Children.toArray(props.children),
        this.getTooltip(props),
      ];
    }
  };

export default voronoiContainerMixin(VictoryContainer);
// @ts-expect-error IMPORTANT: when converting this file to TypeScript, you must export the type as well:
// export const VictoryVoronoiContainer = voronoiContainerMixin(VictoryContainer);
// export type VictoryVoronoiContainer = typeof VictoryVoronoiContainer;
