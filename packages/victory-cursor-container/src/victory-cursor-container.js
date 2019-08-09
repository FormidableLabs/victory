import PropTypes from "prop-types";
import React from "react";
import { VictoryContainer, VictoryLabel, LineSegment, Helpers } from "victory-core";
import { defaults, assign, isObject } from "lodash";
import CursorHelpers from "./cursor-helpers";

export const cursorContainerMixin = (base) =>
  class VictoryCursorContainer extends base {
    static displayName = "VictoryCursorContainer";
    static propTypes = {
      ...VictoryContainer.propTypes,
      cursorDimension: PropTypes.oneOf(["x", "y"]),
      cursorLabel: PropTypes.func,
      cursorLabelComponent: PropTypes.element,
      cursorLabelOffset: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          x: PropTypes.number,
          y: PropTypes.number
        })
      ]),
      defaultCursorValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          x: PropTypes.number,
          y: PropTypes.number
        })
      ]),
      disable: PropTypes.bool,
      onCursorChange: PropTypes.func
    };
    static defaultProps = {
      ...VictoryContainer.defaultProps,
      cursorLabelComponent: <VictoryLabel />,
      cursorLabelOffset: {
        x: 5,
        y: -10
      },
      cursorComponent: <LineSegment />
    };

    static defaultEvents = (props) => {
      return [
        {
          target: "parent",
          eventHandlers: {
            onMouseLeave: () => {
              return [];
            },
            onTouchCancel: () => {
              return [];
            },
            onMouseMove: (evt, targetProps) => {
              return props.disable ? {} : CursorHelpers.onMouseMove(evt, targetProps);
            },
            onTouchMove: (evt, targetProps) => {
              return props.disable ? {} : CursorHelpers.onMouseMove(evt, targetProps);
            }
          }
        }
      ];
    };

    getCursorPosition(props) {
      const { cursorValue, defaultCursorValue, domain, cursorDimension } = props;
      if (cursorValue) {
        return cursorValue;
      }

      if (typeof defaultCursorValue === "number") {
        return {
          x: (domain.x[0] + domain.x[1]) / 2,
          y: (domain.y[0] + domain.y[1]) / 2,
          [cursorDimension]: defaultCursorValue
        };
      }

      return defaultCursorValue;
    }

    getCursorLabelOffset(props) {
      const { cursorLabelOffset } = props;

      if (typeof cursorLabelOffset === "number") {
        return {
          x: cursorLabelOffset,
          y: cursorLabelOffset
        };
      }

      return cursorLabelOffset;
    }

    getPadding(props) {
      if (props.padding === undefined) {
        const child = props.children.find((c) => {
          return isObject(c.props) && c.props.padding !== undefined;
        });
        return Helpers.getPadding(child.props);
      } else {
        return Helpers.getPadding(props);
      }
    }

    getCursorElements(props) {
      // eslint-disable-line max-statements
      const {
        scale,
        cursorLabelComponent,
        cursorLabel,
        cursorComponent,
        width,
        height,
        name,
        horizontal
      } = props;
      const cursorDimension = CursorHelpers.getDimension(props);
      const cursorValue = this.getCursorPosition(props);
      const cursorLabelOffset = this.getCursorLabelOffset(props);

      if (!cursorValue) {
        return [];
      }

      const newElements = [];
      const padding = this.getPadding(props);
      const cursorCoordinates = {
        x: horizontal ? scale.y(cursorValue.y) : scale.x(cursorValue.x),
        y: horizontal ? scale.x(cursorValue.x) : scale.y(cursorValue.y)
      };
      if (cursorLabel) {
        const labelProps = defaults({ active: true }, cursorLabelComponent.props, {
          x: cursorCoordinates.x + cursorLabelOffset.x,
          y: cursorCoordinates.y + cursorLabelOffset.y,
          datum: cursorValue,
          active: true,
          key: `${name}-cursor-label`
        });
        newElements.push(
          React.cloneElement(
            cursorLabelComponent,
            defaults({}, labelProps, { text: Helpers.evaluateProp(cursorLabel, labelProps) })
          )
        );
      }

      const cursorStyle = assign({ stroke: "black" }, cursorComponent.props.style);
      if (cursorDimension === "x" || cursorDimension === undefined) {
        newElements.push(
          React.cloneElement(cursorComponent, {
            key: `${name}-x-cursor`,
            x1: cursorCoordinates.x,
            x2: cursorCoordinates.x,
            y1: padding.top,
            y2: height - padding.bottom,
            style: cursorStyle
          })
        );
      }
      if (cursorDimension === "y" || cursorDimension === undefined) {
        newElements.push(
          React.cloneElement(cursorComponent, {
            key: `${name}-y-cursor`,
            x1: padding.left,
            x2: width - padding.right,
            y1: cursorCoordinates.y,
            y2: cursorCoordinates.y,
            style: cursorStyle
          })
        );
      }
      return newElements;
    }

    // Overrides method in VictoryContainer
    getChildren(props) {
      return [...React.Children.toArray(props.children), ...this.getCursorElements(props)];
    }
  };

export default cursorContainerMixin(VictoryContainer);
